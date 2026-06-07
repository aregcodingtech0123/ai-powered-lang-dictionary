import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import "./globals.css";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-dictionary.com"),
  title: {
    default: "AI Dictionary",
    template: "%s | AI Dictionary",
  },
  description:
    "Multilingual AI dictionary with meanings, CEFR-based examples, transliteration, and translations.",
  applicationName: "AI Dictionary",
  keywords: [
    "dictionary",
    "translation",
    "language learning",
    "CEFR",
    "romanization",
    "AI dictionary",
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://ai-dictionary.com",
    title: "AI Dictionary",
    description:
      "Multilingual AI dictionary with meanings, CEFR examples, transliteration, and translations.",
    siteName: "AI Dictionary",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Dictionary",
    description:
      "Multilingual AI dictionary with meanings, CEFR examples, transliteration, and translations.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-clip">
      <body className="min-h-screen overflow-x-clip bg-brand-bg font-sans antialiased text-brand-text">
        <div className="min-h-screen bg-page-gradient bg-brand-bg">
          <AppShell>{children}</AppShell>
        </div>
      </body>
    </html>
  );
}
