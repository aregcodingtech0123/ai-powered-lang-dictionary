"use client";

import { FormEvent, useState } from "react";
import { isEmailJsConfigured, type EmailJsConfig } from "@/lib/emailjs-config";
import type { ContactI18n } from "@/locales/types";

type SendStatus = "idle" | "sending" | "success" | "error";

type ContactFormProps = {
  doc: ContactI18n;
  emailConfig: EmailJsConfig;
};

export function ContactForm({ doc, emailConfig }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<SendStatus>("idle");
  const [errorText, setErrorText] = useState("");

  const missingConfig = !isEmailJsConfigured(emailConfig);

  const isSending = status === "sending";

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
      const templateParams: Record<string, string> = {
        from_name: name,
        from_email: email,
        subject,
        message,
        // Aliases for templates that use shorter variable names
        name,
        email,
        user_name: name,
        user_email: email,
      };

      if (emailConfig.adminEmail) {
        templateParams.to_email = emailConfig.adminEmail;
      }

      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        templateParams,
        { publicKey: emailConfig.publicKey }
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
    <div className="card-surface max-w-2xl rounded-2xl p-6 sm:p-8">
      <form className="space-y-5" onSubmit={onSubmit}>
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-sm font-semibold text-brand-text">
            {doc.labels.name}
          </label>
          <input
            id="contact-name"
            name="from_name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isSending}
            placeholder={doc.placeholders.name}
            className="input-field disabled:opacity-60"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-sm font-semibold text-brand-text">
            {doc.labels.email}
          </label>
          <input
            id="contact-email"
            name="from_email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSending}
            placeholder={doc.placeholders.email}
            className="input-field disabled:opacity-60"
          />
        </div>

        <div>
          <label htmlFor="contact-subject" className="mb-1.5 block text-sm font-semibold text-brand-text">
            {doc.labels.subject}
          </label>
          <input
            id="contact-subject"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            disabled={isSending}
            placeholder={doc.placeholders.subject}
            className="input-field disabled:opacity-60"
          />
        </div>

        <div>
          <label htmlFor="contact-message" className="mb-1.5 block text-sm font-semibold text-brand-text">
            {doc.labels.message}
          </label>
          <textarea
            id="contact-message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            disabled={isSending}
            rows={6}
            placeholder={doc.placeholders.message}
            className="input-field min-h-[9rem] resize-y py-3 disabled:opacity-60"
          />
        </div>

        {emailConfig.adminEmail ? (
          <input type="hidden" name="to_email" value={emailConfig.adminEmail} />
        ) : null}

        <button
          type="submit"
          disabled={isSending}
          className="btn-primary w-full sm:w-auto"
          aria-busy={isSending}
        >
          {isSending ? (
            <>
              <span
                className="inline-block size-4 shrink-0 animate-spin rounded-full border-2 border-white/30 border-t-white"
                aria-hidden
              />
              {doc.buttons.sending}
            </>
          ) : (
            doc.buttons.submit
          )}
        </button>
      </form>

      {status === "success" ? (
        <p
          className="alert-accent-success mt-5"
          role="status"
          aria-live="polite"
        >
          {doc.alerts.success}
        </p>
      ) : null}

      {status === "error" ? (
        <p className="alert-error mt-5" role="alert" aria-live="assertive">
          {errorText || doc.alerts.genericError}
        </p>
      ) : null}
    </div>
  );
}
