"use client";

import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { UiLanguageProvider } from "./UiLanguageProvider";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <UiLanguageProvider>
      <div className="flex min-h-screen flex-col bg-[var(--background)]">
        <Navbar />
        <main className="flex-1 overflow-x-clip">{children}</main>
        <Footer />
      </div>
    </UiLanguageProvider>
  );
}
