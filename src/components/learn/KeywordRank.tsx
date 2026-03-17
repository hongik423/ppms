'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { StarIcon } from 'lucide-react'
import Link from 'next/link'

interface Keyword {
  rank: number
  keyword: string
  predictionScore: number // 0-5
  subjectName: string
}

interface KeywordRankProps {
  keywords: Keyword[]
  onKeywordClick?: (keyword: Keyword) => void
}

export function KeywordRank({ keywords, onKeywordClick }: KeywordRankProps) {
  const subjectColors: Record<string, string> = {
    '1과목': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    '2과목': 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
    '3과목': 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
  }

  const handleClick = (keyword: Keyword) => {
    onKeywordClick?.(keyword)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full"
    >
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          TOP 20 출제 예상 키워드
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          분석된 출제확률 기반 상위 키워드
        </p>
      </div>

      <div className="space-y-3">
        {keywords.map((keyword, idx) => (
          <motion.div
            key={keyword.rank}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => handleClick(keyword)}
            className="cursor-pointer group"
          >
            <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-800 to-blue-900 text-white rounded-lg font-bold text-lg">
                    #{keyword.rank}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                      {keyword.keyword}
                    </h3>
                    <span
                      className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${subjectColors[keyword.subjectName] || subjectColors['1과목']}`}
                    >
                      {keyword.subjectName}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon
                        key={i}
                        size={18}
                        className={`transition ${
                          i < Math.round(keyword.predictionScore)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300 dark:text-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 ml-2">
                    {keyword.predictionScore.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl"
      >
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <span className="font-semibold text-blue-700 dark:text-blue-400">💡 Tip:</span> 상위 키워드를 클릭하면 관련 개념 카드로 이동합니다. 별점은 출제확률을 나타냅니다.
        </p>
      </motion.div>
    </motion.div>
  )
}
