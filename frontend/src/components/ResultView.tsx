"use client";

import { Spinner } from "./Spinner";
import type { DifficultyLevel, ExampleSentence, TranslateResponse } from "@/lib/api";
import { useUiLanguage } from "./UiLanguageProvider";
import { DictionaryEntryExtras } from "./DictionaryEntryExtras";

export function ResultView(props: {
  result: TranslateResponse;
  difficulty: DifficultyLevel;
  onRegenerateExamples?: () => void;
  regenerateLoading?: boolean;
}) {
  const { translate } = useUiLanguage();
  const { result, difficulty, onRegenerateExamples, regenerateLoading } = props;

  const examples: ExampleSentence[] = Array.isArray(result.examples) ? result.examples : [];
  const synonyms = Array.isArray(result.synonyms) ? result.synonyms : [];
  const antonyms = Array.isArray(result.antonyms) ? result.antonyms : [];
  const usageNote = typeof result.usage_note === "string" ? result.usage_note.trim() : "";

  return (
    <section className="space-y-5 rounded-3xl border border-slate-200/70 bg-white/95 p-4 shadow-lg transition-shadow duration-300 sm:space-y-6 sm:p-6 md:bg-white/60 md:shadow-xl md:backdrop-blur-md md:hover:shadow-2xl md:hover:-translate-y-0.5">
      <div>
        <h2 className="text-xs font-semibold tracking-wide text-slate-500">{translate("wordHeader")}</h2>
        <p className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl md:text-3xl">{result.word}</p>
      </div>

      <div>
        <h2 className="text-xs font-semibold tracking-wide text-slate-500">{translate("meaningsHeader")}</h2>
        {result.meanings.length > 0 ? (
          <ul className="mt-2 list-inside list-disc text-base leading-relaxed text-slate-800 sm:text-lg">
            {result.meanings.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-slate-600 sm:text-base">{translate("noMockEntry")}</p>
        )}
      </div>

      <div>
        <h2 className="text-xs font-semibold tracking-wide text-slate-500">{translate("aiExplanationHeader")}</h2>
        <p className="mt-2 text-base leading-relaxed text-slate-800 sm:text-lg">{result.ai_explanation}</p>
        <DictionaryEntryExtras synonyms={synonyms} antonyms={antonyms} usageNote={usageNote} />
      </div>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xs font-semibold tracking-wide text-slate-500">{translate("examplesHeader")}</h2>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
            {difficulty}
          </span>
          {onRegenerateExamples ? (
            <button
              type="button"
              onClick={onRegenerateExamples}
              disabled={!!regenerateLoading}
              className="inline-flex min-h-[44px] min-w-[44px] items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm transition-colors duration-200 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 md:bg-white/70 md:backdrop-blur-md md:hover:bg-white"
            >
              {regenerateLoading ? <Spinner className="size-3 border-neutral-300 border-t-neutral-700" /> : null}
              {translate("regenerateButton")}
            </button>
          ) : null}
        </div>

        <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-slate-800 sm:pl-6 sm:text-lg">
          {examples.map((item, i) => (
            <li key={`${i}-${item.original.slice(0, 24)}`} className="mb-4">
              <p className="font-semibold text-slate-900">
                {item.original}
                {item.transliteration?.trim() ? (
                  <span className="ml-2 text-sm italic font-normal text-slate-500 sm:text-base">
                    ({item.transliteration})
                  </span>
                ) : null}
              </p>
              <p className="text-sm italic text-slate-600 sm:text-base">{item.translated}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

