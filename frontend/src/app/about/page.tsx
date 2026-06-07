"use client";

import { useUiLanguage } from "@/components/UiLanguageProvider";

export default function AboutPage() {
  const { uiLanguage, legal } = useUiLanguage();
  const doc = legal.about;
  const isRtl = uiLanguage === "ar";

  return (
    <main
      dir={isRtl ? "rtl" : undefined}
      className={`mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12 ${isRtl ? "text-right" : ""}`}
    >
      <div className="card-surface rounded-2xl p-6 sm:p-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          <span className="text-brand-gradient">{doc.title}</span>
        </h1>

        <section className="mt-6 space-y-4 content-prose">
          {doc.intro.map((p, i) => (
            <p key={`intro-${i}`}>{p}</p>
          ))}
        </section>

        <div className="mt-10 space-y-8 content-prose">
          {doc.sections.map((section) => (
            <section
              key={section.heading}
              className="rounded-card border border-brand-border bg-slate-50/50 p-5 sm:p-6"
            >
              <h2 className="text-xl font-semibold text-brand-text">{section.heading}</h2>
              {section.paragraphs?.map((p, i) => (
                <p key={`${section.heading}-p-${i}`} className="mt-3">
                  {p}
                </p>
              ))}
              {section.bullets && section.bullets.length > 0 ? (
                <ul className={`mt-3 list-disc space-y-2 ${isRtl ? "pr-5" : "pl-5"}`}>
                  {section.bullets.map((b, i) => (
                    <li key={`${section.heading}-b-${i}`}>{b}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
