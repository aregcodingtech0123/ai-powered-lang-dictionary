import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { DictionaryEntryExtras } from "@/components/DictionaryEntryExtras";
import { JsonLdScript } from "@/components/JsonLdScript";
import { getServerApiBaseUrl } from "@/lib/api-base";
import { getDictionarySeoLabels } from "@/lib/dictionary-seo-labels";
import { buildBreadcrumbListGraph } from "@/lib/json-ld";
import { createPageMetadata, ogImages } from "@/lib/metadata";
import { formatLangName, type UiLanguage } from "@/lib/i18n";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type Params = { from: string; to: string; word: string };
type PageProps = { params: Promise<Params> };

type DictionaryEntryResponse = {
  word: string;
  meanings: string[];
  ai_explanation: string;
  usage_note?: string;
  synonyms?: string[];
  antonyms?: string[];
  examples: Array<{
    original: string;
    transliteration?: string | null;
    translated: string;
  }>;
};

async function getUiLang(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore.get("ui_lang")?.value?.split("-")[0] || "en";
}

async function getEntry(params: Params): Promise<DictionaryEntryResponse | null> {
  const api = getServerApiBaseUrl();
  const word = decodeURIComponent(params.word);
  const uiLang = await getUiLang();
  const q = new URLSearchParams({
    from: params.from,
    to: params.to,
    word,
    uiLang,
    difficulty: "B1",
  });

  try {
    const res = await fetch(`${api}/api/translate?${q.toString()}`, {
      next: { revalidate: 60 * 60 * 24 * 7 },
    });
    if (!res.ok) return null;
    return (await res.json()) as DictionaryEntryResponse;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const word = decodeURIComponent(resolvedParams.word);
  const data = await getEntry(resolvedParams);
  const firstMeaning = data?.meanings[0];
  const title = `${word} meaning (${resolvedParams.from} → ${resolvedParams.to})`;
  const description = firstMeaning
    ? `${word} (${resolvedParams.from}→${resolvedParams.to}): ${firstMeaning.slice(0, 140)}. AI explanation and CEFR examples on ${SITE_NAME}.`
    : `Look up "${word}" from ${resolvedParams.from} to ${resolvedParams.to}. Meanings, AI explanation, and CEFR examples on ${SITE_NAME}.`;
  const publishedAt = "2026-01-01T00:00:00.000Z";
  const modifiedAt = new Date().toISOString();
  const path = `/dictionary/${resolvedParams.from}/${resolvedParams.to}/${resolvedParams.word}`;

  const base = createPageMetadata({
    title,
    description,
    path,
    ogType: "article",
    keywords: [
      word,
      "dictionary",
      "meaning",
      "translation",
      "examples",
      `${resolvedParams.from} to ${resolvedParams.to}`,
      "CEFR",
      SITE_NAME,
    ],
    publishedTime: publishedAt,
    modifiedTime: modifiedAt,
  });

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      images: ogImages(`${word} — ${SITE_NAME}`),
    },
  };
}

export default async function DictionaryEntryPage({ params }: PageProps) {
  const resolvedParams = await params;
  const data = await getEntry(resolvedParams);
  if (!data) notFound();

  const uiLang = await getUiLang();
  const labels = getDictionarySeoLabels(uiLang);
  const toLangName = formatLangName(resolvedParams.to as UiLanguage);

  const word = decodeURIComponent(resolvedParams.word);
  const synonyms = Array.isArray(data.synonyms) ? data.synonyms : [];
  const antonyms = Array.isArray(data.antonyms) ? data.antonyms : [];
  const usageNote = typeof data.usage_note === "string" ? data.usage_note.trim() : "";
  const entryUrl = `${SITE_URL}/dictionary/${resolvedParams.from}/${resolvedParams.to}/${resolvedParams.word}`;
  const publishedAt = "2026-01-01T00:00:00.000Z";
  const modifiedAt = new Date().toISOString();
  const firstMeaning = data.meanings[0] ?? labels.noMeanings;
  const firstExampleOriginal = data.examples[0]?.original ?? "";
  const firstExampleTranslated = data.examples[0]?.translated ?? "";
  const firstTransliteration = data.examples.find((e) => e.transliteration?.trim())?.transliteration ?? undefined;
  const clippedExplanation = data.ai_explanation.replace(/^\s*(This word|It)\s+/i, "").trim();

  const meaningQuestion = labels.meaningInTarget(word, toLangName);
  const whatIsQuestion = labels.whatIs(word);
  const exampleQuestion = labels.howToUse(word);
  const cefrQuestion = labels.cefrLevel(word);

  const faqEntities = [
    {
      "@type": "Question" as const,
      name: meaningQuestion,
      acceptedAnswer: { "@type": "Answer" as const, text: firstMeaning },
    },
    {
      "@type": "Question" as const,
      name: whatIsQuestion,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: `${word} ${clippedExplanation}`.trim(),
      },
    },
    {
      "@type": "Question" as const,
      name: exampleQuestion,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text:
          firstExampleOriginal && firstExampleTranslated
            ? `${firstExampleOriginal} — ${firstExampleTranslated}`
            : labels.noMeanings,
      },
    },
    {
      "@type": "Question" as const,
      name: cefrQuestion,
      acceptedAnswer: { "@type": "Answer" as const, text: labels.cefrDefault },
    },
  ];

  if (synonyms.length > 0) {
    faqEntities.push({
      "@type": "Question",
      name: `What are synonyms of ${word}?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: synonyms.join(", "),
      },
    });
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DefinedTerm",
        "@id": `${entryUrl}#term`,
        name: word,
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          name: SITE_NAME,
          url: SITE_URL,
        },
        description: clippedExplanation || firstMeaning,
        alternateName: synonyms.length > 0 ? synonyms : undefined,
        termCode: `${resolvedParams.from}-${resolvedParams.to}`,
        phoneticText: firstTransliteration,
        disambiguatingDescription: usageNote || undefined,
        datePublished: publishedAt,
        dateModified: modifiedAt,
        additionalProperty:
          antonyms.length > 0
            ? [
                {
                  "@type": "PropertyValue",
                  name: "antonyms",
                  value: antonyms.join(", "),
                },
              ]
            : undefined,
        subjectOf: {
          "@type": "WebPage",
          "@id": entryUrl,
          name: `${word} (${resolvedParams.from}→${resolvedParams.to})`,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${entryUrl}#faq`,
        mainEntity: faqEntities,
      },
      buildBreadcrumbListGraph(
        [
          { name: SITE_NAME, url: SITE_URL },
          { name: "Dictionary", url: `${SITE_URL}/` },
          {
            name: `${resolvedParams.from.toUpperCase()} → ${resolvedParams.to.toUpperCase()}`,
            url: entryUrl,
          },
          { name: word, url: entryUrl },
        ],
        `${entryUrl}#breadcrumb`
      ),
      {
        "@type": "WebPage",
        "@id": entryUrl,
        url: entryUrl,
        name: `${word} (${resolvedParams.from}→${resolvedParams.to})`,
        description: firstMeaning,
        datePublished: publishedAt,
        dateModified: modifiedAt,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["#dictionary-direct-answer", "h1"],
        },
      },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-10 text-center">
        <span className="chip-neutral mb-3">
          {resolvedParams.from.toUpperCase()} → {resolvedParams.to.toUpperCase()}
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-brand-text sm:text-4xl md:text-5xl">
          <span className="text-brand-gradient">{word}</span>
        </h1>
        {data.meanings.length > 0 ? (
          <p
            id="dictionary-direct-answer"
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-brand-text-secondary sm:text-lg"
          >
            {labels.directAnswer(word, firstMeaning)}
          </p>
        ) : null}
      </header>

      <section className="card-surface space-y-7 rounded-2xl p-6 sm:p-8">
        <div>
          <h2 className="section-label">{meaningQuestion}</h2>
          {data.meanings.length > 0 ? (
            <ul className="mt-3 space-y-2 text-base leading-relaxed text-brand-text">
              {data.meanings.map((m, i) => (
                <li
                  key={m}
                  className="flex gap-3 rounded-input border border-brand-border/60 bg-slate-50/80 px-4 py-3"
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-brand-text-secondary">{labels.noMeanings}</p>
          )}
        </div>

        <div className="rounded-card border border-indigo-100 bg-brand-gradient-subtle p-5 sm:p-6">
          <h2 className="section-label !text-indigo-600">{whatIsQuestion}</h2>
          <p className="mt-3 text-base leading-relaxed text-brand-text">
            <strong className="text-brand-text">{word}</strong> {clippedExplanation}
          </p>
          <DictionaryEntryExtras synonyms={synonyms} antonyms={antonyms} usageNote={usageNote} />
        </div>

        <div>
          <h2 className="section-label">{exampleQuestion}</h2>
          <ol className="mt-4 space-y-3">
            {data.examples.map((item, i) => (
              <li
                key={`${i}-${item.original.slice(0, 24)}`}
                className="rounded-card border border-brand-border bg-brand-card p-4 shadow-sm"
              >
                <p className="font-semibold text-brand-text">
                  <span className="mr-2 inline-flex size-6 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-brand-primary">
                    {i + 1}
                  </span>
                  {item.original}
                  {item.transliteration?.trim() ? (
                    <span className="ml-2 text-sm font-normal italic text-brand-text-secondary">
                      ({item.transliteration})
                    </span>
                  ) : null}
                </p>
                <p className="mt-2 pl-8 text-sm italic text-brand-text-secondary">{item.translated}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-card border border-cyan-100 bg-cyan-50/40 p-5">
          <h2 className="section-label !text-cyan-700">{cefrQuestion}</h2>
          <p className="mt-3 text-sm text-brand-text-secondary">{labels.cefrDefault}</p>
        </div>
      </section>

      <JsonLdScript data={jsonLd} />
    </main>
  );
}
