import type { LegalTranslations } from "../types";
const legal: LegalTranslations = {
    about: { title: "À propos", intro: ["AI Dictionary est une plateforme multilingue avec IA et exemples CECRL pour apprendre le vocabulaire en contexte."], sections: [
      { heading: "Mission", paragraphs: ["Créer des entrées de référence utiles : sens, nuance et usage, pas seulement une traduction."] },
      { heading: "CECRL", paragraphs: ["Les exemples suivent le CECRL (A1–C2) pour adapter la difficulté."] },
      { heading: "Technologie", paragraphs: ["Selon la paire, nous combinons données locales et génération IA (Gemini)."] },
    ]},
    privacy: { title: "Politique de confidentialité", intro: ["Cette politique explique la collecte et l’utilisation des informations."], sections: [
      { heading: "1. Données", bullets: ["Requêtes : mot et préférences.", "Contact : nom, e‑mail, objet, message.", "Techniques : IP et journaux."] },
      { heading: "2. Cookies", paragraphs: ["Cookies pour fonctionnement et préférences.", "Avec publicité, des tiers peuvent utiliser des cookies."] },
      { heading: "3. Google AdSense et cookies DART", paragraphs: ["Nous pouvons afficher des annonces via Google AdSense. Google peut utiliser des cookies selon des visites antérieures.", "Les cookies publicitaires (DoubleClick/DART selon le cas) permettent des annonces basées sur les visites.", "Vous pouvez gérer la personnalisation dans les paramètres Google et consulter les politiques Google."] },
      { heading: "4. Droits", paragraphs: ["Selon votre pays, vous pouvez demander accès, correction, suppression, etc. Contactez-nous via la page Contact."] },
    ]},
    terms: { title: "Conditions d’utilisation", intro: ["Ces conditions régissent l’usage du service."], sections: [
      { heading: "1. Contenu IA", paragraphs: ["Le contenu IA peut être imparfait. Vérifiez pour les usages critiques."] },
      { heading: "2. Responsabilités", bullets: ["Utilisation légale.", "Pas d’abus.", "Pas de scraping/automatisation abusive."] },
      { heading: "3. Propriété intellectuelle", paragraphs: ["Le logiciel, le design et la marque appartiennent à nous et/ou à nos concédants."] },
      { heading: "4. Limitation", paragraphs: ["Dans la limite permise par la loi, nous ne sommes pas responsables des dommages indirects."] },
    ]},
    contact: {
      title: "Contact",
      intro: ["Envoyez vos questions ou retours."],
      labels: { name: "Nom", email: "E‑mail", subject: "Objet", message: "Message" },
      placeholders: { name: "Votre nom", email: "vous@exemple.com", subject: "De quoi s’agit-il ?", message: "Écrivez votre message…" },
      buttons: { submit: "Envoyer", sending: "Envoi…" },
      alerts: { missingConfig: "Service e‑mail non configuré. Vérifiez les variables d’environnement.", success: "Message envoyé.", genericError: "Échec de l’envoi." },
    },
  };
export default legal;
