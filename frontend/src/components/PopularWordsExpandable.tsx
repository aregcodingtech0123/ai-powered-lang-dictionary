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
        className="group flex min-h-[44px] w-full items-center justify-between rounded-3xl border border-slate-200/70 bg-white/95 px-4 py-3 text-left shadow-md transition-[box-shadow,background-color] duration-300 hover:bg-white md:bg-white/60 md:shadow-xl md:backdrop-blur-md"
        aria-expanded={open}
        aria-controls="popular-words-panel"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="min-w-0">
          <p className={`text-sm font-semibold text-slate-900 sm:text-base ${isRtl ? "text-right" : ""}`}>
            {translate("popularWordsTitle")}
          </p>
          <p className={`mt-0.5 text-xs text-slate-600 sm:text-sm ${isRtl ? "text-right" : ""}`}>
            {translate("popularWordsSubtitle")}
          </p>
        </div>
        <span
          aria-hidden="true"
          className={`ml-3 inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-transform duration-300 ease-out will-change-transform md:bg-white/70 md:backdrop-blur-md ${
            open ? "rotate-180" : "rotate-0"
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
          <div className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white/95 shadow-md md:bg-white/60 md:shadow-xl md:backdrop-blur-md">
            <div className="p-3 sm:p-4">
              <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 lg:grid-cols-6">
                {items.map((e) => {
                  const href = `/dictionary/${from}/${to}/${encodeURIComponent(e.word)}`;
                  return (
                    <Link
                      key={`${from}-${to}-${e.word}`}
                      href={href}
                      className="flex min-h-[44px] items-center justify-center rounded-full bg-indigo-50 px-3 py-2 text-center text-xs font-semibold leading-tight text-indigo-800 ring-1 ring-indigo-100 transition-[transform,background-color,box-shadow] duration-200 ease-out active:bg-indigo-100 sm:text-sm md:hover:-translate-y-0.5 md:hover:bg-indigo-100 md:hover:shadow-md"
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
