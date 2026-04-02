import type { LegalTranslations } from "../types";
const legal: LegalTranslations = {
    about: { title: "Informazioni", intro: ["AI Dictionary è una piattaforma multilingue con IA ed esempi CEFR per imparare il vocabolario in contesto."], sections: [
      { heading: "Missione", paragraphs: ["Creare voci di riferimento utili: significato, sfumature e uso."] },
      { heading: "CEFR", paragraphs: ["Gli esempi seguono CEFR (A1–C2) per regolare la difficoltà."] },
      { heading: "Tecnologia", paragraphs: ["A seconda della coppia, uniamo dati locali e generazione IA (Gemini)."] },
    ]},
    privacy: { title: "Informativa sulla privacy", intro: ["Questa informativa spiega come raccogliamo e usiamo le informazioni."], sections: [
      { heading: "1. Dati", bullets: ["Ricerche: parola e preferenze.", "Contatto: nome, email, oggetto, messaggio.", "Tecnici: IP e log."] },
      { heading: "2. Cookie", paragraphs: ["Cookie per funzionalità e preferenze.", "Con pubblicità, terze parti possono usare cookie per annunci e misurazioni."] },
      { heading: "3. Google AdSense e cookie DART", paragraphs: ["Possiamo mostrare annunci tramite Google AdSense. Google può usare cookie in base a visite precedenti.", "Cookie pubblicitari (incl. DoubleClick/DART se applicabile) consentono annunci basati sulle visite.", "Gestisci la personalizzazione nelle impostazioni Google e consulta le politiche Google."] },
      { heading: "4. Diritti", paragraphs: ["In base alla tua regione puoi richiedere accesso, rettifica, cancellazione, ecc. Contattaci tramite Contatti."] },
    ]},
    terms: { title: "Termini di servizio", intro: ["Questi termini regolano l’uso del servizio."], sections: [
      { heading: "1. Contenuti IA", paragraphs: ["Possono essere imperfetti. Verifica per usi critici."] },
      { heading: "2. Responsabilità", bullets: ["Uso lecito.", "Niente abusi.", "Niente scraping/automazione abusiva."] },
      { heading: "3. Proprietà intellettuale", paragraphs: ["Software, design e marchi appartengono a noi e/o ai licenzianti."] },
      { heading: "4. Limitazione", paragraphs: ["Nei limiti di legge, non siamo responsabili per danni indiretti."] },
    ]},
    contact: {
      title: "Contatti",
      intro: ["Inviaci domande o feedback."],
      labels: { name: "Nome", email: "Email", subject: "Oggetto", message: "Messaggio" },
      placeholders: { name: "Il tuo nome", email: "tu@esempio.com", subject: "Di cosa si tratta?", message: "Scrivi il messaggio…" },
      buttons: { submit: "Invia", sending: "Invio…" },
      alerts: { missingConfig: "Servizio email non configurato. Verifica le variabili d’ambiente.", success: "Messaggio inviato.", genericError: "Invio non riuscito." },
    },
  };
export default legal;
