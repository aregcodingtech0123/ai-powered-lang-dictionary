"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { getPopularWordsForPair } from "@/lib/popular-words";
import { useUiLanguage } from "./UiLanguageProvider";

export function PopularWordsExpandable(props: {
  className?: string;
  from: string;
  to: string;
  /** Pass `uiLanguage` from the parent so `React.memo` wrappers invalidate on locale change */
  localeKey?: string;
  onSelect?: (params: { word: string; from: string; to: string }) => void;
}) {
  const { className = "", onSelect, from, to, localeKey: _localeKey } = props;
  const [open, setOpen] = useState(false);
  const { uiLanguage, translate } = useUiLanguage();
  const isRtl = uiLanguage === "ar";

  const items = useMemo(() => getPopularWordsForPair({ from, to }), [from, to]);

  return (
    <div className={className} dir={isRtl ? "rtl" : undefined}>
      <button
        type="button"
        className="card-surface-interactive group flex min-h-[52px] w-full items-center justify-between rounded-2xl px-5 py-4 text-left"
        aria-expanded={open}
        aria-controls="popular-words-panel"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="min-w-0">
          <p className={`text-sm font-semibold text-brand-text sm:text-base ${isRtl ? "text-right" : ""}`}>
            {translate("popularWordsTitle")}
          </p>
          <p className={`mt-1 text-xs text-brand-text-secondary sm:text-sm ${isRtl ? "text-right" : ""}`}>
            {translate("popularWordsSubtitle")}
          </p>
        </div>
        <span
          aria-hidden="true"
          className={`ml-3 inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-brand-border bg-brand-card text-brand-text-secondary shadow-sm transition-all duration-200 group-hover:border-indigo-200 group-hover:text-brand-primary ${
            open ? "rotate-180 bg-indigo-50 text-brand-primary" : "rotate-0"
          }`}
        >
          ▾
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          open ? "grid-rows-[1fr] pt-3" : "grid-rows-[0fr]"
        }`}
      >
        <div id="popular-words-panel" className="min-h-0 overflow-hidden">
          <div className="card-surface overflow-hidden rounded-2xl">
            <div className="p-4 sm:p-5">
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-4 lg:grid-cols-6">
                {items.map((e) => {
                  const href = `/dictionary/${from}/${to}/${encodeURIComponent(e.word)}`;
                  return (
                    <Link
                      key={`${from}-${to}-${e.word}`}
                      href={href}
                      className="chip-indigo flex min-h-[44px] items-center justify-center !rounded-input px-3 py-2.5 text-center !text-xs leading-tight active:scale-[0.98] sm:!text-sm md:hover:-translate-y-0.5 md:hover:shadow-card"
                      onClick={(evt) => {
                        if (!onSelect) return;
                        evt.preventDefault();
                        onSelect({ word: e.word, from, to });
                      }}
                    >
                      {e.label ?? e.word}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
