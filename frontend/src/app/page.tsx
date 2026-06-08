import type { Metadata } from "next";
import { DictionarySearch } from "@/components/DictionarySearch";
import { JsonLdScript } from "@/components/JsonLdScript";
import contentEn from "@/locales/content/en";
import { buildFaqPageGraph } from "@/lib/json-ld";
import { createPageMetadata } from "@/lib/metadata";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: `${SITE_NAME} — AI Multilingual Dictionary & Vocabulary Guide`,
  description: `${SITE_TAGLINE} Look up words in any language pair. Meanings, AI explanations, CEFR examples, synonyms, and usage notes.`,
  path: "/",
  keywords: [
    "multilingual dictionary",
    "AI dictionary",
    "vocabulary",
    "CEFR examples",
    "language learning",
    "word meaning",
  ],
});

export default function Home() {
  return (
    <>
      <JsonLdScript data={buildFaqPageGraph(contentEn.faq.items)} />
      <main className="font-sans">
        <DictionarySearch />
      </main>
    </>
  );
}
