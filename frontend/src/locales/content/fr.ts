import type { ContentI18n } from "../types";
const content: ContentI18n = {
    howItWorks: {
      title: "Comment ça marche",
      paragraphs: [
        "VocaBeacon transforme un mot en fiche d’apprentissage : des sens concis dans la langue cible, une courte explication et des phrases d’exemple qui montrent l’usage réel. L’objectif est de passer de « je reconnais » à « je sais utiliser correctement ».",
        "Les exemples suivent le CECRL (A1–C2). Les niveaux bas privilégient un vocabulaire fréquent et une grammaire simple ; les niveaux élevés ajoutent nuances, idiomes et structures plus complexes. Vous pratiquez ainsi au bon niveau.",
        "Selon la paire de langues, le système peut combiner des données locales de dictionnaire et de la génération IA. Dans tous les cas, les entrées sont des pages de référence centrées sur le texte, utiles aux apprenants et aux moteurs de recherche.",
      ],
    },
    faq: {
      title: "FAQ",
      items: [
        {
          question: "Que sont les niveaux CECRL (A1–C2) ?",
          answer:
            "Le CECRL décrit la compétence linguistique de A1 (débutant) à C2 (maîtrise). Ici, il détermine la complexité et le vocabulaire des phrases d’exemple.",
        },
        {
          question: "L’explication IA est-elle toujours correcte ?",
          answer:
            "Les explications sont conçues pour être claires, mais peuvent être imparfaites. Utilisez-les comme aide et vérifiez avec d’autres sources si nécessaire.",
        },
        {
          question: "Comment étudier efficacement un nouveau mot ?",
          answer:
            "Commencez par les sens, lisez l’explication, puis réécrivez une phrase d’exemple avec vos propres détails. Répéter un mot dans des contextes variés accélère l’acquisition active.",
        },
      ],
    },
  };
export default content;
