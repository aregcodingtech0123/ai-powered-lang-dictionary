import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: `Terms of Service`,
  description: `Read the ${SITE_NAME} terms of service governing your use of our AI-powered multilingual dictionary and learning tools.`,
  path: "/terms-of-service",
});

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
