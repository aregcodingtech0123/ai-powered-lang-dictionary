"use client";

import { memo } from "react";
import type { ContentI18n } from "@/locales/types";

export const HomeHowItWorksSection = memo(function HomeHowItWorksSection({
  howItWorks,
  isRtl,
}: {
  howItWorks: ContentI18n["howItWorks"];
  isRtl: boolean;
}) {
  return (
    <section
      dir={isRtl ? "rtl" : undefined}
      className={`card-surface-interactive mt-12 rounded-2xl p-5 sm:p-6 md:p-8 ${isRtl ? "text-right" : ""}`}
    >
      <h2 className="text-xl font-bold tracking-tight text-brand-text sm:text-2xl">
        <span className="text-brand-gradient">{howItWorks.title}</span>
      </h2>
      <div className="mt-4 space-y-4 content-prose">
        {howItWorks.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </section>
  );
});

export const HomeFaqSection = memo(function HomeFaqSection({
  faq,
  isRtl,
}: {
  faq: ContentI18n["faq"];
  isRtl: boolean;
}) {
  return (
    <section
      dir={isRtl ? "rtl" : undefined}
      className={`card-surface-interactive mt-8 rounded-2xl p-5 sm:p-6 md:p-8 ${isRtl ? "text-right" : ""}`}
    >
      <h2 className="text-xl font-bold tracking-tight text-brand-text sm:text-2xl">
        <span className="text-brand-gradient">{faq.title}</span>
      </h2>
      <div className="mt-6 space-y-5">
        {faq.items.map((item) => (
          <div
            key={item.question}
            className="rounded-card border border-brand-border bg-slate-50/50 p-4 transition-colors duration-200 hover:border-indigo-100 hover:bg-indigo-50/30 sm:p-5"
          >
            <h3 className="font-semibold text-brand-text">{item.question}</h3>
            <p className="mt-2 content-prose !text-base">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
});
