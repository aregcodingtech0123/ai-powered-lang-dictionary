"use client";

import { memo, useCallback, useRef, useState } from "react";
import {
  type DifficultyLevel,
  fetchTranslate,
  type LangCode,
  regenerateExamples,
  TranslateValidationError,
  type TranslateResponse,
} from "@/lib/api";
import { formatLangName, SUPPORTED_LANGUAGES } from "@/lib/i18n";
import { Spinner } from "./Spinner";
import { useUiLanguage } from "./UiLanguageProvider";
import { PopularWordsExpandable } from "./PopularWordsExpandable";
import { ResultView } from "./ResultView";
import { ResultSkeleton } from "./ResultSkeleton";
import {
  DictionarySearchWordInput,
  type DictionarySearchWordInputHandle,
} from "./DictionarySearchWordInput";
import { HomeFaqSection, HomeHowItWorksSection } from "./HomeStaticSections";

const MemoPopularWordsExpandable = memo(PopularWordsExpandable);

type ValidationUiError =
  | {
      code: "wrong_language";
      word: string;
      sourceLanguage: LangCode;
      suggestedLanguage: LangCode;
    }
  | {
      code: "not_found";
      word: string;
      sourceLanguage: LangCode;
    }
  | {
      code: "wrong_language_detected";
      word: string;
      sourceLanguage: LangCode;
      detectedLangCode: LangCode;
      detectedLangName: string;
    };

export function DictionarySearch() {
  const { uiLanguage, translate, content } = useUiLanguage();
  const isRtl = uiLanguage === "ar";
  const wordInputRef = useRef<DictionarySearchWordInputHandle | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null);
  const [sourceLanguage, setSourceLanguage] = useState<LangCode>("en");
  const [targetLanguage, setTargetLanguage] = useState<LangCode>("tr");
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("B1");
  const [loading, setLoading] = useState(false);
  const [regenLoading, setRegenLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<ValidationUiError | null>(null);
  const [searchResult, setSearchResult] = useState<TranslateResponse | null>(null);

  const runSearch = useCallback(
    async (override?: { from?: LangCode; to?: LangCode; word?: string }) => {
      setError(null);
      setValidationError(null);
      const trimmed = (override?.word ?? wordInputRef.current?.getValue() ?? "").trim();
      if (!trimmed) {
        setError(translate("enterWordError"));
        return;
      }
      const from = override?.from ?? sourceLanguage;
      const to = override?.to ?? targetLanguage;
      if (from === to) {
        setError("Source and target languages must differ.");
        return;
      }
      setSearchResult(null);
      setLoading(true);
      try {
        const data = await fetchTranslate(trimmed, from, to, uiLanguage, difficulty);
        setSearchResult(data);
        if (typeof window !== "undefined") {
          const nextUrl = `/dictionary/${from}/${to}/${encodeURIComponent(trimmed)}`;
          window.history.pushState(null, "", nextUrl);
        }
      } catch (e) {
        setSearchResult(null);
        if (e instanceof TranslateValidationError) {
          if (e.code === "wrong_language_detected" && e.detectedLangCode) {
            setValidationError({
              code: "wrong_language_detected",
              word: e.queryWord,
              sourceLanguage: e.sourceLanguage ?? from,
              detectedLangCode: e.detectedLangCode,
              detectedLangName: e.detectedLangName ?? formatLangName(e.detectedLangCode),
            });
            return;
          }
          if (e.code === "wrong_language" && e.suggestedLanguage) {
            setValidationError({
              code: "wrong_language",
              word: e.queryWord,
              sourceLanguage: e.sourceLanguage ?? from,
              suggestedLanguage: e.suggestedLanguage,
            });
            return;
          }
          setValidationError({
            code: "not_found",
            word: e.queryWord,
            sourceLanguage: e.sourceLanguage ?? from,
          });
          return;
        }
        setError(e instanceof Error ? e.message : translate("genericError"));
      } finally {
        setLoading(false);
      }
    },
    [sourceLanguage, targetLanguage, uiLanguage, difficulty, translate]
  );

  const switchSourceToDetectedAndSearch = useCallback(async () => {
    if (!validationError || validationError.code !== "wrong_language_detected") return;
    const nextFrom = validationError.detectedLangCode;
    setSourceLanguage(nextFrom);
    await runSearch({ from: nextFrom, to: targetLanguage });
  }, [validationError, targetLanguage, runSearch]);

  const switchDirectionAndSearch = useCallback(async () => {
    if (!validationError || validationError.code !== "wrong_language") return;
    const nextFrom = targetLanguage;
    const nextTo = sourceLanguage;
    setSourceLanguage(nextFrom);
    setTargetLanguage(nextTo);
    await runSearch({ from: nextFrom, to: nextTo });
  }, [validationError, sourceLanguage, targetLanguage, runSearch]);

  const swapLanguages = useCallback(() => {
    setSourceLanguage((prev) => {
      const next = targetLanguage;
      setTargetLanguage(prev);
      return next;
    });
  }, [targetLanguage]);

  const runRegenerate = useCallback(async () => {
    if (!searchResult) return;
    setError(null);
    const from = sourceLanguage;
    const to = targetLanguage;
    setRegenLoading(true);
    try {
      const partial = await regenerateExamples(searchResult.word, from, to, difficulty);
      setSearchResult((prev) => (prev ? { ...prev, examples: partial.examples } : prev));
    } catch (e) {
      setError(e instanceof Error ? e.message : translate("regenError"));
    } finally {
      setRegenLoading(false);
    }
  }, [searchResult, sourceLanguage, targetLanguage, difficulty, translate]);

  const clearResult = useCallback(() => {
    setError(null);
    setValidationError(null);
    setSearchResult(null);
    wordInputRef.current?.clear();
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", "/");
    }
    queueMicrotask(() => {
      wordInputRef.current?.focus();
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  const handlePopularSelect = useCallback(
    ({ word: w, from, to }: { word: string; from: string; to: string }) => {
      wordInputRef.current?.setValue(w);
      setSourceLanguage(from as LangCode);
      setTargetLanguage(to as LangCode);
      setSearchResult(null);
      setError(null);
      setValidationError(null);
      queueMicrotask(() => {
        topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        wordInputRef.current?.focus();
      });
      void runSearch({ word: w, from: from as LangCode, to: to as LangCode });
    },
    [runSearch]
  );

  return (
    <div ref={topRef} className="mx-auto w-full max-w-6xl overflow-x-hidden px-3 py-6 sm:px-4 sm:py-8 md:px-6 md:py-10">
      <header className="mb-8 text-center sm:mb-10">
        <h1 className="text-[1.65rem] font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl md:text-4xl lg:text-5xl">
          <span className="bg-gradient-to-r from-indigo-500 via-indigo-500 to-violet-600 bg-clip-text text-transparent">
            {translate("navTitle")}
          </span>
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
          {translate("heroSubtitle")}
        </p>
      </header>

      <section className="rounded-[28px] border border-slate-200/70 bg-white/95 p-5 shadow-lg transition-all duration-300 sm:p-6 md:bg-white/55 md:p-8 md:shadow-xl md:backdrop-blur-md md:hover:shadow-2xl">
        <div className="grid w-full min-w-0 grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3 md:gap-6 lg:grid-cols-12 lg:items-end">
          <DictionarySearchWordInput
            ref={wordInputRef}
            className="col-span-1 md:col-span-3 lg:col-span-3"
            wordLabel={translate("wordLabel")}
            wordPlaceholder={translate("wordInputPlaceholder")}
            hasSearchResult={!!searchResult}
            onSubmit={() => void runSearch()}
            onClear={clearResult}
          />
          <div className="flex min-w-0 flex-col gap-1 md:col-span-1 lg:col-span-2">
            <label
              htmlFor="source"
              className="block min-h-[1.25rem] text-sm font-semibold leading-tight text-slate-700"
            >
              {translate("sourceLabel")}
            </label>
            <select
              id="source"
              value={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value as LangCode)}
              className="box-border min-h-11 w-full min-w-0 rounded-2xl border border-slate-200 bg-white px-3 py-3 text-base text-slate-900 shadow-sm outline-none transition-all duration-300 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-200/60 md:bg-white/70 md:backdrop-blur-md"
            >
              {SUPPORTED_LANGUAGES.map((code) => (
                <option key={`src-${code}`} value={code}>
                  {formatLangName(code)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex min-w-0 flex-col gap-1 md:col-span-1 lg:col-span-1">
            <span
              className="block min-h-[1.25rem] text-sm font-semibold leading-tight text-transparent select-none"
              aria-hidden
            >
              &nbsp;
            </span>
            <div className="flex min-h-11 w-full items-center justify-center">
              <button
                type="button"
                onClick={swapLanguages}
                className="inline-flex h-11 w-full max-w-[4.5rem] shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:bg-slate-50 md:bg-white/70 md:backdrop-blur-md"
                aria-label={translate("swapButton")}
                title={translate("swapButton")}
              >
                ⇄
              </button>
            </div>
          </div>
          <div className="flex min-w-0 flex-col gap-1 md:col-span-1 lg:col-span-2">
            <label
              htmlFor="target"
              className="block min-h-[1.25rem] text-sm font-semibold leading-tight text-slate-700"
            >
              {translate("targetLabel")}
            </label>
            <select
              id="target"
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value as LangCode)}
              className="box-border min-h-11 w-full min-w-0 rounded-2xl border border-slate-200 bg-white px-3 py-3 text-base text-slate-900 shadow-sm outline-none transition-all duration-300 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-200/60 md:bg-white/70 md:backdrop-blur-md"
            >
              {SUPPORTED_LANGUAGES.map((code) => (
                <option key={`tgt-${code}`} value={code}>
                  {formatLangName(code)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex min-w-0 flex-col gap-1 md:col-span-1 lg:col-span-4">
            <label
              htmlFor="difficulty"
              className="block min-h-[1.25rem] text-sm font-semibold leading-tight text-slate-700"
            >
              {translate("difficultyLabel")}
            </label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
              className="box-border min-h-11 w-full min-w-0 rounded-2xl border border-slate-200 bg-white px-3 py-3 text-base text-slate-900 shadow-sm outline-none transition-all duration-300 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-200/60 md:bg-white/70 md:backdrop-blur-md"
            >
              <option value="A1">{translate("levelA1")}</option>
              <option value="A2">{translate("levelA2")}</option>
              <option value="B1">{translate("levelB1")}</option>
              <option value="B2">{translate("levelB2")}</option>
              <option value="C1">{translate("levelC1")}</option>
              <option value="C2">{translate("levelC2")}</option>
            </select>
          </div>
          <div className="flex min-w-0 flex-col gap-1 md:col-span-2 lg:col-span-12 lg:flex-row lg:items-end lg:justify-center">
            <span
              className="block min-h-[1.25rem] text-sm font-semibold leading-tight text-transparent select-none lg:hidden"
              aria-hidden
            >
              &nbsp;
            </span>
            <button
              type="button"
              onClick={() => void runSearch()}
              disabled={loading}
              className="inline-flex min-h-11 w-full min-w-0 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 px-6 text-sm font-semibold text-white shadow-lg transition-transform duration-300 hover:shadow-xl active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:min-h-[44px] lg:w-auto lg:max-w-[12rem] lg:px-5 lg:hover:scale-[1.02]"
            >
              {loading && <Spinner className="size-4 border-indigo-200 border-t-white" />}
              {translate("searchButton")}
            </button>
          </div>
        </div>

        {error && (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
            {error}
          </p>
        )}
        {validationError?.code === "wrong_language" && (
          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
            <p>
              {translate("wrongLanguageError", {
                sourceLang: formatLangName(validationError.sourceLanguage),
                word: validationError.word,
              })}
            </p>
            <button
              type="button"
              onClick={() => void switchDirectionAndSearch()}
              className="mt-2 inline-flex min-h-11 w-full items-center justify-center rounded-xl px-3 py-2 text-left text-sm text-blue-700 underline underline-offset-2 hover:bg-blue-50 hover:text-blue-800 sm:w-auto"
            >
              {translate("switchSuggestion", {
                suggestedLang: formatLangName(validationError.suggestedLanguage),
                sourceLang: formatLangName(validationError.sourceLanguage),
              })}
            </button>
          </div>
        )}
        {validationError?.code === "not_found" && (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
            {translate("notFoundError", { word: validationError.word })}
          </p>
        )}
        {validationError?.code === "wrong_language_detected" && (
          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
            <p>
              {translate("wrongLanguageError", {
                sourceLang: formatLangName(validationError.sourceLanguage),
                word: validationError.word,
              })}
            </p>
            <button
              type="button"
              onClick={() => void switchSourceToDetectedAndSearch()}
              className="mt-2 inline-flex min-h-11 w-full items-center justify-center rounded-xl px-3 py-2 text-left text-sm text-blue-700 underline underline-offset-2 hover:bg-blue-50 hover:text-blue-800 sm:w-auto"
            >
              {translate("translateFrom", {
                lang: validationError.detectedLangName,
              })}
            </button>
          </div>
        )}
      </section>

      {loading || searchResult ? (
        <div
          className="mt-8 min-h-[min(75vh,32rem)]"
          aria-busy={loading}
          aria-live="polite"
        >
          {loading ? (
            <ResultSkeleton />
          ) : searchResult ? (
            <ResultView
              result={searchResult}
              difficulty={difficulty}
              onRegenerateExamples={() => void runRegenerate()}
              regenerateLoading={regenLoading}
            />
          ) : null}
        </div>
      ) : null}

      <section className="mt-10">
        <div className="flex justify-center">
          <MemoPopularWordsExpandable
            className="w-full max-w-6xl"
            from={sourceLanguage}
            to={targetLanguage}
            localeKey={uiLanguage}
            onSelect={handlePopularSelect}
          />
        </div>
      </section>

      <HomeHowItWorksSection howItWorks={content.howItWorks} isRtl={isRtl} />
      <HomeFaqSection faq={content.faq} isRtl={isRtl} />
    </div>
  );
}
