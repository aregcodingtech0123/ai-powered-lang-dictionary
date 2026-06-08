export const SITE_NAME = "VocaBeacon";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vocabeacon.com";
export const SITE_TAGLINE = "Your beacon for every word.";
export const DEFAULT_DESCRIPTION =
  "Look up words in any language. Get meanings, AI explanations, CEFR-based examples, synonyms, and usage notes.";
export const SITE_DESCRIPTION = DEFAULT_DESCRIPTION;
/** Add a 1200×630 PNG at public/og-image.png for best social previews; SVG works as interim fallback. */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.svg`;
