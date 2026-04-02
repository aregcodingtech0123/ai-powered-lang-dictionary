"use client";

import { useUiLanguage } from "@/components/UiLanguageProvider";

export default function PrivacyPolicyPage() {
  const { uiLanguage, legal } = useUiLanguage();
  const doc = legal.privacy;
  const isRtl = uiLanguage === "ar";

  return (
    <main
      dir={isRtl ? "rtl" : undefined}
      className={`mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 ${isRtl ? "text-right" : ""}`}
    >
      <div className="rounded-3xl border border-slate-200/70 bg-white/60 p-6 shadow-xl backdrop-blur-md">
        <h1 className="text-2xl font-semibold text-slate-900">{doc.title}</h1>

        <section className="mt-6 space-y-4 text-slate-700">
          {doc.intro.map((p, i) => (
            <p key={`intro-${i}`}>{p}</p>
          ))}
        </section>

        <div className="mt-8 space-y-8 text-slate-700">
          {doc.sections.map((section) => (
            <section key={section.heading} className="space-y-3">
              <h2 className="text-xl font-semibold text-slate-900">{section.heading}</h2>
              {section.paragraphs?.map((p, i) => (
                <p key={`${section.heading}-p-${i}`}>{p}</p>
              ))}
              {section.bullets && section.bullets.length > 0 ? (
                <ul className={`list-disc space-y-2 ${isRtl ? "pr-5" : "pl-5"}`}>
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
