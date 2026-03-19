'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';

type SubjectFilter = '전체' | '1과목' | '2과목' | '3과목' | '4권실무';

interface LawItem {
  law: string;
  description: string;
  keyPoints: string[];
  subject: '1과목' | '2과목' | '3과목' | '4권실무';
}

interface LawGroup {
  category: string;
  subject: '1과목' | '2과목' | '3과목' | '4권실무';
  color: string;
  laws: LawItem[];
}

const lawGroups: LawGroup[] = [
  // ────────── 1과목 법조문 (8개) ──────────
  {
    category: '민법 — 계약의 기초 (1과목 항목5)',
    subject: '1과목',
    color: 'bg-violet-50 border-violet-200 dark:bg-violet-900/10 dark:border-violet-700',
    laws: [
      {
        law: '민법 제543조 (해제권의 행사)',
        description: '계약 해제 — 소급효, 원상회복 의무',
        keyPoints: [
          '소급효: 계약 처음부터 없었던 것으로 처리',
          '원상회복: 이미 이행한 부분 반환 의무',
          '일시적 계약(물품납품·공사)에 주로 적용',
          '암기: "해제=소급효" — 해(제)하면 제거(소급)!',
        ],
        subject: '1과목',
      },
      {
        law: '민법 제550조 (해지와 손해배상)',
        description: '계약 해지 — 장래효, 이미 이행된 부분 유효',
        keyPoints: [
          '장래효: 앞으로의 이행의무만 소멸',
          '이미 이행된 부분은 유효 유지 (반환 불필요)',
          '계속적 계약(용역·임대차)에 주로 적용',
          '암기: "해지=불소급" — 해(지)는 지속(불소급)!',
        ],
        subject: '1과목',
      },
      {
        law: '민법 제664조 (도급의 의의)',
        description: '도급계약 — 일의 완성을 목적으로 하는 계약',
        keyPoints: [
          '수급인은 일의 완성을 약정, 도급인은 보수 지급',
          '완성 후 인도 시 보수 지급 원칙',
          '공공계약: 물품계약·공사계약에 도급 원칙 적용',
          '암기: "도급=도(급)로 완성 납품!"',
        ],
        subject: '1과목',
      },
      {
        law: '민법 제680조 (위임의 의의)',
        description: '위임계약 — 사무의 처리를 위탁하는 계약',
        keyPoints: [
          '수임인은 위임인의 사무를 처리 약정',
          '결과가 아닌 과정(사무처리)에 책임',
          '공공계약: 용역계약·컨설팅에 위임 원칙 적용',
          '암기: "위임=위(임)탁 사(무)처리!"',
        ],
        subject: '1과목',
      },
    ],
  },
  {
    category: '국가계약법 — 분쟁·제재 (1과목 항목6)',
    subject: '1과목',
    color: 'bg-violet-50 border-violet-200 dark:bg-violet-900/10 dark:border-violet-700',
    laws: [
      {
        law: '국가를 당사자로 하는 계약에 관한 법률 제7조',
        description: '경쟁입찰 원칙 — 소액수의계약 기준',
        keyPoints: [
          '물품 2천만원, 공사 8천만원, 용역 5천만원 이하 수의계약 가능',
          '암기: "물2 공8 용5"',
        ],
        subject: '1과목',
      },
      {
        law: '국가계약법 제28조 (이의신청)',
        description: '계약 처분에 대한 이의신청 — 15일 이내',
        keyPoints: [
          '처분이 있음을 안 날부터 15일 이내 이의신청',
          '해당 기관 장에게 서면으로 신청',
          '암기: "이의신청 15일!" — 15일 안에 이의!',
        ],
        subject: '1과목',
      },
      {
        law: '국가계약법 시행령 제76조 (부정당업자 제재)',
        description: '부정당업자 입찰참가자격 제한 — 최대 2년',
        keyPoints: [
          '제재 기간: 1개월~최대 2년',
          '허위서류·담합·뇌물 등 위반 행위 대상',
          '처분: 나라장터 공개, 부당이득금 환수 가능',
          '암기: "부정당=최대 2년 퇴장!"',
        ],
        subject: '1과목',
      },
    ],
  },
  {
    category: '조달사업법·전자조달법 (1과목 항목3·4)',
    subject: '1과목',
    color: 'bg-violet-50 border-violet-200 dark:bg-violet-900/10 dark:border-violet-700',
    laws: [
      {
        law: '조달사업에 관한 법률 제2조',
        description: '조달사업의 정의 및 범위',
        keyPoints: ['물품·용역·공사의 구매·비축·관리', '조달청의 역할과 권한', '수요기관 지원 근거'],
        subject: '1과목',
      },
      {
        law: '조달사업법 제6조',
        description: '수요기관에 대한 지원',
        keyPoints: ['단가계약 체결 및 공급', '다수공급자계약(MAS) 근거', '나라장터 종합쇼핑몰 운영 근거'],
        subject: '1과목',
      },
      {
        law: '전자조달의 이용 및 촉진에 관한 법률 제2조',
        description: '나라장터 정의 및 운영 근거',
        keyPoints: ['국가종합전자조달시스템 정의', '전자입찰·전자계약·전자납품', '5대 연계시스템: 종혁벤디이'],
        subject: '1과목',
      },
      {
        law: '전자조달법 제8조',
        description: '전자적 공고 방법 및 시기',
        keyPoints: ['나라장터를 통한 공고 원칙', '공고기간 준수 의무 (물품·용역 7일, 공사 15일)', '전자공개수의계약 근거'],
        subject: '1과목',
      },
    ],
  },
  {
    category: '정책지원 관련법 (1과목 항목4)',
    subject: '1과목',
    color: 'bg-violet-50 border-violet-200 dark:bg-violet-900/10 dark:border-violet-700',
    laws: [
      {
        law: '중소기업제품 구매촉진 및 판로지원에 관한 법률',
        description: '중소기업 공공구매제도 근거',
        keyPoints: ['중소기업자간 경쟁제품 지정', '우선구매 목표비율 설정', '직접생산확인 제도'],
        subject: '1과목',
      },
      {
        law: '녹색제품 구매촉진에 관한 법률',
        description: '녹색조달 근거 — 환경적 지속가능성',
        keyPoints: ['녹색제품 우선구매 의무', '생애주기비용(LCC) 고려 조달', '환경마크 인증 제품 우선'],
        subject: '1과목',
      },
    ],
  },
  {
    category: '민법 화해·공기업규칙·혁신조달 (1과목 항목4·5)',
    subject: '1과목',
    color: 'bg-violet-50 border-violet-200 dark:bg-violet-900/10 dark:border-violet-700',
    laws: [
      {
        law: '민법 제731조 (화해)',
        description: '화해계약 — 분쟁을 종결시키는 합의 (출제기준 항목5-1)',
        keyPoints: [
          '당사자가 상호 양보하여 분쟁을 종지(終止)하는 계약',
          '화해로 확정된 사항은 당사자를 구속 (기판력 유사)',
          '공공계약에서 분쟁조정·중재 합의에 적용',
          '암기: "화해=상호양보 분쟁종결!"',
        ],
        subject: '1과목',
      },
      {
        law: '공기업·준정부기관 계약사무규칙',
        description: '공기업 계약 특례 — 출제기준 항목5-5',
        keyPoints: [
          '국제입찰 대상 범위: 별도 규정 (WTO 기준 연동)',
          '중소기업 구매위탁 의무 예외 가능',
          '수의계약: 기관별 자체 규정으로 유연 적용',
          '의견청취·심의절차·이의신청 규정 포함',
        ],
        subject: '1과목',
      },
      {
        law: '조달사업법 제9조의2 (혁신제품 지정)',
        description: '혁신제품·우수조달물품 지정 — 출제기준 항목4-3',
        keyPoints: [
          '혁신성 높은 제품 → 조달청이 "혁신제품"으로 지정',
          '우수조달물품: 품질·기술력 인정 → 나라장터 등록',
          '수의계약·가점 부여 등 우대 혜택 제공',
          '암기: "기우혁" — 기술개발·우수조달·혁신제품!',
        ],
        subject: '1과목',
      },
      {
        law: '전자조달법 제10조·제11조',
        description: '전자공개수의계약·하도급 전자처리·이용제한 — 항목5-4',
        keyPoints: [
          '제10조: 전자공개수의계약 — 나라장터에서 공개 방식 수의계약',
          '제11조: 하도급 관리의 전자적 처리 — 하도급지킴이 연계',
          '이용제한: 부정사용·시스템 악용 시 나라장터 이용 제한',
          '암기: "전자조달법 10·11조 = 전자수의+하도급전자!"',
        ],
        subject: '1과목',
      },
    ],
  },

  // ────────── 2과목 법조문 (12개) — 의미부여암기법 완전 적용 ──────────
  {
    category: '입찰·낙찰 관련 법규 (2권 핵심)',
    subject: '2과목',
    color: 'bg-blue-50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-700',
    laws: [
      {
        law: '국가계약법 시행령 제35조',
        description: '입찰공고 기간 — 물품·용역 7일, 공사 15일 이상',
        keyPoints: [
          '물품·용역: 나라장터 공개일부터 마감일까지 7일 이상',
          '공사: 15일 이상 (대형공사 등 경우 연장)',
          '입찰설명회 개최 시: 마감일 최소 10~15일 전',
          '암기: "물용7 공사15 — 공사가 두 배 이상!"',
        ],
        subject: '2과목',
      },
      {
        law: '국가계약법 시행규칙 제35조의2',
        description: '사전규격공개 — 의견수렴 20일 이상 (의무화)',
        keyPoints: [
          '추정가격 2억원 이상 물품·용역 대상 의무 공개',
          '의견수렴 기간: 20일 이상',
          '과업내용·예산 적정성·법규 준수 여부 검토',
          '암기: "사전규격 20일 의견수렴!"',
        ],
        subject: '2과목',
      },
      {
        law: '국가계약법 시행령 제42조',
        description: '적격심사 — 낙찰자 결정 기준',
        keyPoints: [
          '물품·용역 95점 이상 합격 → 낙찰자 결정',
          '최저가 입찰자부터 순위별 심사',
          '부적격 시 차순위자 심사 진행',
          '암기: "적격=95 문턱!"',
        ],
        subject: '2과목',
      },
      {
        law: '국가계약법 시행령 제42조의2',
        description: '종합심사낙찰제 — 300억원 이상 공사',
        keyPoints: [
          '300억원 이상 공사에 의무 적용',
          '가격(40~60%)+기술(40~60%)+신인도·사회적책임 종합',
          'PQ(입찰참가자격 사전심사)도 동일하게 300억원 이상',
          '암기: "종심제·PQ는 300억 쌍둥이!"',
        ],
        subject: '2과목',
      },
      {
        law: '국가계약법 시행령 제43조',
        description: '협상계약 — 기술·가격 분리평가',
        keyPoints: [
          '기술평가→기술적합자 선정→우선협상대상자와 가격협상',
          '기술적합자 기준 이상 득점자만 가격협상 참여 가능',
          '협상 실패 시 차순위자와 협상 진행',
          '암기: "협상=기술먼저 가격나중!"',
        ],
        subject: '2과목',
      },
      {
        law: '국가계약법 시행령 제37조',
        description: '입찰보증금 — 추정가격의 5% 이상',
        keyPoints: [
          '입찰보증금: 추정가격의 5% 이상 납부',
          '낙찰 후 계약 포기 시 몰수 처리',
          '소액수의계약 등 면제 가능',
          '암기: "입5 — 입찰보증 5%!"',
        ],
        subject: '2과목',
      },
      {
        law: '국가계약법 시행령 제50조',
        description: '예정가격 결정 — 복수예비가격 15개 → 4개 추첨',
        keyPoints: [
          '복수예비가격 15개 작성 (기초금액 ±3% 범위)',
          '입찰자들이 4개 추첨 → 산술평균 = 예정가격',
          '예정가격 이하 최저가 입찰자가 낙찰 후보',
          '암기: "15개 중 4개 추첨 산술평균!"',
        ],
        subject: '2과목',
      },
      {
        law: '국가계약법 시행령 제44조',
        description: '희망수량경쟁입찰 — 수량 분산 경쟁',
        keyPoints: [
          '수요기관이 희망 수량을 제시하고 공급자가 단가 경쟁',
          '동일 물품 다수 업체에서 분산 공급 가능',
          '단가 경쟁으로 최저단가 업체부터 희망수량 배분',
          '암기: "희망수량=단가경쟁+분산공급!"',
        ],
        subject: '2과목',
      },
    ],
  },
  {
    category: '적정성분석·평가위원회·리스크 관련 법규 (2권 3~6장)',
    subject: '2과목',
    color: 'bg-blue-50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-700',
    laws: [
      {
        law: '국가계약법 시행령 제12조',
        description: '제한경쟁 입찰참가자격 — 공급업체 법적 적정성 기준',
        keyPoints: [
          '실적·기술·자본금·신용도 등 자격제한 설정 가능',
          '입찰참가자격 등록: 나라장터에 사전 등록 의무',
          '법적 적정성분석의 핵심 법규: 면허·인증·등록 요건 확인',
          '암기: "제한경쟁 12조=법적 자격 체크!"',
        ],
        subject: '2과목',
      },
      {
        law: '국가계약법 시행령 제43조의2',
        description: '평가위원회 구성·운영 — 이해충돌 방지',
        keyPoints: [
          '평가위원 5인 이상 구성 (외부위원 2/3 이상)',
          '이해관계인 회피의무: 심사·평가 참여 금지',
          '사전접촉금지: 입찰참가자와 사전 정보교류 금지',
          '암기: "43조의2=평가위원 이해충돌 방지!"',
        ],
        subject: '2과목',
      },
      {
        law: '공공조달 계약 공정성 확보규정',
        description: '접대금지 및 청렴의무 — 평가위원 행동강령',
        keyPoints: [
          '평가위원의 금품·향응 수수 시 형사처벌 가능',
          '청렴서약서 징구: 위원 위촉 시 서약서 제출 의무',
          '평가 종료 전까지 위원 명단 비공개 원칙',
          '암기: "회사접" — 회피·사전접촉금지·접대금지!',
        ],
        subject: '2과목',
      },
      {
        law: '조달사업법 제5조의2',
        description: '공급업체 적정성 심사 — 조달시장 분석·공급역량',
        keyPoints: [
          '조달청장의 물품·용역 공급업체 적정성 심사 권한',
          '공급역량: 기술인력·생산설비·품질관리체계 검증',
          '경제적 적정성: 원가분석·수익성·Make-or-Buy 검토',
          '암기: "조달사업법 5조의2=공급업체 적정성 심사!"',
        ],
        subject: '2과목',
      },
    ],
  },

  // ────────── 3과목 법조문 (8개) — 의미부여암기법 완전 적용 ──────────
  {
    category: '계약관리 일반 법규 (3권 제1장)',
    subject: '3과목',
    color: 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/10 dark:border-emerald-700',
    laws: [
      {
        law: '국가계약법 제5조',
        description: '계약의 원칙 — 신의성실·상호대등·부당특약 금지',
        keyPoints: [
          '신의성실 원칙에 따라 계약 이행',
          '상호 대등한 입장에서 당사자 합의로 계약 체결',
          '계약상대자 이익 부당 제한 특약 무효 (제3항)',
          '암기: "신대부무" — 신의·대등·부당특약금지·무효',
        ],
        subject: '3과목',
      },
      {
        law: '국가계약법 시행령 제50조',
        description: '계약보증금 — 계약금액의 10% 이상',
        keyPoints: [
          '계약보증금: 계약금액의 10% 이상',
          '이행보증서로 대체 가능 (이행보증금 10~15%)',
          '암기: "계10 이10~15" — 계약보증 10%, 이행보증 10~15%',
        ],
        subject: '3과목',
      },
      {
        law: '국가계약법 시행령 제52조',
        description: '하자보수보증금 — 계약금액의 2~5%',
        keyPoints: [
          '하자보수보증금: 계약금액의 2~5%',
          '공사 완공 후 하자보수 기간 설정',
          '하자보수 기간 만료 후 반환',
          '암기: "하자2~5" — 하자는 2~5% 보증!',
        ],
        subject: '3과목',
      },
      {
        law: '국가계약법 시행령 제64조',
        description: '물가변동으로 인한 계약금액 조정 (E/S)',
        keyPoints: [
          '조정요건: ①90일 이상 경과 + ②±3% 이상 등락 동시 충족',
          '조정방법: 품목조정률(단기·소규모) 또는 지수조정률(장기·대규모)',
          '조정금액 = 물가변동적용대가 × 품목·지수조정률',
          '암기: "구삼(9·3) 동시충족!" — 90일 경과 + 3% 등락',
        ],
        subject: '3과목',
      },
      {
        law: '국가계약법 시행령 제65조',
        description: '설계변경으로 인한 계약금액 조정',
        keyPoints: [
          '설계서 불분명·오류·현장상이·신기술공법·발주기관 요구 시 가능',
          '증가물량: 계약단가 적용 (단, 계약단가 > 예단가 시 예단가)',
          '신규비목: 설계변경당시 단가 × 낙찰률',
          '암기: "불상기발" — 불분명·상이·기술·발주기관',
        ],
        subject: '3과목',
      },
      {
        law: '국가계약법 시행령 제74조',
        description: '지체상금 — 납기 지연 시 부과',
        keyPoints: [
          '물품·용역: 0.25/1000 (1일 기준)',
          '공사: 0.5/1000 (1일 기준, 물품의 2배!)',
          '최고한도: 계약금액의 30%',
          '암기: "물용0.25 공사0.5" — 공사는 2배!',
        ],
        subject: '3과목',
      },
    ],
  },
  {
    category: '공사계약 특화 법규 (3권 제4장)',
    subject: '3과목',
    color: 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/10 dark:border-emerald-700',
    laws: [
      {
        law: '건설산업기본법 제31조·제34조',
        description: '하도급 심사 및 하도급계약의 적정성 심사',
        keyPoints: [
          '하도급계약금액이 도급금액 중 하도급 부분의 82% 미달 시 심사',
          '하도급계약금액이 발주자 예정가격의 64% 미달 시 심사 가능',
          '하도급 통보: 체결 후 30일 이내 발주자에게 통보',
          '암기: "하도급 82/64 심사" — 82% 미달이면 적정성 심사!',
        ],
        subject: '3과목',
      },
      {
        law: '국가계약법 시행령 제42조의2',
        description: '종합심사낙찰제(종심제) — 300억원 이상 공사',
        keyPoints: [
          '300억원 이상 공사에 의무 적용',
          '평가요소: 가격(40~60%) + 기술(40~60%) + 사회적책임 + 신인도',
          'PQ(입찰참가자격 사전심사)도 동일하게 300억원 이상 적용',
          '암기: "종심제·PQ는 300억 쌍둥이!"',
        ],
        subject: '3과목',
      },
    ],
  },

  // ────────── 3과목 추가 (3권 고도화 — 품질·대금·기술형공사 법규) ──────────
  {
    category: '대금지급·품질관리 법규 (3권 제1·5장)',
    subject: '3과목',
    color: 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/10 dark:border-emerald-700',
    laws: [
      {
        law: '국가계약법 제15조 (대금지급)',
        description: '검사 완료 후 5일 이내 대금 지급 원칙',
        keyPoints: [
          '검사·검수 완료 후 계약상대자의 청구일부터 5일 이내 지급',
          '지연 시 지연이자 발생 (시행령 제58조의2)',
          '선급금: 계약금액의 70% 이내 지급 가능',
          '암기: "대금5일!" — 검사 후 5일 내 지급!',
        ],
        subject: '3과목',
      },
      {
        law: '조달사업법 제9조의2 (품질관리)',
        description: '공공조달 품질관리 — 직접생산확인·품질검사 근거',
        keyPoints: [
          '직접생산확인: 중소벤처기업부장관 확인 (3년 연속 생산실적)',
          '안전관리물자: 조달청장 지정, 안전검사 의무',
          '품질보증조달물품: 품질경영시스템 인증 기반 지정',
          '암기: "직안품" — 직접생산·안전관리·품질보증!',
        ],
        subject: '3과목',
      },
    ],
  },
  {
    category: '기술형공사·용역계약 법규 (3권 제3·4장)',
    subject: '3과목',
    color: 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/10 dark:border-emerald-700',
    laws: [
      {
        law: '국가계약법 시행령 제80조~제97조 (기술형입찰)',
        description: '일괄입찰(턴키)·대안입찰·기술제안입찰 근거',
        keyPoints: [
          '일괄입찰: 설계+시공 일괄 수행 (300억↑ 대형공사)',
          '대안입찰: 원안 설계 대신 대안설계 제출 가능',
          '기술제안입찰: 실시설계 완료 후 시공방법 제안',
          '암기: "일대기" — 일괄·대안·기술제안!',
        ],
        subject: '3과목',
      },
      {
        law: '용역계약 일반조건 (조달청 고시)',
        description: '용역계약 착수보고·이행점검·e-발주 기준',
        keyPoints: [
          '착수보고: 계약 후 14일 이내 제출',
          '제안서 평가·발표: 기술+가격 분리평가',
          'e-발주: 나라장터 용역 전자발주 시스템 활용',
          '암기: "용14" — 용역은 14일 이내 착수보고!',
        ],
        subject: '3과목',
      },
    ],
  },

  // ────────── 4권실무 법조문 (6개) ──────────
  {
    category: '나라장터 운영 규정 (4권실무)',
    subject: '4권실무',
    color: 'bg-rose-50 border-rose-200 dark:bg-rose-900/10 dark:border-rose-700',
    laws: [
      {
        law: '국가종합전자조달시스템 입찰참가자격 등록규정',
        description: '나라장터 입찰참가자격 등록 절차와 기준',
        keyPoints: ['등록 필수서류: 사업자등록증·법인등기부등본·인감증명서·공동인증서', '유효기간 3년', '잘못된 정보 입력 시 자격 상실'],
        subject: '4권실무',
      },
      {
        law: '중소기업자간 경쟁제품 직접생산확인에 관한 기준',
        description: '직접생산확인 — 중소벤처기업부 확인',
        keyPoints: ['핵심부품 직접 제조 여부 확인', '최근 3년 연속 생산실적 필수', '미충족 시 입찰참가자격 박탈'],
        subject: '4권실무',
      },
    ],
  },
  {
    category: '원가계산 관련 기준 (4권실무)',
    subject: '4권실무',
    color: 'bg-rose-50 border-rose-200 dark:bg-rose-900/10 dark:border-rose-700',
    laws: [
      {
        law: '원가계산에 의한 예정가격작성 준칙',
        description: '원가계산 방법론 — 4가지 유형별 구성요소',
        keyPoints: ['공공조달: 재료비+노무비+경비+일반관리비+이윤', '용역: 인건비+제경비+기술료+직접경비', '공사: 재료비+노무비+경비+관리비+이윤+부가세'],
        subject: '4권실무',
      },
      {
        law: '다수공급자계약 물품 세부기준',
        description: 'MAS 계약 및 2단계경쟁 운영 기준',
        keyPoints: ['추정가격 5천만원 이상 시 2단계경쟁 의무', '카탈로그 계약·디지털서비스계약 포함', '2단계경쟁: 가격·비가격 요소 종합평가'],
        subject: '4권실무',
      },
    ],
  },
  {
    category: '전략조달 관련 고시 (4권실무)',
    subject: '4권실무',
    color: 'bg-rose-50 border-rose-200 dark:bg-rose-900/10 dark:border-rose-700',
    laws: [
      {
        law: '우수조달물품 지정관리 규정',
        description: '우수제품 신청 절차와 지정 기준',
        keyPoints: ['신청→기술평가→현장실태조사→지정심의위원회→지정', '수의계약 가능 등 우대', '암기: "신기현지지" — 신청→기술→현장→지정심의→지정'],
        subject: '4권실무',
      },
      {
        law: '혁신제품 지정에 관한 규정',
        description: '혁신조달 — 혁신제품 지정·구매 제도',
        keyPoints: ['기술개발제품 우선구매 연계', '혁신장터 등록 및 공공조달 우선', '시범구매 → 본구매 전환 프로세스'],
        subject: '4권실무',
      },
    ],
  },
  {
    category: '계약체결·이행 관련 법규 (4권 제5장)',
    subject: '4권실무',
    color: 'bg-rose-50 border-rose-200 dark:bg-rose-900/10 dark:border-rose-700',
    laws: [
      {
        law: '국가계약법 시행령 제50조·제52조 (계약보증금·이행보증금)',
        description: '계약이행 3대 보증서 — 이행·계약·선급금 보증 실무',
        keyPoints: [
          '이행보증금: 계약금액의 10~15% (보증서 대체 가능)',
          '계약보증금: 계약금액의 10% 이상 현금 납부',
          '선급금보증: 선급금의 100% (선급금은 계약금액의 70% 이내)',
          '암기: "이계선 10·10·100" — 이행10%→계약10%→선급금100%',
        ],
        subject: '4권실무',
      },
      {
        law: '인지세법 제3조 (과세문서)',
        description: '계약체결 시 인지세 납부 기준 — 1천만원 초과',
        keyPoints: [
          '1천만원 초과 계약 시 인지세 납부 의무',
          '구간별 차등: 1천만~3천만원(2만원), 3천만~5천만원(4만원)',
          '5천만~1억원(7만원), 1억~10억원(15만원)',
          '암기: "인지세 천만원 넘으면!" — 1천만원이 기준선',
        ],
        subject: '4권실무',
      },
    ],
  },
  {
    category: '유형별 계약일반조건 (4권 제6장)',
    subject: '4권실무',
    color: 'bg-rose-50 border-rose-200 dark:bg-rose-900/10 dark:border-rose-700',
    laws: [
      {
        law: '물품계약 일반조건 (조달청 고시)',
        description: '물품계약 체결·이행·검사·대금지급 일반 기준',
        keyPoints: [
          '납품: 계약서에 명시된 기한 내 지정 장소 납품',
          '검사: 수령 후 10일 이내 검사 완료 원칙',
          '대금지급: 검사 완료 후 5일 이내 지급',
          '암기: "물10·5" — 검사10일, 대금5일 이내',
        ],
        subject: '4권실무',
      },
      {
        law: '용역계약 일반조건 (조달청 고시)',
        description: '용역계약 착수보고·이행점검·검수·대금지급 기준',
        keyPoints: [
          '착수보고: 계약 후 14일 이내 제출',
          '이행점검: 월별 진도보고·중간성과물 제출',
          '검수: 과업 완성 후 검수 → 대금지급',
          '암기: "용14" — 용역은 14일 착수보고!',
        ],
        subject: '4권실무',
      },
      {
        law: '공사계약 일반조건 (조달청 고시)',
        description: '공사계약 착공계·공정관리·준공검사·하자보수 기준',
        keyPoints: [
          '착공계: 10일 이내(일반) / 20일 이내(대형공사)',
          '공정관리: 월별 기성검사·공정보고',
          '준공검사: 완공 후 14일 이내 검사 원칙',
          '암기: "공10·20" — 공사는 10일(소)·20일(대)!',
        ],
        subject: '4권실무',
      },
    ],
  },
  {
    category: '전략적 우선구매 관련 법규 (4권 제8장)',
    subject: '4권실무',
    color: 'bg-rose-50 border-rose-200 dark:bg-rose-900/10 dark:border-rose-700',
    laws: [
      {
        law: '중소기업제품 구매촉진 및 판로지원에 관한 법률 (실무 적용)',
        description: '중소기업 공공구매 50% 목표 — 실무 적용 기준',
        keyPoints: [
          '공공기관별 중소기업 제품 구매 목표비율: 50% 이상',
          '중소기업자간 경쟁: 해당 품목 독점 방지, 중소기업만 참여',
          '공사용자재 직접구매: 수요기관이 직접 중소기업에서 구매',
          '암기: "중50" — 중소기업 50% 구매 목표!',
        ],
        subject: '4권실무',
      },
    ],
  },
];

const subjectTabs = [
  { id: '전체' as SubjectFilter, label: '전체 (41개)', activeColor: 'bg-slate-800 text-white', inactiveColor: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300' },
  { id: '1과목' as SubjectFilter, label: '1과목 법제도 (17개)', activeColor: 'bg-violet-700 text-white', inactiveColor: 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' },
  { id: '2과목' as SubjectFilter, label: '2과목 조달계획 (12개)', activeColor: 'bg-blue-700 text-white', inactiveColor: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  { id: '3과목' as SubjectFilter, label: '3과목 계약관리 (12개)', activeColor: 'bg-emerald-700 text-white', inactiveColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' },
  { id: '4권실무' as SubjectFilter, label: '4권 관리실무 (12개)', activeColor: 'bg-rose-700 text-white', inactiveColor: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300' },
];

const subjectBadge: Record<string, string> = {
  '1과목': 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
  '2과목': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  '3과목': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  '4권실무': 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
};

export default function LawsPage() {
  const [selectedSubject, setSelectedSubject] = useState<SubjectFilter>('전체');

  const filteredGroups =
    selectedSubject === '전체'
      ? lawGroups
      : lawGroups.filter((g) => g.subject === selectedSubject);

  const totalLaws = filteredGroups.reduce((sum, g) => sum + g.laws.length, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-5">
      {/* 상단 네비게이션 */}
      <div className="flex items-center gap-3">
        <Link
          href="/learn"
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">법조문 학습</h1>
          <p className="text-sm text-slate-500">
            출제기준 100% 반영 — 1권·2권·3권·4권 핵심 법률·시행령·고시·기준 정리
          </p>
        </div>
      </div>

      {/* 통계 배너 */}
      <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl p-5 text-white">
        <div className="flex items-center gap-3 mb-1">
          <BookOpen className="w-6 h-6" />
          <span className="font-semibold text-lg">총 {totalLaws}개 핵심 법조문</span>
        </div>
        <p className="text-indigo-100 text-sm">
          {selectedSubject === '전체'
            ? '전 과목(1~3과목) + 4권 실무 관련 법령·고시·기준을 카테고리별로 정리'
            : `${selectedSubject} 관련 법조문 ${totalLaws}개`}
        </p>
      </div>

      {/* Subject filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {subjectTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedSubject(tab.id)}
            className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-semibold whitespace-nowrap transition-all ${
              selectedSubject === tab.id
                ? tab.activeColor + ' shadow-md'
                : tab.inactiveColor
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 카테고리별 법조문 */}
      {filteredGroups.map((group) => (
        <div
          key={`${group.category}-${group.subject}`}
          className={`rounded-2xl border overflow-hidden ${group.color}`}
        >
          {/* 카테고리 헤더 */}
          <div className="px-5 py-3 border-b border-inherit">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${subjectBadge[group.subject]}`}>
                {group.subject}
              </span>
              <h2 className="font-bold text-slate-900 dark:text-white text-sm md:text-base">
                {group.category}
              </h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                ({group.laws.length}개)
              </span>
            </div>
          </div>

          {/* 법조문 목록 */}
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {group.laws.map((item, idx) => (
              <div
                key={idx}
                className="px-5 py-4 hover:bg-white/60 dark:hover:bg-slate-800/30 transition-colors"
              >
                <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                  📋 {item.law}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {item.keyPoints.map((point, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-0.5 bg-white/80 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 rounded-full border border-slate-200 dark:border-slate-600"
                    >
                      {point}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* 4권실무 안내 */}
      {(selectedSubject === '전체' || selectedSubject === '4권실무') && (
        <div className="p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-700 rounded-xl">
          <h3 className="font-bold text-rose-800 dark:text-rose-300 mb-2 text-sm">
            🆕 4권실무 법조문 12개 — 의미부여암기법 학습 포인트
          </h3>
          <ul className="space-y-1 text-xs text-rose-700 dark:text-rose-300">
            <li>• <strong>등록규정</strong>: 가약신서현조승(7단계) / <strong>보증금</strong>: 이계선 10·10·100</li>
            <li>• <strong>원가계산</strong>: 재노경관이 / <strong>인지세</strong>: 1천만원 초과 기준</li>
            <li>• <strong>물품일반조건</strong>: 물10·5(검사10일, 대금5일) / <strong>용역</strong>: 용14(착수14일)</li>
            <li>• <strong>공사일반조건</strong>: 공10·20(착공계) / <strong>우선구매</strong>: 중녹혁사(중50%)</li>
          </ul>
        </div>
      )}
    </div>
  );
}
