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
]

const subjectTabs: Array<{ id: SubjectFilter; label: string; activeColor: string; inactiveColor: string }> = [
  { id: '전체', label: '전체 (10개)', activeColor: 'bg-slate-800 text-white', inactiveColor: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300' },
  { id: '1과목', label: '1과목 법제도 (2개)', activeColor: 'bg-violet-700 text-white', inactiveColor: 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' },
  { id: '2과목', label: '2과목 조달계획 (1개)', activeColor: 'bg-blue-700 text-white', inactiveColor: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  { id: '3과목', label: '3과목 계약관리 (5개)', activeColor: 'bg-emerald-700 text-white', inactiveColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' },
  { id: '4권실무', label: '4권 관리실무 (2개)', activeColor: 'bg-rose-700 text-white', inactiveColor: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300' },
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
      ? comparisonData.slice(0, 5) // 전체: 핵심 5개 표시
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
              <p className="text-purple-200 text-sm mt-1">4권 실무 원가계산·MAS 비교표 신규 추가</p>
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
              🆕 <strong>4권실무 탭</strong>에서 원가계산 유형 비교와 MAS vs 일반경쟁입찰 비교표를 확인하세요!
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
            <li className="flex gap-2"><span className="font-bold flex-shrink-0">4.</span><span><strong>4권실무</strong>: 원가계산 구성요소(재노경관이)와 MAS 2단계경쟁 기준(5천만원)을 반드시 암기하세요</span></li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}
