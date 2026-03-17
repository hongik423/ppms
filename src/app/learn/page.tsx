'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  BookOpenIcon,
  ListIcon,
  BarChart3Icon,
  BookmarkIcon,
  ScaleIcon,
  TargetIcon,
} from 'lucide-react';

interface LearningCard {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  count?: number;
  color: string;
}

const learningCards: LearningCard[] = [
  {
    href: '/learn/cards/today',
    icon: <TargetIcon className="w-8 h-8" />,
    title: '오늘의 복습',
    description: '매일 복습할 카드',
    count: 5,
    color: 'from-blue-500 to-blue-600',
  },
  {
    href: '/learn/cards/compare',
    icon: <ScaleIcon className="w-8 h-8" />,
    title: '비교표 학습',
    description: '개념 비교와 구분',
    count: 8,
    color: 'from-purple-500 to-purple-600',
  },
  {
    href: '/learn/cards/numbers',
    icon: <BarChart3Icon className="w-8 h-8" />,
    title: '숫자 암기',
    description: '중요 숫자와 기준',
    count: 15,
    color: 'from-orange-500 to-orange-600',
  },
  {
    href: '/learn/laws',
    icon: <BookOpenIcon className="w-8 h-8" />,
    title: '법조문 학습',
    description: '관련 법규 정리',
    count: 20,
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    href: '/learn/procedures',
    icon: <ListIcon className="w-8 h-8" />,
    title: '절차도 학습',
    description: '업무 절차 흐름도',
    count: 12,
    color: 'from-green-500 to-green-600',
  },
  {
    href: '/learn/prediction/heatmap',
    icon: <BookmarkIcon className="w-8 h-8" />,
    title: '출제확률 히트맵',
    description: '출제예상 항목 분석',
    count: 3,
    color: 'from-red-500 to-red-600',
  },
];

const subjects = [
  { id: '1', name: '1과목: 공공조달 관리', color: 'from-blue-500 to-blue-600' },
  { id: '2', name: '2과목: 재정관리', color: 'from-purple-500 to-purple-600' },
  { id: '3', name: '3과목: 법규 및 윤리', color: 'from-orange-500 to-orange-600' },
];

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">학습 허브</h1>
          <p className="text-blue-100 text-lg">
            공공조달관리사 시험을 위한 맞춤형 학습 모듈
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Subject selection */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
            과목 선택
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className={`bg-gradient-to-br ${subject.color} rounded-2xl p-8 text-white shadow-lg hover:shadow-xl cursor-pointer transition-shadow`}
              >
                <h3 className="text-xl font-bold mb-2">{subject.name}</h3>
                <p className="text-white/80">
                  클릭하여 해당 과목의 학습자료 보기
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Quick access cards */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
            빠른 접근
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningCards.map((card, idx) => (
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
                    className={`bg-gradient-to-br ${card.color} h-24 flex items-center justify-center text-white`}
                  >
                    {card.icon}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {card.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      {card.description}
                    </p>
                    {card.count !== undefined && (
                      <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
                        {card.count}개 항목
                      </div>
                    )}
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        {/* Learning tips */}
        <section className="mt-16">
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-200 mb-4">
              💡 효과적인 학습 팁
            </h3>
            <ul className="space-y-3 text-blue-800 dark:text-blue-300">
              <li className="flex gap-3">
                <span className="flex-shrink-0 font-bold">1.</span>
                <span>매일 오늘의 복습으로 정복된 개념을 다시 한 번 복습하세요</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 font-bold">2.</span>
                <span>비교표로 헷갈리는 개념들을 명확히 구분하세요</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 font-bold">3.</span>
                <span>
                  히트맵을 확인하여 높은 출제확률의 항목부터 집중 학습하세요
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 font-bold">4.</span>
                <span>어려운 개념은 관련 법조문으로 정확히 이해하세요</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
