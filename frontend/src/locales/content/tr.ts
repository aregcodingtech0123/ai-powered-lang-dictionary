import type { ContentI18n } from "../types";
const content: ContentI18n = {
    howItWorks: {
      title: "Nasıl çalışır?",
      paragraphs: [
        "AI Sözlük, tek bir kelimeyi öğrenme odaklı bir girdiye dönüştürür: hedef dilde kısa anlamlar, anlaşılır bir açıklama ve gerçek kullanım gösteren örnek cümleler. Amaç, “kelimeyi tanıdım”dan “kelimeyi doğru kullanıyorum”a geçmenizi sağlamaktır.",
        "Örnek cümleler CEFR (A1–C2) rehberliğine göre üretilir. Düşük seviyelerde kısa ve sık kullanılan kelimeler ile basit dil bilgisi; yüksek seviyelerde daha nüanslı yapılar, deyimler ve akademik ifadeler kullanılır. Böylece kelimeyi doğru zorlukta pratik edersiniz.",
        "Dil çiftine göre sistem, yerel sözlük verisini AI üretimiyle birleştirebilir. Kaynaktan bağımsız olarak girdiler, hem öğrenenler hem de arama motorları için metin odaklı referans sayfaları olarak sunulur.",
      ],
    },
    faq: {
      title: "SSS",
      items: [
        {
          question: "CEFR seviyeleri (A1–C2) nedir?",
          answer:
            "CEFR, dil yeterliliğini başlangıç (A1) seviyesinden yetkinliğe (C2) kadar tanımlayan yaygın bir çerçevedir. Bu sözlükte CEFR seviyesi, örnek cümlelerin kelime seçimini ve karmaşıklığını belirler.",
        },
        {
          question: "AI açıklaması her zaman doğru mu?",
          answer:
            "AI açıklamaları anlaşılır ve faydalı olacak şekilde tasarlanır; ancak hatalı veya eksik olabilir. Öğrenme desteği olarak kullanın ve kritik durumlarda ek kaynaklarla doğrulayın.",
        },
        {
          question: "Yeni bir kelimeyi en iyi nasıl çalışmalıyım?",
          answer:
            "Önce anlamları okuyun, ardından açıklamayı inceleyin; sonra bir örnek cümleyi kopyalayıp kendi detaylarınızla yeniden yazın. Farklı bağlamlarda tekrar, aktif kelime dağarcığını hızla geliştirir.",
        },
      ],
    },
  };
export default content;
