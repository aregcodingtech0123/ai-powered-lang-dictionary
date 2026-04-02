import type { I18nKey, UiLanguage } from "@/lib/i18n";

export type { I18nKey, UiLanguage };

export type Dictionary = Record<I18nKey, string>;

export type HowItWorksContent = {
  title: string;
  paragraphs: string[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqContent = {
  title: string;
  items: FaqItem[];
};

export type ContentI18n = {
  howItWorks: HowItWorksContent;
  faq: FaqContent;
};

export type RichSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type RichPage = {
  title: string;
  intro: string[];
  sections: RichSection[];
};

export type ContactI18n = {
  title: string;
  intro: string[];
  labels: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
  placeholders: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
  buttons: {
    submit: string;
    sending: string;
  };
  alerts: {
    missingConfig: string;
    success: string;
    genericError: string;
  };
};

export type LegalTranslations = {
  about: RichPage;
  privacy: RichPage;
  terms: RichPage;
  contact: ContactI18n;
};

export type LocaleBundle = {
  ui: Dictionary;
  content: ContentI18n;
  legal: LegalTranslations;
};
