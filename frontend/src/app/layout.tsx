import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import { AppShell } from "@/components/AppShell";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

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
      <body
        className={`${plusJakarta.variable} ${geistMono.variable} min-h-screen overflow-x-clip antialiased text-slate-900`}
      >
        <div className="min-h-screen bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(99,102,241,0.22),transparent_55%),radial-gradient(900px_circle_at_80%_0%,rgba(56,189,248,0.18),transparent_55%),radial-gradient(900px_circle_at_50%_90%,rgba(148,163,184,0.18),transparent_60%),linear-gradient(to_bottom,rgba(248,250,252,1),rgba(241,245,249,1))]">
          <AppShell>{children}</AppShell>
        </div>
      </body>
    </html>
  );
}
