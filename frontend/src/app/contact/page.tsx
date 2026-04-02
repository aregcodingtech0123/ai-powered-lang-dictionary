"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useUiLanguage } from "@/components/UiLanguageProvider";

type SendStatus = "idle" | "sending" | "success" | "error";

export default function ContactPage() {
  const { legal, uiLanguage } = useUiLanguage();
  const doc = legal.contact;
  const isRtl = uiLanguage === "ar";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<SendStatus>("idle");
  const [errorText, setErrorText] = useState("");

  const emailConfig = useMemo(
    () => ({
      serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
      templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "",
      adminEmail: process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "",
    }),
    []
  );

  const missingConfig =
    !emailConfig.serviceId ||
    !emailConfig.templateId ||
    !emailConfig.publicKey ||
    !emailConfig.adminEmail;

  useEffect(() => {
    void import("@emailjs/browser");
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorText("");
    setStatus("sending");

    if (missingConfig) {
      setStatus("error");
      setErrorText(doc.alerts.missingConfig);
      return;
    }

    try {
      const emailjs = await import("@emailjs/browser");
      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        {
          from_name: name,
          from_email: email,
          subject,
          message,
          to_email: emailConfig.adminEmail,
        },
        emailConfig.publicKey
      );

      setStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      setStatus("error");
      setErrorText(error instanceof Error ? error.message : doc.alerts.genericError);
    }
  }

  return (
    <main
      dir={isRtl ? "rtl" : undefined}
      className={`mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 ${isRtl ? "text-right" : ""}`}
    >
      <div className="rounded-3xl border border-slate-200/70 bg-white/60 p-6 shadow-xl backdrop-blur-md">
        <h1 className="text-2xl font-semibold text-slate-900">{doc.title}</h1>
        <section className="mt-4 space-y-2 text-slate-700">
          {doc.intro.map((p, i) => (
            <p key={`intro-${i}`}>{p}</p>
          ))}
        </section>

        <div className="mt-6 max-w-2xl rounded-2xl border border-slate-200/70 bg-white/60 p-6 shadow-sm backdrop-blur-md">
          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
                {doc.labels.name}
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder={doc.placeholders.name}
                className="h-11 w-full rounded-xl border border-slate-300 bg-white/70 px-3 text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-300"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
                {doc.labels.email}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder={doc.placeholders.email}
                className="h-11 w-full rounded-xl border border-slate-300 bg-white/70 px-3 text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-300"
              />
            </div>

            <div>
              <label htmlFor="subject" className="mb-1 block text-sm font-medium text-slate-700">
                {doc.labels.subject}
              </label>
              <input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                placeholder={doc.placeholders.subject}
                className="h-11 w-full rounded-xl border border-slate-300 bg-white/70 px-3 text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-300"
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-medium text-slate-700">
                {doc.labels.message}
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={6}
                placeholder={doc.placeholders.message}
                className="w-full rounded-xl border border-slate-300 bg-white/70 px-3 py-2 text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-300"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-indigo-600 px-5 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? doc.buttons.sending : doc.buttons.submit}
            </button>
          </form>

          {status === "success" && (
            <p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
              {doc.alerts.success}
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
              {errorText || doc.alerts.genericError}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
