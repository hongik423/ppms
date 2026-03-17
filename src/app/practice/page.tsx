'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ZapIcon,
  BrainIcon,
  BookmarkIcon,
  BarChart2Icon,
} from 'lucide-react'

const practiceCards = [
  {
    href: '/practice/quick',
    icon: <ZapIcon className="w-8 h-8" />,
    title: '빠른 문제 풀이',
    description: '과목, 난이도, 문항수를 선택하여 바로 풀기',
    color: 'from-blue-500 to-blue-600',
    badge: '실전',
  },
  {
    href: '/practice/ai-custom',
    icon: <BrainIcon className="w-8 h-8" />,
    title: 'AI 맞춤 문제',
    description: '당신의 학습 패턴에 맞춘 맞춤형 문제',
    color: 'from-purple-500 to-purple-600',
    badge: '스마트',
  },
  {
    href: '/practice/wrong-notes',
    icon: <BookmarkIcon className="w-8 h-8" />,
    title: '오답노트',
    description: '틀린 문제들을 모아서 복습하기',
    color: 'from-red-500 to-red-600',
    count: 12,
  },
  {
    href: '/practice/history',
    icon: <BarChart2Icon className="w-8 h-8" />,
    title: '풀이 이력',
    description: '그동안의 학습 진행 상황 분석',
    color: 'from-green-500 to-green-600',
  },
]

export default function PracticePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">문제 풀이</h1>
          <p className="text-blue-100 text-lg">
            다양한 문제를 풀면서 실력을 다지세요
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700"
          >
            <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold uppercase mb-2">
              총 풀이 문제
            </p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              156
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700"
          >
            <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold uppercase mb-2">
              정답률
            </p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              72%
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700"
          >
            <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold uppercase mb-2">
              오답
            </p>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">
              44
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700"
          >
            <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold uppercase mb-2">
              학습 시간
            </p>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              12시간
            </p>
          </motion.div>
        </div>

        {/* Practice cards */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
            문제 풀이 방식
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {practiceCards.map((card, idx) => (
              <Link key={card.href} href={card.href}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="h-full bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer border border-slate-200 dark:border-slate-700"
                >
                  <div
                    className={`bg-gradient-to-br ${card.color} h-24 flex items-center justify-center text-white relative`}
                  >
                    {card.icon}
                    {card.badge && (
                      <span className="absolute top-3 right-3 px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-bold text-white">
                        {card.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {card.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      {card.description}
                    </p>
                    {card.count !== undefined && (
                      <div className="inline-block px-3 py-1 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-full text-sm font-semibold">
                        {card.count}개 문제
                      </div>
                    )}
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent scores */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
            최근 풀이 기록
          </h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-700">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white">
                      날짜
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white">
                      과목
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white">
                      난이도
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white">
                      정답률
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      date: '2024-01-15',
                      subject: '1과목',
                      difficulty: '실전',
                      accuracy: '85%',
                    },
                    {
                      date: '2024-01-14',
                      subject: '2과목',
                      difficulty: '응용',
                      accuracy: '72%',
                    },
                    {
                      date: '2024-01-13',
                      subject: '3과목',
                      difficulty: '기초',
                      accuracy: '95%',
                    },
                    {
                      date: '2024-01-12',
                      subject: '1과목',
                      difficulty: '응용',
                      accuracy: '68%',
                    },
                    {
                      date: '2024-01-11',
                      subject: '전과목',
                      difficulty: '실전',
                      accuracy: '72%',
                    },
                  ].map((record, idx) => (
                    <tr
                      key={idx}
                      className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition"
                    >
                      <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
                        {record.date}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                        {record.subject}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            record.difficulty === '기초'
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
                              : record.difficulty === '응용'
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'
                              : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
                          }`}
                        >
                          {record.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">
                        {record.accuracy}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-200 mb-4">
            💡 효과적인 문제 풀이 팁
          </h3>
          <ul className="space-y-3 text-blue-800 dark:text-blue-300">
            <li className="flex gap-3">
              <span className="flex-shrink-0 font-bold">1.</span>
              <span>
                빠른 문제 풀이로 전체적인 난이도와 패턴을 파악하세요
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 font-bold">2.</span>
              <span>
                틀린 문제는 반드시 오답노트에 저장하여 나중에 복습하세요
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 font-bold">3.</span>
              <span>
                AI 맞춤 문제로 당신의 약점을 집중 공략하세요
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 font-bold">4.</span>
              <span>
                풀이 이력을 주기적으로 확인하여 진행 상황을 점검하세요
              </span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}
