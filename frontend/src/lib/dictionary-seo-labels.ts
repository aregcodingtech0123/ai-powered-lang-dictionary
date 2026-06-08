import type { UiLanguage } from "./i18n";

export type DictionarySeoLabels = {
  meaningInTarget: (word: string, toLang: string) => string;
  whatIs: (word: string) => string;
  howToUse: (word: string) => string;
  cefrLevel: (word: string) => string;
  directAnswer: (word: string, meaning: string) => string;
  noMeanings: string;
  cefrDefault: string;
};

const LABELS: Record<UiLanguage, DictionarySeoLabels> = {
  en: {
    meaningInTarget: (word, to) => `What does ${word} mean in ${to}?`,
    whatIs: (word) => `What is ${word}?`,
    howToUse: (word) => `How to use ${word} in a sentence?`,
    cefrLevel: (word) => `What is the CEFR level of ${word}?`,
    directAnswer: (word, meaning) => `${word} means: ${meaning}`,
    noMeanings: "No meanings available for this entry.",
    cefrDefault: "Example sentences for this page are generated at CEFR B1 level by default.",
  },
  tr: {
    meaningInTarget: (word, to) => `"${word}" ${to} dilinde ne anlama gelir?`,
    whatIs: (word) => `"${word}" nedir?`,
    howToUse: (word) => `"${word}" bir cümlede nasıl kullanılır?`,
    cefrLevel: (word) => `"${word}" için CEFR seviyesi nedir?`,
    directAnswer: (word, meaning) => `${word} anlamı: ${meaning}`,
    noMeanings: "Bu girdi için anlam bulunamadı.",
    cefrDefault: "Bu sayfadaki örnek cümleler varsayılan olarak CEFR B1 seviyesinde üretilir.",
  },
  pt: {
    meaningInTarget: (word, to) => `O que significa ${word} em ${to}?`,
    whatIs: (word) => `O que é ${word}?`,
    howToUse: (word) => `Como usar ${word} numa frase?`,
    cefrLevel: (word) => `Qual é o nível CEFR de ${word}?`,
    directAnswer: (word, meaning) => `${word} significa: ${meaning}`,
    noMeanings: "Nenhum significado disponível para esta entrada.",
    cefrDefault: "As frases de exemplo desta página são geradas no nível CEFR B1 por padrão.",
  },
  fr: {
    meaningInTarget: (word, to) => `Que signifie ${word} en ${to} ?`,
    whatIs: (word) => `Qu'est-ce que ${word} ?`,
    howToUse: (word) => `Comment utiliser ${word} dans une phrase ?`,
    cefrLevel: (word) => `Quel est le niveau CEFR de ${word} ?`,
    directAnswer: (word, meaning) => `${word} signifie : ${meaning}`,
    noMeanings: "Aucune signification disponible pour cette entrée.",
    cefrDefault: "Les exemples de cette page sont générés au niveau CEFR B1 par défaut.",
  },
  es: {
    meaningInTarget: (word, to) => `¿Qué significa ${word} en ${to}?`,
    whatIs: (word) => `¿Qué es ${word}?`,
    howToUse: (word) => `¿Cómo usar ${word} en una oración?`,
    cefrLevel: (word) => `¿Cuál es el nivel MCER de ${word}?`,
    directAnswer: (word, meaning) => `${word} significa: ${meaning}`,
    noMeanings: "No hay significados disponibles para esta entrada.",
    cefrDefault: "Las oraciones de ejemplo de esta página se generan en nivel MCER B1 por defecto.",
  },
  ja: {
    meaningInTarget: (word, to) => `${word} は ${to} でどういう意味ですか？`,
    whatIs: (word) => `${word} とは何ですか？`,
    howToUse: (word) => `${word} を例文でどう使いますか？`,
    cefrLevel: (word) => `${word} の CEFR レベルは？`,
    directAnswer: (word, meaning) => `${word} の意味：${meaning}`,
    noMeanings: "この項目の意味はありません。",
    cefrDefault: "このページの例文は既定で CEFR B1 レベルで生成されます。",
  },
  zh: {
    meaningInTarget: (word, to) => `${word} 在 ${to} 中是什么意思？`,
    whatIs: (word) => `${word} 是什么？`,
    howToUse: (word) => `如何在句子中使用 ${word}？`,
    cefrLevel: (word) => `${word} 的 CEFR 等级是什么？`,
    directAnswer: (word, meaning) => `${word} 的含义：${meaning}`,
    noMeanings: "此词条暂无释义。",
    cefrDefault: "本页例句默认按 CEFR B1 等级生成。",
  },
  ko: {
    meaningInTarget: (word, to) => `${word}는 ${to}에서 무슨 뜻인가요?`,
    whatIs: (word) => `${word}란 무엇인가요?`,
    howToUse: (word) => `${word}를 문장에서 어떻게 쓰나요?`,
    cefrLevel: (word) => `${word}의 CEFR 수준은?`,
    directAnswer: (word, meaning) => `${word}의 뜻: ${meaning}`,
    noMeanings: "이 항목에 대한 의미가 없습니다.",
    cefrDefault: "이 페이지의 예문은 기본적으로 CEFR B1 수준으로 생성됩니다.",
  },
  ar: {
    meaningInTarget: (word, to) => `ماذا يعني ${word} بال${to}؟`,
    whatIs: (word) => `ما هو ${word}؟`,
    howToUse: (word) => `كيف تُستخدم ${word} في جملة؟`,
    cefrLevel: (word) => `ما مستوى CEFR لـ ${word}؟`,
    directAnswer: (word, meaning) => `معنى ${word}: ${meaning}`,
    noMeanings: "لا توجد معانٍ متاحة لهذا المدخل.",
    cefrDefault: "جمل الأمثلة في هذه الصفحة تُولَّد افتراضياً بمستوى CEFR B1.",
  },
  ru: {
    meaningInTarget: (word, to) => `Что означает ${word} на ${to}?`,
    whatIs: (word) => `Что такое ${word}?`,
    howToUse: (word) => `Как использовать ${word} в предложении?`,
    cefrLevel: (word) => `Какой уровень CEFR у ${word}?`,
    directAnswer: (word, meaning) => `${word} означает: ${meaning}`,
    noMeanings: "Для этой записи нет значений.",
    cefrDefault: "Примеры на этой странице по умолчанию генерируются на уровне CEFR B1.",
  },
  it: {
    meaningInTarget: (word, to) => `Cosa significa ${word} in ${to}?`,
    whatIs: (word) => `Cos'è ${word}?`,
    howToUse: (word) => `Come usare ${word} in una frase?`,
    cefrLevel: (word) => `Qual è il livello QCER di ${word}?`,
    directAnswer: (word, meaning) => `${word} significa: ${meaning}`,
    noMeanings: "Nessun significato disponibile per questa voce.",
    cefrDefault: "Le frasi di esempio di questa pagina sono generate al livello QCER B1 per impostazione predefinita.",
  },
};

export function getDictionarySeoLabels(lang: string): DictionarySeoLabels {
  const key = lang as UiLanguage;
  return LABELS[key] ?? LABELS.en;
}
