"use client";

import Link from "next/link";
import { useUiLanguage } from "./UiLanguageProvider";

export function Footer() {
  const { translate } = useUiLanguage();

  return (
    <footer className="border-t border-slate-200/80 bg-white/95 supports-[backdrop-filter]:md:bg-white/50 md:backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-3 py-6 text-sm text-slate-600 sm:px-6 md:flex-row md:items-center md:justify-between">
        <p className="text-center md:text-left">{translate("footerRights")}</p>
        <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 md:justify-end">
          <Link
            href="/about"
            className="inline-flex min-h-11 min-w-[44px] items-center justify-center rounded-xl px-3 py-2 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            {translate("navAbout")}
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-11 min-w-[44px] items-center justify-center rounded-xl px-3 py-2 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            {translate("navContact")}
          </Link>
          <Link
            href="/privacy-policy"
            className="inline-flex min-h-11 min-w-[44px] items-center justify-center rounded-xl px-3 py-2 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            {translate("footerPrivacy")}
          </Link>
          <Link
            href="/terms-of-service"
            className="inline-flex min-h-11 min-w-[44px] items-center justify-center rounded-xl px-3 py-2 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            {translate("footerTerms")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
