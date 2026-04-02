import type { LegalTranslations } from "../types";
const legal: LegalTranslations = {
    about: { title: "关于", intro: ["AI 词典是一款多语言 AI 学习工具，通过 CEFR 例句帮助你在语境中掌握词汇。"], sections: [
      { heading: "使命", paragraphs: ["不仅是翻译，更提供可学习的参考词条：释义、解释与用例。"] },
      { heading: "CEFR", paragraphs: ["例句参考 CEFR（A1–C2）调整难度与用词。"] },
      { heading: "技术", paragraphs: ["按语言对结合本地数据与 AI 生成（Gemini）。"] },
    ]},
    privacy: { title: "隐私政策", intro: ["本政策说明我们如何收集和使用信息。"], sections: [
      { heading: "1. 信息", bullets: ["查询：单词与设置。", "联系：姓名、邮箱、主题、内容。", "技术：IP 与基础日志。"] },
      { heading: "2. Cookie", paragraphs: ["用于基本功能与偏好设置。", "启用广告时，第三方可能使用 Cookie 进行投放与衡量。"] },
      { heading: "3. Google AdSense 与 DART Cookie", paragraphs: ["我们可能通过 Google AdSense 展示广告。Google 可能使用 Cookie 根据既往访问投放广告。", "广告 Cookie（适用时含 DoubleClick/DART）允许基于访问投放广告。", "你可在 Google 广告设置中管理个性化广告，并查阅 Google 政策。"] },
      { heading: "4. 权利", paragraphs: ["根据地区法律，你可能享有访问、更正、删除等权利。请通过联系页面提交请求。"] },
    ]},
    terms: { title: "服务条款", intro: ["本条款规范你对服务的使用。"], sections: [
      { heading: "1. AI 内容", paragraphs: ["AI 输出可能不准确。重要用途请自行核对。"] },
      { heading: "2. 用户责任", bullets: ["合法使用。", "不得滥用或干扰。", "禁止影响性能的爬取/自动化。"] },
      { heading: "3. 知识产权", paragraphs: ["软件、设计与品牌归我们及/或许可方所有。"] },
      { heading: "4. 责任限制", paragraphs: ["在法律允许范围内，我们不对间接或后果性损失负责。"] },
    ]},
    contact: {
      title: "联系",
      intro: ["发送问题或反馈。"],
      labels: { name: "姓名", email: "邮箱", subject: "主题", message: "消息" },
      placeholders: { name: "你的姓名", email: "you@example.com", subject: "简要说明", message: "输入消息…" },
      buttons: { submit: "发送", sending: "发送中…" },
      alerts: { missingConfig: "邮件服务未配置，请检查环境变量。", success: "发送成功。", genericError: "发送失败。" },
    },
  };
export default legal;
