import type { UiLanguage } from "./i18n";

export type PopularWordsEntry = {
  word: string;
  label?: string;
};

export type PopularWordsPairKey = `${string}-${string}`;

// Equal-sized, editorial "seed" lists by SOURCE language.
// Used for pair-specific fallback and sitemap expansion.
export const POPULAR_WORDS_BY_SOURCE: Record<UiLanguage, PopularWordsEntry[]> = {
  en: [
    { word: "success" },
    { word: "learn" },
    { word: "language" },
    { word: "example" },
    { word: "practice" },
    { word: "meaning" },
    { word: "improve" },
    { word: "help" },
    { word: "work" },
    { word: "time" },
    { word: "people" },
    { word: "world" },
    { word: "future" },
    { word: "today" },
    { word: "create" },
  ],
  tr: [
    { word: "merhaba" },
    { word: "teşekkürler" },
    { word: "lütfen" },
    { word: "evet" },
    { word: "hayır" },
    { word: "başarı" },
    { word: "öğrenmek" },
    { word: "dil" },
    { word: "anlam" },
    { word: "örnek" },
    { word: "zaman" },
    { word: "insan" },
    { word: "dünya" },
    { word: "gelecek" },
    { word: "bugün" },
  ],
  es: [
    { word: "hola" },
    { word: "gracias" },
    { word: "por favor" },
    { word: "sí" },
    { word: "no" },
    { word: "éxito" },
    { word: "aprender" },
    { word: "idioma" },
    { word: "significado" },
    { word: "ejemplo" },
    { word: "práctica" },
    { word: "tiempo" },
    { word: "gente" },
    { word: "mundo" },
    { word: "hoy" },
  ],
  fr: [
    { word: "bonjour" },
    { word: "merci" },
    { word: "s’il vous plaît" },
    { word: "oui" },
    { word: "non" },
    { word: "succès" },
    { word: "apprendre" },
    { word: "langue" },
    { word: "sens" },
    { word: "exemple" },
    { word: "pratique" },
    { word: "temps" },
    { word: "gens" },
    { word: "monde" },
    { word: "aujourd’hui" },
  ],
  pt: [
    { word: "olá" },
    { word: "obrigado" },
    { word: "por favor" },
    { word: "sim" },
    { word: "não" },
    { word: "sucesso" },
    { word: "aprender" },
    { word: "idioma" },
    { word: "significado" },
    { word: "exemplo" },
    { word: "prática" },
    { word: "tempo" },
    { word: "pessoas" },
    { word: "mundo" },
    { word: "hoje" },
  ],
  it: [
    { word: "ciao" },
    { word: "grazie" },
    { word: "per favore" },
    { word: "sì" },
    { word: "no" },
    { word: "successo" },
    { word: "imparare" },
    { word: "lingua" },
    { word: "significato" },
    { word: "esempio" },
    { word: "pratica" },
    { word: "tempo" },
    { word: "persone" },
    { word: "mondo" },
    { word: "oggi" },
  ],
  ja: [
    { word: "こんにちは" },
    { word: "ありがとう" },
    { word: "お願いします" },
    { word: "はい" },
    { word: "いいえ" },
    { word: "成功" },
    { word: "学ぶ" },
    { word: "言語" },
    { word: "意味" },
    { word: "例" },
    { word: "練習" },
    { word: "時間" },
    { word: "人" },
    { word: "世界" },
    { word: "今日" },
  ],
  zh: [
    { word: "你好" },
    { word: "谢谢" },
    { word: "请" },
    { word: "是" },
    { word: "不" },
    { word: "成功" },
    { word: "学习" },
    { word: "语言" },
    { word: "意思" },
    { word: "例子" },
    { word: "练习" },
    { word: "时间" },
    { word: "人" },
    { word: "世界" },
    { word: "今天" },
  ],
  ko: [
    { word: "안녕하세요" },
    { word: "감사합니다" },
    { word: "부탁합니다" },
    { word: "네" },
    { word: "아니요" },
    { word: "성공" },
    { word: "배우다" },
    { word: "언어" },
    { word: "의미" },
    { word: "예시" },
    { word: "연습" },
    { word: "시간" },
    { word: "사람" },
    { word: "세계" },
    { word: "오늘" },
  ],
  ar: [
    { word: "مرحبا" },
    { word: "شكرا" },
    { word: "من فضلك" },
    { word: "نعم" },
    { word: "لا" },
    { word: "نجاح" },
    { word: "تعلم" },
    { word: "لغة" },
    { word: "معنى" },
    { word: "مثال" },
    { word: "ممارسة" },
    { word: "وقت" },
    { word: "ناس" },
    { word: "عالم" },
    { word: "اليوم" },
  ],
  ru: [
    { word: "привет" },
    { word: "спасибо" },
    { word: "пожалуйста" },
    { word: "да" },
    { word: "нет" },
    { word: "успех" },
    { word: "учиться" },
    { word: "язык" },
    { word: "значение" },
    { word: "пример" },
    { word: "практика" },
    { word: "время" },
    { word: "люди" },
    { word: "мир" },
    { word: "сегодня" },
  ],
};

// Pair-specific lists. Keep equal length across known pairs (15 items).
// If a pair isn't present, the UI will fall back to POPULAR_WORDS_BY_SOURCE[from] (or EN).
export const POPULAR_WORDS_DATA: Partial<Record<PopularWordsPairKey, PopularWordsEntry[]>> = {
  "en-tr": POPULAR_WORDS_BY_SOURCE.en,
  "tr-en": POPULAR_WORDS_BY_SOURCE.tr,
  "en-es": POPULAR_WORDS_BY_SOURCE.en,
  "es-en": POPULAR_WORDS_BY_SOURCE.es,
  "en-fr": POPULAR_WORDS_BY_SOURCE.en,
  "fr-en": POPULAR_WORDS_BY_SOURCE.fr,
  "en-pt": POPULAR_WORDS_BY_SOURCE.en,
  "pt-en": POPULAR_WORDS_BY_SOURCE.pt,
  "en-it": POPULAR_WORDS_BY_SOURCE.en,
  "it-en": POPULAR_WORDS_BY_SOURCE.it,
  "ja-en": POPULAR_WORDS_BY_SOURCE.ja,
  "zh-en": POPULAR_WORDS_BY_SOURCE.zh,
  "ko-en": POPULAR_WORDS_BY_SOURCE.ko,
  "ar-en": POPULAR_WORDS_BY_SOURCE.ar,
  "ru-en": POPULAR_WORDS_BY_SOURCE.ru,
};

export function getPopularWordsForPair(params: {
  from: string;
  to: string;
}): PopularWordsEntry[] {
  const from = params.from.trim().toLowerCase();
  const to = params.to.trim().toLowerCase();
  const pairKey = `${from}-${to}` as PopularWordsPairKey;

  const direct = POPULAR_WORDS_DATA[pairKey];
  if (direct && direct.length > 0) return direct;

  // Prefer per-source list (equal-sized, editorial).
  if ((POPULAR_WORDS_BY_SOURCE as Record<string, PopularWordsEntry[]>)[from]) {
    return (POPULAR_WORDS_BY_SOURCE as Record<string, PopularWordsEntry[]>)[from]!;
  }

  // Safe default for rare pairs.
  return POPULAR_WORDS_BY_SOURCE.en;
}

