'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, GitBranch } from 'lucide-react';

type SubjectFilter = '전체' | '1과목' | '2과목' | '3과목' | '4권실무';

interface ProcedureStep {
  step: number;
  name: string;
  description: string;
}

interface Procedure {
  id: string;
  title: string;
  category: string;
  subject: '1과목' | '2과목' | '3과목' | '4권실무';
  steps: ProcedureStep[];
  keyPoint?: string;
}

const procedures: Procedure[] = [
  // ────────── 1과목 (2개) ──────────
  {
    id: 'proc-01',
    title: '부정당업자 제재 절차',
    category: '공정조달',
    subject: '1과목',
    keyPoint: '1개월~2년 제재 / 나라장터 공개',
    steps: [
      { step: 1, name: '제재사유 발생', description: '허위서류 제출, 담합, 뇌물 제공 등 위반 행위 발생' },
      { step: 2, name: '제재 사전통보', description: '해당 업체에 제재 사전 통보 (방어권 보장)' },
      { step: 3, name: '청문 절차', description: '업체의 의견 진술 기회 부여 (행정절차법 준수)' },
      { step: 4, name: '제재 처분 결정', description: '조달청장이 1개월~2년 입찰참가자격 제한 결정' },
      { step: 5, name: '처분 통보·공개', description: '제재 처분 통보 및 나라장터에 공개' },
    ],
  },
  {
    id: 'proc-02',
    title: '전자조달 입찰 공고 절차',
    category: '전자조달',
    subject: '1과목',
    keyPoint: '공고기간: 물품·용역 7일↑ / 공사 15일↑',
    steps: [
      { step: 1, name: '발주계획 수립', description: '수요기관에서 발주계획 확정 및 예산 배정 확인' },
      { step: 2, name: '사전규격 공개', description: '나라장터에 사전규격 공개 (경쟁 촉진, 의견 수렴)' },
      { step: 3, name: '입찰공고 등록', description: '나라장터에 입찰공고 게시 (공고기간 준수 필수)' },
      { step: 4, name: '입찰서 접수', description: '전자입찰시스템을 통한 투찰 접수' },
      { step: 5, name: '개찰·낙찰자 결정', description: '입찰마감 후 공개 개찰 → 낙찰자 결정' },
    ],
  },

  // ────────── 1과목 추가 (1권 — 의미부여암기법) ──────────
  {
    id: 'proc-s1-03',
    title: '예정가격 결정 절차 — "이오사산"',
    category: '계약준비',
    subject: '1과목',
    keyPoint: '"이오사산" — ±2%범위·15개작성·4개추첨·산술평균',
    steps: [
      { step: 1, name: '기초금액 산정', description: '원가계산·거래실례가격·유사사례 등으로 기초금액 산출 (VAT 포함)' },
      { step: 2, name: '복수예비가격 15개 작성', description: '기초금액의 ±2% 범위 내에서 복수예비가격 15개 작성 — "이오사산"의 "이(±2%)오(15개)"' },
      { step: 3, name: '입찰자 4개 추첨', description: '입찰자들이 나라장터에서 15개 중 4개를 무작위 추첨 — "이오사산"의 "사(4개)"' },
      { step: 4, name: '산술평균 = 예정가격 결정', description: '추첨된 4개의 산술평균 금액이 예정가격으로 확정 — "이오사산"의 "산(산술평균)"' },
    ],
  },
  {
    id: 'proc-s1-04',
    title: '불공정조달행위 조사 및 제재 절차',
    category: '공정조달',
    subject: '1과목',
    keyPoint: '"허직원사우우" 6가지 — 최대 2년 제재',
    steps: [
      { step: 1, name: '불공정조달행위 인지·신고', description: '6가지 행위 중 위반 발견: ①허위서류 ②직접생산기준위반 ③원산지거짓 ④사전승인없는납품 ⑤MAS우대가격위반 ⑥우수공동상표부정' },
      { step: 2, name: '조달청 조사 개시', description: '조달청이 불공정조달행위 해당 여부 조사 착수' },
      { step: 3, name: '당사자 의견청취', description: '위반업체에 의견진술 기회 부여 (행정절차법 준수)' },
      { step: 4, name: '제재처분 결정', description: '① 부정당업자 제재 (최대 2년) ② 부당이득금 환수 ③ 계약 해제·해지' },
      { step: 5, name: '나라장터 공개', description: '처분결과를 나라장터에 공개 → 다른 발주기관도 공유' },
    ],
  },
  {
    id: 'proc-s1-05',
    title: '국가계약 분쟁조정 절차 — "신심결통"',
    category: '공정조달',
    subject: '1과목',
    keyPoint: '이의신청 15일 → 분쟁조정 심사 50일 이내',
    steps: [
      { step: 1, name: '이의신청 (15일 이내)', description: '처분이 있음을 안 날부터 15일 이내 해당 기관 장에게 서면으로 이의신청 — 암기: "이의15일"' },
      { step: 2, name: '이의신청 심사', description: '해당 기관에서 이의신청 내용 심사·검토' },
      { step: 3, name: '분쟁조정 위원회 신청', description: '이의신청 결과에 불복 시 계약분쟁조정위원회에 조정 신청 가능' },
      { step: 4, name: '분쟁조정 심사 (50일 이내)', description: '조정위원회에서 50일 이내 심사 후 조정 결과 통보 — 암기: "분쟁조정 50일"' },
      { step: 5, name: '조정 결과 수용 또는 소송', description: '조정 수용 시 합의 완료 / 불수용 시 법원 소송 제기 가능' },
    ],
  },

  // ────────── 2과목 (2개) ──────────
  {
    id: 'proc-03',
    title: '적격심사 절차',
    category: '낙찰자 결정',
    subject: '2과목',
    keyPoint: '95점 이상 합격 / 최저가 순위 심사',
    steps: [
      { step: 1, name: '최저가 순위 결정', description: '예정가격 이하 최저가 입찰자부터 순위 부여' },
      { step: 2, name: '이행능력 심사 요청', description: '1순위 업체에 적격심사 서류 제출 요청' },
      { step: 3, name: '서류 심사', description: '이행실적·기술능력·재무상태·신용도 등 심사' },
      { step: 4, name: '종합평점 산정', description: '물품·용역 95점 이상 → 낙찰자 결정' },
      { step: 5, name: '낙찰자 결정', description: '적격자를 낙찰자로 결정 / 부적격 시 차순위자 심사' },
    ],
  },
  {
    id: 'proc-04',
    title: '협상계약 절차',
    category: '낙찰자 결정',
    subject: '2과목',
    keyPoint: '기술·가격 분리평가 후 협상',
    steps: [
      { step: 1, name: 'RFP(제안요청서) 작성', description: '기술·가격 분리 평가 기준 설정' },
      { step: 2, name: '제안서 접수', description: '입찰자로부터 기술제안서와 가격제안서 접수' },
      { step: 3, name: '기술평가', description: '평가위원회에서 기술점수 산정 → 기술적합자 선정' },
      { step: 4, name: '우선협상대상자 선정', description: '기술+가격 종합점수 최고득점자 선정' },
      { step: 5, name: '기술·가격 협상', description: '과업 범위·규격 조정 → 가격 협상' },
      { step: 6, name: '계약 체결', description: '협상 합의 시 계약 체결 / 결렬 시 차순위자' },
    ],
  },

  // ────────── 2과목 추가 (2권 공공조달 계획분석 — 의미부여암기법) ──────────
  {
    id: 'proc-s2-03',
    title: '공공조달 수명주기 5단계 — 전체 업무 흐름',
    category: '조달계획',
    subject: '2과목',
    keyPoint: '"조시입계종" — 조달계획→시장조사→입찰낙찰→계약관리→종결',
    steps: [
      { step: 1, name: '조달계획 수립', description: '수요분석·예산확인·조달방법 결정 — 수요정보 식별 → 요구사항 분석 → 공급계획 수립' },
      { step: 2, name: '시장조사', description: '공급역량·계약유형·예산 적정성 분석 — RFI 활용, 구매사양(SOW) 개발, SMART 요건 확인' },
      { step: 3, name: '입찰·낙찰', description: '사전규격공개→입찰공고→설명회→접수→개찰→평가→낙찰자결정 — 11단계 흐름' },
      { step: 4, name: '계약관리', description: 'CMP(계약관리계획) 개발→착수회의→이행점검→변경관리→분쟁해결' },
      { step: 5, name: '계약완료·종결', description: '납품인수→검사검수→대금지급→성과평가→기록보존 — "조시입계종" 완성!' },
    ],
  },
  {
    id: 'proc-s2-04',
    title: '사전규격공개 절차 — 입찰 전 의견수렴',
    category: '입찰준비',
    subject: '2과목',
    keyPoint: '20일 이상 의견수렴 → 규격 확정 → 입찰공고',
    steps: [
      { step: 1, name: '규격 초안 작성', description: '수요기관이 구매사양(과업내용)·예정가격·낙찰방법 등 포함한 규격 초안 작성' },
      { step: 2, name: '나라장터 사전공개', description: '조달청 나라장터에 사전규격 게시 (추정가격 2억원 이상 의무)' },
      { step: 3, name: '의견수렴 기간 운영', description: '20일 이상 의견수렴 기간 운영 — 공급업체의 과업내용·예산 적정성 검토 의견 접수' },
      { step: 4, name: '의견 검토 및 규격 확정', description: '제출된 의견 검토 → 타당한 의견 반영 → 최종 규격 확정' },
      { step: 5, name: '입찰공고 게시', description: '확정된 규격 기반으로 나라장터에 입찰공고 게시 (물품·용역 7일, 공사 15일 이상)' },
    ],
  },
  {
    id: 'proc-s2-05',
    title: '입찰·낙찰 11단계 흐름 (2권 표 11)',
    category: '입찰낙찰',
    subject: '2과목',
    keyPoint: '"입공설질응접개평가대낙계" — 입찰문서작성부터 계약체결까지',
    steps: [
      { step: 1, name: '입찰문서 작성', description: '입찰공고문(FB)·제안요청서(RFP)·소액견적서(RFQ) 등 입찰 관련 문서 작성' },
      { step: 2, name: '입찰공고 실행', description: '나라장터·관보·일간지·홈페이지 병행 공고 — 공고기간 준수 (물용7일·공사15일)' },
      { step: 3, name: '입찰설명회 개최', description: '복잡한 조달대상물 또는 요구사항 포함 시 잠재적 공급업체 대상 설명회 개최' },
      { step: 4, name: '질의접수 및 응답공개', description: '입찰참가 질의 접수 → 회신·공개 — 모든 입찰참가자에게 동일하게 공개' },
      { step: 5, name: '입찰서 접수·개찰', description: '전자입찰서 접수 (마감시간 이후 무효) → 공개 개찰 → 입찰금액·업체명 공개' },
      { step: 6, name: '평가 및 낙찰자 결정', description: '적격심사·협상계약·종합심사낙찰제 등 방법에 따라 평가 → 낙찰자 결정·발표' },
      { step: 7, name: '계약 체결', description: '낙찰자와 계약서·부속서류 확인 → 계약보증금 납부 → 계약 체결 (낙찰 후 10~15일 이내)' },
    ],
  },
  {
    id: 'proc-s2-06',
    title: '공급업체 적정성분석 절차 — "법기경" 3단계',
    category: '조달계획',
    subject: '2과목',
    keyPoint: '"법기경" — 법적→기술적→경제적 적정성 순서대로 분석',
    steps: [
      { step: 1, name: '법적 적정성 분석', description: '입찰참가자격 등록 확인·면허·인증 보유·세금체납 여부·결격사유 점검 (시행령 제12조)' },
      { step: 2, name: '기술적 적정성 분석', description: '기술사양 충족 능력·생산설비·기술인력·품질관리체계(ISO)·유사사업 수행실적 검증' },
      { step: 3, name: '경제적 적정성 분석', description: '원가분석·손익분기점·Make-or-Buy 분석·ROI(투자회수기간)·수익률 검토' },
      { step: 4, name: '종합 적정성 판단', description: '법적(합격)→기술적(적합)→경제적(타당) 모두 충족 시 입찰 참여 결정' },
      { step: 5, name: '입찰 참여 의사결정', description: '적정성분석 결과 기반 Go/No-Go 의사결정 → 입찰서 제출 준비 착수' },
    ],
  },
  {
    id: 'proc-s2-07',
    title: '포트폴리오 분석 절차 — Kraljic매트릭스 활용',
    category: '조달계획',
    subject: '2과목',
    keyPoint: '"전레병일" — 전략·레버리지·병목·일반 4분류 → 품목별 구매전략',
    steps: [
      { step: 1, name: '조달 품목 목록화', description: '전체 조달 품목을 목록화하고 구매금액·공급업체 수·대체가능성 등 데이터 수집' },
      { step: 2, name: '공급위험도 평가', description: '공급업체 수·대체가능성·리드타임·기술의존도 등으로 공급위험 High/Low 분류' },
      { step: 3, name: '이익영향도 평가', description: '구매금액·품질영향·수익기여도 등으로 이익영향도 High/Low 분류' },
      { step: 4, name: 'Kraljic 4사분면 배치', description: '전략품목(高高)·레버리지(低高)·병목(高低)·일반(低低) — "전레병일" 분류' },
      { step: 5, name: '품목별 구매전략 수립', description: '전략→파트너십 / 레버리지→경쟁입찰 / 병목→안정공급확보 / 일반→효율구매' },
    ],
  },
  {
    id: 'proc-s2-08',
    title: '평가위원회 구성·운영 절차 — "회사접" 이해충돌 방지',
    category: '입찰평가',
    subject: '2과목',
    keyPoint: '5인 이상 / 외부 2/3 이상 / "회사접" 이해충돌 방지 3원칙',
    steps: [
      { step: 1, name: '위원 후보 풀 구성', description: '기술·법률·경영 분야 외부 전문가 후보 목록 작성 (전문가 풀 DB 활용)' },
      { step: 2, name: '위원 5인 이상 위촉', description: '외부위원 2/3 이상으로 구성·위원장은 외부위원 중 선임 (시행령 제43조의2)' },
      { step: 3, name: '이해충돌 사전점검', description: '위원의 이해관계 회피의무 확인·청렴서약서 징구·위원명단 비공개 유지' },
      { step: 4, name: '평가 실시', description: '기술제안서 평가·가격평가 실시 — 사전접촉금지·접대금지 원칙 준수' },
      { step: 5, name: '평가결과 확정·통보', description: '평가점수 합산→기술적합자 또는 낙찰자 결정→결과 통보·이의제기 안내' },
    ],
  },
  {
    id: 'proc-s2-09',
    title: '리스크관리 4단계 절차 — "식분대모"',
    category: '리스크관리',
    subject: '2과목',
    keyPoint: '"식분대모" — 식별→분석→대응→모니터링 / 대응: "회전완수"',
    steps: [
      { step: 1, name: '리스크 식별', description: '공급지연·가격변동·품질부적합·법규변경·공급업체 부도 등 리스크 요인 목록화' },
      { step: 2, name: '리스크 분석', description: '발생확률×영향도 매트릭스로 정성·정량 분석 → 우선순위 결정 (High/Medium/Low)' },
      { step: 3, name: '리스크 대응전략 수립', description: '"회전완수" 4대 전략 중 선택: 회피·전가·완화·수용 → 품목별 대응계획 수립' },
      { step: 4, name: '리스크 모니터링', description: '조기경보체계 운영·정기 리스크 리뷰·리스크등록부 업데이트·잔여리스크 추적' },
    ],
  },

  // ────────── 3과목 (3개) ──────────
  {
    id: 'proc-05',
    title: '계약변경 (물가변동) 절차',
    category: '계약관리',
    subject: '3과목',
    keyPoint: '90일 경과 + ±3% → 조정 청구',
    steps: [
      { step: 1, name: '조정요건 발생 확인', description: '입찰일로부터 90일 경과 + 등락률 ±3% 이상 확인' },
      { step: 2, name: '적용기준일 설정', description: '물가변동 적용기준일 확정' },
      { step: 3, name: '등락률 산출', description: '품목조정률 또는 지수조정률 방법으로 등락률 산출' },
      { step: 4, name: '조정금액 산출', description: '잔여공사량(물량) × 등락률 = 조정금액' },
      { step: 5, name: '계약금액 조정 청구', description: '계약상대자가 발주처에 조정 청구 (서면)' },
      { step: 6, name: '변경계약 체결', description: '발주처 검토·승인 후 변경계약서 작성·체결' },
    ],
  },
  {
    id: 'proc-06',
    title: 'MAS(다수공급자계약) 2단계경쟁',
    category: '계약관리',
    subject: '3과목',
    keyPoint: '추정가격 5천만원 이상 → 의무 실시',
    steps: [
      { step: 1, name: 'MAS 계약 체결', description: '조달청과 공급자 간 단가계약 체결 (1~3년)' },
      { step: 2, name: '수요기관 구매 요청', description: '나라장터 종합쇼핑몰에서 품목 선택 (5천만원 이상)' },
      { step: 3, name: '2단계경쟁 개시', description: '동일 품목 MAS 업체 간 가격·비가격 추가 경쟁' },
      { step: 4, name: '최종 공급자 선정', description: '종합평가 최고점자를 최종 공급자로 선정' },
      { step: 5, name: '납품·검수·대금 지급', description: '납품 → 수요기관 검사·검수 → 대금 지급' },
    ],
  },
  {
    id: 'proc-07',
    title: '리스크(위험) 관리 4단계',
    category: '계약관리',
    subject: '3과목',
    keyPoint: '식별→평가→대응→모니터링',
    steps: [
      { step: 1, name: '리스크 식별', description: '리스크 관리 계획 수립, 위험 식별 및 유형별 분류' },
      { step: 2, name: '위험도 평가', description: '발생확률×영향도 매트릭스, 우선순위 결정' },
      { step: 3, name: '대응계획 수립', description: '회피·전가·완화·수용 전략, 비상 대응계획 마련' },
      { step: 4, name: '모니터링·통제', description: '실행 여부 확인, 성과 확인, 신규 리스크 식별' },
    ],
  },

  // ────────── 3과목 추가 (3권 — 의미부여암기법) ──────────
  {
    id: 'proc-s3-04',
    title: '계약변경(설계변경) 절차 — 3권 제1장 핵심',
    category: '계약변경',
    subject: '3과목',
    keyPoint: '불상기발(불분명·상이·기술·발주기관) → 6단계 변경',
    steps: [
      { step: 1, name: '설계변경 사유 발생', description: '①설계서 불분명·오류 ②현장상태 상이 ③신기술공법 ④발주기관 요구 — "불상기발"' },
      { step: 2, name: '합의각서 작성', description: '발주담당자와 계약상대자 간 변경에 대한 합의각서 작성' },
      { step: 3, name: '변경계약 의뢰', description: '방침서·합의각서·준공기한연기의뢰서(기간변경)·신출내역서(금액변경) 제출' },
      { step: 4, name: '변경계약서 초안 송신', description: '계약담당자가 나라장터를 통해 변경계약서 초안 송신' },
      { step: 5, name: '보증서·인지세 제출 및 응답', description: '계약금액·기간 변경 시 보증서·인지세 등 제출 후 초안 응답' },
      { step: 6, name: '변경계약 체결', description: '변경계약 체결 — dBrain 계약대장 등록 완료' },
    ],
  },
  {
    id: 'proc-s3-05',
    title: '납품검사·검수·대금지급 절차 — 계약종결 관리',
    category: '계약종결',
    subject: '3과목',
    keyPoint: '"납검대하" — 납품→검사→대금→하자',
    steps: [
      { step: 1, name: '납품(시공) 완료 통보', description: '계약상대자가 납품 또는 공사 완료 후 발주기관에 완료 통보' },
      { step: 2, name: '검사·검수 실시', description: '수요기관 담당자 또는 전문기관이 품질·수량·규격 검사·검수' },
      { step: 3, name: '검사결과 통보', description: '합격 시 검수조서 작성 / 불합격 시 재납품·보완 요구' },
      { step: 4, name: '대금 청구서 제출', description: '계약상대자가 세금계산서·검수조서 등 첨부하여 대금 청구' },
      { step: 5, name: '대금 지급', description: '청구일로부터 5일 이내 지급 원칙 (지연 시 지연이자 발생)' },
      { step: 6, name: '하자보증금 반환', description: '하자보수 기간 만료 후 하자보수보증금 반환 (계약금액의 2~5%)' },
    ],
  },
  {
    id: 'proc-s3-06',
    title: '하도급계약 승인 절차 — 3권 제4장 공사계약관리',
    category: '공사계약',
    subject: '3과목',
    keyPoint: '하도급 통보: 계약체결 후 30일 이내',
    steps: [
      { step: 1, name: '하도급계약 체결', description: '수급인(계약상대자)이 하수급인과 하도급계약 체결 결정' },
      { step: 2, name: '공사감독자에게 제출', description: '하도급계약서 및 관련 서류를 공사감독자에게 제출' },
      { step: 3, name: '하도급 적정성 검토', description: '하도급금액 적정성 심사 — 도급금액의 82% 미달 시 심사 강화' },
      { step: 4, name: '발주청 보고 (7일 이내)', description: '공사감독자가 하도급 내용을 발주청에 7일 이내 보고' },
      { step: 5, name: '하도급 통보', description: '하도급 계약체결일로부터 30일 이내 발주자에게 통보 (법적 의무)' },
    ],
  },

  // ────────── 3과목 추가 (3권 고도화 — CMP·물품이행·기술형공사) ──────────
  {
    id: 'proc-s3-07',
    title: '계약관리계획(CMP) 수립 절차 — 3권 제1장 핵심',
    category: '계약관리',
    subject: '3과목',
    keyPoint: '"증관위지동" 5대 기능을 실행하는 종합계획서',
    steps: [
      { step: 1, name: '계약관리 원칙 확인', description: '신의성실·상호대등·부당특약금지 원칙 확인 (국가계약법 제5조)' },
      { step: 2, name: '계약관리 요소 파악', description: '5대 기능(증거·관리·위험전가·지불·동기부여) 기반으로 관리 요소 식별' },
      { step: 3, name: 'CMP 초안 작성', description: '소요자원 투입계획·이행점검 체크리스트·위험관리계획 포함한 초안 작성' },
      { step: 4, name: '착수협의(킥오프 미팅)', description: '발주기관·계약상대자 간 착수협의 — 과업범위·일정·연락체계 확인' },
      { step: 5, name: 'CMP 확정 및 실행', description: '착수협의 결과 반영하여 CMP 확정 → 이행 단계별 모니터링 실행' },
    ],
  },
  {
    id: 'proc-s3-08',
    title: '물품계약 이행관리 절차 — 3권 제2장',
    category: '물품계약',
    subject: '3과목',
    keyPoint: '공정·품질·안전관리 + 설계변경·금액조정',
    steps: [
      { step: 1, name: '계약체결 및 착수', description: '낙찰자와 계약 체결 → 납품계획서 제출 (납품기한·장소 확인)' },
      { step: 2, name: '공정관리', description: '생산공정 점검·납품일정 모니터링 — 지연 시 독촉·대체조치' },
      { step: 3, name: '품질·안전관리', description: '품질검사 기준 확인·직접생산확인·안전관리물자 점검' },
      { step: 4, name: '설계변경·금액조정', description: '규격 변경·물가변동 시 설계변경 절차 → 계약금액 조정 (시행령 제64·65조)' },
      { step: 5, name: '납품검사·검수', description: '수령 후 10일 이내 검사 → 합격 시 검수조서 작성 → 5일 이내 대금지급' },
    ],
  },
  {
    id: 'proc-s3-09',
    title: '기술형공사(일괄/대안/기술제안) 입찰 절차 — 3권 제4장',
    category: '공사계약',
    subject: '3과목',
    keyPoint: '"일대기" — 일괄(설계+시공)·대안(대안설계)·기술제안(시공방법)',
    steps: [
      { step: 1, name: '발주방식 결정', description: '일괄입찰(턴키)/대안입찰/기술제안입찰 중 적합한 방식 결정 (300억↑ 대형공사)' },
      { step: 2, name: '입찰공고·PQ심사', description: '나라장터 입찰공고(15일↑) → PQ(사전심사) 실시 → 적격업체 선정' },
      { step: 3, name: '설계·기술제안서 제출', description: '일괄: 기본+실시설계 / 대안: 대안설계 / 기술제안: 시공방법 제안서 제출' },
      { step: 4, name: '설계심의·기술평가', description: '설계심의위원회 또는 기술평가위원회에서 기술·설계 평가 실시' },
      { step: 5, name: '종합심사 낙찰자결정', description: '가격+기술+신인도 종합평가 → 최고득점자 낙찰 (종합심사낙찰제 적용)' },
      { step: 6, name: '계약체결·착공', description: '계약 체결 → 착공계 제출(10~20일) → 공정관리·시공관리 착수' },
    ],
  },

  // ────────── 4권실무 (5개) — 신규 추가 ──────────
  {
    id: 'proc-08',
    title: '나라장터 입찰참가자격 등록 절차 (4권 제1장)',
    category: '4권 실무',
    subject: '4권실무',
    keyPoint: '유효기간 3년 / 관할조달청 승인',
    steps: [
      { step: 1, name: '개인회원 가입 (본인인증)', description: '나라장터(www.g2b.go.kr) 접속 → 이용자 등록 → 본인인증' },
      { step: 2, name: '이용약관 동의', description: '입찰참가자격 등록을 위한 이용약관에 동의' },
      { step: 3, name: '등록신청 및 온라인 서류제출', description: '필수서류(사업자등록증·법인등기부등본·인감증명서·공동인증서) 온라인 제출' },
      { step: 4, name: '등록신청 현황 조회', description: '등록신청 현황 조회하여 진행 상태 확인 가능' },
      { step: 5, name: '관할조달청 검토·승인', description: '관할 조달청에서 신청내용·서류 검토 후 승인 또는 반려' },
      { step: 6, name: '등록증 발급·유효기간 관리', description: '승인 후 등록증 발급 (유효기간 3년, 만료 전 갱신 필수)' },
    ],
  },
  {
    id: 'proc-09',
    title: '공급대상물 품명 등록(물품목록화) 절차 (4권 제1장)',
    category: '4권 실무',
    subject: '4권실무',
    keyPoint: '공급물품 유형별 등록 → 입찰 참여 기반',
    steps: [
      { step: 1, name: '자사 공급물품 유형 파악', description: '물품·용역·공사 중 공급 예정 품목 확정' },
      { step: 2, name: '나라장터 품목 검색', description: '나라장터 목록정보시스템에서 동일·유사 품명 검색' },
      { step: 3, name: '품명 선택 또는 신규 신청', description: '기존 품명 선택 or 신규 품명 등록 신청 (없는 경우)' },
      { step: 4, name: '품목정보 입력 및 서류 업로드', description: '물품 스펙·직접생산확인서 등 필요 서류 업로드' },
      { step: 5, name: '조달청 검토·승인', description: '조달청에서 품목정보 검토 후 승인' },
    ],
  },
  {
    id: 'proc-10',
    title: '원가계산(예정가격 작성) 절차 (4권 제3장)',
    category: '4권 실무',
    subject: '4권실무',
    keyPoint: '재노경→관이 / 4가지 유형별 적용',
    steps: [
      { step: 1, name: '원가계산 유형 확인', description: '공공조달·제조·용역·공사 중 해당 유형 결정' },
      { step: 2, name: '직접원가 산출', description: '재료비+노무비+경비 각각 산출 (표준품셈·실적단가 적용)' },
      { step: 3, name: '간접비 산출', description: '제조간접비 또는 제경비 산출 (직접원가 대비 비율 적용)' },
      { step: 4, name: '일반관리비·이윤 산출', description: '일반관리비(노무비+경비의 일정비율), 이윤(10% 이하)' },
      { step: 5, name: '예정가격 작성 및 결정', description: '산출된 원가 합산 → 예정가격 결정 (복수예비가격 활용)' },
    ],
  },
  {
    id: 'proc-11',
    title: '기술(규격)협상 및 가격협상 절차 (4권 제4장)',
    category: '4권 실무',
    subject: '4권실무',
    keyPoint: '기술적합자 선정 후 우선협상 → 가격협상',
    steps: [
      { step: 1, name: 'RFP 및 평가기준 확정', description: '제안요청서 작성 → 기술·가격 배점 기준 확정' },
      { step: 2, name: '기술평가 및 기술적합자 선정', description: '평가위원회에서 기술제안서 평가 → 기술적합자 선정' },
      { step: 3, name: '우선협상대상자 선정', description: '기술+가격 종합점수 최고득점자를 우선협상대상자로 선정' },
      { step: 4, name: '기술(규격)협상', description: '과업내용·규격 조정 협상 (예산 범위 내)' },
      { step: 5, name: '가격협상', description: '기술협상 합의 후 가격협상 진행 → 최종 계약가격 결정' },
      { step: 6, name: '계약체결 또는 차순위 협상', description: '합의 성공 시 계약체결 / 결렬 시 차순위 협상대상자로' },
    ],
  },
  {
    id: 'proc-12',
    title: '우수조달물품(우수제품) 신청 절차 (4권 제7장)',
    category: '4권 실무',
    subject: '4권실무',
    keyPoint: '"신기현지지" — 신청→기술→현장→지정심의→지정',
    steps: [
      { step: 1, name: '우수조달물품 신청서 작성', description: '조달청 우수조달물품 지정 신청서 및 첨부서류 준비' },
      { step: 2, name: '조달청 접수·검토', description: '조달청에서 신청서류 접수 및 형식 검토' },
      { step: 3, name: '기술평가', description: '기술성·품질·공공구매 적합성 등 전문기관 기술평가' },
      { step: 4, name: '현장실태조사', description: '제조시설·생산능력·품질관리 체계 현장 확인' },
      { step: 5, name: '지정심의위원회 심의', description: '우수조달물품 지정심의위원회에서 최종 심의·의결' },
      { step: 6, name: '우수조달물품 지정 및 등록', description: '지정 통보 → 나라장터 종합쇼핑몰 등록 → 우선구매 적용' },
    ],
  },
  {
    id: 'proc-13',
    title: '공급계획 수립 절차 — "정분선" (4권 제2장)',
    category: '4권 실무',
    subject: '4권실무',
    keyPoint: '"정분선" — 정보수집→분석예측→수요기관선정',
    steps: [
      { step: 1, name: '공급정보 수집', description: '나라장터 통계·시장조사보고서·업체 직접문의를 통해 시장동향·공급업체·가격정보 수집' },
      { step: 2, name: '조달데이터 분석', description: '과거 조달 데이터 기반 ABC분석·파레토분석 수행, 공급리스크 분석' },
      { step: 3, name: '수요 예측', description: '리드타임 분석, 계절적 수요패턴 분석, 수요량 예측 모델 활용' },
      { step: 4, name: '수요기관 선정·배분', description: '수요기관별 물량 배분, 공급일정 수립, 비상 공급계획 마련' },
      { step: 5, name: '공급계획 확정', description: '최종 공급계획서 작성 → 관계기관 협의 → 확정·시행' },
    ],
  },
  {
    id: 'proc-14',
    title: '계약체결 절차 — "낙작보인서" (4권 제5장)',
    category: '4권 실무',
    subject: '4권실무',
    keyPoint: '"낙작보인서" — 낙찰→작성→보증→인지세→서명',
    steps: [
      { step: 1, name: '낙찰 통보 수령', description: '나라장터에서 낙찰 통보 확인 (낙찰 후 10~15일 이내 계약 체결)' },
      { step: 2, name: '계약서 작성', description: '표준계약서 활용, 계약조건·과업범위·납품기한 등 확정' },
      { step: 3, name: '보증서 제출', description: '계약보증금(10%) 현금납부 또는 이행보증보험증권 제출' },
      { step: 4, name: '인지세 납부', description: '1천만원 초과 계약 시 계약금액 구간별 인지세 납부 (쌍방 각 50%)' },
      { step: 5, name: '계약서 서명·날인', description: '계약당사자 서명·날인 → 나라장터 전자계약 체결 완료' },
      { step: 6, name: '착수보고/착공계 제출', description: '용역: 14일 이내 착수보고 / 공사: 10~20일 이내 착공계 제출' },
    ],
  },
  {
    id: 'proc-15',
    title: '유형별 입찰절차 — 물품·용역·공사 (4권 제6장)',
    category: '4권 실무',
    subject: '4권실무',
    keyPoint: '"물적용협공종" — 물품=적격심사, 용역=협상, 공사=종합심사',
    steps: [
      { step: 1, name: '입찰공고 게시', description: '나라장터 입찰공고: 물품·용역 7일↑ / 공사 15일↑ 공고 기간 확보' },
      { step: 2, name: '서류 제출 (유형별 차이)', description: '물품: 입찰서+직접생산확인서 / 용역: 기술제안서+가격제안서 / 공사: 시공능력평가서+PQ서류' },
      { step: 3, name: '입찰서 접수·개찰', description: '전자입찰 마감 후 공개 개찰 — 예정가격 초과 입찰 무효 처리' },
      { step: 4, name: '낙찰자 결정 (유형별 차이)', description: '물품: 적격심사(95점↑) / 용역: 기술+가격 협상 / 공사: 종합심사(300억↑) 또는 적격심사' },
      { step: 5, name: '계약체결', description: '낙찰자와 계약서 작성 → 보증금 납부 → 인지세 → 계약체결 완료' },
      { step: 6, name: '이행관리 착수', description: '물품: 납품계획서 / 용역: 착수보고(14일) / 공사: 착공계(10~20일) 제출' },
    ],
  },
];

const subjectTabs = [
  { id: '전체' as SubjectFilter, label: '전체 (27개)', activeColor: 'bg-slate-800 text-white', inactiveColor: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300' },
  { id: '1과목' as SubjectFilter, label: '1과목 법제도 (5개)', activeColor: 'bg-violet-700 text-white', inactiveColor: 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' },
  { id: '2과목' as SubjectFilter, label: '2과목 조달계획 (9개)', activeColor: 'bg-blue-700 text-white', inactiveColor: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  { id: '3과목' as SubjectFilter, label: '3과목 계약관리 (9개)', activeColor: 'bg-emerald-700 text-white', inactiveColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' },
  { id: '4권실무' as SubjectFilter, label: '4권 관리실무 (8개)', activeColor: 'bg-rose-700 text-white', inactiveColor: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300' },
];

const subjectBadge: Record<string, string> = {
  '1과목': 'bg-violet-100 text-violet-700',
  '2과목': 'bg-blue-100 text-blue-700',
  '3과목': 'bg-emerald-100 text-emerald-700',
  '4권실무': 'bg-rose-100 text-rose-700',
};

const stepColor: Record<string, string> = {
  '1과목': 'bg-violet-600',
  '2과목': 'bg-blue-600',
  '3과목': 'bg-emerald-600',
  '4권실무': 'bg-rose-600',
};

export default function ProceduresPage() {
  const [selectedSubject, setSelectedSubject] = useState<SubjectFilter>('전체');

  const filteredProcedures =
    selectedSubject === '전체'
      ? procedures
      : procedures.filter((p) => p.subject === selectedSubject);

  // Group by category
  const categories = Array.from(new Set(filteredProcedures.map((p) => p.category)));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-5">
      {/* 상단 */}
      <div className="flex items-center gap-3">
        <Link
          href="/learn"
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">절차도 학습</h1>
          <p className="text-sm text-slate-500">
            출제기준 100% 반영 — 전 과목 27개 절차도 의미부여암기법 완전 수록
          </p>
        </div>
      </div>

      {/* 통계 배너 */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-5 text-white">
        <div className="flex items-center gap-3 mb-1">
          <GitBranch className="w-6 h-6" />
          <span className="font-semibold text-lg">총 {filteredProcedures.length}개 핵심 절차 흐름도</span>
        </div>
        <p className="text-green-100 text-sm">
          {selectedSubject === '전체'
            ? '1~3과목 + 4권실무(나라장터·원가·협상·우수제품) 완전 수록'
            : `${selectedSubject} 관련 절차 ${filteredProcedures.length}개`}
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

      {/* 4권실무 안내 */}
      {(selectedSubject === '전체' || selectedSubject === '4권실무') && (
        <div className="p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-700 rounded-xl">
          <h3 className="font-bold text-rose-800 dark:text-rose-300 mb-1 text-sm">🆕 4권실무 절차 8개 — 의미부여암기법 완전 적용</h3>
          <p className="text-xs text-rose-700 dark:text-rose-300">
            가약신서현조승(등록) · 정분선(공급계획) · 재노경관이(원가) · 낙작보인서(계약체결) · 물적용협공종(유형별입찰) · 신기현지지(우수제품)
          </p>
        </div>
      )}

      {/* 카테고리별 절차 */}
      {categories.map((cat) => (
        <div key={cat} className="space-y-4">
          <h2 className="text-base font-bold text-slate-700 dark:text-slate-300 px-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
            {cat}
          </h2>
          {filteredProcedures
            .filter((p) => p.category === cat)
            .map((proc) => (
              <div
                key={proc.id}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
              >
                {/* 카드 헤더 */}
                <div className="px-5 py-4 bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-600">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${subjectBadge[proc.subject]}`}>
                          {proc.subject}
                        </span>
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm md:text-base">
                          {proc.title}
                        </h3>
                      </div>
                      {proc.keyPoint && (
                        <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                          ⭐ {proc.keyPoint}
                        </p>
                      )}
                    </div>
                    <span className="flex-shrink-0 text-xs text-slate-500 bg-slate-100 dark:bg-slate-600 px-2 py-0.5 rounded-full">
                      {proc.steps.length}단계
                    </span>
                  </div>
                </div>

                {/* 절차 단계 */}
                <div className="p-5">
                  <div className="space-y-3">
                    {proc.steps.map((step, idx) => (
                      <div key={step.step} className="flex items-start gap-3">
                        <div
                          className={`flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full ${stepColor[proc.subject]} text-white flex items-center justify-center text-xs md:text-sm font-bold`}
                        >
                          {step.step}
                        </div>
                        <div className="flex-1 pt-0.5">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">
                            {step.name}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {step.description}
                          </p>
                        </div>
                        {idx < proc.steps.length - 1 && (
                          <div className="flex-shrink-0 text-slate-300 dark:text-slate-600 mt-2 text-lg hidden md:block">
                            ↓
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      ))}

      {/* 학습 팁 */}
      <div className="p-5 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-700 rounded-xl">
        <h3 className="font-bold text-green-900 dark:text-green-200 mb-2 text-sm">💡 절차도 학습 전략</h3>
        <ul className="space-y-1.5 text-xs text-green-800 dark:text-green-300">
          <li className="flex gap-2"><span className="font-bold flex-shrink-0">1과목</span><span>예정가격"이오사산"(±2%·15개·4개·산술평균) / 부정당제재5단계 / 분쟁조정(이의신청15일·조정50일) 암기</span></li>
          <li className="flex gap-2"><span className="font-bold flex-shrink-0">2과목</span><span>적격심사 95점 기준, 협상계약의 기술·가격 분리평가 흐름 이해</span></li>
          <li className="flex gap-2"><span className="font-bold flex-shrink-0">3과목</span><span>증관위지동(CMP) · 물품이행(검10대5) · 일대기(기술형공사) · 물가변동(90일+3%) · MAS(5천만↑) 암기</span></li>
          <li className="flex gap-2"><span className="font-bold flex-shrink-0">4권실무</span><span>가약신서현조승(등록) · 정분선(공급계획) · 낙작보인서(계약체결) · 물적용협공종(유형별입찰) · 신기현지지(우수제품)</span></li>
        </ul>
      </div>
    </div>
  );
}
