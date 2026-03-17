'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { NumberQuiz } from '@/components/learn/NumberQuiz'
import keywords from '@/data/rawdata/keywords.json'

interface NumberData {
  id: string
  question: string
  answer: string | number
  options?: string[]
  lawReference?: string
  subject: '1과목' | '2과목' | '3과목' | '4과목'
}

const numberData: NumberData[] = [
  {
    id: '1',
    subject: '1과목',
    question: '소액수의계약 - 물품의 기준금액은?',
    answer: '2천만원',
    options: ['1천만원', '2천만원', '3천만원', '5천만원'],
    lawReference: '국가계약법 시행령 제7조 - 물품 소액수의계약 기준',
  },
  {
    id: '2',
    subject: '1과목',
    question: '소액수의계약 - 공사의 기준금액은?',
    answer: '8천만원',
    options: ['5천만원', '8천만원', '1억원', '2억원'],
    lawReference: '국가계약법 시행령 제7조 - 공사 소액수의계약 기준',
  },
  {
    id: '3',
    subject: '1과목',
    question: '소액수의계약 - 용역의 기준금액은?',
    answer: '5천만원',
    options: ['2천만원', '3천만원', '5천만원', '8천만원'],
    lawReference: '국가계약법 시행령 제7조 - 용역 소액수의계약 기준',
  },
  {
    id: '4',
    subject: '1과목',
    question: '입찰보증금의 기준은?',
    answer: '추정가격의 5% 이상',
    options: ['추정가격의 3%', '추정가격의 5%', '추정가격의 10%', '계약금액의 5%'],
    lawReference: '국가계약법 시행령 제37조 - 입찰보증금 기준',
  },
  {
    id: '5',
    subject: '1과목',
    question: '계약보증금의 기준은?',
    answer: '계약금액의 10~15%',
    options: ['계약금액의 5~10%', '계약금액의 10~15%', '계약금액의 15~20%', '계약금액의 2~5%'],
    lawReference: '국가계약법 시행령 제50조 - 계약보증금 기준',
  },
  {
    id: '6',
    subject: '1과목',
    question: '하자보수보증금의 기준은?',
    answer: '계약금액의 2~5%',
    options: ['계약금액의 1~2%', '계약금액의 2~5%', '계약금액의 5~10%', '계약금액의 10~15%'],
    lawReference: '국가계약법 시행령 제52조 - 하자보수보증금 기준',
  },
  {
    id: '7',
    subject: '2과목',
    question: '복수예비가격의 범위는?',
    answer: '±3%',
    options: ['±1%', '±2%', '±3%', '±5%'],
    lawReference: '국가계약법 시행령 제50조 - 복수예비가격 범위',
  },
  {
    id: '8',
    subject: '2과목',
    question: '일반경쟁입찰 공고기간은 최소 몇 일 이상?',
    answer: '10',
    options: ['5', '7', '10', '14'],
    lawReference: '국가계약법 시행령 - 일반경쟁입찰 공고기간',
  },
  {
    id: '9',
    subject: '2과목',
    question: '적격심사 기준 종합평점은 최소 몇 점 이상?',
    answer: '95',
    options: ['80', '85', '90', '95'],
    lawReference: '국가계약법 시행령 제42조 - 적격심사 기준',
  },
  {
    id: '10',
    subject: '2과목',
    question: '종합심사낙찰제 적용 대상 공사비는?',
    answer: '300억원 이상',
    options: ['100억원 이상', '200억원 이상', '300억원 이상', '500억원 이상'],
    lawReference: '국가계약법 시행령 제42조의2 - 종합심사낙찰제',
  },
  {
    id: '11',
    subject: '3과목',
    question: '물품계약 지체상금률은?',
    answer: '0.25%',
    options: ['0.1%', '0.15%', '0.25%', '0.5%'],
    lawReference: '국가계약법 시행령 제74조 - 지체상금율',
  },
  {
    id: '12',
    subject: '3과목',
    question: '공사계약 지체상금률은?',
    answer: '0.5‰',
    options: ['0.25‰', '0.3‰', '0.5‰', '1‰'],
    lawReference: '국가계약법 시행령 제74조 - 공사 지체상금율',
  },
  {
    id: '13',
    subject: '3과목',
    question: '입찰참가자격 사전심사(PQ) 적용 대상 공사비는?',
    answer: '300억원 이상',
    options: ['100억원 이상', '200억원 이상', '300억원 이상', '500억원 이상'],
    lawReference: '국가계약법 시행령 제13조 - 입찰참가자격 사전심사',
  },
  {
    id: '14',
    subject: '4과목',
    question: '나라장터 연간 처리금액은?',
    answer: '100조원 이상',
    options: ['50조원 이상', '75조원 이상', '100조원 이상', '150조원 이상'],
    lawReference: '전자조달의 이용 및 촉진에 관한 법률 - 나라장터 운영',
  },
  {
    id: '15',
    subject: '4과목',
    question: '선급금 지급 범위는 계약금액의 몇 % 이내?',
    answer: '70%',
    options: ['50%', '60%', '70%', '80%'],
    lawReference: '국가계약법 시행령 - 선급금 지급 범위',
  },
]

export default function NumbersPage() {
  const [selectedSubject, setSelectedSubject] = useState<'1과목' | '2과목' | '3과목' | '4과목'>(
    '1과목'
  )
  const [score, setScore] = useState(0)
  const [totalAnswered, setTotalAnswered] = useState(0)

  const filteredData = numberData.filter((item) => item.subject === selectedSubject)

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1)
    }
    setTotalAnswered(totalAnswered + 1)
  }

  const accuracy =
    totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 0

  const subjects = ['1과목', '2과목', '3과목', '4과목'] as const

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-800 to-orange-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl md:text-4xl font-bold">숫자 암기 퀴즈</h1>
            <Link
              href="/learn"
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition"
            >
              뒤로 가기
            </Link>
          </div>
          <p className="text-orange-100 text-lg">
            시험에 자주 출제되는 중요한 숫자와 기준값을 암기하세요
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Score tracker */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold uppercase mb-2">
              정답
            </p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {score}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold uppercase mb-2">
              푼 문제
            </p>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {totalAnswered}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold uppercase mb-2">
              정답률
            </p>
            <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
              {accuracy}%
            </p>
          </div>
        </motion.div>

        {/* Subject filter tabs */}
        <div className="flex gap-3 mb-10 overflow-x-auto pb-2">
          {subjects.map((subject) => (
            <motion.button
              key={subject}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedSubject(subject)}
              className={`px-6 py-3 rounded-lg font-bold whitespace-nowrap transition ${
                selectedSubject === subject
                  ? 'bg-orange-800 text-white shadow-lg'
                  : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:border-orange-400'
              }`}
            >
              {subject}
            </motion.button>
          ))}
        </div>

        {/* Quizzes */}
        <div className="space-y-12">
          {filteredData.map((data, idx) => (
            <motion.div
              key={data.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <NumberQuiz
                question={data.question}
                answer={data.answer}
                options={data.options}
                lawReference={data.lawReference}
                onAnswer={handleAnswer}
              />
            </motion.div>
          ))}
        </div>

        {/* Learning tips */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-2xl"
        >
          <h3 className="text-2xl font-bold text-orange-900 dark:text-orange-200 mb-4">
            💡 숫자 암기 팁
          </h3>
          <ul className="space-y-3 text-orange-800 dark:text-orange-300">
            <li className="flex gap-3">
              <span className="flex-shrink-0 font-bold">1.</span>
              <span>
                자주 출제되는 숫자부터 우선적으로 암기하세요 (소액수의계약 기준, 보증금 비율)
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 font-bold">2.</span>
              <span>
                물품, 공사, 용역의 기준금액을 구분하여 명확히 암기하세요
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 font-bold">3.</span>
              <span>
                각 숫자가 나오는 법조문을 함께 학습하여 이해도를 높이세요
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 font-bold">4.</span>
              <span>
                반복 풀이를 통해 숫자와 그 의미를 뇌에 깊숙이 새겨 넣으세요
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 font-bold">5.</span>
              <span>
                시험 직전에 한 번 더 모든 숫자를 검토하는 것이 효과적입니다
              </span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}
