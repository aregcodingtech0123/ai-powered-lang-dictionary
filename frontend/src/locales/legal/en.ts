import type { LegalTranslations } from "../types";
const legal: LegalTranslations = {
    about: {
      title: "About",
      intro: [
        "VocaBeacon is a multilingual learning platform that helps you understand meaning, nuance, and usage across languages with AI-assisted explanations and CEFR-aligned examples.",
      ],
      sections: [
        {
          heading: "Mission",
          paragraphs: [
            "We aim to make vocabulary practical: not just a translation, but a reference entry you can learn from and reuse.",
          ],
        },
        {
          heading: "CEFR-based learning",
          paragraphs: [
            "Example sentences follow CEFR guidance (A1–C2) to match your level, from simple structures to advanced nuance.",
          ],
        },
        {
          heading: "Technology",
          paragraphs: [
            "Depending on the language pair, we may combine local dictionary data with AI generation (Gemini-backed) to produce meanings, explanations, and examples.",
          ],
        },
      ],
    },
    privacy: {
      title: "Privacy Policy",
      intro: [
        "This Privacy Policy explains how we collect, use, share, and protect information when you use VocaBeacon.",
      ],
      sections: [
        {
          heading: "1. Information we collect",
          bullets: [
            "Dictionary requests: your input word and selected languages/difficulty.",
            "Contact messages: name, email, subject, and message content.",
            "Technical data: IP address and basic logs for security and reliability.",
          ],
        },
        {
          heading: "2. Cookies",
          paragraphs: [
            "We may use cookies to provide essential functionality and remember preferences (such as UI language).",
            "If advertising is enabled, third parties may use cookies to serve and measure ads.",
          ],
        },
        {
          heading: "3. Google AdSense & DART cookies",
          paragraphs: [
            "We may serve ads with Google AdSense. Google, as a third‑party vendor, may use cookies to serve ads based on prior visits to this and/or other websites.",
            "Google’s advertising cookies (including the DoubleClick/DART cookie where applicable) enable Google and its partners to serve ads based on visits to this site and/or other sites on the Internet.",
            "You can opt out of personalized advertising in Google’s Ads Settings and review Google’s policies for more details on how Google uses data from sites that use its services.",
          ],
        },
        {
          heading: "4. Your rights",
          paragraphs: [
            "Depending on your location, you may have rights to access, correct, delete, or restrict processing of your personal information. Contact us via the Contact page.",
          ],
        },
      ],
    },
    terms: {
      title: "Terms of Service",
      intro: ["These Terms govern your access to and use of VocaBeacon."],
      sections: [
        {
          heading: "1. AI content",
          paragraphs: [
            "AI-generated content is provided for educational purposes and may be inaccurate or incomplete. Verify independently for critical decisions.",
          ],
        },
        {
          heading: "2. User responsibilities",
          bullets: [
            "Use the Service lawfully and do not disrupt or abuse it.",
            "Do not submit sensitive personal information unless necessary.",
            "Do not scrape or automate access in a way that harms performance.",
          ],
        },
        {
          heading: "3. Intellectual property",
          paragraphs: ["The Service’s software, design, and branding are owned by us and/or licensors."],
        },
        {
          heading: "4. Limitation of liability",
          paragraphs: [
            "To the maximum extent permitted by law, we are not liable for indirect or consequential damages arising from use of the Service.",
          ],
        },
      ],
    },
    contact: {
      title: "Contact",
      intro: ["Send us your questions, feedback, or collaboration requests."],
      labels: { name: "Name", email: "Email", subject: "Subject", message: "Message" },
      placeholders: {
        name: "Your name",
        email: "you@example.com",
        subject: "What is this about?",
        message: "Write your message…",
      },
      buttons: { submit: "Send message", sending: "Sending…" },
      alerts: {
        missingConfig: "Email service is not configured. Please check environment variables.",
        success: "Your message was sent successfully.",
        genericError: "Failed to send your message.",
      },
    },
  };
export default legal;
