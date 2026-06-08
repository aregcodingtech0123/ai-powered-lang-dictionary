import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: `Privacy Policy`,
  description: `Read the ${SITE_NAME} privacy policy. Learn how we collect, use, and protect your information when you use our AI dictionary.`,
  path: "/privacy-policy",
});

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
