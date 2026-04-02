import type { UiLanguage } from "./i18n";

const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export type LangCode = UiLanguage;
export type DifficultyLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type ExampleSentence = {
  original: string;
  transliteration?: string | null;
  translated: string;
};

export type TranslateResponse = {
  word: string;
  meanings: string[];
  ai_explanation: string;
  examples: ExampleSentence[];
  synonyms: string[];
  antonyms: string[];
  usage_note: string;
};

export type ApiErrorBody = {
  error?: string;
  suggested_language?: LangCode;
  source_language?: LangCode;
  detected_lang_code?: string;
  detected_lang_name?: string;
  word?: string;
};

export class TranslateValidationError extends Error {
  code: "wrong_language" | "not_found" | "wrong_language_detected";
  suggestedLanguage?: LangCode;
  sourceLanguage?: LangCode;
  detectedLangCode?: LangCode;
  detectedLangName?: string;
  queryWord: string;

  constructor(params: {
    code: "wrong_language" | "not_found" | "wrong_language_detected";
    queryWord: string;
    suggestedLanguage?: LangCode;
    sourceLanguage?: LangCode;
    detectedLangCode?: LangCode;
    detectedLangName?: string;
  }) {
    super(params.code);
    this.code = params.code;
    this.queryWord = params.queryWord;
    this.suggestedLanguage = params.suggestedLanguage;
    this.sourceLanguage = params.sourceLanguage;
    this.detectedLangCode = params.detectedLangCode;
    this.detectedLangName = params.detectedLangName;
  }
}

export async function fetchTranslate(
  word: string,
  from: LangCode,
  to: LangCode,
  uiLanguage: UiLanguage,
  difficulty: DifficultyLevel
): Promise<TranslateResponse> {
  const params = new URLSearchParams({ word, from, to, uiLang: uiLanguage, difficulty });
  const res = await fetch(`${base}/api/translate?${params.toString()}`, {
    cache: "default",
  });
  const data = (await res.json()) as TranslateResponse & ApiErrorBody;
  if (!res.ok) {
    if (
      data.error === "wrong_language" ||
      data.error === "not_found" ||
      data.error === "wrong_language_detected"
    ) {
      throw new TranslateValidationError({
        code: data.error,
        queryWord: data.word ?? word,
        suggestedLanguage: data.suggested_language,
        sourceLanguage: data.source_language ?? from,
        detectedLangCode: (data.detected_lang_code?.toLowerCase() as LangCode | undefined) ?? undefined,
        detectedLangName: data.detected_lang_name,
      });
    }
    throw new Error(data.error ?? "Request failed");
  }
  return data;
}

export async function regenerateExamples(
  word: string,
  from: LangCode,
  to: LangCode,
  difficulty: DifficultyLevel
): Promise<Pick<TranslateResponse, "examples">> {
  const res = await fetch(`${base}/api/translate/regenerate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ word, from, to, difficulty }),
  });
  const data = (await res.json()) as Pick<TranslateResponse, "examples"> & ApiErrorBody;
  if (!res.ok) {
    throw new Error(data.error ?? "Request failed");
  }
  return data;
}
