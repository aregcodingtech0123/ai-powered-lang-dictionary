import type { LegalTranslations } from "../types";
const legal: LegalTranslations = {
    about: {
      title: "Hakkında",
      intro: [
        "AI Sözlük; anlam, nüans ve kullanım odaklı bir çok dilli öğrenme platformudur. AI açıklamaları ve CEFR uyumlu örneklerle kelimeleri daha doğru kullanmanıza yardımcı olur.",
      ],
      sections: [
        { heading: "Misyon", paragraphs: ["Sadece çeviri değil; öğrenilebilir ve tekrar kullanılabilir referans girdileri üretmeyi hedefleriz."] },
        { heading: "CEFR tabanlı öğrenme", paragraphs: ["Örnek cümleler CEFR (A1–C2) rehberliğine göre seviyenize uygun üretilir."] },
        { heading: "Teknoloji", paragraphs: ["Dil çiftine göre yerel sözlük verisi ile Gemini destekli AI üretimini birleştirebiliriz."] },
      ],
    },
    privacy: {
      title: "Gizlilik Politikası",
      intro: ["Bu politika, AI Sözlük’ü kullanırken bilgilerin nasıl toplandığını, kullanıldığını ve korunduğunu açıklar."],
      sections: [
        { heading: "1. Toplanan bilgiler", bullets: ["Sözlük sorguları: kelime ve dil/seviye tercihleri.", "İletişim: ad, e‑posta, konu, mesaj.", "Teknik: IP ve temel loglar."] },
        { heading: "2. Çerezler", paragraphs: ["Temel işlevler ve tercihler (ör. arayüz dili) için çerez kullanabiliriz.", "Reklam etkinse üçüncü taraflar reklam sunumu/ölçümü için çerez kullanabilir."] },
        { heading: "3. Google AdSense ve DART çerezleri", paragraphs: ["Google AdSense ile reklam gösterebiliriz. Google, üçüncü taraf satıcı olarak, bu ve/veya diğer sitelere önceki ziyaretlere dayalı reklam sunmak için çerez kullanabilir.", "Reklam çerezleri (uygunsa DoubleClick/DART dahil), Google ve iş ortaklarının ziyaretlere dayalı reklam sunmasını sağlar.", "Kişiselleştirilmiş reklamlardan Google ayarlarından çıkabilir ve Google politika sayfalarını inceleyebilirsiniz."] },
        { heading: "4. Haklar", paragraphs: ["Bulunduğunuz yere göre erişim, düzeltme, silme vb. haklarınız olabilir. İletişim sayfasından bize ulaşın."] },
      ],
    },
    terms: {
      title: "Kullanım Şartları",
      intro: ["Bu şartlar AI Sözlük’e erişiminizi ve kullanımınızı düzenler."],
      sections: [
        { heading: "1. AI içeriği", paragraphs: ["AI çıktıları eğitim amaçlıdır ve hatalı olabilir. Kritik kullanımda doğrulayın."] },
        { heading: "2. Kullanıcı sorumlulukları", bullets: ["Hukuka uygun kullanın.", "Hizmeti kötüye kullanmayın.", "Performansı bozan otomasyon/scraping yapmayın."] },
        { heading: "3. Fikri mülkiyet", paragraphs: ["Yazılım, tasarım ve marka hakları bize ve/veya lisans verenlere aittir."] },
        { heading: "4. Sorumluluk sınırı", paragraphs: ["Kanunun izin verdiği ölçüde dolaylı/sonuçsal zararlardan sorumlu değiliz."] },
      ],
    },
    contact: {
      title: "İletişim",
      intro: ["Sorularınızı, geri bildiriminizi veya iş birliği taleplerinizi bize iletin."],
      labels: { name: "Ad", email: "E‑posta", subject: "Konu", message: "Mesaj" },
      placeholders: { name: "Adınız", email: "ornek@eposta.com", subject: "Kısa konu", message: "Mesajınızı yazın…" },
      buttons: { submit: "Mesaj gönder", sending: "Gönderiliyor…" },
      alerts: {
        missingConfig: "E‑posta servisi yapılandırılmadı. Lütfen ortam değişkenlerini kontrol edin.",
        success: "Mesajınız başarıyla gönderildi.",
        genericError: "Mesaj gönderilemedi.",
      },
    },
  };
export default legal;
