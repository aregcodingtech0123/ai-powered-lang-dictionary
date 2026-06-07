"use client";

import Link from "next/link";
import { useUiLanguage } from "./UiLanguageProvider";

export function Footer() {
  const { translate } = useUiLanguage();

  return (
    <footer className="mt-auto border-t border-brand-border bg-brand-card/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-brand-text-secondary sm:px-6 md:flex-row md:items-center md:justify-between">
        <p className="text-center md:text-left">{translate("footerRights")}</p>
        <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 md:justify-end">
          <Link href="/about" className="nav-link min-w-[44px] justify-center">
            {translate("navAbout")}
          </Link>
          <Link href="/contact" className="nav-link min-w-[44px] justify-center">
            {translate("navContact")}
          </Link>
          <Link href="/privacy-policy" className="nav-link min-w-[44px] justify-center">
            {translate("footerPrivacy")}
          </Link>
          <Link href="/terms-of-service" className="nav-link min-w-[44px] justify-center">
            {translate("footerTerms")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
