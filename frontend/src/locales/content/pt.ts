import type { ContentI18n } from "../types";
const content: ContentI18n = {
    howItWorks: {
      title: "Como funciona",
      paragraphs: [
        "O VocaBeacon transforma uma palavra em um verbete voltado ao aprendizado: significados concisos no idioma alvo, uma explicação curta e frases de exemplo que mostram uso real. O objetivo é passar de “reconheço” para “sei usar corretamente”.",
        "As frases seguem orientação do CEFR (A1–C2). Níveis mais baixos usam vocabulário frequente e gramática simples; níveis mais altos trazem estruturas mais ricas, expressões e maior nuance. Assim, você pratica no nível certo.",
        "Dependendo do par de idiomas, o sistema pode combinar dados locais de dicionário com geração por IA. Em todos os casos, os verbetes são páginas de referência textuais, úteis para estudantes e mecanismos de busca.",
      ],
    },
    faq: {
      title: "Perguntas frequentes",
      items: [
        {
          question: "O que são níveis CEFR (A1–C2)?",
          answer:
            "O CEFR é um padrão amplamente usado para níveis de proficiência, do iniciante (A1) ao domínio (C2). Aqui, ele define a complexidade das frases de exemplo.",
        },
        {
          question: "A explicação da IA é sempre correta?",
          answer:
            "As explicações são pensadas para clareza, mas podem conter imprecisões. Use como apoio e confirme em fontes adicionais quando necessário.",
        },
        {
          question: "Como estudar uma palavra nova com eficiência?",
          answer:
            "Leia os significados, depois a explicação, e reescreva uma frase de exemplo com seus próprios detalhes. Repetição em diferentes contextos acelera a construção de vocabulário ativo.",
        },
      ],
    },
  };
export default content;
