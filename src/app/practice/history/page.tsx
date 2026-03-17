'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeftIcon, BarChart2Icon } from 'lucide-react';

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-800 to-green-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/practice"
            className="flex items-center gap-2 text-green-100 hover:text-white mb-4 w-fit transition"
          >
            <ChevronLeftIcon size={20} />
            뒤로 가기
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">풀이 이력</h1>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
            <BarChart2Icon size={48} className="text-green-600 dark:text-green-400" />
          </div>

          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            아직 풀이 이력이 없습니다
          </h2>

          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
            문제를 풀면 모든 풀이 기록이 여기에 저장되어 학습 진도를 추적할 수 있습니다.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              첫 번째 문제 풀이 세션을 시작해보세요!
            </p>

            <Link
              href="/practice/quick"
              className="inline-block px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition"
            >
              문제 풀이 시작하기
            </Link>
          </motion.div>

          {/* Info box */}
          <div className="mt-12">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700 max-w-2xl mx-auto">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                풀이 이력으로 할 수 있는 것들
              </h3>
              <ul className="text-left space-y-3 text-slate-600 dark:text-slate-400">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 text-green-600 dark:text-green-400 font-bold">✓</span>
                  <span>날짜별 풀이 기록 조회</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 text-green-600 dark:text-green-400 font-bold">✓</span>
                  <span>과목별 정답률 변화 추적</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 text-green-600 dark:text-green-400 font-bold">✓</span>
                  <span>난이도별 학습 통계 확인</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 text-green-600 dark:text-green-400 font-bold">✓</span>
                  <span>학습 진도를 시각적으로 확인</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 text-green-600 dark:text-green-400 font-bold">✓</span>
                  <span>취약 영역 파악 및 개선 계획 수립</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Statistics preview */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700"
            >
              <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold uppercase mb-2">
                총 문제 풀이
              </p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                0
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700"
            >
              <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold uppercase mb-2">
                평균 정답률
              </p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                -%
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700"
            >
              <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold uppercase mb-2">
                공부 기간
              </p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                0일
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
