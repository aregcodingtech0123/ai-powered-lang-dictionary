export const SUPPORTED_LANGUAGES = [
  "tr",
  "en",
  "pt",
  "fr",
  "es",
  "ja",
  "zh",
  "ko",
  "ar",
  "ru",
  "it",
] as const;

export type UiLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export type I18nKey =
  | "navTitle"
  | "heroSubtitle"
  | "wordLabel"
  | "wordHeader"
  | "wordInputPlaceholder"
  | "sourceLabel"
  | "targetLabel"
  | "difficultyLabel"
  | "swapButton"
  | "searchButton"
  | "popularWordsTitle"
  | "popularWordsSubtitle"
  | "meaningsHeader"
  | "aiExplanationHeader"
  | "usageNoteLabel"
  | "synonymsHeader"
  | "antonymsHeader"
  | "examplesHeader"
  | "regenerateButton"
  | "enterWordError"
  | "genericError"
  | "regenError"
  | "noMockEntry"
  | "wrongLanguageError"
  | "switchSuggestion"
  | "notFoundError"
  | "navAbout"
  | "navContact"
  | "footerRights"
  | "footerPrivacy"
  | "footerTerms"
  | "translateFrom"
  | "levelA1"
  | "levelA2"
  | "levelB1"
  | "levelB2"
  | "levelC1"
  | "levelC2";

const languageNames: Record<UiLanguage, string> = {
  tr: "Türkçe",
  en: "English",
  pt: "Português",
  fr: "Français",
  es: "Español",
  ja: "日本語",
  zh: "中文",
  ko: "한국어",
  ar: "العربية",
  ru: "Русский",
  it: "Italiano",
};

export function formatLangName(code: UiLanguage): string {
  return languageNames[code] ?? code.toUpperCase();
}

/** Interpolate `{name}` placeholders in a template string. */
export function applyStringVars(
  template: string,
  vars?: Record<string, string | number>
): string {
  if (!vars) return template;
  return Object.entries(vars).reduce(
    (acc, [name, value]) => acc.replaceAll(`{${name}}`, String(value)),
    template
  );
}
