"use client";

import { useState } from "react";
import Link from "next/link";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useUiLanguage } from "./UiLanguageProvider";

function BrandLogo() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-gradient shadow-card"
    >
      <svg viewBox="0 0 24 24" className="size-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    </span>
  );
}

export function Navbar() {
  const { translate } = useUiLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-40 border-b border-brand-border/80 bg-brand-card/90 shadow-nav backdrop-blur-md"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="mx-auto flex min-h-[3.75rem] w-full max-w-6xl items-center justify-between gap-3 px-4 sm:min-h-16 sm:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-8">
          <Link
            href="/"
            className="group inline-flex min-h-11 min-w-0 max-w-[min(100%,14rem)] shrink items-center gap-2.5 rounded-xl py-2 transition-opacity hover:opacity-90"
          >
            <BrandLogo />
            <span className="truncate text-sm font-bold tracking-tight text-brand-gradient sm:text-base">
              {translate("navTitle")}
            </span>
          </Link>
          <nav className="hidden items-center gap-0.5 md:flex">
            <Link href="/about" className="nav-link">
              {translate("navAbout")}
            </Link>
            <Link href="/contact" className="nav-link">
              {translate("navContact")}
            </Link>
            <Link href="/privacy-policy" className="nav-link">
              {translate("footerPrivacy")}
            </Link>
            <Link href="/terms-of-service" className="nav-link">
              {translate("footerTerms")}
            </Link>
          </nav>

          <button
            type="button"
            className="btn-secondary ml-auto size-11 shrink-0 !min-h-11 !px-0 md:hidden"
            aria-label="Open menu"
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span aria-hidden="true" className="text-lg leading-none">
              {menuOpen ? "×" : "≡"}
            </span>
          </button>
        </div>
        <LanguageSwitcher />
      </div>

      {menuOpen ? (
        <nav
          id="mobile-menu"
          className="border-t border-brand-border bg-brand-card px-4 py-2 md:hidden"
        >
          <div className="flex flex-col gap-0.5 pb-[env(safe-area-inset-bottom,0px)]">
            <Link href="/about" className="nav-link" onClick={() => setMenuOpen(false)}>
              {translate("navAbout")}
            </Link>
            <Link href="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>
              {translate("navContact")}
            </Link>
            <Link href="/privacy-policy" className="nav-link" onClick={() => setMenuOpen(false)}>
              {translate("footerPrivacy")}
            </Link>
            <Link href="/terms-of-service" className="nav-link" onClick={() => setMenuOpen(false)}>
              {translate("footerTerms")}
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
