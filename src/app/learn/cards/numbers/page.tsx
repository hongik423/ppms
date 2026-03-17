'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { NumberQuiz } from '@/components/learn/NumberQuiz'

interface NumberData {
  id: string
  question: string
  answer: string | number
  options?: string[]
  lawReference?: string
  subject: '1과목' | '2과목' | '3과목'
}

const numberData: NumberData[] = [
  {
    id: '1',
    subject: '1과목',
    question: '복수예비가격의 범위는 ±___%',
    answer: '3',
    options: ['1', '2', '3', '5'],
    lawReference:
      '「정부계약법 시행령」 제50조(복수예비가격) - 복수예비가격은 예정가격의 ±3% 범위 내에서 설정',
  },
  {
    id: '2',
    subject: '1과목',
    question: '국제입찰의 기준금액은?',
    answer: '2억원',
    options: ['1억원', '2억원', '3억원', '5억원'],
    lawReference:
      '「국가를 당사자로 하는 계약에 관한 법률」 제17조 - 공사의 금액이 2억원 이상인 경우',
  },
  {
    id: '3',
    subject: '1과목',
    question: '일반경쟁입찰의 공고기간은 최소 ___일 이상',
    answer: '10',
    options: ['5', '7', '10', '14'],
    lawReference:
      '「정부계약법 시행령」 제7조(공고기간) - 일반경쟁입찰은 10일 이상',
  },
  {
    id: '4',
    subject: '2과목',
    question: '적격심사 대상 용역의 기준금액은?',
    answer: '1000만원',
    options: ['500만원', '1000만원', '2000만원', '5000만원'],
    lawReference:
      '「정부계약법 시행령」 제30조 - 기술용역의 기준금액은 1000만원',
  },
  {
    id: '5',
    subject: '2과목',
    question: '예정가격 작성 시 기술료 비율은 최소 __% 이상',
    answer: '15',
    options: ['5', '10', '15', '20'],
    lawReference:
      '「정부계약법 시행령」 제58조 - 용역계약의 기술료는 예정가격의 15% 이상',
  },
  {
    id: '6',
    subject: '3과목',
    question: '공공조달 관련 법규에서 계약담당자의 의무 위반 시 과태료는 최대 ___만원',
    answer: '3000',
    options: ['1000', '2000', '3000', '5000'],
    lawReference:
      '「정부계약법」 제117조 - 계약담당자의 의무 위반에 따른 과태료',
  },
]

export default function NumbersPage() {
  const [selectedSubject, setSelectedSubject] = useState<'1과목' | '2과목' | '3과목'>(
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

  const subjects = ['1과목', '2과목', '3과목'] as const

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
                자주 출제되는 숫자부터 우선적으로 암기하세요
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 font-bold">2.</span>
              <span>
                각 숫자가 나오는 법조문을 함께 학습하여 이해도를 높이세요
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 font-bold">3.</span>
              <span>
                반복 풀이를 통해 숫자와 그 의미를 뇌에 깊숙이 새겨 넣으세요
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 font-bold">4.</span>
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
