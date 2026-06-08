import type { ContentI18n } from "../types";
const content: ContentI18n = {
    howItWorks: {
      title: "Cómo funciona",
      paragraphs: [
        "VocaBeacon convierte una palabra en una entrada educativa: significados concisos en el idioma de destino, una explicación breve y frases de ejemplo con uso real. El objetivo es pasar de “la reconozco” a “la uso correctamente”.",
        "Las frases siguen la guía del MCER (A1–C2). En niveles bajos se usa vocabulario frecuente y gramática simple; en niveles altos aparecen más matices, expresiones e ideas más complejas. Así practicas al nivel adecuado.",
        "Según el par de idiomas, el sistema puede combinar datos locales con generación por IA. En cualquier caso, las entradas se presentan como páginas de referencia centradas en texto, útiles para estudiantes y buscadores.",
      ],
    },
    faq: {
      title: "Preguntas frecuentes",
      items: [
        {
          question: "¿Qué son los niveles MCER (A1–C2)?",
          answer:
            "El MCER es un marco muy utilizado para medir el nivel, de principiante (A1) a dominio (C2). Aquí define la complejidad de las frases de ejemplo.",
        },
        {
          question: "¿La explicación de IA siempre es correcta?",
          answer:
            "La IA intenta ser clara y útil, pero puede equivocarse. Úsala como apoyo y verifica con otras fuentes en casos importantes.",
        },
        {
          question: "¿Cómo estudiar una palabra nueva de forma eficaz?",
          answer:
            "Empieza por los significados, lee la explicación y reescribe una frase de ejemplo con tus propios detalles. Repetir en distintos contextos ayuda a crear vocabulario activo.",
        },
      ],
    },
  };
export default content;
