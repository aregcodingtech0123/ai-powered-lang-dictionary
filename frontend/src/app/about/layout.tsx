import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: `About ${SITE_NAME}`,
  description: `Learn about ${SITE_NAME} — an AI-powered multilingual dictionary with CEFR-aligned examples, meanings, and usage guidance for language learners.`,
  path: "/about",
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
