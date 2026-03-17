'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeftIcon, BookmarkIcon } from 'lucide-react';

export default function WrongNotesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-800 to-red-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/practice"
            className="flex items-center gap-2 text-red-100 hover:text-white mb-4 w-fit transition"
          >
            <ChevronLeftIcon size={20} />
            뒤로 가기
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">오답노트</h1>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/30 mb-6">
            <BookmarkIcon size={48} className="text-red-600 dark:text-red-400" />
          </div>

          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            아직 오답이 없습니다
          </h2>

          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
            빠른 문제 풀이에서 틀린 문제들이 여기에 자동으로 저장됩니다.
            문제를 풀고 오답을 기록해보세요!
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              오답노트 기능은 연습 세션 후 자동으로 활성화됩니다.
            </p>

            <Link
              href="/practice/quick"
              className="inline-block px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition"
            >
              문제 풀이 시작하기
            </Link>
          </motion.div>

          {/* Info box */}
          <div className="mt-12">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700 max-w-2xl mx-auto">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                오답노트의 역할
              </h3>
              <ul className="text-left space-y-3 text-slate-600 dark:text-slate-400">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 text-red-600 dark:text-red-400 font-bold">✓</span>
                  <span>틀린 문제와 정답을 한눈에 볼 수 있습니다</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 text-red-600 dark:text-red-400 font-bold">✓</span>
                  <span>약점 영역을 파악하고 집중학습할 수 있습니다</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 text-red-600 dark:text-red-400 font-bold">✓</span>
                  <span>시험 직전 마지막 복습에 활용할 수 있습니다</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 text-red-600 dark:text-red-400 font-bold">✓</span>
                  <span>정오율 변화를 추적하며 성장을 확인할 수 있습니다</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
