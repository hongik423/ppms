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
    description: '적격심사, 종합심사, 협상계약의 차이점',
    headers: ['적격심사', '종합심사', '협상계약'],
    rows: [
      {
        label: '목적',
        cells: [
          '계약능력 확인',
          '가격과 품질 종합평가',
          '특수한 조건에서 협상',
        ],
      },
      {
        label: '심사시간',
        cells: ['신속', '상대적으로 긴 시간', '유연함'],
      },
      {
        label: '평가항목',
        cells: ['기술능력, 신용도, 자본금', '가격, 품질, 기술력', '협상사항'],
      },
      {
        label: '대상계약',
        cells: ['일반 계약', '특수 기술 계약', '특수 상황'],
      },
    ],
  },
  {
    id: '2',
    title: '경쟁 방식 비교',
    description: '일반경쟁, 제한경쟁, 지명경쟁 비교',
    headers: ['일반경쟁', '제한경쟁', '지명경쟁'],
    rows: [
      {
        label: '참여자격',
        cells: ['제한 없음', '특정 자격 요구', '사전 지명된 자'],
      },
      {
        label: '참여업체수',
        cells: ['무제한', '자격 기준에 따름', '소수 (2~5개사)'],
      },
      {
        label: '경쟁성',
        cells: ['높음', '중간', '낮음'],
      },
      {
        label: '절차',
        cells: ['공고→입찰→개찰→심사', '공고→입찰→개찰→심사', '지명→입찰→개찰'],
      },
      {
        label: '사용사유',
        cells: ['대부분의 계약', '기술/신용 필요시', '매우 특수한 경우'],
      },
    ],
  },
  {
    id: '3',
    title: '입찰 방식 비교',
    description: '밀봉입찰, 공개입찰, 역경매의 차이점',
    headers: ['밀봉입찰', '공개입찰', '역경매'],
    rows: [
      {
        label: '절차',
        cells: ['사전에 입찰가 공개안함', '입찰가를 현장에서 공개', '가격을 낮춰가며 경쟁'],
      },
      {
        label: '투명성',
        cells: ['낮음', '높음', '높음'],
      },
      {
        label: '조작가능성',
        cells: ['높음', '낮음', '낮음'],
      },
      {
        label: '가격경쟁력',
        cells: ['상대적으로 낮음', '높음', '매우 높음'],
      },
      {
        label: '사용빈도',
        cells: ['드문 경우', '일반적', '특수 계약'],
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
