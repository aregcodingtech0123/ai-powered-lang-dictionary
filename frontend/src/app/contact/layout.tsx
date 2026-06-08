import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: `Contact ${SITE_NAME}`,
  description: `Contact the ${SITE_NAME} team for support, feedback, or partnership inquiries about our AI multilingual dictionary.`,
  path: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
