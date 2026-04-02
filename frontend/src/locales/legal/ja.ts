import type { LegalTranslations } from "../types";
const legal: LegalTranslations = {
    about: { title: "概要", intro: ["AI Dictionary は多言語の学習を支援するAI辞書です。CEFRに沿った例文で文脈理解を助けます。"], sections: [
      { heading: "目的", paragraphs: ["単なる翻訳ではなく、意味・ニュアンス・用法を学べる参照ページを提供します。"] },
      { heading: "CEFR", paragraphs: ["CEFR（A1〜C2）に基づいて例文の難易度を調整します。"] },
      { heading: "技術", paragraphs: ["言語ペアにより、ローカルデータとAI生成（Gemini）を組み合わせます。"] },
    ]},
    privacy: { title: "プライバシーポリシー", intro: ["本ポリシーは情報の収集・利用について説明します。"], sections: [
      { heading: "1. 取得情報", bullets: ["検索: 単語と設定。", "連絡: 氏名、メール、件名、本文。", "技術: IP と基本ログ。"] },
      { heading: "2. Cookie", paragraphs: ["必須機能や設定保持のため Cookie を使用する場合があります。", "広告が有効な場合、第三者が広告配信/計測のため Cookie を使用することがあります。"] },
      { heading: "3. Google AdSense と DART Cookie", paragraphs: ["Google AdSense により広告を表示する場合があります。Google は Cookie を使用して過去の訪問等に基づく広告を配信することがあります。", "広告 Cookie（該当する場合 DoubleClick/DART を含む）により、訪問に基づく広告配信が可能になります。", "Google の広告設定でパーソナライズ広告を管理し、Google のポリシーをご確認ください。"] },
      { heading: "4. 権利", paragraphs: ["地域の法令により開示・訂正・削除等の権利が認められる場合があります。お問い合わせページからご連絡ください。"] },
    ]},
    terms: { title: "利用規約", intro: ["本規約はサービス利用条件を定めます。"], sections: [
      { heading: "1. AIコンテンツ", paragraphs: ["AI出力は不完全な場合があります。重要用途は検証してください。"] },
      { heading: "2. 利用者の責任", bullets: ["法令遵守。", "不正利用の禁止。", "過度な自動化/スクレイピング禁止。"] },
      { heading: "3. 知的財産", paragraphs: ["ソフトウェア、デザイン、ブランドは当社および/または権利者に帰属します。"] },
      { heading: "4. 責任制限", paragraphs: ["法令の範囲で、間接損害等について責任を負いません。"] },
    ]},
    contact: {
      title: "お問い合わせ",
      intro: ["ご質問やフィードバックをお送りください。"],
      labels: { name: "お名前", email: "メール", subject: "件名", message: "メッセージ" },
      placeholders: { name: "お名前", email: "you@example.com", subject: "内容", message: "メッセージを書く…" },
      buttons: { submit: "送信", sending: "送信中…" },
      alerts: { missingConfig: "メール送信が設定されていません。環境変数を確認してください。", success: "送信しました。", genericError: "送信に失敗しました。" },
    },
  };
export default legal;
