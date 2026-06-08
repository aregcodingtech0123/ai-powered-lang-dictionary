import type { Metadata } from "next";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "./site";

const OG_LOCALES = [
  "en_US",
  "tr_TR",
  "pt_BR",
  "fr_FR",
  "es_ES",
  "ja_JP",
  "zh_CN",
  "ko_KR",
  "ar_SA",
  "ru_RU",
  "it_IT",
] as const;

export function ogImages(alt = SITE_NAME) {
  return [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt }];
}

export function createPageMetadata(opts: {
  title: string;
  description?: string;
  path: string;
  ogType?: "website" | "article";
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
}): Metadata {
  const description = opts.description ?? DEFAULT_DESCRIPTION;
  const canonicalPath = opts.path.startsWith("/") ? opts.path : `/${opts.path}`;
  const url = `${SITE_URL}${canonicalPath}`;

  return {
    title: opts.title,
    description,
    keywords: opts.keywords,
    alternates: { canonical: canonicalPath },
    robots: { index: true, follow: true },
    openGraph: {
      title: opts.title,
      description,
      url,
      type: opts.ogType ?? "website",
      siteName: SITE_NAME,
      locale: "en_US",
      alternateLocale: [...OG_LOCALES],
      images: ogImages(),
      ...(opts.publishedTime ? { publishedTime: opts.publishedTime } : {}),
      ...(opts.modifiedTime ? { modifiedTime: opts.modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — AI Multilingual Dictionary & Vocabulary Guide`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "dictionary",
    "translation",
    "language learning",
    "CEFR",
    "romanization",
    "AI dictionary",
    "VocaBeacon",
    "vocabulary",
    "multilingual dictionary",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/vocabeacon_icon.webp", type: "image/webp" }],
    shortcut: "/vocabeacon_icon.webp",
    apple: "/vocabeacon_icon.webp",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "en_US",
    alternateLocale: [...OG_LOCALES],
    images: ogImages(),
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};
