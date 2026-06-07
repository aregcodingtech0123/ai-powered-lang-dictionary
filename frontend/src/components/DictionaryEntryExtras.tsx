"use client";

import { useUiLanguage } from "./UiLanguageProvider";

export function DictionaryEntryExtras(props: {
  synonyms: string[];
  antonyms: string[];
  usageNote: string;
}) {
  const { translate } = useUiLanguage();
  const { synonyms, antonyms, usageNote } = props;

  return (
    <>
      {usageNote ? (
        <p className="mt-4 rounded-input border border-cyan-100 bg-cyan-50/60 px-4 py-3 text-base leading-relaxed text-brand-text sm:text-lg">
          <span className="font-semibold text-cyan-900">{translate("usageNoteLabel")}:</span> {usageNote}
        </p>
      ) : null}

      {synonyms.length > 0 || antonyms.length > 0 ? (
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <h2 className="section-label">{translate("synonymsHeader")}</h2>
            {synonyms.length > 0 ? (
              <ul className="mt-3 flex flex-wrap gap-2">
                {synonyms.map((s) => (
                  <li key={s} className="chip-indigo">
                    {s}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-brand-text-secondary">—</p>
            )}
          </div>

          <div>
            <h2 className="section-label">{translate("antonymsHeader")}</h2>
            {antonyms.length > 0 ? (
              <ul className="mt-3 flex flex-wrap gap-2">
                {antonyms.map((a) => (
                  <li key={a} className="chip-cyan">
                    {a}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-brand-text-secondary">—</p>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
