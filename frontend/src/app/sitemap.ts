import type { MetadataRoute } from "next";
import { SUPPORTED_LANGUAGES } from "@/lib/i18n";
import { POPULAR_WORDS_BY_SOURCE } from "@/lib/popular-words";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL;
  const now = new Date();

  const dictionaryUrls: MetadataRoute.Sitemap = [];
  for (const from of SUPPORTED_LANGUAGES) {
    const words = POPULAR_WORDS_BY_SOURCE[from] ?? POPULAR_WORDS_BY_SOURCE.en;
    for (const to of SUPPORTED_LANGUAGES) {
      if (to === from) continue;
      for (const entry of words) {
        dictionaryUrls.push({
          url: `${base}/dictionary/${from}/${to}/${encodeURIComponent(entry.word)}`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.7,
        });
      }
    }
  }

  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${base}/about`,
      lastModified: now,
      priority: 0.6,
    },
    {
      url: `${base}/contact`,
      lastModified: now,
      priority: 0.6,
    },
    {
      url: `${base}/privacy-policy`,
      lastModified: now,
      priority: 0.5,
    },
    {
      url: `${base}/terms-of-service`,
      lastModified: now,
      priority: 0.5,
    },
    ...dictionaryUrls,
  ];
}
