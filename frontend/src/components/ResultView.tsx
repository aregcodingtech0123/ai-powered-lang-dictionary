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
    <section className="card-surface-interactive space-y-6 rounded-2xl p-5 sm:space-y-7 sm:p-6 md:p-8">
      <div className="border-b border-brand-border pb-5">
        <h2 className="section-label">{translate("wordHeader")}</h2>
        <p className="mt-2 text-2xl font-bold tracking-tight text-brand-text sm:text-3xl md:text-4xl">
          {result.word}
        </p>
      </div>

      <div>
        <h2 className="section-label">{translate("meaningsHeader")}</h2>
        {result.meanings.length > 0 ? (
          <ul className="mt-3 space-y-2 text-base leading-relaxed text-brand-text sm:text-lg">
            {result.meanings.map((m, i) => (
              <li
                key={m}
                className="flex gap-3 rounded-input border border-brand-border/60 bg-slate-50/80 px-4 py-3"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-brand-text-secondary sm:text-base">{translate("noMockEntry")}</p>
        )}
      </div>

      <div className="rounded-card border border-indigo-100 bg-brand-gradient-subtle p-5 sm:p-6">
        <h2 className="section-label !text-indigo-600">{translate("aiExplanationHeader")}</h2>
        <p className="mt-3 text-base leading-relaxed text-brand-text sm:text-lg">{result.ai_explanation}</p>
        <DictionaryEntryExtras synonyms={synonyms} antonyms={antonyms} usageNote={usageNote} />
      </div>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="section-label">{translate("examplesHeader")}</h2>
          <span className="chip-cyan">{difficulty}</span>
          {onRegenerateExamples ? (
            <button
              type="button"
              onClick={onRegenerateExamples}
              disabled={!!regenerateLoading}
              className="btn-secondary !min-h-10 !px-3 !text-xs"
            >
              {regenerateLoading ? <Spinner className="size-3 border-indigo-200 border-t-brand-primary" /> : null}
              {translate("regenerateButton")}
            </button>
          ) : null}
        </div>

        <ol className="mt-4 space-y-3">
          {examples.map((item, i) => (
            <li
              key={`${i}-${item.original.slice(0, 24)}`}
              className="rounded-card border border-brand-border bg-brand-card p-4 shadow-sm transition-shadow duration-200 hover:shadow-card"
            >
              <p className="font-semibold text-brand-text">
                <span className="mr-2 inline-flex size-6 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-brand-primary">
                  {i + 1}
                </span>
                {item.original}
                {item.transliteration?.trim() ? (
                  <span className="ml-2 text-sm font-normal italic text-brand-text-secondary sm:text-base">
                    ({item.transliteration})
                  </span>
                ) : null}
              </p>
              <p className="mt-2 pl-8 text-sm italic text-brand-text-secondary sm:text-base">{item.translated}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
