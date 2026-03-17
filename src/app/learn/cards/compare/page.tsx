'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { CompareTable } from '@/components/learn/CompareTable'

interface ComparisonData {
  id: string
  title: string
  description: string
  headers: string[]
  rows: Array<{
    label: string
    cells: string[]
  }>
}

const comparisonData: ComparisonData[] = [
  {
    id: '1',
    title: '심사 방법 비교',
    description: '적격심사, 종합심사낙찰제, 협상계약의 차이점',
    headers: ['적격심사', '종합심사낙찰제', '협상계약'],
    rows: [
      {
        label: '정의',
        cells: [
          '최저가 입찰자부터 순서대로 계약이행 능력을 심사',
          '가격과 이행능력(기술, 신용, 경험)을 종합 평가하여 낙찰자 결정',
          '기술·가격 분리입찰 후 기술적합자와 협상을 통해 계약 체결',
        ],
      },
      {
        label: '적용 대상',
        cells: [
          '물품, 용역 계약',
          '300억원 이상 공사계약',
          '기술, 가격이 복합적인 사업(공사, 용역)',
        ],
      },
      {
        label: '심사항목',
        cells: [
          '이행능력(기술능력, 신용도, 재무상태, 공사실적)',
          '가격(40~60%), 기술(40~60%), 신용평가 등',
          '기술평가 → 기술적합자 선정 → 가격협상',
        ],
      },
      {
        label: '합격기준',
        cells: [
          '물품·용역 종합평점 95점 이상',
          '각 평가항목 기준점 이상, 총점 우선자',
          '기술적합자 중 합의된 가격으로 계약',
        ],
      },
      {
        label: '낙찰자 결정',
        cells: [
          '최저가 입찰자부터 순서대로 심사 후 적격자',
          '가격×기술 종합 가중치 계산하여 최고점자',
          '협상 결과 최종 체결가격으로 낙찰자 결정',
        ],
      },
    ],
  },
  {
    id: '2',
    title: '경쟁 방법 비교',
    description: '일반경쟁, 제한경쟁, 지명경쟁, 수의계약의 차이점',
    headers: ['일반경쟁', '제한경쟁', '지명경쟁', '수의계약'],
    rows: [
      {
        label: '정의',
        cells: [
          '일정한 자격요건 없이 모든 사업자가 자유롭게 입찰 참가',
          '필요한 자격(실적, 기술, 신용 등)을 갖춘 사업자만 참가',
          '특정 소수 사업자를 지정하여 입찰 실시',
          '경쟁 없이 특정 사업자와 직접 계약',
        ],
      },
      {
        label: '경쟁성',
        cells: ['높음', '중간', '낮음', '경쟁 없음'],
      },
      {
        label: '참여자격',
        cells: [
          '제한 없음',
          '경쟁제품 지정, 기술력, 신용도 등',
          '사전 지명된 업체만',
          '특정 업체(천재지변, 특허, 소액 등)',
        ],
      },
      {
        label: '참여업체수',
        cells: [
          '무제한',
          '자격기준에 따라 결정',
          '2~5개사 (통상 3개사)',
          '1개사',
        ],
      },
      {
        label: '공고기간',
        cells: [
          '최소 10일 이상',
          '최소 10일 이상',
          '최소 7일 이상',
          '공고 없음',
        ],
      },
      {
        label: '소액수의계약',
        cells: [
          '物品 2천만원 이상',
          '공사 8천만원 이상',
          '용역 5천만원 이상',
          '물품 2천만원, 공사 8천만원, 용역 5천만원 이하',
        ],
      },
    ],
  },
  {
    id: '3',
    title: '계약 유형 비교',
    description: '물품계약, 용역계약, 공사계약, MAS계약의 차이점',
    headers: ['물품계약', '용역계약', '공사계약', 'MAS계약'],
    rows: [
      {
        label: '정의',
        cells: [
          '기성물품 구매',
          '일에 대한 가치를 지불(기술, 학술, 정책 등)',
          '자재·노력 투입하여 건설 결과물 인수',
          '동일 규격 물품의 2인 이상과 단가계약',
        ],
      },
      {
        label: '낙찰 기준',
        cells: [
          '최저가 적격심사',
          '기술평가와 가격평가 종합',
          '종합심사낙찰제(300억원 이상) 또는 적격심사',
          '2단계경쟁(가격·비가격 요소 종합)',
        ],
      },
      {
        label: '이행기간',
        cells: [
          '배송 및 납기',
          '서비스 제공기간',
          '시공기간 (변경가능)',
          '각 건별로 변동',
        ],
      },
      {
        label: '검사·검수',
        cells: [
          '수령 즉시 검사',
          '과업 완성 후 검수',
          '완공 검사',
          '배송 시마다 검사',
        ],
      },
      {
        label: '보증금',
        cells: [
          '입찰보증금 + 계약보증금',
          '입찰보증금 + 계약보증금',
          '입찰보증금 + 계약보증금 + 하자보수보증금',
          '입찰보증금 + 계약보증금',
        ],
      },
    ],
  },
  {
    id: '4',
    title: '보증금 비교',
    description: '입찰보증금, 계약보증금, 선급금보증금, 하자보수보증금',
    headers: ['입찰보증금', '계약보증금', '선급금보증금', '하자보수보증금'],
    rows: [
      {
        label: '정의',
        cells: [
          '입찰자가 성실한 입찰을 보장',
          '계약자가 계약 이행을 보장',
          '선급금 지급으로 인한 손실을 보장',
          '하자보수 이행을 보장',
        ],
      },
      {
        label: '기준금액',
        cells: [
          '추정가격의 5% 이상',
          '계약금액의 10~15%',
          '선급금액의 100%',
          '계약금액의 2~5%',
        ],
      },
      {
        label: '납부시기',
        cells: [
          '입찰 시',
          '계약 체결 시',
          '선급금 지급 시',
          '계약 체결 시 또는 준공 후',
        ],
      },
      {
        label: '환급시기',
        cells: [
          '낙찰자 결정 후 또는 과실 시 몰수',
          '계약 완료 및 검사합격 후',
          '선급금 정산 후',
          '하자보수 기간 만료 후',
        ],
      },
      {
        label: '면제요건',
        cells: [
          '소액수의계약, 국제경쟁입찰 등',
          '중소기업(계약금액 3천만원 미만)',
          '선급금 100만원 이하',
          '공사비 5백만원 이하',
        ],
      },
    ],
  },
  {
    id: '5',
    title: '법률 비교',
    description: '국가계약법, 지방계약법, 공기업계약사무규칙의 차이점',
    headers: ['국가계약법', '지방계약법', '공기업계약사무규칙'],
    rows: [
      {
        label: '적용대상',
        cells: [
          '중앙관서, 기금, 정부투자기관',
          '지방자치단체, 지방공기관',
          '공기업, 준정부기관',
        ],
      },
      {
        label: '근거법',
        cells: [
          '「국가를 당사자로 하는 계약에 관한 법률」',
          '「지방자치단체를 당사자로 하는 계약에 관한 법률」',
          '「공기업·준정부기관 계약사무규칙」',
        ],
      },
      {
        label: '소액수의계약',
        cells: [
          '물품 2천만원, 공사 8천만원, 용역 5천만원 이하',
          '지역에 따라 다름 (유사)',
          '별도 기준 적용',
        ],
      },
      {
        label: '수의계약 기준',
        cells: [
          '시행령 제26조 각호 규정',
          '시행령 제25조 규정',
          '별도 기준 적용',
        ],
      },
      {
        label: '입찰방법',
        cells: [
          '일반경쟁 원칙 (예외: 제한·지명·수의)',
          '일반경쟁 원칙 (예외: 제한·지명·수의)',
          '기관별 계약정책 적용',
        ],
      },
      {
        label: '추정가격 결정',
        cells: [
          '계약담당자 책임',
          '계약담당자 책임',
          '계약담당자 책임',
        ],
      },
    ],
  },
]

export default function CompareCardsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(comparisonData[0].id)
  const [quizModes, setQuizModes] = useState<Record<string, boolean>>({})

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const toggleQuizMode = (id: string) => {
    setQuizModes((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-800 to-purple-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl md:text-4xl font-bold">비교표 학습</h1>
            <Link
              href="/learn"
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition"
            >
              뒤로 가기
            </Link>
          </div>
          <p className="text-purple-100 text-lg">
            헷갈리는 개념들을 한눈에 비교하고 학습하세요
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {comparisonData.map((comparison, idx) => (
            <motion.div
              key={comparison.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden"
            >
              {/* Accordion header */}
              <button
                onClick={() => toggleExpand(comparison.id)}
                className="w-full px-6 py-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition bg-gradient-to-r from-purple-50 dark:from-purple-950/30 to-transparent dark:to-transparent"
              >
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                    {comparison.title}
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {comparison.description}
                  </p>
                </div>
                <motion.div
                  animate={{ rotate: expandedId === comparison.id ? 180 : 0 }}
                  className="flex-shrink-0"
                >
                  <svg
                    className="w-6 h-6 text-slate-600 dark:text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </motion.div>
              </button>

              {/* Accordion content */}
              {expandedId === comparison.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-slate-200 dark:border-slate-700"
                >
                  <div className="p-6">
                    {/* Quiz mode toggle */}
                    <div className="flex items-center justify-between mb-6">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={quizModes[comparison.id] || false}
                          onChange={() => toggleQuizMode(comparison.id)}
                          className="w-5 h-5 rounded"
                        />
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          📝 퀴즈 모드 켜기
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

        {/* Study tips */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 p-8 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-2xl"
        >
          <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-200 mb-4">
            📚 효과적인 비교표 학습법
          </h3>
          <ul className="space-y-3 text-purple-800 dark:text-purple-300">
            <li className="flex gap-3">
              <span className="flex-shrink-0 font-bold">1.</span>
              <span>먼저 표의 구조를 파악하고 각 항목을 읽어보세요</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 font-bold">2.</span>
              <span>
                같은 행을 읽어 각 개념의 차이점을 명확히 파악하세요
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 font-bold">3.</span>
              <span>
                퀴즈 모드로 전환하여 빈칸을 채워보며 이해도를 체크하세요
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 font-bold">4.</span>
              <span>
                반복 학습으로 개념을 뇌에 깊숙이 새겨 넣으세요
              </span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}
