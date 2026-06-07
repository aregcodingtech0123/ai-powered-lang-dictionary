import { Router, type Response } from "express";
import { regeneratePostLimiter, translateGetLimiter } from "../rateLimit.js";
import { internalServerErrorMessage } from "../httpErrors.js";
import { validateWordInput } from "../wordValidation.js";
import { lookupMeanings } from "../services/mockDictionary.js";
import {
  detectInputLanguageWhenMismatch,
  generateExamplesOnly,
  getLanguageDisplayName,
  generateWordData,
  validateSourceLanguage,
} from "../services/aiService.js";

export const translateRouter = Router();

type LanguageCode = string;
type DifficultyLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

type CacheEntry = {
  value: {
    word: string;
    meanings: string[];
    ai_explanation: string;
    examples: unknown;
    synonyms: string[];
    antonyms: string[];
    usage_note: string;
  };
  expiresAt: number;
};

const entryCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function makeCacheKey(params: {
  word: string;
  from: string;
  to: string;
  uiLanguage: string;
  difficulty: DifficultyLevel;
}): string {
  return [
    params.word.trim().toLowerCase(),
    params.from.trim().toLowerCase(),
    params.to.trim().toLowerCase(),
    params.uiLanguage.trim().toLowerCase(),
    params.difficulty,
  ].join("|");
}

function getCached(key: string): CacheEntry["value"] | null {
  const item = entryCache.get(key);
  if (!item) return null;
  if (Date.now() > item.expiresAt) {
    entryCache.delete(key);
    return null;
  }
  return item.value;
}

function setCached(key: string, value: CacheEntry["value"]) {
  entryCache.set(key, { value, expiresAt: Date.now() + CACHE_TTL_MS });
  // simple bound to avoid unbounded growth in small deployments
  if (entryCache.size > 5000) {
    const firstKey = entryCache.keys().next().value as string | undefined;
    if (firstKey) entryCache.delete(firstKey);
  }
}

function parseLang(v: unknown): LanguageCode | null {
  if (typeof v !== "string") return null;
  const normalized = v.trim().toLowerCase();
  // Accept common ISO-style language tags like "en", "tr", "zh", "pt-br", "zh-cn".
  if (!/^[a-z]{2,3}(?:-[a-z]{2})?$/.test(normalized)) return null;
  return normalized;
}

function isMockDictionaryPair(from: LanguageCode, to: LanguageCode): boolean {
  return (from === "en" && to === "tr") || (from === "tr" && to === "en");
}

function normalizeBaseLang(code: LanguageCode): string {
  return code.split("-")[0] ?? code;
}

function sameLanguage(from: LanguageCode, to: LanguageCode): boolean {
  return normalizeBaseLang(from) === normalizeBaseLang(to);
}

function shouldRunSourceValidation(from: LanguageCode, to: LanguageCode): boolean {
  // Keep validation for EN/TR local-data flow; other pairs rely fully on universal generation.
  return isMockDictionaryPair(from, to);
}

function parseUiLang(v: unknown): LanguageCode {
  return parseLang(v) ?? "en";
}

function parseDifficulty(v: unknown): DifficultyLevel {
  if (v === "A1" || v === "A2" || v === "B1" || v === "B2" || v === "C1" || v === "C2") {
    return v;
  }
  return "B1";
}

function translatePairError(): string {
  return "Parameters from and to must be valid ISO-like language codes (e.g. en, tr, fr, ja, zh-cn).";
}

function differsError(): string {
  return "from and to must differ.";
}

const TRANSLATE_SUCCESS_CACHE_CONTROL =
  "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400";

function setTranslateSuccessCache(res: Response) {
  res.setHeader("Cache-Control", TRANSLATE_SUCCESS_CACHE_CONTROL);
}

function lookupMeaningsIfAvailable(word: string, from: LanguageCode, to: LanguageCode): string[] {
  if (!isMockDictionaryPair(from, to)) return [];
  // lookupMeanings only has local EN<->TR data.
  return lookupMeanings(word, from as "en" | "tr", to as "en" | "tr");
}

translateRouter.get("/translate", translateGetLimiter, async (req, res) => {
  try {
    const wordRaw = typeof req.query.word === "string" ? req.query.word : "";
    const from = parseLang(req.query.from);
    const to = parseLang(req.query.to);
    const uiLanguage = parseUiLang(req.query.uiLang);
    const difficulty = parseDifficulty(req.query.difficulty);

    const wordValidation = validateWordInput(wordRaw);
    if (!wordValidation.ok) {
      res.status(400).json({ error: wordValidation.error });
      return;
    }
    const word = wordValidation.word;

    if (!from || !to) {
      res.status(400).json({ error: translatePairError() });
      return;
    }
    if (sameLanguage(from, to)) {
      res.status(400).json({ error: differsError() });
      return;
    }

    const meanings = lookupMeaningsIfAvailable(word, from, to);

    if (meanings.length === 0) {
      const detection = await detectInputLanguageWhenMismatch({
        word,
        sourceLang: from,
      });
      if (detection.status === "detected_other") {
        res.status(422).json({
          error: "wrong_language_detected",
          detected_lang_code: detection.detected_lang_code.toUpperCase(),
          detected_lang_name: getLanguageDisplayName(detection.detected_lang_code),
          source_language: from,
          word,
        });
        return;
      }
    }

    if (meanings.length === 0 && shouldRunSourceValidation(from, to)) {
      const validation = await validateSourceLanguage({ word, from, to });
      if (validation.status === "wrong_language") {
        res.status(422).json({
          error: "wrong_language",
          suggested_language: validation.suggested_language,
          source_language: from,
          word,
        });
        return;
      }
      if (validation.status === "not_found") {
        res.status(404).json({ error: "not_found", word });
        return;
      }
    }

    const existingMeanings = meanings.length > 0 ? meanings : null;
    const cacheKey = makeCacheKey({ word, from, to, uiLanguage, difficulty });
    const cached = getCached(cacheKey);
    if (cached) {
      setTranslateSuccessCache(res);
      res.json(cached);
      return;
    }

    const {
      ai_explanation,
      examples,
      meanings: aiMeanings,
      synonyms,
      antonyms,
      usage_note,
    } = await generateWordData({
      word,
      from,
      to,
      existingMeanings,
      uiLanguage,
      difficulty,
    });
    const responseMeanings = meanings.length > 0 ? meanings : aiMeanings;

    const response = {
      word,
      meanings: responseMeanings,
      ai_explanation,
      examples,
      synonyms,
      antonyms,
      usage_note,
    };

    setCached(cacheKey, response);
    setTranslateSuccessCache(res);
    res.json(response);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: internalServerErrorMessage(e, "Failed to complete translation request."),
    });
  }
});

translateRouter.post("/translate/regenerate", regeneratePostLimiter, async (req, res) => {
  try {
    const body = req.body as { word?: string; from?: string; to?: string; difficulty?: string };
    const wordRaw = typeof body.word === "string" ? body.word : "";
    const from = parseLang(body.from);
    const to = parseLang(body.to);
    const difficulty = parseDifficulty(body.difficulty);

    const wordValidation = validateWordInput(wordRaw, {
      emptyMessage: "Missing or empty word in body.",
    });
    if (!wordValidation.ok) {
      res.status(400).json({ error: wordValidation.error });
      return;
    }
    const word = wordValidation.word;

    if (!from || !to) {
      res.status(400).json({ error: translatePairError() });
      return;
    }
    if (sameLanguage(from, to)) {
      res.status(400).json({ error: differsError() });
      return;
    }

    const meanings = lookupMeaningsIfAvailable(word, from, to);
    const examples = await generateExamplesOnly({
      word,
      from,
      to,
      meanings,
      difficulty,
    });

    res.json({ examples });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: internalServerErrorMessage(e, "Failed to regenerate content."),
    });
  }
});
