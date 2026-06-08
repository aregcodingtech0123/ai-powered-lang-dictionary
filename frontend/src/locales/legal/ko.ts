import type { LegalTranslations } from "../types";
const legal: LegalTranslations = {
    about: { title: "소개", intro: ["VocaBeacon은 다국어 학습을 돕는 AI 도구로, CEFR 예문을 통해 문맥 학습을 지원합니다."], sections: [
      { heading: "미션", paragraphs: ["번역뿐 아니라 뜻·설명·예문을 갖춘 학습용 참고 페이지를 제공합니다."] },
      { heading: "CEFR", paragraphs: ["CEFR(A1–C2) 기준으로 예문 난이도를 조절합니다."] },
      { heading: "기술", paragraphs: ["언어 쌍에 따라 로컬 데이터와 AI 생성(Gemini)을 결합합니다."] },
    ]},
    privacy: { title: "개인정보 처리방침", intro: ["본 방침은 정보 수집 및 이용을 설명합니다."], sections: [
      { heading: "1. 수집 정보", bullets: ["검색: 단어/설정.", "문의: 이름, 이메일, 제목, 메시지.", "기술: IP 및 기본 로그."] },
      { heading: "2. 쿠키", paragraphs: ["기본 기능과 설정을 위해 쿠키를 사용할 수 있습니다.", "광고 활성화 시 제3자가 쿠키를 사용할 수 있습니다."] },
      { heading: "3. Google AdSense 및 DART 쿠키", paragraphs: ["Google AdSense로 광고를 표시할 수 있습니다. Google은 쿠키로 이전 방문 기록 기반 광고를 제공할 수 있습니다.", "광고 쿠키(해당 시 DoubleClick/DART 포함)는 방문 기반 광고 제공을 가능하게 합니다.", "Google 광고 설정 및 정책에서 자세히 확인할 수 있습니다."] },
      { heading: "4. 권리", paragraphs: ["지역 법에 따라 열람/정정/삭제 등 권리가 있을 수 있습니다. 문의 페이지로 요청하세요."] },
    ]},
    terms: { title: "서비스 이용약관", intro: ["본 약관은 서비스 이용 조건을 규정합니다."], sections: [
      { heading: "1. AI 콘텐츠", paragraphs: ["AI 출력은 부정확할 수 있습니다. 중요한 용도는 검증하세요."] },
      { heading: "2. 책임", bullets: ["합법적 사용.", "서비스 남용 금지.", "성능 저해 스크래핑/자동화 금지."] },
      { heading: "3. 지식재산", paragraphs: ["소프트웨어/디자인/브랜드는 당사 및/또는 라이선스 제공자에게 귀속됩니다."] },
      { heading: "4. 책임 제한", paragraphs: ["법이 허용하는 범위에서 간접 손해에 대해 책임을 지지 않습니다."] },
    ]},
    contact: {
      title: "문의",
      intro: ["질문이나 피드백을 보내 주세요."],
      labels: { name: "이름", email: "이메일", subject: "제목", message: "메시지" },
      placeholders: { name: "이름", email: "you@example.com", subject: "무엇에 대한 내용인가요?", message: "메시지 입력…" },
      buttons: { submit: "보내기", sending: "전송 중…" },
      alerts: { missingConfig: "이메일 서비스가 설정되지 않았습니다. 환경 변수를 확인하세요.", success: "전송되었습니다.", genericError: "전송 실패." },
    },
  };
export default legal;
