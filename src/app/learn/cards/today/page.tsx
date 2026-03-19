'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronLeftIcon, ChevronRightIcon, CheckCircleIcon } from 'lucide-react'
import { ConceptCard } from '@/components/learn/ConceptCard'
import { CardReviewButtons } from '@/components/learn/CardReviewButtons'

type SubjectFilter = '전체' | '1과목' | '2과목' | '3과목' | '4권실무'

interface ConceptCardData {
  id: string
  front: string
  back: string
  category: 'concept' | 'compare' | 'number' | 'law' | 'procedure'
  difficulty: 1 | 2 | 3
  lawReference?: string
  subject: '1과목' | '2과목' | '3과목' | '4권실무'
}

// ── 1과목: 공공조달과 법제도 이해 (9개) — 의미부여암기법 완전 적용 ──────────────
const s1Cards: ConceptCardData[] = [
  {
    id: 's1-001',
    subject: '1과목',
    front: '공공조달의 정의 및 특성',
    back: '공공조달이란 국가·지자체·공공기관이 재화·용역·공사를 구매하는 행위이다.\n\n【상업적 구매 vs 공공조달 차이】\n• 상업적 구매: 이윤추구, 유연한 절차\n• 공공조달: 공익목적, 법령 기반, 경쟁원칙\n\n법적 근거: 국가계약법, 조달사업법',
    category: 'concept',
    difficulty: 1,
    lawReference: '국가계약법 제1조',
  },
  {
    id: 's1-002',
    subject: '1과목',
    front: '경쟁적 공공조달 방법 3가지',
    back: '①일반경쟁: 자격요건 없이 모든 사업자 참여 (원칙)\n②제한경쟁: 실적·기술 등 자격요건 충족자만 참여\n③지명경쟁: 2~5개사를 지명하여 입찰 실시\n\n【의미부여암기】 "일제지"\n일(반)·제(한)·지(명) — 경쟁성 高→中→低 순서\n\n비경쟁: 수의계약(1개사 직접 계약), 소액구매',
    category: 'compare',
    difficulty: 2,
    lawReference: '국가계약법 시행령 제12조~제14조',
  },
  {
    id: 's1-003',
    subject: '1과목',
    front: '전자조달시스템(나라장터) 연계 시스템',
    back: '나라장터(www.g2b.go.kr) 연계 5대 시스템:\n①종합쇼핑몰: MAS 물품 구매\n②혁신장터: 혁신제품 구매\n③벤처나라: 벤처기업 제품\n④디지털서비스몰: IT서비스·클라우드\n⑤이음장터: 소셜벤처·사회적기업\n\n【의미부여암기】 "종혁벤디이"\n"종합혁신 벤처디지털 이음장터!" 한 줄로 외우기',
    category: 'concept',
    difficulty: 2,
    lawReference: '전자조달의 이용 및 촉진에 관한 법률',
  },
  {
    id: 's1-004',
    subject: '1과목',
    front: '전략적 공공조달 — 사회적가치 지원제도',
    back: '【4대 우선구매제도】\n①장애인기업: 조달물자 우선구매\n②중증장애인생산품: 의무구매 (기관별 비율 설정)\n③여성기업: 물품·용역 우선구매\n④사회적기업: 제품·서비스 우선구매\n\n+ESG: 공공조달에서 환경·사회·지배구조 고려\n\n【의미부여암기】 "장중여사"\n장(애인)·중(증장애인)·여(성기업)·사(회적기업)\n"장중한 여사님!" — 4대 우선구매 기억!',
    category: 'concept',
    difficulty: 2,
    lawReference: '장애인기업활동 촉진법',
  },
  {
    id: 's1-005',
    subject: '1과목',
    front: '부정당업자 제재 처분 기준',
    back: '부정당업자: 담합·허위서류 제출·뇌물 등으로 공정경쟁을 저해한 업체\n\n【제재 내용】\n• 입찰참가자격 제한: 최대 2년\n• 처분권자: 조달청장 또는 해당 발주기관 장\n• 부당이득금 환수 가능\n\n【절차 5단계 — 의미부여암기】 "사통청결공"\n사(유)→통(보)→청(문)→결(정)→공(개)\n"사유가 통보되면 청문하고 결정 후 공개!"\n\n법근거: 국가계약법 제27조',
    category: 'law',
    difficulty: 3,
    lawReference: '국가계약법 제27조 (부정당업자 제재)',
  },
  {
    id: 's1-006',
    subject: '1과목',
    front: '소액수의계약 기준금액 (국가계약법)',
    back: '【소액수의계약 기준】\n• 물품: 2천만원 이하\n• 공사: 8천만원 이하\n• 용역: 5천만원 이하\n\n【의미부여암기】 "물2 공8 용5"\n스토리: "물건(2천)은 공(共)팔(8천)하고 용(5천)감하게 구매!"\n\n이 금액 이하는 경쟁입찰 생략, 수의계약 가능\n\n법근거: 국가계약법 시행령 제7조',
    category: 'number',
    difficulty: 1,
    lawReference: '국가계약법 시행령 제7조',
  },
  {
    id: 's1-007',
    subject: '1과목',
    front: '공공조달 5대 기본원칙',
    back: '【5대 기본원칙 (1과목 항목2 핵심)】\n①투명성(Transparency): 공개·정보 접근 보장\n②VFM(가치 대비 예산 효율): 최적 비용·가치\n③경쟁(Competition): 공정한 경쟁기회 보장\n④차별금지(Non-discrimination): 동등한 참여기회\n⑤책임성(Accountability): 결과에 대한 책임\n\n【의미부여암기】 "투VFM경차책"\n"투명하게 VFM을 경쟁하여 차별 없이 책임지자!"\n\n실행원칙: 공개성·효율성·공정성·무차별성·책임성',
    category: 'concept',
    difficulty: 2,
    lawReference: '공공조달 기본원칙 (OECD 기준)',
  },
  {
    id: 's1-008',
    subject: '1과목',
    front: '추정가격 vs 예정가격 차이',
    back: '【추정가격 vs 예정가격】\n\n추정가격:\n• VAT 제외\n• 발주 전 미리 추정한 가격\n• 계약방법 결정 기준 (경쟁/수의 판단)\n\n예정가격:\n• VAT 포함\n• 복수예비가격(15개) → 4개 추첨 → 산술평균\n• 낙찰 상한선 (이를 초과하면 무효)\n\n【의미부여암기】 "추미예포"\n추(정가격)=VAT미포함, 예(정가격)=VAT포함\n"추미예포!" — 추는 미포함, 예는 포함!\n\n법근거: 국가계약법 시행령 제7조·제9조',
    category: 'compare',
    difficulty: 2,
    lawReference: '국가계약법 시행령 제7조, 제9조',
  },
  {
    id: 's1-009',
    subject: '1과목',
    front: '민법 해제 vs 해지 — 공공계약 적용',
    back: '【해제 vs 해지 — 핵심 차이】\n\n해제(민법 제543조):\n• 소급효(계약 처음부터 없었던 것으로)\n• 이미 이행된 부분 → 원상회복 의무\n• 일시적 계약(물품·공사 등)\n\n해지(민법 제550조):\n• 장래효(앞으로의 이행의무만 소멸)\n• 이미 이행된 부분은 유효 유지\n• 계속적 계약(용역·임대차 등)\n\n【의미부여암기】 "해제소급 해지불소급"\n해(제)=소급효(되돌아감), 해(지)=불소급(앞으로만)\n"제(제거)하면 소급, 지(지속)는 미래만!"\n\n법근거: 민법 제543조~제550조',
    category: 'law',
    difficulty: 3,
    lawReference: '민법 제543조 (해제), 제550조 (해지)',
  },
]

// ── 2과목: 공공조달계획 수립 및 분석 (6개) — 의미부여암기법 완전 적용 ──────────
const s2Cards: ConceptCardData[] = [
  {
    id: 's2-001',
    subject: '2과목',
    front: '공공조달 수명주기 5단계 — 전체 흐름',
    back: '【공공조달 5단계 수명주기】\n①조달계획 수립 — 수요분석·시장조사·전략수립\n②시장조사 — 공급역량·계약유형·예산 적정성 분석\n③입찰·낙찰 — 공고→설명회→접수→개찰→낙찰자 결정\n④계약관리 — CMP 개발·이행점검·변경관리\n⑤계약완료·종결 — 인수·대금지급·성과평가\n\n【의미부여암기】 "조시입계종"\n조(달계획)→시(장조사)→입(찰낙찰)→계(약관리)→종(결)\n"조씨가 시간에 입계 종례!" 로 기억!',
    category: 'procedure',
    difficulty: 2,
  },
  {
    id: 's2-002',
    subject: '2과목',
    front: '사전규격공개와 입찰공고문 분석',
    back: '【사전규격공개 분석 체크리스트】\n• 과업내용 적정성 검토\n• 사업예산 적정성 검토\n• 법규 준수 여부 확인\n• 개선·보완 의견 제시 (의견수렴 기간: 20일 이상)\n\n【입찰공고문 분석 포인트】\n• 오류·법령위반 검토\n• 입찰보증금 제출방법 확인\n• 입찰설명회 일정 확인 (마감 최소 10~15일 전)\n\n【의미부여암기】 "규개입설"\n규격(공개)→개선의견→입찰공고→설명회 참석',
    category: 'concept',
    difficulty: 2,
  },
  {
    id: 's2-003',
    subject: '2과목',
    front: '낙찰자 결정 방법 4가지 — 적협희종',
    back: '①적격심사: 최저가 순위자부터 이행능력 심사 (물품·용역 95점 이상)\n②협상계약: 기술+가격 분리평가, 우선협상대상자와 협상\n③희망수량경쟁입찰: 수요기관이 희망 수량 제시 → 단가 경쟁\n④종합심사낙찰제: 300억원 이상 공사, 가격+기술+신인도 종합평가\n\n【의미부여암기】 "적협희종"\n적(격심사)·협(상계약)·희(망수량)·종(합심사)\n"적합한 협상으로 희망하던 종합 점수!" 로 기억!\n\n법근거: 국가계약법 시행령 제42조~제44조',
    category: 'compare',
    difficulty: 3,
    lawReference: '국가계약법 시행령 제42조',
  },
  {
    id: 's2-004',
    subject: '2과목',
    front: '입찰서 제출 및 무효 입찰 사유',
    back: '【입찰서 제출방법】\n나라장터 전자입찰 (원칙): 전자서명 후 제출\n마감시간 이후 제출 → 무조건 무효\n\n【무효입찰 주요 6가지 사유】\n①입찰보증금 미납\n②자격 미달 업체\n③동일인 2개 이상 입찰\n④입찰가격이 예정가격 초과\n⑤허위 서류 제출\n⑥기재사항 오류 또는 불명확\n\n【의미부여암기】 "보자동초허기"\n보(증금)·자(격미달)·동(일인중복)·초(과)·허(위)·기(재오류)',
    category: 'concept',
    difficulty: 2,
  },
  {
    id: 's2-005',
    subject: '2과목',
    front: '계약금액 결정 유형 — FFP vs 원가상환계약',
    back: '【계약금액 결정 5대 유형】\n①FFP(확정고정가격): 사전에 가격 고정 — 가장 일반적·위험 낮음\n②원가상환계약(CRC): 실발생비용 정산 — 가격 불확실 사업\n③원가기반 인센티브: 목표비용 절감 시 인센티브 지급\n④성과기반 인센티브: 성과목표 달성도에 따라 보너스/페널티\n⑤T&M(시간·자재계약): 단위시간·자재 단가로 계산\n\n【의미부여암기】 "확원원성시"\n확(정고정)→원(가상환)→원(가인센)→성(과인센)→시(간자재)\n\nFFP: 위험도 최저 / CRC: 위험도 최고',
    category: 'compare',
    difficulty: 3,
  },
  {
    id: 's2-006',
    subject: '2과목',
    front: 'RFI·RFP·SOW — 입찰 핵심 문서 3가지',
    back: '【입찰 핵심 문서】\n①RFI (정보제공요청서): 시장조사 단계에서 공급업체 능력 파악\n②RFP (제안요청서): 기술·가격 분리 입찰 시 평가기준 포함\n③SOW (과업명세서): 수행해야 할 과업의 구체적 범위·기준\n\n【의미부여암기】 "정제과"\n정(보요청)→제(안요청)→과(업명세)\n"정보를 제안서로 과업 명세하라!"\n\n【SMART 구매사양 5요소】\n명확(Specific)·측정(Measurable)·달성(Achievable)·현실(Realistic)·시간(Time-bounded)\n"명측달현시" — 명확한 조달사양의 5요건!',
    category: 'concept',
    difficulty: 2,
  },
]

// ── 3과목: 공공계약관리 (6개) — 의미부여암기법 완전 적용 ─────────────────────
const s3Cards: ConceptCardData[] = [
  {
    id: 's3-001',
    subject: '3과목',
    front: '지체상금률 — 지연납품·시공 시 부과 기준',
    back: '【지체상금률 (1일당 계약금액 대비)】\n• 물품: 0.25/1000 (0.025%)\n• 공사: 0.5/1000 (0.05%) ← 물품의 2배!\n• 용역: 0.25/1000 (0.025%)\n\n【의미부여암기】 "물용반, 공사배"\n물품·용역은 0.25, 공사(공공사업)는 0.5로 2배!\n"공사장이 더 늦어지면 2배로 벌금"\n\n【최고한도】 계약금액의 30%\n【면제사유】 ①천재지변 ②발주자 귀책사유 ③불가항력\n\n법근거: 국가계약법 시행령 제74조',
    category: 'number',
    difficulty: 2,
    lawReference: '국가계약법 시행령 제74조',
  },
  {
    id: 's3-002',
    subject: '3과목',
    front: '3대 보증금 — 계약보증금·이행보증금·하자보수보증금',
    back: '【3대 보증금 기준】\n①계약보증금: 계약금액의 10% 이상\n②이행보증금: 계약금액의 10~15% (이행보증서 대체가능)\n③하자보수보증금: 계약금액의 2~5%\n④입찰보증금: 추정가격의 5% 이상\n\n【의미부여암기】 "계10 이10~15 하2~5 입5"\n계(계약)는 10, 이(이행)는 10~15, 하(하자)는 2~5, 입(입찰)은 5!\n\n스토리: "계약하면(10) 이행하고(10~15) 하자나면(2~5) 환수!"\n\n법근거: 국가계약법 시행령 제50조·제52조',
    category: 'number',
    difficulty: 2,
    lawReference: '국가계약법 시행령 제50조, 제52조',
  },
  {
    id: 's3-003',
    subject: '3과목',
    front: '물가변동(E/S) 계약금액 조정 — 2가지 요건과 방법',
    back: '【조정요건 — 2가지 동시 충족】\n①계약체결일로부터 90일 이상 경과\n②품목조정률 또는 지수조정률 ±3% 이상 증감\n\n【의미부여암기】 "구삼(9·3)이 동시에 충족!"\n구(90일)가 지나고 삼(3%)이 되면 조정 개시!\n\n【조정방법 2가지】\n①품목조정률: 품목별 가격변동 직접 산출 (단기·소규모)\n②지수조정률: 생산자물가지수·노임단가 지수 적용 (장기·대규모)\n\n【조정금액】= 물가변동적용대가 × 품목·지수조정률\n\n법근거: 국가계약법 시행령 제64조',
    category: 'procedure',
    difficulty: 3,
    lawReference: '국가계약법 시행령 제64조',
  },
  {
    id: 's3-004',
    subject: '3과목',
    front: 'MAS(다수공급자계약) 2단계경쟁 — 핵심 기준과 절차',
    back: '【MAS 2단계경쟁 적용 기준】\n①추정가격 5천만원 이상\n②동일 품목 MAS 업체 2개 이상\n\n【의미부여암기】 "MAS 5천 2개면 경쟁!"\n5천만원 넘고, 2개 업체 있으면 → 반드시 2단계경쟁\n\n【절차 5단계】\n①수요기관 구매요청\n②2단계경쟁 개시 공지\n③가격·비가격 요소 경쟁\n④최종 공급자 선정\n⑤납품→검수→대금지급\n\n나라장터 종합쇼핑몰에서 진행\n법근거: 다수공급자계약 물품 세부기준',
    category: 'procedure',
    difficulty: 3,
    lawReference: '다수공급자계약 물품 세부기준',
  },
  {
    id: 's3-005',
    subject: '3과목',
    front: '설계변경에 따른 계약금액 조정 — 사유와 절차',
    back: '【설계변경 4가지 사유】\n①설계서 내용 불분명·오류·모순\n②공사현장 상태가 설계서와 상이 (지질·용수 등)\n③새로운 기술·공법 사용 (공사비 절감·기간 단축)\n④발주기관이 설계변경 필요를 인정한 경우\n\n【의미부여암기】 "불상기발(불상한 기발함)"\n불분명(불) + 상이한 현장(상) + 기술공법(기) + 발주기관요구(발)\n\n【변경계약 절차 6단계】\n①가능 여부 판단 → ②합의각서 작성 → ③변경의뢰 → ④초안 송신 → ⑤보증서·인지세 제출 → ⑥변경계약 체결\n\n법근거: 국가계약법 시행령 제65조',
    category: 'procedure',
    difficulty: 3,
    lawReference: '국가계약법 시행령 제65조',
  },
  {
    id: 's3-006',
    subject: '3과목',
    front: '납품검사·검수·대금지급 — 계약종결 절차',
    back: '【계약종결 관리 순서】\n①납품(시공) 완료 통보\n②검사·검수 실시 (수요기관 또는 전문기관)\n③검사결과 통보 (합격/불합격)\n④대금 청구서 제출\n⑤대금 지급 (검사 완료 후 5일 이내 원칙)\n⑥하자보수보증금 반환 (하자보수기간 만료 후)\n\n【의미부여암기】 "납검대하"\n납(납품) → 검(검사) → 대(대금) → 하(하자보증금)\n"납품하고 검사받고 대금받고 하자기간 끝나면 보증금 돌려받기"\n\n지체상금: 납기 초과 일수 × 계약금액 × 지체상금률\n법근거: 국가계약법 제15조, 시행령 제74조',
    category: 'procedure',
    difficulty: 2,
    lawReference: '국가계약법 제15조, 시행령 제74조',
  },
  {
    id: 's3-007',
    subject: '3과목',
    front: '계약의 5대 기능 — 효과적 계약관리의 핵심',
    back: '【계약의 5대 기능 (3권 제1장 핵심)】\n①증거기능: 계약 내용의 문서화·입증 수단\n②관리기능: 이행 점검·품질·일정 관리 기준\n③위험전가기능: 보증금·보험으로 위험 분산\n④지불기능: 대가 지급 조건·시기·방법 명시\n⑤동기부여기능: 인센티브·페널티로 이행 촉진\n\n【의미부여암기】 "증관위지동"\n증(거)·관(리)·위(험전가)·지(불)·동(기부여)\n"증거로 관리하여 위험을 지불하고 동기부여!"\n\n【CMP(계약관리계획)】 5대 기능을 실행하는 종합계획서',
    category: 'concept',
    difficulty: 2,
    lawReference: '국가계약법 제5조 (계약의 원칙)',
  },
  {
    id: 's3-008',
    subject: '3과목',
    front: '물품계약 일반절차·낙찰자결정·이행관리 — 3권 제2장',
    back: '【물품계약 일반절차】\n①입찰참가자격 등록 → ②입찰공고 확인\n→ ③입찰서 제출 → ④적격심사(95점↑)\n→ ⑤낙찰자결정 → ⑥계약체결\n\n【낙찰자결정 방법】\n• 추정 2.1억↑: 적격심사 (최저가 순위)\n• 소액: 수의계약 (물2·공8·용5)\n• 외자구매: 국제경쟁입찰\n\n【의미부여암기】 "등공입적낙계"\n등(록)→공(고)→입(찰)→적(격심사)→낙(찰)→계(약)\n\n【물품계약 이행관리】 공정·품질·안전관리 + 설계변경·금액조정',
    category: 'procedure',
    difficulty: 2,
    lawReference: '국가계약법 시행령 제42조 (적격심사)',
  },
  {
    id: 's3-009',
    subject: '3과목',
    front: '공공조달 품질관리 3대 제도 — 3권 제5장',
    back: '【품질관리 3대 제도 (3권 제5장 핵심)】\n①직접생산확인제도: 중소기업이 핵심부품을 직접 제조하는지 확인\n  - 중소벤처기업부장관 확인, 3년 연속 생산실적\n②안전관리물자 지정제도: 안전 관련 물자를 지정·관리\n  - 조달청장 지정, 품질검사 의무\n③품질보증조달물품 지정제도: 품질 우수 물품을 인증·등록\n  - 조달청장 지정, 나라장터 등록 우대\n\n【의미부여암기】 "직안품"\n직(접생산확인)·안(전관리물자)·품(질보증조달물품)\n"직접 안전한 품질!" — 3대 품질관리의 핵심!',
    category: 'concept',
    difficulty: 3,
    lawReference: '조달사업법, 중소기업제품 구매촉진법',
  },
  {
    id: 's3-010',
    subject: '3과목',
    front: '기술형공사 3대 수행방식 — 일괄·대안·기술제안입찰',
    back: '【기술형공사 3대 방식 (3권 제4장 핵심)】\n①일괄입찰(턴키): 설계+시공 일괄 수행\n  - 대형공사(300억↑), 설계책임 수급인\n②대안입찰: 원안 설계 대신 대안 설계 제출\n  - 기본설계 기반, 시공비 절감 가능\n③기술제안입찰: 시공방법 등 기술제안\n  - 실시설계 완료 후, 시공 중심 제안\n\n【의미부여암기】 "일대기"\n일(괄·턴키)·대(안)·기(술제안)\n"일대기(一代記)!" — 기술형공사의 세 가지 이야기!\n\n【핵심 차이】 일괄=설계+시공, 대안=대안설계, 기술제안=시공방법',
    category: 'compare',
    difficulty: 3,
    lawReference: '국가계약법 시행령 제80조~제97조',
  },
]

// ── 4권실무: 공공조달 관리실무 (9개) — 의미부여암기법 완전 적용 ──────────────
const s4Cards: ConceptCardData[] = [
  {
    id: 's4-001',
    subject: '4권실무',
    front: '나라장터 입찰참가자격 등록 절차 (4권 제1장)',
    back: '【전체 등록 절차 7단계】\n①개인회원 가입(본인인증)\n②이용약관 동의\n③입찰참가자격 등록신청\n④등록신청 온라인 서류제출\n⑤등록신청 현황 조회\n⑥입찰참가자격 등록신청 조회\n⑦승인 또는 반려\n\n【의미부여암기】 "가약신서현조승"\n가(입)→약(관)→신(청)→서(류)→현(황)→조(회)→승(인)\n"가약한 신서를 현장에서 조사하고 승인!" 으로 7단계 기억!\n\n유효기간: 3년\n법근거: 국가종합전자조달시스템 입찰참가자격 등록규정',
    category: 'procedure',
    difficulty: 2,
    lawReference: '국가종합전자조달시스템 입찰참가자격 등록규정',
  },
  {
    id: 's4-002',
    subject: '4권실무',
    front: '경쟁입찰참가자격 등록 필수서류 4가지',
    back: '【필수 제출 서류】\n①사업자등록증\n②법인등기부등본\n③인감증명서 또는 본인서명사실확인서\n④공동인증서\n\n【의미부여암기】 "사법인공"\n사(업자등록증)·법(인등기부)·인(감증명)·공(동인증서)\n"사법(司法)인이 공인(公認)한다!" — 4대 필수서류!\n\n등록증 유효기간: 3년 (기간 만료 전 갱신 필수)\n잘못된 정보 → 입찰참가자격 상실 위험',
    category: 'concept',
    difficulty: 1,
    lawReference: '국가종합전자조달시스템 입찰참가자격 등록규정',
  },
  {
    id: 's4-003',
    subject: '4권실무',
    front: '직접생산확인기준 — 중소기업자간 경쟁제품',
    back: '【직접생산확인 개요】\n• 확인 주체: 중소벤처기업부장관\n• 대상: 중소기업자간 경쟁제품 입찰 참여 업체\n\n【판단 기준 (2가지)】\n①해당 물품 핵심부품 직접 제조\n②최근 3년간 연속 생산실적 보유\n\n【의미부여암기】 "중직핵삼"\n중(소기업)이 직(접) 핵(심부품)을 삼(3)년 생산해야 자격!\n"중직(中直)한 핵심 3년!" — 성실하게 3년 직접 제조!\n\n미충족 시: 입찰참가자격 박탈',
    category: 'concept',
    difficulty: 3,
    lawReference: '중소기업자간 경쟁제품 직접생산확인에 관한 기준',
  },
  {
    id: 's4-004',
    subject: '4권실무',
    front: '원가계산 유형별 구성요소 (4권 제3장)',
    back: '【4가지 원가계산 유형】\n①공공조달 원가: 재료비+노무비+경비+일반관리비+이윤\n②제조원가: 직접원가(재료+노무+경비)+제조간접비+일반관리비+이윤\n③용역원가: 인건비+제경비+기술료+직접경비\n④공사원가: 재료비+노무비+경비+일반관리비+이윤+부가가치세\n\n【의미부여암기】 "재노경관이"\n재(료비)·노(무비)·경(비)·관(리비)·이(윤)\n"재능있는 경관이!" — 원가의 5대 구성요소!\n\n용역만 다름: "인제기직" — 인(건비)·제(경비)·기(술료)·직(접경비)\n법근거: 원가계산에 의한 예정가격작성 준칙',
    category: 'compare',
    difficulty: 3,
    lawReference: '원가계산에 의한 예정가격작성 준칙',
  },
  {
    id: 's4-005',
    subject: '4권실무',
    front: '기술(규격)협상과 가격협상 절차 (4권 제4장)',
    back: '【협상계약 전체 흐름 7단계】\n①RFP(제안요청서) 작성\n②제안서 접수\n③기술평가 → 기술적합자 선정\n④우선협상대상자 선정 (기술점수 최고득점자)\n⑤기술협상 (과업범위·규격 조정)\n⑥가격협상 (예산범위 내 합리적 가격 결정)\n⑦협상 성공 → 계약체결 / 실패 → 차순위자\n\n【의미부여암기】 "제접기우기가계"\nRFP제(작)→접(수)→기(술평가)→우(선협상)→기(술협상)→가(격협상)→계(약)\n"제 접시에 기우뚱 기가 막힌 계약!"\n\n핵심: 기술평가와 가격평가를 분리하여 진행',
    category: 'procedure',
    difficulty: 2,
    lawReference: '국가계약법 시행령 제43조',
  },
  {
    id: 's4-006',
    subject: '4권실무',
    front: '공급계획 수립 절차 — 정보수집·분석·예측 (4권 제2장)',
    back: '【공급계획 수립 3단계】\n①공급정보 수집: 시장동향·공급업체·가격정보 수집\n②조달데이터 분석·예측: 과거 데이터 기반 수요 예측, 공급리스크 분석\n③수요기관 선정·배분: 수요기관별 물량 배분, 공급일정 수립\n\n【의미부여암기】 "정분선"\n정(보수집)→분(석예측)→선(정배분)\n"정보를 분석해서 선정한다!" — 3단계 핵심 흐름\n\n【공급정보 수집 4대 채널】\n나라장터·조달청 통계·시장조사보고서·업체 직접문의\n\n【핵심 분석 도구】\nABC 분석, 파레토 분석, 리드타임 분석\n법근거: 조달사업법 시행령',
    category: 'procedure',
    difficulty: 2,
    lawReference: '조달사업법 시행령',
  },
  {
    id: 's4-007',
    subject: '4권실무',
    front: '계약체결 및 착수보고·착공계 절차 (4권 제5장)',
    back: '【계약체결 절차 5단계】\n①낙찰통보 수령\n②계약서 작성 (표준계약서 활용)\n③보증서 제출 (계약보증금 10%)\n④인지세 납부 (1천만원 초과 계약)\n⑤계약서 서명·날인\n\n【의미부여암기】 "낙작보인서"\n낙(찰)→작(성)→보(증)→인(지세)→서(명)\n"낙서에 작은 보인 서명!" 으로 5단계 기억!\n\n【착수보고 vs 착공계】\n• 착수보고: 용역계약 — 계약 후 14일 이내\n• 착공계: 공사계약 — 10일(일반) / 20일(대형공사) 이내\n\n【의미부여암기】 "용14 공10·20"\n용역은 14일, 공사는 10일(소)·20일(대)!\n법근거: 물품·용역·공사 계약일반조건',
    category: 'procedure',
    difficulty: 3,
    lawReference: '국가계약법 시행령 제50조, 물품·용역·공사 계약일반조건',
  },
  {
    id: 's4-008',
    subject: '4권실무',
    front: '계약이행 보증 관리 — 3대 보증서 실무 (4권 제5장)',
    back: '【계약이행 3대 보증서】\n①이행보증서: 계약 불이행 시 손해배상 보장\n  - 비율: 계약금액의 10~15%\n  - 제출처: 서울보증보험·금융기관 발행\n②계약보증금: 계약금액의 10% 이상 현금납부\n  - 보증서 대체 가능 (이행보증보험증권)\n③선급금보증: 선급금 수령 시 반드시 제출\n  - 비율: 선급금의 100% (선급금은 계약금액의 70% 이내)\n\n【의미부여암기】 "이계선 — 10·10·100"\n이(행)10~15% → 계(약)10% → 선(급금)100%\n"이계선(二契先)! 이행-계약-선급금 순서대로!"\n\n【보증서 미제출 시】 계약체결 불가·기존 계약 해제 가능\n법근거: 국가계약법 시행령 제50조~제52조',
    category: 'number',
    difficulty: 3,
    lawReference: '국가계약법 시행령 제50조~제52조',
  },
  {
    id: 's4-009',
    subject: '4권실무',
    front: '전략적 공공조달 우선구매제도 활용 (4권 제8장)',
    back: '【4대 전략적 우선구매제도】\n①중소기업 공공구매: 공공조달의 50% 이상 중소기업 구매 목표\n②녹색제품 우선구매: 환경마크 인증제품 의무구매 비율\n③혁신제품 지정·구매: 조달청장 지정, 수의계약 허용\n④사회적가치 우선구매: 사회적기업·장애인기업 등\n\n【의미부여암기】 "중녹혁사"\n중(소기업)·녹(색제품)·혁(신제품)·사(회적가치)\n"중년의 녹색 혁명 사회!" — 4대 우선구매 전략!\n\n【실무 활용 포인트】\n• 우수조달물품(나라장터 종합쇼핑몰 등록)\n• 혁신제품(시범구매 → 본구매 전환)\n• 기술개발제품 우선구매(중기부 인증)\n\n법근거: 중소기업제품 구매촉진 및 판로지원에 관한 법률',
    category: 'concept',
    difficulty: 2,
    lawReference: '중소기업제품 구매촉진 및 판로지원에 관한 법률, 녹색제품 구매촉진에 관한 법률',
  },
]

// ── 전체 카드 병합 ───────────────────────────────────────────────────────────
const allCards: ConceptCardData[] = [
  ...s1Cards,
  ...s2Cards,
  ...s3Cards,
  ...s4Cards,
]

function getFilteredCards(filter: SubjectFilter): ConceptCardData[] {
  if (filter === '전체') {
    // 전체: 과목별 균형있게 선별하여 19개 (S1:4, S2:3, S3:4, S4:8)
    return [
      ...s1Cards.slice(0, 4),
      ...s2Cards.slice(0, 3),
      ...s3Cards.slice(0, 4),
      ...s4Cards.slice(0, 8),
    ]
  }
  return allCards.filter((c) => c.subject === filter)
}

const subjectTabs = [
  { id: '전체' as SubjectFilter, label: '전체 (19개)', color: 'bg-slate-800 text-white', inactive: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300' },
  { id: '1과목' as SubjectFilter, label: '1과목 법제도 (9개)', color: 'bg-violet-700 text-white', inactive: 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' },
  { id: '2과목' as SubjectFilter, label: '2과목 조달계획 (6개)', color: 'bg-blue-700 text-white', inactive: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  { id: '3과목' as SubjectFilter, label: '3과목 계약관리 (10개)', color: 'bg-emerald-700 text-white', inactive: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' },
  { id: '4권실무' as SubjectFilter, label: '4권 관리실무 (9개)', color: 'bg-rose-700 text-white', inactive: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300' },
]

const categoryLabel: Record<string, string> = {
  concept: '개념',
  compare: '비교',
  number: '숫자',
  law: '법조문',
  procedure: '절차',
}
const categoryColor: Record<string, string> = {
  concept: 'bg-blue-100 text-blue-700',
  compare: 'bg-purple-100 text-purple-700',
  number: 'bg-orange-100 text-orange-700',
  law: 'bg-indigo-100 text-indigo-700',
  procedure: 'bg-green-100 text-green-700',
}

export default function TodayReviewPage() {
  const [selectedSubject, setSelectedSubject] = useState<SubjectFilter>('전체')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [showReviewButtons, setShowReviewButtons] = useState(false)
  const [completedCards, setCompletedCards] = useState<Set<string>>(new Set())

  const cards = getFilteredCards(selectedSubject)
  const currentCard = cards[currentIndex] ?? cards[0]
  const totalCards = cards.length
  const completedCount = completedCards.size

  const handleSubjectChange = (sub: SubjectFilter) => {
    setSelectedSubject(sub)
    setCurrentIndex(0)
    setIsFlipped(false)
    setShowReviewButtons(false)
    setCompletedCards(new Set())
  }

  const handleNextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsFlipped(false)
      setShowReviewButtons(false)
    }
  }

  const handlePreviousCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setIsFlipped(false)
      setShowReviewButtons(false)
    }
  }

  const handleFlip = (flipped: boolean) => {
    setIsFlipped(flipped)
    if (flipped) setShowReviewButtons(true)
  }

  const handleReview = (rating: 'hard' | 'normal' | 'easy') => {
    setCompletedCards((prev) => new Set(prev).add(currentCard.id))
    if (currentIndex < cards.length - 1) {
      handleNextCard()
    } else {
      setShowReviewButtons(false)
    }
  }

  const isAllComplete = completedCount === totalCards && totalCards > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">오늘의 복습</h1>
              <p className="text-blue-200 text-sm mt-1">출제기준 100% 반영 — 1권·2권·3권·4권 의미부여암기법 고몰입 학습</p>
            </div>
            <Link
              href="/learn"
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition text-sm"
            >
              뒤로 가기
            </Link>
          </div>
          <p className="text-blue-100 text-lg">
            복습 진행률: {completedCount}/{totalCards}
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
                selectedSubject === tab.id ? tab.color + ' shadow-md' : tab.inactive
              }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${totalCards > 0 ? (completedCount / totalCards) * 100 : 0}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
            />
          </div>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 text-center">
            {totalCards > 0 ? Math.round((completedCount / totalCards) * 100) : 0}% 완료
          </p>
        </div>

        {/* Card subject badge */}
        {currentCard && !isAllComplete && (
          <div className="flex items-center gap-2 mb-4">
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
              currentCard.subject === '1과목' ? 'bg-violet-100 text-violet-700' :
              currentCard.subject === '2과목' ? 'bg-blue-100 text-blue-700' :
              currentCard.subject === '3과목' ? 'bg-emerald-100 text-emerald-700' :
              'bg-rose-100 text-rose-700'
            }`}>
              {currentCard.subject}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${categoryColor[currentCard.category]}`}>
              {categoryLabel[currentCard.category]}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
              currentCard.difficulty === 1 ? 'bg-green-100 text-green-700' :
              currentCard.difficulty === 2 ? 'bg-amber-100 text-amber-700' :
              'bg-red-100 text-red-700'
            }`}>
              {currentCard.difficulty === 1 ? '기본' : currentCard.difficulty === 2 ? '보통' : '심화'}
            </span>
          </div>
        )}

        {/* Completion message */}
        {isAllComplete ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/30 border border-green-300 dark:border-green-700 rounded-2xl p-12 text-center mb-8"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-4"
            >
              <CheckCircleIcon size={64} className="mx-auto text-green-600 dark:text-green-400" />
            </motion.div>
            <h2 className="text-3xl font-bold text-green-900 dark:text-green-200 mb-2">
              모든 카드를 완료했습니다! 🎉
            </h2>
            <p className="text-green-800 dark:text-green-300 mb-6">
              {selectedSubject === '전체' ? '전 과목' : selectedSubject} 핵심 개념 완료! 훌륭합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  setCurrentIndex(0)
                  setCompletedCards(new Set())
                  setIsFlipped(false)
                }}
                className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
              >
                다시 학습하기
              </button>
              <Link
                href="/learn"
                className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition"
              >
                학습 허브로 돌아가기
              </Link>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Card display */}
            {currentCard && (
              <motion.div
                key={`${selectedSubject}-${currentIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <ConceptCard
                  front={currentCard.front}
                  back={currentCard.back}
                  category={currentCard.category}
                  difficulty={currentCard.difficulty}
                  lawReference={currentCard.lawReference}
                  onFlip={handleFlip}
                />
              </motion.div>
            )}

            {/* Review buttons */}
            {showReviewButtons && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CardReviewButtons
                  onReview={handleReview}
                  currentInterval={currentIndex + 1}
                />
              </motion.div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10">
              <button
                onClick={handlePreviousCard}
                disabled={currentIndex === 0}
                className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition"
              >
                <ChevronLeftIcon size={20} />
                이전 카드
              </button>

              <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                {currentIndex + 1} / {totalCards}
              </span>

              <button
                onClick={handleNextCard}
                disabled={currentIndex === totalCards - 1}
                className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition"
              >
                다음 카드
                <ChevronRightIcon size={20} />
              </button>
            </div>
          </>
        )}

        {/* 학습 가이드 */}
        <div className="mt-10 p-5 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl">
          <h3 className="font-bold text-blue-900 dark:text-blue-200 mb-2">📚 과목별 학습 포인트</h3>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div className="space-y-1">
              <div className="flex items-start gap-2">
                <span className="px-1.5 py-0.5 bg-violet-100 text-violet-700 rounded text-xs font-semibold flex-shrink-0">1과목</span>
                <span className="text-blue-800 dark:text-blue-300">5대원칙(투VFM경차책)·추미예포·해제/해지·소액기준(물2공8용5) 의미부여암기</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-semibold flex-shrink-0">2과목</span>
                <span className="text-blue-800 dark:text-blue-300">조달수명주기·계약유형·입찰낙찰절차 (의미부여암기)</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-start gap-2">
                <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 rounded text-xs font-semibold flex-shrink-0">3과목</span>
                <span className="text-blue-800 dark:text-blue-300">증관위지동(5대기능)·등공입적낙계(물품)·직안품(품질)·일대기(기술형공사) 의미부여암기</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="px-1.5 py-0.5 bg-rose-100 text-rose-700 rounded text-xs font-semibold flex-shrink-0">4권실무</span>
                <span className="text-blue-800 dark:text-blue-300">사법인공·재노경관이·정분선·낙작보인서·이계선·중녹혁사 의미부여암기</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
