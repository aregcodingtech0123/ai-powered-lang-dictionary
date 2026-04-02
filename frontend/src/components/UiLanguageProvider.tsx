"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  SUPPORTED_LANGUAGES,
  applyStringVars,
  type I18nKey,
  type UiLanguage,
} from "@/lib/i18n";
import { enBundle, loadLocaleBundle } from "@/locales/loadLocale";
import type { ContentI18n, LegalTranslations, LocaleBundle } from "@/locales/types";

const UI_LANG_COOKIE = "ui_lang";

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const parts = document.cookie.split(";").map((p) => p.trim());
  const match = parts.find((p) => p.startsWith(`${name}=`));
  if (!match) return null;
  return decodeURIComponent(match.slice(name.length + 1));
}

function writeCookie(name: string, value: string) {
  if (typeof document === "undefined") return;
  const oneYear = 60 * 60 * 24 * 365;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${oneYear}; samesite=lax`;
}

function normalizeUiLanguage(value: string | null | undefined): UiLanguage | null {
  if (!value) return null;
  const base = value.split("-")[0]?.trim().toLowerCase() ?? "";
  if (SUPPORTED_LANGUAGES.includes(base as UiLanguage)) return base as UiLanguage;
  return null;
}

type UiLanguageContextValue = {
  uiLanguage: UiLanguage;
  setUiLanguage: (lang: UiLanguage) => Promise<void>;
  translate: (key: I18nKey, vars?: Record<string, string | number>) => string;
  content: ContentI18n;
  legal: LegalTranslations;
  localeLoading: boolean;
};

const UiLanguageContext = createContext<UiLanguageContextValue | null>(null);

export function UiLanguageProvider({ children }: { children: React.ReactNode }) {
  const [uiLanguage, setUiLanguageState] = useState<UiLanguage>("en");
  const [bundle, setBundle] = useState<LocaleBundle>(() => enBundle);
  const [localeLoading, setLocaleLoading] = useState(false);

  const applyLanguage = useCallback(async (lang: UiLanguage) => {
    if (lang === "en") {
      setBundle(enBundle);
      setUiLanguageState("en");
      return;
    }
    setLocaleLoading(true);
    try {
      const next = await loadLocaleBundle(lang);
      setBundle(next);
      setUiLanguageState(lang);
    } finally {
      setLocaleLoading(false);
    }
  }, []);

  useEffect(() => {
    const fromCookie = normalizeUiLanguage(readCookie(UI_LANG_COOKIE));
    const fromStorage = normalizeUiLanguage(
      typeof window !== "undefined" ? window.localStorage.getItem(UI_LANG_COOKIE) : null
    );
    const initial = fromCookie ?? fromStorage;
    if (!initial || initial === "en") return;
    let cancelled = false;
    setLocaleLoading(true);
    void loadLocaleBundle(initial)
      .then((b) => {
        if (cancelled) return;
        setBundle(b);
        setUiLanguageState(initial);
      })
      .finally(() => {
        if (!cancelled) setLocaleLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = uiLanguage;
    document.documentElement.dir = uiLanguage === "ar" ? "rtl" : "ltr";
    writeCookie(UI_LANG_COOKIE, uiLanguage);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(UI_LANG_COOKIE, uiLanguage);
    }
  }, [uiLanguage]);

  const setUiLanguage = useCallback(
    async (lang: UiLanguage) => {
      if (lang === uiLanguage) return;
      await applyLanguage(lang);
    },
    [uiLanguage, applyLanguage]
  );

  const translate = useCallback(
    (key: I18nKey, vars?: Record<string, string | number>) => {
      const template = bundle.ui[key];
      return applyStringVars(template, vars);
    },
    [bundle]
  );

  const value = useMemo<UiLanguageContextValue>(
    () => ({
      uiLanguage,
      setUiLanguage,
      translate,
      content: bundle.content,
      legal: bundle.legal,
      localeLoading,
    }),
    [uiLanguage, setUiLanguage, translate, bundle.content, bundle.legal, localeLoading]
  );

  return <UiLanguageContext.Provider value={value}>{children}</UiLanguageContext.Provider>;
}

export function useUiLanguage() {
  const context = useContext(UiLanguageContext);
  if (!context) {
    throw new Error("useUiLanguage must be used within UiLanguageProvider");
  }
  return context;
}
