import type { LegalTranslations } from "../types";
const legal: LegalTranslations = {
    about: { title: "Acerca de", intro: ["VocaBeacon es una plataforma multilingüe con IA y ejemplos CEFR para aprender vocabulario con contexto."], sections: [
      { heading: "Misión", paragraphs: ["Crear entradas de referencia útiles: significado, matiz y uso."] },
      { heading: "CEFR", paragraphs: ["Los ejemplos siguen CEFR (A1–C2) para ajustar dificultad."] },
      { heading: "Tecnología", paragraphs: ["Según el par, combinamos datos locales y generación IA (Gemini)."] },
    ]},
    privacy: { title: "Política de privacidad", intro: ["Esta política explica cómo recopilamos y usamos información."], sections: [
      { heading: "1. Datos", bullets: ["Consultas: palabra y preferencias.", "Contacto: nombre, correo, asunto, mensaje.", "Técnicos: IP y registros."] },
      { heading: "2. Cookies", paragraphs: ["Cookies para funcionamiento y preferencias.", "Con anuncios, terceros pueden usar cookies para publicidad y medición."] },
      { heading: "3. Google AdSense y cookies DART", paragraphs: ["Podemos mostrar anuncios con Google AdSense. Google puede usar cookies basadas en visitas anteriores.", "Cookies publicitarias (incl. DoubleClick/DART cuando aplique) permiten anuncios basados en visitas.", "Gestiona la personalización en Google Ads Settings y revisa políticas de Google."] },
      { heading: "4. Derechos", paragraphs: ["Según tu región, puedes solicitar acceso, corrección, eliminación, etc. Usa la página de Contacto."] },
    ]},
    terms: { title: "Términos del servicio", intro: ["Estos términos regulan el uso del servicio."], sections: [
      { heading: "1. Contenido IA", paragraphs: ["Puede ser imperfecto. Verifica en usos críticos."] },
      { heading: "2. Responsabilidades", bullets: ["Uso legal.", "No abusar.", "No scraping/automatización abusiva."] },
      { heading: "3. Propiedad intelectual", paragraphs: ["Software, diseño y marca pertenecen a nosotros y/o licenciantes."] },
      { heading: "4. Limitación", paragraphs: ["En la máxima medida permitida, no respondemos por daños indirectos."] },
    ]},
    contact: {
      title: "Contacto",
      intro: ["Envíanos tus preguntas o comentarios."],
      labels: { name: "Nombre", email: "Correo", subject: "Asunto", message: "Mensaje" },
      placeholders: { name: "Tu nombre", email: "tu@ejemplo.com", subject: "¿De qué se trata?", message: "Escribe tu mensaje…" },
      buttons: { submit: "Enviar", sending: "Enviando…" },
      alerts: { missingConfig: "El servicio de correo no está configurado. Revisa las variables de entorno.", success: "Mensaje enviado.", genericError: "No se pudo enviar." },
    },
  };
export default legal;
