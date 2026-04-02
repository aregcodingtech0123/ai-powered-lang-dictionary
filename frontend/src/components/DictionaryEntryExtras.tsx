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
        <p className="mt-3 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-base leading-relaxed text-neutral-800 sm:text-lg">
          <span className="font-semibold text-neutral-900">{translate("usageNoteLabel")}:</span> {usageNote}
        </p>
      ) : null}

      {synonyms.length > 0 || antonyms.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold tracking-wide text-neutral-700">
              {translate("synonymsHeader")}
            </h2>
            {synonyms.length > 0 ? (
              <ul className="mt-2 flex flex-wrap gap-2">
                {synonyms.map((s) => (
                  <li key={s} className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-800">
                    {s}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-neutral-600">—</p>
            )}
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-wide text-neutral-700">
              {translate("antonymsHeader")}
            </h2>
            {antonyms.length > 0 ? (
              <ul className="mt-2 flex flex-wrap gap-2">
                {antonyms.map((a) => (
                  <li key={a} className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-800">
                    {a}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-neutral-600">—</p>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}

