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
      className={`mt-10 rounded-3xl border border-slate-200/70 bg-white/95 p-4 shadow-lg transition-all duration-300 sm:p-6 md:bg-white/60 md:shadow-xl md:backdrop-blur-md md:hover:shadow-2xl ${
        isRtl ? "text-right" : ""
      }`}
    >
      <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">{howItWorks.title}</h2>
      <div className="mt-3 space-y-3 text-base leading-relaxed text-slate-700 md:text-lg">
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
      className={`mt-10 rounded-3xl border border-slate-200/70 bg-white/95 p-4 shadow-lg transition-all duration-300 sm:p-6 md:bg-white/60 md:shadow-xl md:backdrop-blur-md md:hover:shadow-2xl ${
        isRtl ? "text-right" : ""
      }`}
    >
      <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">{faq.title}</h2>
      <div className="mt-4 space-y-6 text-base text-slate-700 md:text-lg">
        {faq.items.map((item) => (
          <div key={item.question}>
            <h3 className="font-semibold text-slate-900">{item.question}</h3>
            <p className="mt-1 leading-relaxed">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
});
