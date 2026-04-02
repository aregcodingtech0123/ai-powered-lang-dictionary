import type { LegalTranslations } from "../types";
const legal: LegalTranslations = {
    about: { title: "Sobre", intro: ["O AI Dictionary é uma plataforma multilíngue com IA e exemplos alinhados ao CEFR para aprender vocabulário com contexto."], sections: [
      { heading: "Missão", paragraphs: ["Criar entradas de referência que ajudam a entender e usar palavras, não apenas traduzir."] },
      { heading: "CEFR", paragraphs: ["Os exemplos seguem CEFR (A1–C2) para adequar complexidade ao seu nível."] },
      { heading: "Tecnologia", paragraphs: ["Podemos combinar dados locais e geração por IA (Gemini), dependendo do par de idiomas."] },
    ]},
    privacy: { title: "Política de Privacidade", intro: ["Esta política explica como coletamos e usamos informações ao usar o AI Dictionary."], sections: [
      { heading: "1. Dados coletados", bullets: ["Consultas: palavra e preferências.", "Contato: nome, e‑mail, assunto, mensagem.", "Técnicos: IP e logs básicos."] },
      { heading: "2. Cookies", paragraphs: ["Podemos usar cookies para preferências e funcionamento.", "Com anúncios, terceiros podem usar cookies para anúncios e medição."] },
      { heading: "3. Google AdSense e cookies DART", paragraphs: ["Podemos exibir anúncios via Google AdSense. O Google pode usar cookies para veicular anúncios com base em visitas anteriores a este e/ou outros sites.", "Cookies publicitários (incluindo DoubleClick/DART quando aplicável) permitem anúncios baseados em visitas.", "Você pode gerenciar anúncios personalizados nas configurações do Google e consultar as políticas do Google."] },
      { heading: "4. Direitos", paragraphs: ["Conforme sua região, você pode solicitar acesso, correção, exclusão etc. Use a página de Contato."] },
    ]},
    terms: { title: "Termos de Serviço", intro: ["Estes termos regulam seu uso do AI Dictionary."], sections: [
      { heading: "1. Conteúdo de IA", paragraphs: ["Pode conter erros. Use para fins educacionais e verifique quando necessário."] },
      { heading: "2. Responsabilidades", bullets: ["Uso legal.", "Não abusar do serviço.", "Não fazer scraping/automação abusiva."] },
      { heading: "3. Propriedade intelectual", paragraphs: ["Software, design e marca pertencem a nós e/ou licenciadores."] },
      { heading: "4. Limitação de responsabilidade", paragraphs: ["Na máxima extensão permitida por lei, não respondemos por danos indiretos."] },
    ]},
    contact: {
      title: "Contato",
      intro: ["Envie suas dúvidas, feedback ou pedidos de colaboração."],
      labels: { name: "Nome", email: "E‑mail", subject: "Assunto", message: "Mensagem" },
      placeholders: { name: "Seu nome", email: "voce@exemplo.com", subject: "Sobre o que é?", message: "Escreva sua mensagem…" },
      buttons: { submit: "Enviar mensagem", sending: "Enviando…" },
      alerts: { missingConfig: "Serviço de e‑mail não configurado. Verifique as variáveis de ambiente.", success: "Mensagem enviada com sucesso.", genericError: "Falha ao enviar a mensagem." },
    },
  };
export default legal;
