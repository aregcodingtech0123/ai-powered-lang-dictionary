import { mockDictionary } from "../data/mock-dictionary.js";

type Lang = "tr" | "en" | "pt" | "fr" | "es" | "ja" | "zh" | "ko" | "ar" | "ru" | "it";

function normalizeKey(word: string, from: Lang): string {
  const t = word.trim();
  if (!t) return "";
  return from === "tr" ? t.toLocaleLowerCase("tr-TR") : t.toLocaleLowerCase();
}

export function lookupMeanings(word: string, from: Lang, to: Lang): string[] {
  const key = normalizeKey(word, from);
  if (!key) return [];

  if (from === "en" && to === "tr") {
    return [...(mockDictionary.en_to_tr[key as keyof typeof mockDictionary.en_to_tr] ?? [])];
  }
  if (from === "tr" && to === "en") {
    return [...(mockDictionary.tr_to_en[key as keyof typeof mockDictionary.tr_to_en] ?? [])];
  }
  return [];
}
