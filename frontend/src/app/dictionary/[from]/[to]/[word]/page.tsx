import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { DictionaryEntryExtras } from "@/components/DictionaryEntryExtras";

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

async function getEntry(params: Params): Promise<DictionaryEntryResponse | null> {
  const api = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
  const word = decodeURIComponent(params.word);
  const cookieStore = await cookies();
  const uiLangCookie = cookieStore.get("ui_lang")?.value ?? "en";
  const uiLang = uiLangCookie.split("-")[0] || "en";
  const q = new URLSearchParams({
    from: params.from,
    to: params.to,
    word,
    uiLang,
    difficulty: "B1",
  });

  const res = await fetch(`${api}/api/translate?${q.toString()}`, {
    // Cache SSR responses for better LCP; backend also caches generation.
    next: { revalidate: 60 * 60 * 24 * 7 },
  });
  if (!res.ok) return null;
  return (await res.json()) as DictionaryEntryResponse;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const word = decodeURIComponent(resolvedParams.word);
  const title = `${word} (${resolvedParams.from}→${resolvedParams.to})`;
  const description = `Definition, examples, and AI explanation for "${word}" from ${resolvedParams.from} to ${resolvedParams.to}.`;
  const publishedAt = "2026-01-01T00:00:00.000Z";
  const modifiedAt = new Date().toISOString();

  return {
    title,
    description,
    keywords: [word, "dictionary", "meaning", "examples", `${resolvedParams.from} to ${resolvedParams.to}`],
    alternates: {
      canonical: `/dictionary/${resolvedParams.from}/${resolvedParams.to}/${resolvedParams.word}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://ai-dictionary.com/dictionary/${resolvedParams.from}/${resolvedParams.to}/${resolvedParams.word}`,
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function DictionaryEntryPage({ params }: PageProps) {
  const resolvedParams = await params;
  const data = await getEntry(resolvedParams);
  if (!data) notFound();

  const word = decodeURIComponent(resolvedParams.word);
  const synonyms = Array.isArray(data.synonyms) ? data.synonyms : [];
  const antonyms = Array.isArray(data.antonyms) ? data.antonyms : [];
  const usageNote = typeof data.usage_note === "string" ? data.usage_note.trim() : "";
  const entryUrl = `https://ai-dictionary.com/dictionary/${resolvedParams.from}/${resolvedParams.to}/${resolvedParams.word}`;
  const publishedAt = "2026-01-01T00:00:00.000Z";
  const modifiedAt = new Date().toISOString();
  const firstMeaning = data.meanings[0] ?? "Meaning not available.";
  const firstExampleOriginal = data.examples[0]?.original ?? "Example not available.";
  const firstExampleTranslated = data.examples[0]?.translated ?? "Translation not available.";
  const firstTransliteration = data.examples.find((e) => e.transliteration?.trim())?.transliteration ?? undefined;
  const clippedExplanation = data.ai_explanation.replace(/^\s*(This word|It)\s+/i, "").trim();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DefinedTerm",
        "@id": `${entryUrl}#term`,
        name: word,
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          name: "AI Dictionary",
          url: "https://ai-dictionary.com",
        },
        description: clippedExplanation,
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
        mainEntity: [
          {
            "@type": "Question",
            name: `What is the meaning of ${word}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: firstMeaning,
            },
          },
          {
            "@type": "Question",
            name: `Can you give an example sentence for ${word}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `${firstExampleOriginal} - ${firstExampleTranslated}`,
            },
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": entryUrl,
        url: entryUrl,
        name: `${word} (${resolvedParams.from}→${resolvedParams.to})`,
        datePublished: publishedAt,
        dateModified: modifiedAt,
      },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">{word}</h1>
        <p className="mt-2 text-sm text-neutral-600">
          {resolvedParams.from.toUpperCase()} → {resolvedParams.to.toUpperCase()}
        </p>
      </header>

      <section className="space-y-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-neutral-700">
            What does {word} mean in {resolvedParams.to.toUpperCase()}?
          </h2>
          {data.meanings.length > 0 ? (
            <ul className="mt-2 list-inside list-disc text-neutral-800">
              {data.meanings.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-neutral-600">No meanings available for this entry.</p>
          )}
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-wide text-neutral-700">
            What is {word}?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-800">
            <strong>{word}</strong> {clippedExplanation}
          </p>
          <DictionaryEntryExtras synonyms={synonyms} antonyms={antonyms} usageNote={usageNote} />
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-wide text-neutral-700">
            How to use {word} in a sentence?
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-neutral-800">
            {data.examples.map((item, i) => (
              <li key={`${i}-${item.original.slice(0, 24)}`} className="mb-4">
                <p className="font-medium text-neutral-900">
                  {item.original}
                  {item.transliteration?.trim() ? (
                    <span className="ml-2 text-sm italic font-normal text-neutral-500">
                      ({item.transliteration})
                    </span>
                  ) : null}
                </p>
                <p className="text-sm italic text-gray-600">{item.translated}</p>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-wide text-neutral-700">
            What is the CEFR level of {word}?
          </h2>
          <p className="mt-2 text-sm text-neutral-700">
            Example sentences for this page are generated at CEFR <strong>B1</strong> level by default.
          </p>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
