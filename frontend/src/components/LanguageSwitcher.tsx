"use client";

import { useUiLanguage } from "./UiLanguageProvider";
import { formatLangName, SUPPORTED_LANGUAGES } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { uiLanguage, setUiLanguage, localeLoading } = useUiLanguage();

  return (
    <div className="flex min-h-11 shrink-0 items-center gap-2">
      <label
        htmlFor="ui-language"
        className="sr-only sm:not-sr-only sm:text-xs sm:font-semibold sm:uppercase sm:tracking-wider sm:text-brand-text-secondary"
      >
        UI
      </label>
      <select
        id="ui-language"
        value={uiLanguage}
        disabled={localeLoading}
        onChange={(e) =>
          void setUiLanguage(e.target.value as (typeof SUPPORTED_LANGUAGES)[number])
        }
        className="select-field min-w-[7.5rem] !min-h-11 py-2 text-sm font-semibold"
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
