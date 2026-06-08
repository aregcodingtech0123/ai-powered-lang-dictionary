import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { JsonLdScript } from "@/components/JsonLdScript";
import { buildOrganizationWebSiteGraph } from "@/lib/json-ld";
import { rootMetadata } from "@/lib/metadata";
import "./globals.css";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-clip">
      <body className="min-h-screen overflow-x-clip bg-brand-bg font-sans antialiased text-brand-text">
        <JsonLdScript data={buildOrganizationWebSiteGraph()} />
        <div className="min-h-screen bg-page-gradient bg-brand-bg">
          <AppShell>{children}</AppShell>
        </div>
      </body>
    </html>
  );
}
