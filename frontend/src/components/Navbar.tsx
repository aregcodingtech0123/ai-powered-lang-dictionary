"use client";

import { useState } from "react";
import Link from "next/link";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useUiLanguage } from "./UiLanguageProvider";

export function Navbar() {
  const { translate } = useUiLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 supports-[backdrop-filter]:md:bg-white/60 md:backdrop-blur-md"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="mx-auto flex min-h-[3.5rem] w-full max-w-6xl items-center justify-between gap-3 px-3 sm:min-h-16 sm:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-6">
          <Link
            href="/"
            className="inline-flex min-h-11 min-w-0 max-w-[min(100%,12rem)] shrink items-center rounded-xl py-2 text-sm font-semibold tracking-tight text-slate-900 sm:text-base"
          >
            {translate("navTitle")}
          </Link>
          <nav className="hidden items-center gap-1 text-sm text-slate-600 md:flex">
            <Link
              href="/about"
              className="inline-flex min-h-11 items-center rounded-xl px-3 py-2 transition-colors hover:bg-slate-50 hover:text-slate-900"
            >
              {translate("navAbout")}
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center rounded-xl px-3 py-2 transition-colors hover:bg-slate-50 hover:text-slate-900"
            >
              {translate("navContact")}
            </Link>
            <Link
              href="/privacy-policy"
              className="inline-flex min-h-11 items-center rounded-xl px-3 py-2 transition-colors hover:bg-slate-50 hover:text-slate-900"
            >
              {translate("footerPrivacy")}
            </Link>
            <Link
              href="/terms-of-service"
              className="inline-flex min-h-11 items-center rounded-xl px-3 py-2 transition-colors hover:bg-slate-50 hover:text-slate-900"
            >
              {translate("footerTerms")}
            </Link>
          </nav>

          <button
            type="button"
            className="ml-auto inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 md:hidden"
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
          className="border-t border-slate-200 bg-white px-3 py-2 md:hidden"
        >
          <div className="flex flex-col gap-1 pb-[env(safe-area-inset-bottom,0px)]">
            <Link
              href="/about"
              className="inline-flex min-h-11 items-center rounded-xl px-3 py-2 text-sm text-slate-800 transition hover:bg-slate-50"
              onClick={() => setMenuOpen(false)}
            >
              {translate("navAbout")}
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center rounded-xl px-3 py-2 text-sm text-slate-800 transition hover:bg-slate-50"
              onClick={() => setMenuOpen(false)}
            >
              {translate("navContact")}
            </Link>
            <Link
              href="/privacy-policy"
              className="inline-flex min-h-11 items-center rounded-xl px-3 py-2 text-sm text-slate-800 transition hover:bg-slate-50"
              onClick={() => setMenuOpen(false)}
            >
              {translate("footerPrivacy")}
            </Link>
            <Link
              href="/terms-of-service"
              className="inline-flex min-h-11 items-center rounded-xl px-3 py-2 text-sm text-slate-800 transition hover:bg-slate-50"
              onClick={() => setMenuOpen(false)}
            >
              {translate("footerTerms")}
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
