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
    keyPoint: '신청→평가→지정 / 우수제품 우선구매 혜택',
    steps: [
      { step: 1, name: '우수조달물품 신청서 작성', description: '조달청 우수조달물품 지정 신청서 및 첨부서류 준비' },
      { step: 2, name: '조달청 접수·검토', description: '조달청에서 신청서류 접수 및 형식 검토' },
      { step: 3, name: '기술평가', description: '기술성·품질·공공구매 적합성 등 전문기관 기술평가' },
      { step: 4, name: '현장실태조사', description: '제조시설·생산능력·품질관리 체계 현장 확인' },
      { step: 5, name: '지정심의위원회 심의', description: '우수조달물품 지정심의위원회에서 최종 심의·의결' },
      { step: 6, name: '우수조달물품 지정 및 등록', description: '지정 통보 → 나라장터 종합쇼핑몰 등록 → 우선구매 적용' },
    ],
  },
];

const subjectTabs = [
  { id: '전체' as SubjectFilter, label: '전체 (12개)', activeColor: 'bg-slate-800 text-white', inactiveColor: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300' },
  { id: '1과목' as SubjectFilter, label: '1과목 법제도 (2개)', activeColor: 'bg-violet-700 text-white', inactiveColor: 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' },
  { id: '2과목' as SubjectFilter, label: '2과목 조달계획 (2개)', activeColor: 'bg-blue-700 text-white', inactiveColor: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  { id: '3과목' as SubjectFilter, label: '3과목 계약관리 (3개)', activeColor: 'bg-emerald-700 text-white', inactiveColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' },
  { id: '4권실무' as SubjectFilter, label: '4권 관리실무 (5개)', activeColor: 'bg-rose-700 text-white', inactiveColor: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300' },
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
            전 과목 핵심 업무절차 흐름도 12개 — 4권 실무 절차 5개 신규 추가
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
          <h3 className="font-bold text-rose-800 dark:text-rose-300 mb-1 text-sm">🆕 4권실무 절차 5개 신규 추가</h3>
          <p className="text-xs text-rose-700 dark:text-rose-300">
            나라장터 등록 → 물품목록화 → 원가계산 → 기술·가격협상 → 우수제품 신청 절차를 단계별로 학습하세요
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
          <li className="flex gap-2"><span className="font-bold flex-shrink-0">1과목</span><span>부정당제재 절차의 5단계와 입찰공고 기간(물품7일·공사15일) 암기</span></li>
          <li className="flex gap-2"><span className="font-bold flex-shrink-0">2과목</span><span>적격심사 95점 기준, 협상계약의 기술·가격 분리평가 흐름 이해</span></li>
          <li className="flex gap-2"><span className="font-bold flex-shrink-0">3과목</span><span>물가변동 조정요건(90일+3%), MAS 2단계경쟁 기준(5천만원↑) 암기</span></li>
          <li className="flex gap-2"><span className="font-bold flex-shrink-0">4권실무</span><span>나라장터 등록 7단계·원가계산 순서(재노경→관이)·우수제품 6단계 흐름 파악</span></li>
        </ul>
      </div>
    </div>
  );
}
