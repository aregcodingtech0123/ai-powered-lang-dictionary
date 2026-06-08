import type { ContentI18n } from "../types";
const content: ContentI18n = {
    howItWorks: {
      title: "Come funziona",
      paragraphs: [
        "VocaBeacon trasforma una parola in una voce didattica: significati concisi nella lingua di arrivo, una breve spiegazione e frasi di esempio con uso reale. L’obiettivo è passare da “la riconosco” a “la so usare correttamente”.",
        "Gli esempi seguono linee guida CEFR (A1–C2). Ai livelli bassi si usano vocaboli frequenti e grammatica semplice; ai livelli alti compaiono più sfumature, modi di dire e strutture complesse. Così ti alleni al livello giusto.",
        "A seconda della coppia di lingue, il sistema può combinare dati locali e generazione IA. In ogni caso le voci sono pagine di riferimento testuali, utili per studenti e motori di ricerca.",
      ],
    },
    faq: {
      title: "FAQ",
      items: [
        {
          question: "Cosa sono i livelli CEFR (A1–C2)?",
          answer:
            "Il CEFR è un quadro molto usato per indicare la competenza linguistica, da A1 (principiante) a C2 (padronanza). Qui controlla la complessità delle frasi di esempio.",
        },
        {
          question: "La spiegazione dell’IA è sempre corretta?",
          answer:
            "Le spiegazioni sono pensate per chiarezza, ma possono essere imperfette. Usale come supporto e verifica con altre fonti quando necessario.",
        },
        {
          question: "Come studiare bene una parola nuova?",
          answer:
            "Leggi i significati, poi la spiegazione e riscrivi una frase di esempio con i tuoi dettagli. Ripetere in contesti diversi è uno dei modi più rapidi per costruire vocabolario attivo.",
        },
      ],
    },
  };
export default content;
