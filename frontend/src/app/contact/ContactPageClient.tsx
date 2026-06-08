"use client";

import { ContactForm } from "@/components/ContactForm";
import { useUiLanguage } from "@/components/UiLanguageProvider";
import type { EmailJsConfig } from "@/lib/emailjs-config";

type ContactPageClientProps = {
  emailConfig: EmailJsConfig;
};

export function ContactPageClient({ emailConfig }: ContactPageClientProps) {
  const { legal, uiLanguage } = useUiLanguage();
  const doc = legal.contact;
  const isRtl = uiLanguage === "ar";

  return (
    <main
      dir={isRtl ? "rtl" : undefined}
      className={`mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12 ${isRtl ? "text-right" : ""}`}
    >
      <div className="card-surface rounded-2xl p-6 sm:p-8">
        <h1 className="page-title">{doc.title}</h1>
        <section className="mt-4 space-y-2 content-prose">
          {doc.intro.map((p, i) => (
            <p key={`intro-${i}`}>{p}</p>
          ))}
        </section>

        <div className="mt-8">
          <ContactForm doc={doc} emailConfig={emailConfig} />
        </div>
      </div>
    </main>
  );
}
