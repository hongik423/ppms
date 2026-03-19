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
    category: '국가계약법',
    subject: '1과목',
    color: 'bg-violet-50 border-violet-200 dark:bg-violet-900/10 dark:border-violet-700',
    laws: [
      {
        law: '국가를 당사자로 하는 계약에 관한 법률 제7조',
        description: '경쟁입찰 원칙 — 소액수의계약 기준',
        keyPoints: ['물품 2천만원', '공사 8천만원', '용역 5천만원 이하 수의계약 가능'],
        subject: '1과목',
      },
      {
        law: '국가계약법 시행령 제27조',
        description: '수의계약 사유 — 특허·천재지변·긴급 등',
        keyPoints: ['특허 또는 실용신안', '천재지변·긴급복구', '중소기업자간 경쟁제품'],
        subject: '1과목',
      },
    ],
  },
  {
    category: '조달사업법',
    subject: '1과목',
    color: 'bg-violet-50 border-violet-200 dark:bg-violet-900/10 dark:border-violet-700',
    laws: [
      {
        law: '조달사업에 관한 법률 제2조',
        description: '조달사업의 정의 및 범위',
        keyPoints: ['물품·용역·공사의 구매·비축·관리', '조달청의 역할과 권한'],
        subject: '1과목',
      },
      {
        law: '조달사업법 제6조',
        description: '수요기관에 대한 지원',
        keyPoints: ['단가계약 체결 및 공급', '다수공급자계약(MAS) 근거'],
        subject: '1과목',
      },
    ],
  },
  {
    category: '전자조달법',
    subject: '1과목',
    color: 'bg-violet-50 border-violet-200 dark:bg-violet-900/10 dark:border-violet-700',
    laws: [
      {
        law: '전자조달의 이용 및 촉진에 관한 법률 제2조',
        description: '나라장터 정의 및 운영 근거',
        keyPoints: ['국가종합전자조달시스템 정의', '전자입찰·전자계약·전자납품'],
        subject: '1과목',
      },
      {
        law: '전자조달법 제8조',
        description: '전자적 공고 방법 및 시기',
        keyPoints: ['나라장터를 통한 공고 원칙', '공고기간 준수 의무'],
        subject: '1과목',
      },
    ],
  },
  {
    category: '정책지원 관련법',
    subject: '1과목',
    color: 'bg-violet-50 border-violet-200 dark:bg-violet-900/10 dark:border-violet-700',
    laws: [
      {
        law: '중소기업제품 구매촉진 및 판로지원에 관한 법률',
        description: '중소기업 공공구매제도 근거',
        keyPoints: ['중소기업자간 경쟁제품 지정', '우선구매 목표비율 설정'],
        subject: '1과목',
      },
      {
        law: '녹색제품 구매촉진에 관한 법률',
        description: '녹색조달 근거 — 환경적 지속가능성',
        keyPoints: ['녹색제품 우선구매 의무', '생애주기비용 고려 조달'],
        subject: '1과목',
      },
    ],
  },

  // ────────── 2과목 법조문 (5개) ──────────
  {
    category: '입찰·낙찰 관련 법규',
    subject: '2과목',
    color: 'bg-blue-50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-700',
    laws: [
      {
        law: '국가계약법 시행령 제42조',
        description: '적격심사 — 낙찰자 결정 기준',
        keyPoints: ['물품·용역 95점 이상 합격', '최저가 입찰자부터 순위별 심사'],
        subject: '2과목',
      },
      {
        law: '국가계약법 시행령 제42조의2',
        description: '종합심사낙찰제 — 300억원 이상 공사',
        keyPoints: ['가격(40~60%)+기술(40~60%)+신인도', '300억원 이상 공사에 의무 적용'],
        subject: '2과목',
      },
      {
        law: '국가계약법 시행령 제43조',
        description: '협상계약 — 기술·가격 분리평가',
        keyPoints: ['기술평가→기술적합자 선정', '우선협상대상자와 가격협상'],
        subject: '2과목',
      },
      {
        law: '국가계약법 시행령 제37조',
        description: '입찰보증금 — 추정가격의 5% 이상',
        keyPoints: ['낙찰 포기 시 몰수', '소액수의계약 면제 가능'],
        subject: '2과목',
      },
      {
        law: '국가계약법 시행령 제50조',
        description: '예정가격 결정 기준',
        keyPoints: ['복수예비가격 15개 중 4개 추첨', '산술평균으로 예정가격 결정'],
        subject: '2과목',
      },
    ],
  },

  // ────────── 3과목 법조문 (5개) ──────────
  {
    category: '계약관리 관련 법규',
    subject: '3과목',
    color: 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/10 dark:border-emerald-700',
    laws: [
      {
        law: '국가계약법 시행령 제52조',
        description: '하자보수보증금 — 계약금액의 2~5%',
        keyPoints: ['공사 완공 후 하자보수 기간 설정', '하자보수 기간 만료 후 반환'],
        subject: '3과목',
      },
      {
        law: '국가계약법 시행령 제64조',
        description: '물가변동으로 인한 계약금액 조정',
        keyPoints: ['90일 경과 + ±3% 이상 등락 시 조정', '품목조정률 또는 지수조정률 적용'],
        subject: '3과목',
      },
      {
        law: '국가계약법 시행령 제74조',
        description: '지체상금 — 납기 지연 시 부과',
        keyPoints: ['물품·용역 0.25/1000', '공사 0.5/1000 (1일 기준)'],
        subject: '3과목',
      },
      {
        law: '국가계약법 제27조',
        description: '부정당업자 제재 — 입찰참가자격 제한',
        keyPoints: ['1개월~2년 범위 제재', '담합·허위서류·뇌물 등이 사유'],
        subject: '3과목',
      },
      {
        law: '건설산업기본법 관련 조항',
        description: '공사계약 — 하도급 관리 및 건설기술',
        keyPoints: ['하도급 승인 및 변경 절차', '하도급 대금 직접지급 제도'],
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
        keyPoints: ['신청→기술평가→현장실태조사→지정심의위원회→지정', '수의계약 가능 등 우대'],
        subject: '4권실무',
      },
      {
        law: '혁신제품 지정에 관한 규정',
        description: '혁신조달 — 혁신제품 지정·구매 제도',
        keyPoints: ['기술개발제품 우선구매 연계', '혁신장터 등록 및 공공조달 우선'],
        subject: '4권실무',
      },
    ],
  },
];

const subjectTabs = [
  { id: '전체' as SubjectFilter, label: '전체 (20개)', activeColor: 'bg-slate-800 text-white', inactiveColor: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300' },
  { id: '1과목' as SubjectFilter, label: '1과목 법제도 (8개)', activeColor: 'bg-violet-700 text-white', inactiveColor: 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' },
  { id: '2과목' as SubjectFilter, label: '2과목 조달계획 (5개)', activeColor: 'bg-blue-700 text-white', inactiveColor: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  { id: '3과목' as SubjectFilter, label: '3과목 계약관리 (5개)', activeColor: 'bg-emerald-700 text-white', inactiveColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' },
  { id: '4권실무' as SubjectFilter, label: '4권 관리실무 (6개)', activeColor: 'bg-rose-700 text-white', inactiveColor: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300' },
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
            공공조달관리사 시험 관련 핵심 법률·시행령·고시·기준 정리 (4권 실무 포함)
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
            🆕 4권실무 법조문 학습 포인트
          </h3>
          <ul className="space-y-1 text-xs text-rose-700 dark:text-rose-300">
            <li>• <strong>입찰참가자격 등록규정</strong>: 등록절차 7단계와 유효기간(3년) 암기</li>
            <li>• <strong>직접생산확인 기준</strong>: 핵심부품 직접 제조 + 3년 연속 생산실적</li>
            <li>• <strong>원가계산 준칙</strong>: 4가지 유형별 구성요소 비교 암기</li>
            <li>• <strong>MAS 세부기준</strong>: 2단계경쟁 5천만원 기준 필수 암기</li>
          </ul>
        </div>
      )}
    </div>
  );
}
