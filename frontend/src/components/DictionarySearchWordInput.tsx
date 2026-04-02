"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";

export type DictionarySearchWordInputHandle = {
  getValue: () => string;
  setValue: (value: string) => void;
  clear: () => void;
  focus: () => void;
};

type Props = {
  wordLabel: string;
  wordPlaceholder: string;
  hasSearchResult: boolean;
  onSubmit: () => void;
  onClear: () => void;
  /** Grid cell classes (spans, min-w-0) — parent controls layout */
  className?: string;
};

export const DictionarySearchWordInput = forwardRef<DictionarySearchWordInputHandle, Props>(
  function DictionarySearchWordInput(
    { wordLabel, wordPlaceholder, hasSearchResult, onSubmit, onClear, className = "" },
    ref
  ) {
    const [localWord, setLocalWord] = useState("");
    const inputRef = useRef<HTMLInputElement | null>(null);

    useImperativeHandle(
      ref,
      () => ({
        getValue: () => localWord,
        setValue: (value: string) => setLocalWord(value),
        clear: () => setLocalWord(""),
        focus: () => inputRef.current?.focus(),
      }),
      [localWord]
    );

    const showClear = localWord.trim().length > 0 || hasSearchResult;

    return (
      <div className={`flex min-w-0 flex-col gap-1 ${className}`}>
        <label
          htmlFor="word"
          className="block min-h-[1.25rem] text-sm font-semibold leading-tight text-slate-700"
        >
          {wordLabel}
        </label>
        <div className="relative min-w-0">
          <input
            id="word"
            type="text"
            value={localWord}
            ref={inputRef}
            onChange={(e) => setLocalWord(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSubmit();
            }}
            placeholder={wordPlaceholder}
            className="box-border min-h-11 w-full min-w-0 rounded-2xl border border-slate-200 bg-white py-3 pl-4 pr-14 text-base text-slate-900 shadow-sm outline-none placeholder:text-slate-400 transition-all duration-300 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-200/60 md:bg-white/70 md:backdrop-blur-md"
          />
          {showClear ? (
            <button
              type="button"
              onClick={onClear}
              className="absolute right-1.5 top-1/2 inline-flex size-11 min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-xl text-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              aria-label="Clear"
              title="Clear"
            >
              ×
            </button>
          ) : null}
        </div>
      </div>
    );
  }
);
