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
      <div className={`flex min-w-0 flex-col gap-1.5 ${className}`}>
        <label
          htmlFor="word"
          className="block min-h-[1.25rem] text-sm font-semibold leading-tight text-brand-text"
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
            className="input-field !min-h-12 py-3.5 pl-4 pr-14 text-base shadow-sm focus:shadow-search"
          />
          {showClear ? (
            <button
              type="button"
              onClick={onClear}
              className="btn-ghost absolute right-1 top-1/2 size-10 min-h-10 min-w-10 -translate-y-1/2 !px-0 text-lg text-brand-text-secondary"
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
