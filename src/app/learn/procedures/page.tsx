'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, GitBranch, ChevronRight } from 'lucide-react';

interface ProcedureStep {
  step: number;
  name: string;
  description: string;
}

interface Procedure {
  id: string;
  title: string;
  category: string;
  steps: ProcedureStep[];
  relatedSubjects: string[];
}

const procedures: Procedure[] = [
  {
    id: 'proc-1',
    title: '일반경쟁입찰 절차',
    category: '입찰·낙찰',
    relatedSubjects: ['1과목', '2과목'],
    steps: [
      { step: 1, name: '입찰공고', description: '관보·나라장터에 공고 (공사 15일, 물품·용역 7일 이상)' },
      { step: 2, name: '입찰참가등록', description: '경쟁입찰참가자격 등록, 보증금 납부' },
      { step: 3, name: '입찰서 제출', description: '전자조달시스템을 통한 투찰' },
      { step: 4, name: '개찰', description: '입찰마감 후 공개 개찰' },
      { step: 5, name: '낙찰자 결정', description: '적격심사·최저가·종합심사 등 방법별 결정' },
      { step: 6, name: '계약 체결', description: '낙찰 통지일로부터 10일 이내 계약 체결' },
    ],
  },
  {
    id: 'proc-2',
    title: '적격심사 절차',
    category: '낙찰자 결정',
    relatedSubjects: ['2과목', '3과목'],
    steps: [
      { step: 1, name: '최저가 순위 결정', description: '예정가격 이하 최저가 입찰자부터 순위 부여' },
      { step: 2, name: '이행능력 심사', description: '이행실적·기술능력·재무상태·과거공사실적 등 심사' },
      { step: 3, name: '종합평점 산정', description: '물품·용역 95점 이상, 공사는 기준에 따라 결정' },
      { step: 4, name: '낙찰자 결정', description: '적격자를 낙찰자로 결정, 부적격 시 차순위자 심사' },
    ],
  },
  {
    id: 'proc-3',
    title: '협상계약 절차',
    category: '낙찰자 결정',
    relatedSubjects: ['2과목', '3과목'],
    steps: [
      { step: 1, name: '제안요청서(RFP) 작성', description: '기술·가격 분리 평가 기준 설정' },
      { step: 2, name: '기술평가', description: '제안서 기술점수 산정' },
      { step: 3, name: '가격평가', description: '가격점수 산정' },
      { step: 4, name: '우선협상대상자 선정', description: '기술+가격 종합점수 최고득점자' },
      { step: 5, name: '기술·가격 협상', description: '과업 범위·가격 조정 협상' },
      { step: 6, name: '계약 체결', description: '협상 합의에 따라 계약 체결' },
    ],
  },
  {
    id: 'proc-4',
    title: '계약변경(물가변동) 절차',
    category: '계약관리',
    relatedSubjects: ['3과목', '실기'],
    steps: [
      { step: 1, name: '조정요건 발생', description: '입찰일로부터 90일 경과 + 등락률 3% 이상' },
      { step: 2, name: '조정요건 확인', description: '물가변동 적용기준일 및 등락률 산출' },
      { step: 3, name: '조정금액 산출', description: '잔여공사량(물량) × 등락률 = 조정금액' },
      { step: 4, name: '계약금액 조정 청구', description: '계약상대자가 발주처에 조정 청구' },
      { step: 5, name: '변경계약 체결', description: '발주처 검토 후 변경계약서 작성' },
    ],
  },
  {
    id: 'proc-5',
    title: 'MAS(다수공급자계약) 2단계경쟁',
    category: '계약관리',
    relatedSubjects: ['3과목', '실기'],
    steps: [
      { step: 1, name: 'MAS 계약 체결', description: '조달청-공급자 간 단가계약 체결' },
      { step: 2, name: '수요기관 구매 요청', description: '나라장터 종합쇼핑몰에서 물품 선택' },
      { step: 3, name: '2단계경쟁 개시', description: '동일 품목 MAS 업체 간 가격·비가격 경쟁' },
      { step: 4, name: '최종 공급자 선정', description: '종합평가 최고점자를 최종 공급자로 선정' },
      { step: 5, name: '납품·검수', description: '납품 후 수요기관의 검사·검수' },
    ],
  },
  {
    id: 'proc-6',
    title: '부정당업자 제재 절차',
    category: '공정조달',
    relatedSubjects: ['1과목', '실기'],
    steps: [
      { step: 1, name: '제재사유 발생', description: '허위서류 제출, 담합, 뇌물 제공 등' },
      { step: 2, name: '제재 사전통보', description: '해당 업체에 제재 사전 통보' },
      { step: 3, name: '청문 절차', description: '업체의 의견 진술 기회 부여' },
      { step: 4, name: '제재 처분 결정', description: '조달청장이 1개월~2년 입찰참가자격 제한 결정' },
      { step: 5, name: '처분 통보·공개', description: '제재 처분 통보 및 나라장터 공개' },
    ],
  },
  {
    id: 'proc-7',
    title: '리스크 관리 4단계',
    category: '실무',
    relatedSubjects: ['실기'],
    steps: [
      { step: 1, name: '리스크 식별', description: '리스크 관리 계획 수립, 위험 식별, 유형별 분류' },
      { step: 2, name: '위험도 평가', description: '발생확률×영향도 매트릭스, 중요도 산정, 우선순위 결정' },
      { step: 3, name: '대응계획 수립', description: '회피·전가·완화·수용 전략, 비상 대응계획' },
      { step: 4, name: '모니터링', description: '실행 여부 확인, 성과 확인, 신규 리스크 식별' },
    ],
  },
];

export default function ProceduresPage() {
  const categories = Array.from(new Set(procedures.map((p) => p.category)));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
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
            공공조달 주요 절차를 단계별로 정리했습니다
          </p>
        </div>
      </div>

      {/* 통계 배너 */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <GitBranch className="w-6 h-6" />
          <span className="font-semibold text-lg">총 {procedures.length}개 핵심 절차</span>
        </div>
        <p className="text-green-100 text-sm">
          시험에 자주 출제되는 주요 절차를 단계별 흐름도로 학습합니다.
        </p>
      </div>

      {/* 카테고리별 절차 */}
      {categories.map((cat) => (
        <div key={cat} className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white px-1">{cat}</h2>
          {procedures
            .filter((p) => p.category === cat)
            .map((proc) => (
              <div
                key={proc.id}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
              >
                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-600">
                  <h3 className="font-semibold text-slate-900 dark:text-white">{proc.title}</h3>
                  <div className="flex gap-2 mt-1">
                    {proc.relatedSubjects.map((s) => (
                      <span
                        key={s}
                        className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {proc.steps.map((step, idx) => (
                      <div key={step.step} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                          {step.step}
                        </div>
                        <div className="flex-1 pt-1">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">
                            {step.name}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {step.description}
                          </p>
                        </div>
                        {idx < proc.steps.length - 1 && (
                          <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 mt-2 flex-shrink-0 hidden sm:block" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
