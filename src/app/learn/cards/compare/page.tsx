'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { CompareTable } from '@/components/learn/CompareTable'

type SubjectFilter = '전체' | '1과목' | '2과목' | '3과목' | '4권실무'

interface ComparisonData {
  id: string
  title: string
  description: string
  subject: '1과목' | '2과목' | '3과목' | '4권실무'
  headers: string[]
  rows: Array<{
    label: string
    cells: string[]
  }>
}

const comparisonData: ComparisonData[] = [
  // ────────── 1과목 ──────────
  {
    id: '1',
    subject: '1과목',
    title: '경쟁방법 비교',
    description: '일반경쟁·제한경쟁·지명경쟁·수의계약의 차이점 — 1과목 핵심',
    headers: ['일반경쟁', '제한경쟁', '지명경쟁', '수의계약'],
    rows: [
      {
        label: '정의',
        cells: [
          '자격요건 없이 모든 사업자가 자유롭게 참가',
          '실적·기술·신용 등 자격요건 충족자만 참가',
          '특정 소수 업체를 지정하여 입찰 실시',
          '경쟁 없이 특정 사업자와 직접 계약',
        ],
      },
      {
        label: '경쟁성',
        cells: ['매우 높음 (원칙)', '중간', '낮음', '경쟁 없음 (예외)'],
      },
      {
        label: '참여자격',
        cells: ['제한 없음', '실적·기술·신용도 등', '사전 지명된 업체만', '특정 업체 (법정 요건)'],
      },
      {
        label: '참여 업체 수',
        cells: ['무제한', '자격기준에 따라 결정', '통상 2~5개사', '1개사'],
      },
      {
        label: '소액수의 기준',
        cells: ['물품 2천만원 이상\n공사 8천만원 이상\n용역 5천만원 이상', '동일', '동일', '물품 2천만원 이하\n공사 8천만원 이하\n용역 5천만원 이하'],
      },
    ],
  },
  {
    id: '2',
    subject: '1과목',
    title: '법률 적용 비교',
    description: '국가계약법·지방계약법·공기업계약사무규칙의 차이점',
    headers: ['국가계약법', '지방계약법', '공기업계약사무규칙'],
    rows: [
      {
        label: '적용대상',
        cells: ['중앙관서·기금·정부투자기관', '지방자치단체·지방공기관', '공기업·준정부기관'],
      },
      {
        label: '근거법령',
        cells: ['국가를 당사자로 하는 계약에 관한 법률', '지방자치단체를 당사자로 하는 계약에 관한 법률', '공기업·준정부기관 계약사무규칙'],
      },
      {
        label: '소액수의계약',
        cells: ['물품 2천만원\n공사 8천만원\n용역 5천만원 이하', '지역에 따라 유사 기준 적용', '별도 기준 적용'],
      },
      {
        label: '수의계약 근거',
        cells: ['시행령 제26조 각호 규정', '시행령 제25조 규정', '기관별 계약규정 적용'],
      },
      {
        label: '입찰 원칙',
        cells: ['일반경쟁 원칙', '일반경쟁 원칙', '일반경쟁 원칙 (기관별 정책 적용)'],
      },
    ],
  },

  // ────────── 1과목 추가 (1권 — 의미부여암기법) ──────────
  {
    id: 'c1-03',
    subject: '1과목',
    title: '추정가격 vs 예정가격 비교 — "추미예포"',
    description: '계약방법 결정(추정)과 낙찰 상한선(예정)의 차이 — 암기: "추미예포"',
    headers: ['추정가격', '예정가격'],
    rows: [
      {
        label: '정의',
        cells: [
          '입찰·계약 전 미리 추산한 가격\n(발주 적정성 판단 기준)',
          '입찰 시 낙찰가 상한 역할을 하는 가격\n(복수예비가격으로 결정)',
        ],
      },
      {
        label: 'VAT 포함 여부',
        cells: ['VAT 제외 (순수 원가 기준)', 'VAT 포함 (부가가치세 포함)'],
      },
      {
        label: '결정 시기',
        cells: ['계약방법 결정 이전 (발주 준비 단계)', '입찰 공고 이후 (개찰 직전 결정)'],
      },
      {
        label: '활용 목적',
        cells: [
          '① 계약방법 결정 (경쟁/수의 여부)\n② 소액수의계약 해당 여부 판단\n③ 2단계경쟁 적용 여부 기준',
          '① 낙찰 가능 상한가 설정\n② 예정가격 초과 입찰 → 무효\n③ 물가변동 조정의 기준가',
        ],
      },
      {
        label: '결정 방법',
        cells: [
          '원가계산·거래실례가격·유사사례 등으로 산출',
          '복수예비가격 15개 작성 (기초금액 ±2%)\n→ 4개 추첨 → 산술평균',
        ],
      },
      {
        label: '의미부여암기',
        cells: ['"추미(추정=VAT미포함)!" — 추측이니까 부가세 제외', '"예포(예정=VAT포함)!" — 예정은 완성형이라 부가세 포함'],
      },
    ],
  },
  {
    id: 'c1-04',
    subject: '1과목',
    title: '민법 해제 vs 해지 비교 — "해제소급 해지불소급"',
    description: '공공계약 분쟁에 직접 적용되는 민법 핵심 개념 — 1과목 항목5',
    headers: ['해제 (민법 제543조)', '해지 (민법 제550조)'],
    rows: [
      {
        label: '효력 범위',
        cells: ['소급효 — 계약 처음부터 없었던 것으로', '장래효 — 앞으로의 의무만 소멸'],
      },
      {
        label: '이미 이행된 부분',
        cells: ['원상회복 의무 발생 (반환해야 함)', '유효 유지 (반환 불필요)'],
      },
      {
        label: '적용 계약 유형',
        cells: ['일시적 계약 (물품 납품, 공사)', '계속적 계약 (용역, 임대차, 고용)'],
      },
      {
        label: '손해배상',
        cells: ['해제 + 손해배상 청구 가능', '해지 + 손해배상 청구 가능'],
      },
      {
        label: '공공계약 적용 예',
        cells: [
          '물품계약: 납품 하자 중대 시 계약 해제\n공사계약: 시공 불이행 시 해제',
          '용역계약: 지속적 계약으로 해지 적용\n(위탁계약, 연구용역 등)',
        ],
      },
      {
        label: '의미부여암기',
        cells: ['"제(제거)하면 소급!" — 해제는 처음부터 없앰', '"지(지속)는 미래만!" — 해지는 앞으로만 소멸'],
      },
    ],
  },
  {
    id: 'c1-05',
    subject: '1과목',
    title: '민법 도급 vs 위임 비교 — "도완 위사"',
    description: '공공계약에서 공사/물품(도급)과 용역(위임)의 구분 — 1과목 항목5',
    headers: ['도급 (민법 제664조)', '위임 (민법 제680조)'],
    rows: [
      {
        label: '의의',
        cells: ['일의 완성을 목적으로 하는 계약', '사무의 처리를 위탁하는 계약'],
      },
      {
        label: '핵심 요소',
        cells: ['결과(완성품) 책임', '과정(사무처리) 책임'],
      },
      {
        label: '보수 지급 시점',
        cells: ['일의 완성 후 지급 (원칙)', '위임 사무 처리 후 지급'],
      },
      {
        label: '하자담보 책임',
        cells: ['수급인이 하자에 대한 담보 책임', '위임인이 손해배상 청구 가능'],
      },
      {
        label: '공공계약 적용',
        cells: [
          '물품계약·공사계약\n(납품물·완성 건물 인도)',
          '용역계약·컨설팅\n(연구, 감리, IT서비스)',
        ],
      },
      {
        label: '의미부여암기',
        cells: ['"도(급)=완(성)!" — 도급은 결과물 납품 의무', '"위(임)=사(무)!" — 위임은 사무처리 과정 책임'],
      },
    ],
  },
  {
    id: 'c1-06',
    subject: '1과목',
    title: 'FA·DPS·MAS 전자조달시스템 비교 — "FA고정 DPS수시 MAS2단계"',
    description: '나라장터 3대 계약방식 비교 — 1과목 항목3 (전자조달시스템)',
    headers: ['FA (일반단가계약)', 'DPS (디지털서비스계약)', 'MAS (다수공급자계약)'],
    rows: [
      {
        label: '개념',
        cells: [
          '단일 공급자와 단가계약\n(고정 거래선)',
          '디지털서비스 특화 계약\n(클라우드·SaaS 등)',
          '복수 공급자와 단가계약\n(2단계경쟁 활용)',
        ],
      },
      {
        label: '계약 방식',
        cells: ['1개 업체와 고정 계약', '수시(수요 발생 시) 계약', '복수 업체 → 2단계 경쟁'],
      },
      {
        label: '구매 채널',
        cells: ['나라장터 일반 입찰', '디지털서비스몰', '나라장터 종합쇼핑몰'],
      },
      {
        label: '2단계경쟁',
        cells: ['해당 없음', '해당 없음', '추정가격 5천만원 이상 시 의무'],
      },
      {
        label: '주요 대상',
        cells: ['표준 물품·반복구매', 'IT·클라우드·SaaS\n(디지털서비스몰)', '다양한 물품·용역\n(종합쇼핑몰)'],
      },
      {
        label: '의미부여암기',
        cells: ['"FA=고정 1개 업체"', '"DPS=디지털 수시 계약"', '"MAS=복수 2단계 경쟁!"'],
      },
    ],
  },

  // ────────── 2과목 ──────────
  {
    id: '3',
    subject: '2과목',
    title: '낙찰자 결정 방법 비교',
    description: '적격심사·종합심사낙찰제·협상계약의 차이점 — 2과목 핵심',
    headers: ['적격심사', '종합심사낙찰제', '협상계약'],
    rows: [
      {
        label: '정의',
        cells: [
          '최저가 입찰자부터 순서대로 계약이행 능력을 심사',
          '가격·기술·신인도를 종합 평가하여 낙찰자 결정',
          '기술·가격 분리입찰 후 기술적합자와 협상으로 계약',
        ],
      },
      {
        label: '적용 대상',
        cells: ['물품·용역 계약 (주로)', '300억원 이상 공사계약', '기술·가격이 복합적인 사업'],
      },
      {
        label: '합격기준',
        cells: ['종합평점 95점 이상', '가격·기술 종합점수 최고득점자', '기술적합자 중 협상 합의'],
      },
      {
        label: '낙찰 결정',
        cells: ['최저가 → 순위별 심사 → 적격자', '종합 가중치 계산 → 최고점자', '협상 결과 최종 체결가격'],
      },
    ],
  },

  // ────────── 2과목 추가 (2권 공공조달 계획분석 — 의미부여암기법) ──────────
  {
    id: 'c2-02',
    subject: '2과목',
    title: '계약금액 결정 유형 비교 — FFP·CRC·T&M',
    description: '공공조달 계약유형 5가지 비교 — 암기: "확원원성시"',
    headers: ['FFP(확정고정가격)', '원가상환계약(CRC)', 'T&M(시간·자재)'],
    rows: [
      {
        label: '개념',
        cells: [
          '계약 전 가격 확정 — 이후 변경 불가',
          '실제 발생 비용 정산 방식',
          '투입 시간·자재 단위 단가로 산정',
        ],
      },
      {
        label: '수요기관 위험',
        cells: ['낮음 (가격 고정)', '높음 (비용 불확실)', '중간 (단가 고정, 수량 변동)'],
      },
      {
        label: '공급업체 위험',
        cells: ['높음 (비용 초과 시 손실)', '낮음 (실비 보상)', '중간'],
      },
      {
        label: '적합한 사업',
        cells: ['표준화된 물품·용역\n가격 예측 가능한 사업', '연구개발·시제품 제작\n불확실성 높은 사업', '유지보수·컨설팅\n범위 불명확한 사업'],
      },
      {
        label: '모니터링 필요도',
        cells: ['낮음', '높음 (비용 통제 필수)', '중간 (투입량 관리)'],
      },
      {
        label: '의미부여암기',
        cells: ['"확(정)=위험 고정!"', '"원(가)=불확실 위험 공유"', '"T&M=시간 자재 단가"'],
      },
    ],
  },
  {
    id: 'c2-03',
    subject: '2과목',
    title: '사전규격공개 vs 입찰공고 비교',
    description: '사전규격공개와 입찰공고의 목적·절차·기간 비교 — 2과목 핵심',
    headers: ['사전규격공개', '입찰공고'],
    rows: [
      {
        label: '목적',
        cells: [
          '경쟁 촉진 및 규격 독점 방지\n잠재적 공급업체 의견 수렴',
          '입찰 참가기회 공정하게 제공\n투명한 경쟁 보장',
        ],
      },
      {
        label: '공개기간',
        cells: [
          '20일 이상 (의견 수렴 기간)',
          '물품·용역: 7일 이상\n공사: 15일 이상\n(나라장터 공개일부터 마감일)',
        ],
      },
      {
        label: '검토 항목',
        cells: [
          '과업내용 적정성\n사업예산 적정성\n법규 준수 여부\n개선·보완 의견',
          '오류·법령위반 검토\n입찰보증금 제출방법\n입찰설명회 일정\n낙찰방법 명시',
        ],
      },
      {
        label: '의무 여부',
        cells: ['추정가격 2억원 이상 물품·용역\n(규정에 따라 의무화)', '모든 경쟁입찰 (의무)'],
      },
      {
        label: '암기 포인트',
        cells: ['"사전규격 20일 의견수렴"', '"공고: 물용7 공사15일"'],
      },
    ],
  },
  {
    id: 'c2-04',
    subject: '2과목',
    title: '입찰·제안평가 방법 비교 — 적격심사·협상계약·종합심사',
    description: '3대 낙찰방법의 평가기준·적용범위·합격기준 비교',
    headers: ['적격심사', '협상계약', '종합심사낙찰제'],
    rows: [
      {
        label: '적용 대상',
        cells: ['물품·용역 (주로)', '기술복합 용역·R&D', '300억원 이상 공사'],
      },
      {
        label: '평가기준',
        cells: [
          '이행실적·기술능력\n재무상태·신용도',
          '기술제안서+가격 분리평가\n(기술 배점 높음)',
          '가격(40~60%)+기술+신인도\n사회적 책임 가중치 포함',
        ],
      },
      {
        label: '합격 기준',
        cells: ['종합평점 95점 이상', '기술적합자 중 협상 합의', '종합점수 최고득점자'],
      },
      {
        label: '낙찰자 결정',
        cells: ['최저가→심사→적격자', '우선협상대상자 선정 후 협상', '가중치 계산 최고점자'],
      },
      {
        label: '의미부여암기',
        cells: ['"적격=95점 문턱!"', '"협상=기술+협상 2단계"', '"종심=300억 종합판정!"'],
      },
    ],
  },

  // ────────── 3과목 ──────────
  {
    id: '4',
    subject: '3과목',
    title: '계약 유형별 비교',
    description: '물품계약·용역계약·공사계약·MAS계약의 차이점',
    headers: ['물품계약', '용역계약', '공사계약', 'MAS계약'],
    rows: [
      {
        label: '정의',
        cells: ['기성물품 구매', '용역 서비스 제공', '자재·노력 투입 건설', '2인 이상과 단가계약'],
      },
      {
        label: '낙찰 기준',
        cells: ['최저가 적격심사', '기술+가격 종합평가', '종합심사(300억↑)\n또는 적격심사', '2단계경쟁'],
      },
      {
        label: '검사·검수',
        cells: ['수령 즉시 검사', '과업 완성 후 검수', '완공 검사', '배송 시마다 검사'],
      },
      {
        label: '보증금 종류',
        cells: ['입찰+계약보증금', '입찰+계약보증금', '입찰+계약+하자보수보증금', '입찰+계약보증금'],
      },
    ],
  },
  {
    id: '5',
    subject: '3과목',
    title: '보증금 종류 비교',
    description: '입찰보증금·계약보증금·선급금보증금·하자보수보증금의 차이점',
    headers: ['입찰보증금', '계약보증금', '선급금보증금', '하자보수보증금'],
    rows: [
      {
        label: '목적',
        cells: ['성실한 입찰 보장', '계약 이행 보장', '선급금 손실 보장', '하자보수 이행 보장'],
      },
      {
        label: '기준금액',
        cells: ['추정가격의 5% 이상', '계약금액의 10~15%', '선급금액의 100%', '계약금액의 2~5%'],
      },
      {
        label: '납부시기',
        cells: ['입찰 시', '계약 체결 시', '선급금 지급 시', '계약 체결 시 또는 준공 후'],
      },
      {
        label: '환급시기',
        cells: ['낙찰자 결정 후 (과실 시 몰수)', '계약 완료·검사합격 후', '선급금 정산 후', '하자보수 기간 만료 후'],
      },
      {
        label: '면제요건',
        cells: ['소액수의계약·국제경쟁입찰', '중소기업 3천만원 미만', '선급금 100만원 이하', '공사비 5백만원 이하'],
      },
    ],
  },

  // ────────── 3과목 추가 (3권 공공계약관리 — 의미부여암기법) ──────────
  {
    id: 'c3-03',
    subject: '3과목',
    title: '지체상금률 비교 — 물품·공사·용역',
    description: '계약 유형별 지체상금률 차이 — 암기: "물용0.25, 공사0.5 (공사는 2배!)"',
    headers: ['물품계약', '공사계약', '용역계약'],
    rows: [
      {
        label: '지체상금률 (1일당)',
        cells: ['0.25/1000 (0.025%)', '0.5/1000 (0.05%)', '0.25/1000 (0.025%)'],
      },
      {
        label: '공식',
        cells: [
          '지체일수 × 계약금액 × 0.25/1000',
          '지체일수 × 계약금액 × 0.5/1000',
          '지체일수 × 계약금액 × 0.25/1000',
        ],
      },
      {
        label: '최고한도',
        cells: ['계약금액의 30%', '계약금액의 30%', '계약금액의 30%'],
      },
      {
        label: '면제사유',
        cells: [
          '천재지변·발주자귀책·불가항력',
          '천재지변·발주자귀책·불가항력',
          '천재지변·발주자귀책·불가항력',
        ],
      },
      {
        label: '의미부여암기',
        cells: [
          '"물용0.25" — 가벼운 물건은 0.25',
          '"공사0.5" — 공사장은 더 크니까 2배!',
          '"물용0.25" — 용역도 물건과 동일',
        ],
      },
    ],
  },
  {
    id: 'c3-04',
    subject: '3과목',
    title: '물가변동 조정방법 비교 — 품목조정률 vs 지수조정률',
    description: '계약금액 조정 2가지 방법 비교 — 조정요건: 90일+3% 동시 충족',
    headers: ['품목조정률 방법', '지수조정률 방법'],
    rows: [
      {
        label: '개요',
        cells: [
          '계약금액 구성 품목/비목의 가격변동을 개별 산출하여 등락률 계산',
          '계약금액 구성 비목을 비목군으로 분류, 지수변동률 적용',
        ],
      },
      {
        label: '조정률 산출',
        cells: [
          '모든 품목·비목의 등락률을 개별 계산\n(거래실례가격 기준)',
          '비목군별 한국은행 발표 생산자물가\n기본분류지수·수입물가지수 적용',
        ],
      },
      {
        label: '적용 대상',
        cells: [
          '원가계산에 의한 예정가격 기준 계약\n(단기·소규모 계약)',
          '원가계산 기준 계약 (장기·대규모·복합공사)',
        ],
      },
      {
        label: '장점',
        cells: [
          '물가변동 실제 반영 가능\n(품목별 등락률 직접 산출)',
          '산출 간편·신속\n(지수는 공개 자료 활용)',
        ],
      },
      {
        label: '단점',
        cells: [
          '조정 시마다 계산 복잡·시간 소요',
          '평균 개념이므로 실제 물가변동이 반영\n안 될 가능성',
        ],
      },
      {
        label: '조정금액 공식',
        cells: [
          '물가변동적용대가 × 품목조정률',
          '물가변동적용대가 × 지수조정률(K)',
        ],
      },
    ],
  },
  {
    id: 'c3-05',
    subject: '3과목',
    title: '설계변경 계약금액 조정단가 비교',
    description: '계약상대자 요구·발주기관 요구·신기술공법 적용 시 단가 기준',
    headers: ['계약상대자 요구', '발주기관 요구', '신기술·신공법'],
    rows: [
      {
        label: '감소물량 단가',
        cells: ['계약단가', '계약단가', '계약단가'],
      },
      {
        label: '증가물량 단가',
        cells: [
          '계약단가\n(계약단가 > 예단가 시 예단가)',
          '계약단가와 설계변경 당시 단가에\n낙찰률을 곱한 금액 범위 내 협의\n(협의 불가 시 50/100)',
          '계약단가\n(계약단가 > 예단가 시 예단가)',
        ],
      },
      {
        label: '신규비목 단가',
        cells: [
          '설계변경당시 단가에 낙찰률 곱한 금액',
          '동일 (협의 적용)',
          '설계변경당시 단가에 낙찰률 곱한 금액',
        ],
      },
      {
        label: '조정금액',
        cells: [
          '당초 금액 대비 증감금액 그대로',
          '당초 금액 대비 증감금액 그대로',
          '절감액의 30%만 감액 조정\n(수급인 이익 70% 귀속)',
        ],
      },
      {
        label: '의미부여암기',
        cells: [
          '"계약상자 요구: 계약단가 기준"',
          '"발주기관 요구: 협의 후 50/100 안전망"',
          '"신기술: 절감30% 감액, 70%는 수급인 몫"',
        ],
      },
    ],
  },

  // ────────── 4권실무 ──────────
  {
    id: '6',
    subject: '4권실무',
    title: '원가계산 유형 비교 (4권 제3장)',
    description: '공공조달 원가·제조원가·용역원가·공사원가의 구성요소 비교',
    headers: ['공공조달 원가', '제조원가', '용역원가', '공사원가'],
    rows: [
      {
        label: '기본 구성',
        cells: ['재료비+노무비+경비', '직접재료비+직접노무비+직접경비', '인건비+제경비+기술료', '재료비+노무비+경비'],
      },
      {
        label: '간접비',
        cells: ['일반관리비', '제조간접비+일반관리비', '직접경비', '일반관리비'],
      },
      {
        label: '이윤',
        cells: ['이윤 (노무비+경비+일반관리비의 10%↓)', '이윤 별도', '이윤 해당없음', '이윤 (공사 규모별 적용)'],
      },
      {
        label: '세금',
        cells: ['부가가치세 별도', '부가가치세 별도', '부가가치세 별도', '부가가치세 포함'],
      },
      {
        label: '법적 근거',
        cells: ['예정가격작성 준칙', '예정가격작성 준칙', '용역원가계산 기준', '건설업 표준품셈'],
      },
      {
        label: '암기 포인트',
        cells: ['재노경 → 관이', '직접+간접→관이', '인경기+직접', '재노경→관이+부가세'],
      },
    ],
  },
  {
    id: '7',
    subject: '4권실무',
    title: 'MAS(다수공급자계약) vs 일반경쟁입찰 비교 (4권 제7장)',
    description: 'MAS 계약과 일반경쟁입찰의 주요 차이점 — 종합쇼핑몰 활용',
    headers: ['MAS(다수공급자계약)', '일반경쟁입찰'],
    rows: [
      {
        label: '계약 개념',
        cells: ['조달청이 복수의 공급자와 사전에 단가계약 체결', '발주기관이 개별 건마다 경쟁입찰로 낙찰자 선정'],
      },
      {
        label: '수요기관 구매',
        cells: ['나라장터 종합쇼핑몰에서 카탈로그 선택 후 직접 구매', '입찰공고 → 입찰 → 개찰 → 낙찰 → 계약'],
      },
      {
        label: '2단계경쟁',
        cells: ['추정가격 5천만원 이상 시 MAS 업체 간 2단계 경쟁 실시', '해당 없음 (단일 경쟁)'],
      },
      {
        label: '계약기간',
        cells: ['1~3년 단위 단가계약 (연장 가능)', '건별 계약'],
      },
      {
        label: '장점',
        cells: ['절차 간소화, 신속 구매, 다양한 선택지', '경쟁원리로 낮은 가격 실현'],
      },
      {
        label: '단점',
        cells: ['단가 검증 필요, 규격 표준화 어려움', '절차 복잡, 시간 소요'],
      },
      {
        label: '주요 법령',
        cells: ['다수공급자계약 물품 세부기준', '국가계약법 및 시행령'],
      },
    ],
  },
  {
    id: 'c4-03',
    subject: '4권실무',
    title: '물품·용역·공사 입찰절차 비교 — "물적용협공종" (4권 제6장)',
    description: '유형별 입찰절차의 낙찰방법·공고기간·서류 차이 비교',
    headers: ['물품계약', '용역계약', '공사계약'],
    rows: [
      {
        label: '주요 낙찰방법',
        cells: [
          '적격심사 (주로)\n최저가 순위자 이행능력 심사',
          '협상계약 (주로)\n기술+가격 분리평가',
          '종합심사낙찰제 (300억↑)\n적격심사 (300억 미만)',
        ],
      },
      {
        label: '입찰공고 기간',
        cells: ['7일 이상', '7일 이상', '15일 이상'],
      },
      {
        label: '제출 서류',
        cells: [
          '입찰서·사업자등록증\n직접생산확인서(해당 시)',
          '입찰서·기술제안서\n과업수행계획서',
          '입찰서·시공능력평가서\nPQ(사전심사) 서류',
        ],
      },
      {
        label: '착수 절차',
        cells: [
          '납품계획서 제출',
          '착수보고 (14일 이내)',
          '착공계 제출 (10~20일)',
        ],
      },
      {
        label: '검사·검수',
        cells: ['수령 즉시 검사', '과업 완성 후 검수', '완공 검사·준공 검사'],
      },
      {
        label: '의미부여암기',
        cells: [
          '"물적(物適)" — 물품은 적격심사!',
          '"용협(用協)" — 용역은 협상계약!',
          '"공종(工綜)" — 공사는 종합심사!',
        ],
      },
    ],
  },
  {
    id: 'c4-04',
    subject: '4권실무',
    title: '착수보고 vs 착공계 비교 — "용14 공10·20" (4권 제5장)',
    description: '용역계약(착수보고)과 공사계약(착공계)의 제출기한·내용 비교',
    headers: ['착수보고 (용역)', '착공계 (공사)'],
    rows: [
      {
        label: '적용 계약',
        cells: ['용역계약 (컨설팅·연구·IT 등)', '공사계약 (건설·시설 등)'],
      },
      {
        label: '제출 기한',
        cells: ['계약 후 14일 이내', '일반: 10일 이내\n대형공사: 20일 이내'],
      },
      {
        label: '제출 내용',
        cells: [
          '①과업수행계획서\n②투입인력 명단·자격\n③수행일정표\n④품질관리계획',
          '①공사착공신고서\n②현장대리인 배치계획\n③공정예정표\n④안전관리계획서',
        ],
      },
      {
        label: '승인권자',
        cells: ['발주기관 계약담당자', '발주기관 공사감독관'],
      },
      {
        label: '미제출 시',
        cells: ['계약 불이행으로 지체상금 부과 가능', '착공 지연 → 지체상금 부과'],
      },
      {
        label: '의미부여암기',
        cells: [
          '"용14" — 용역은 14일!\n(2주 안에 착수보고)',
          '"공10·20" — 공사는 10일(소규모)·20일(대형)!\n(공사장은 준비가 더 필요)',
        ],
      },
    ],
  },
  {
    id: 'c4-05',
    subject: '4권실무',
    title: '전략적 우선구매제도 4대 유형 비교 — "중녹혁사" (4권 제8장)',
    description: '중소기업·녹색제품·혁신제품·사회적가치 우선구매 비교',
    headers: ['중소기업 구매', '녹색제품 구매', '혁신제품 구매', '사회적가치 구매'],
    rows: [
      {
        label: '근거 법률',
        cells: [
          '중소기업제품 구매촉진법',
          '녹색제품 구매촉진법',
          '조달사업법 (혁신제품 지정)',
          '사회적기업 육성법 등',
        ],
      },
      {
        label: '구매 목표',
        cells: [
          '공공조달의 50% 이상',
          '기관별 녹색제품 의무구매 비율',
          '혁신제품 지정 후 수의계약 허용',
          '사회적기업 제품 우선구매',
        ],
      },
      {
        label: '인증 주체',
        cells: [
          '중소벤처기업부\n(직접생산확인)',
          '환경부\n(환경마크 인증)',
          '조달청장\n(혁신제품 지정)',
          '고용노동부 등\n(사회적기업 인증)',
        ],
      },
      {
        label: '계약 특례',
        cells: [
          '중소기업자간 경쟁\n공사용자재 직접구매',
          '생애주기비용(LCC) 적용\n녹색제품 가산점',
          '수의계약 허용\n시범구매→본구매 전환',
          '우선구매 비율 설정\n장애인기업 의무구매',
        ],
      },
      {
        label: '의미부여암기',
        cells: [
          '"중(소기업)=50% 구매"',
          '"녹(색)=환경마크 인증"',
          '"혁(신)=수의계약 특례"',
          '"사(회적)=장애인 의무"',
        ],
      },
    ],
  },
  {
    id: 'c4-06',
    subject: '4권실무',
    title: 'RFI·RFP·RFQ·SOW 문서 비교 — "정제견과" (4권 제4장)',
    description: '입찰 핵심 문서 4종의 목적·내용·활용 시점 비교',
    headers: ['RFI (정보요청서)', 'RFP (제안요청서)', 'RFQ (견적요청서)', 'SOW (과업명세서)'],
    rows: [
      {
        label: '목적',
        cells: [
          '시장조사·공급업체 능력 파악',
          '기술·가격 분리입찰 시\n평가기준 포함 제안 요청',
          '특정 물품·서비스의\n가격 견적 요청',
          '수행해야 할 과업의\n구체적 범위·기준 명시',
        ],
      },
      {
        label: '활용 단계',
        cells: [
          '조달계획 수립 단계\n(사전 시장조사)',
          '입찰 단계\n(공식 제안 요청)',
          '입찰 단계\n(가격 비교 목적)',
          '계약 체결 단계\n(과업 범위 확정)',
        ],
      },
      {
        label: '주요 내용',
        cells: [
          '업체 역량·경험·기술력\n시장 가격 정보',
          '기술 제안 요구사항\n평가 기준·배점\n제출 기한·형식',
          '단가·총가 견적\n납품 조건·기간',
          '과업 범위·목표\n산출물·일정\n품질 기준',
        ],
      },
      {
        label: '법적 구속력',
        cells: ['없음 (정보 수집용)', '있음 (입찰 공식 문서)', '조건부 (견적 유효기간)', '있음 (계약 첨부문서)'],
      },
      {
        label: '의미부여암기',
        cells: [
          '"정(보)=시장조사용"',
          '"제(안)=공식 입찰문서"',
          '"견(적)=가격 비교용"',
          '"과(업)=계약 첨부 명세"',
        ],
      },
    ],
  },
]

const subjectTabs: Array<{ id: SubjectFilter; label: string; activeColor: string; inactiveColor: string }> = [
  { id: '전체', label: '전체 (14개)', activeColor: 'bg-slate-800 text-white', inactiveColor: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300' },
  { id: '1과목', label: '1과목 법제도 (6개)', activeColor: 'bg-violet-700 text-white', inactiveColor: 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' },
  { id: '2과목', label: '2과목 조달계획 (4개)', activeColor: 'bg-blue-700 text-white', inactiveColor: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  { id: '3과목', label: '3과목 계약관리 (5개)', activeColor: 'bg-emerald-700 text-white', inactiveColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' },
  { id: '4권실무', label: '4권 관리실무 (6개)', activeColor: 'bg-rose-700 text-white', inactiveColor: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300' },
]

const subjectBadge: Record<string, string> = {
  '1과목': 'bg-violet-100 text-violet-700',
  '2과목': 'bg-blue-100 text-blue-700',
  '3과목': 'bg-emerald-100 text-emerald-700',
  '4권실무': 'bg-rose-100 text-rose-700',
}

export default function CompareCardsPage() {
  const [selectedSubject, setSelectedSubject] = useState<SubjectFilter>('전체')
  const [expandedId, setExpandedId] = useState<string | null>('1')
  const [quizModes, setQuizModes] = useState<Record<string, boolean>>({})

  const filteredData =
    selectedSubject === '전체'
      ? comparisonData.slice(0, 10) // 전체: 핵심 10개 표시 (과목별 균형)
      : comparisonData.filter((c) => c.subject === selectedSubject)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const toggleQuizMode = (id: string) => {
    setQuizModes((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleSubjectChange = (sub: SubjectFilter) => {
    setSelectedSubject(sub)
    setExpandedId(filteredData[0]?.id ?? null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-800 to-purple-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">비교표 학습</h1>
              <p className="text-purple-200 text-sm mt-1">출제기준 100% 반영 — 1권·2권·3권·4권 의미부여암기법 비교학습</p>
            </div>
            <Link
              href="/learn"
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition text-sm"
            >
              뒤로 가기
            </Link>
          </div>
          <p className="text-purple-100 text-lg">
            헷갈리는 개념들을 한눈에 비교하고 퀴즈로 확인하세요
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Subject filter tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {subjectTabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSubjectChange(tab.id)}
              className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-semibold whitespace-nowrap transition-all ${
                selectedSubject === tab.id ? tab.activeColor + ' shadow-md' : tab.inactiveColor
              }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Comparison tables */}
        <div className="space-y-6">
          {filteredData.map((comparison, idx) => (
            <motion.div
              key={comparison.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden"
            >
              {/* Accordion header */}
              <button
                onClick={() => toggleExpand(comparison.id)}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition bg-gradient-to-r from-purple-50 dark:from-purple-950/30 to-transparent"
              >
                <div className="text-left flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${subjectBadge[comparison.subject]}`}>
                      {comparison.subject}
                    </span>
                    <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                      {comparison.title}
                    </h2>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {comparison.description}
                  </p>
                </div>
                <motion.div
                  animate={{ rotate: expandedId === comparison.id ? 180 : 0 }}
                  className="flex-shrink-0 ml-4"
                >
                  <svg className="w-6 h-6 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </button>

              {/* Accordion content */}
              {expandedId === comparison.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="border-t border-slate-200 dark:border-slate-700"
                >
                  <div className="p-6">
                    {/* Quiz mode toggle */}
                    <div className="flex items-center justify-between mb-5">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={quizModes[comparison.id] || false}
                          onChange={() => toggleQuizMode(comparison.id)}
                          className="w-5 h-5 rounded"
                        />
                        <span className="font-semibold text-slate-700 dark:text-slate-300 text-sm">
                          📝 퀴즈 모드 켜기 (빈칸 채우기)
                        </span>
                      </label>
                      {quizModes[comparison.id] && (
                        <span className="text-sm text-amber-600 dark:text-amber-400 font-semibold">
                          빈칸을 채워보세요!
                        </span>
                      )}
                    </div>

                    {/* Table */}
                    <CompareTable
                      title=""
                      headers={comparison.headers}
                      rows={comparison.rows}
                      quizMode={quizModes[comparison.id] || false}
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* 4권 신규 안내 */}
        {(selectedSubject === '전체' || selectedSubject === '4권실무') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-700 rounded-xl"
          >
            <p className="text-rose-800 dark:text-rose-300 text-sm font-medium">
              🆕 <strong>4권실무 6개 비교표</strong>: 원가계산·MAS·물품/용역/공사 입찰·착수보고/착공계·우선구매제도·RFI/RFP/RFQ/SOW 비교!
            </p>
          </motion.div>
        )}

        {/* Study tips */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 p-6 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-2xl"
        >
          <h3 className="text-xl font-bold text-purple-900 dark:text-purple-200 mb-3">
            📚 효과적인 비교표 학습법
          </h3>
          <ul className="space-y-2 text-purple-800 dark:text-purple-300 text-sm">
            <li className="flex gap-2"><span className="font-bold flex-shrink-0">1.</span><span>먼저 표의 구조를 파악하고 각 항목을 읽어보세요</span></li>
            <li className="flex gap-2"><span className="font-bold flex-shrink-0">2.</span><span>같은 행(row)을 읽어 각 개념의 차이점을 명확히 파악하세요</span></li>
            <li className="flex gap-2"><span className="font-bold flex-shrink-0">3.</span><span>퀴즈 모드로 전환하여 빈칸을 채워보며 이해도를 체크하세요</span></li>
            <li className="flex gap-2"><span className="font-bold flex-shrink-0">4.</span><span><strong>4권실무</strong>: 재노경관이(원가)·물적용협공종(입찰)·용14공10·20(착수)·중녹혁사(우선구매)·정제견과(문서) 암기!</span></li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}
