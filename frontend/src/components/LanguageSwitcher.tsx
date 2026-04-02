"use client";

import { useUiLanguage } from "./UiLanguageProvider";
import { formatLangName, SUPPORTED_LANGUAGES } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { uiLanguage, setUiLanguage, localeLoading } = useUiLanguage();

  return (
    <div className="flex min-h-11 shrink-0 items-center gap-2">
      <label htmlFor="ui-language" className="sr-only sm:not-sr-only sm:text-xs sm:font-semibold sm:text-slate-500">
        UI
      </label>
      <select
        id="ui-language"
        value={uiLanguage}
        disabled={localeLoading}
        onChange={(e) =>
          void setUiLanguage(e.target.value as (typeof SUPPORTED_LANGUAGES)[number])
        }
        className="min-h-11 min-w-[7.5rem] rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm outline-none transition-all duration-300 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-200/60 md:bg-white/70 md:backdrop-blur-md"
      >
        {SUPPORTED_LANGUAGES.map((code) => (
          <option key={code} value={code}>
            {formatLangName(code)}
          </option>
        ))}
      </select>
    </div>
  );
}
