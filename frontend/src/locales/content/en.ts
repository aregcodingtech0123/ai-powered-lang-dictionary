import type { ContentI18n } from "../types";
const content: ContentI18n = {
    howItWorks: {
      title: "How it works",
      paragraphs: [
        "VocaBeacon turns a single word into a learning-friendly entry: concise meanings in your target language, a short explanation, and example sentences that show real usage. The goal is to help you move from “I recognized the word” to “I can use the word correctly”.",
        "Example sentences follow CEFR guidance (A1–C2). Lower levels use short, high‑frequency vocabulary and simple grammar; higher levels include more nuanced structures, idioms, and academic phrasing. This helps you practice vocabulary at the right difficulty.",
        "Depending on the language pair, the system can combine local dictionary data with AI generation. Regardless of the source, entries are formatted as text-first reference pages for both learners and search engines.",
      ],
    },
    faq: {
      title: "FAQ",
      items: [
        {
          question: "What are CEFR levels (A1–C2)?",
          answer:
            "CEFR is a widely used framework for language proficiency, from beginner (A1) to mastery (C2). In VocaBeacon, CEFR levels control the complexity and vocabulary of example sentences.",
        },
        {
          question: "Is the AI explanation always correct?",
          answer:
            "AI explanations are designed to be clear and helpful, but they can be imperfect. Use them as a learning aid and verify with additional sources for critical use cases.",
        },
        {
          question: "How should I study a new word effectively?",
          answer:
            "Start with meanings, then read the explanation, then copy one example sentence and rewrite it with your own details. Repeating a word in varied contexts is one of the fastest ways to build active vocabulary.",
        },
      ],
    },
  };
export default content;
