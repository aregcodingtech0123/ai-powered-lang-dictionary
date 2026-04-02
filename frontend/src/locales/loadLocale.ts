import type { UiLanguage } from "@/lib/i18n";
import type { LocaleBundle } from "./types";
import uiEn from "./ui/en";
import contentEn from "./content/en";
import legalEn from "./legal/en";

/** English ships in the main bundle for instant first paint; other locales load on demand. */
export const enBundle: LocaleBundle = { ui: uiEn, content: contentEn, legal: legalEn };

/**
 * Loads UI + content + legal for one language as three parallel dynamic imports
 * (three chunks per language, fetched together). English uses the static enBundle.
 */
const loaders: Record<UiLanguage, () => Promise<LocaleBundle>> = {
  en: async () => enBundle,
  tr: async () => {
    const [ui, content, legal] = await Promise.all([
      import("./ui/tr"),
      import("./content/tr"),
      import("./legal/tr"),
    ]);
    return { ui: ui.default, content: content.default, legal: legal.default };
  },
  pt: async () => {
    const [ui, content, legal] = await Promise.all([
      import("./ui/pt"),
      import("./content/pt"),
      import("./legal/pt"),
    ]);
    return { ui: ui.default, content: content.default, legal: legal.default };
  },
  fr: async () => {
    const [ui, content, legal] = await Promise.all([
      import("./ui/fr"),
      import("./content/fr"),
      import("./legal/fr"),
    ]);
    return { ui: ui.default, content: content.default, legal: legal.default };
  },
  es: async () => {
    const [ui, content, legal] = await Promise.all([
      import("./ui/es"),
      import("./content/es"),
      import("./legal/es"),
    ]);
    return { ui: ui.default, content: content.default, legal: legal.default };
  },
  ja: async () => {
    const [ui, content, legal] = await Promise.all([
      import("./ui/ja"),
      import("./content/ja"),
      import("./legal/ja"),
    ]);
    return { ui: ui.default, content: content.default, legal: legal.default };
  },
  zh: async () => {
    const [ui, content, legal] = await Promise.all([
      import("./ui/zh"),
      import("./content/zh"),
      import("./legal/zh"),
    ]);
    return { ui: ui.default, content: content.default, legal: legal.default };
  },
  ko: async () => {
    const [ui, content, legal] = await Promise.all([
      import("./ui/ko"),
      import("./content/ko"),
      import("./legal/ko"),
    ]);
    return { ui: ui.default, content: content.default, legal: legal.default };
  },
  ar: async () => {
    const [ui, content, legal] = await Promise.all([
      import("./ui/ar"),
      import("./content/ar"),
      import("./legal/ar"),
    ]);
    return { ui: ui.default, content: content.default, legal: legal.default };
  },
  ru: async () => {
    const [ui, content, legal] = await Promise.all([
      import("./ui/ru"),
      import("./content/ru"),
      import("./legal/ru"),
    ]);
    return { ui: ui.default, content: content.default, legal: legal.default };
  },
  it: async () => {
    const [ui, content, legal] = await Promise.all([
      import("./ui/it"),
      import("./content/it"),
      import("./legal/it"),
    ]);
    return { ui: ui.default, content: content.default, legal: legal.default };
  },
};

export async function loadLocaleBundle(lang: UiLanguage): Promise<LocaleBundle> {
  return loaders[lang]();
}
