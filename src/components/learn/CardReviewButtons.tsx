'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface CardReviewButtonsProps {
  onReview: (rating: 'hard' | 'normal' | 'easy') => void
  currentInterval?: number
}

export function CardReviewButtons({ onReview, currentInterval = 1 }: CardReviewButtonsProps) {
  const handleHard = () => onReview('hard')
  const handleNormal = () => onReview('normal')
  const handleEasy = () => onReview('easy')

  const reviewOptions = [
    {
      rating: 'hard' as const,
      emoji: '😰',
      label: '어려움',
      nextDay: '1일 후',
      onClick: handleHard,
      bgColor: 'hover:bg-red-50 border-red-200 hover:border-red-400',
    },
    {
      rating: 'normal' as const,
      emoji: '🤔',
      label: '보통',
      nextDay: '3일 후',
      onClick: handleNormal,
      bgColor: 'hover:bg-amber-50 border-amber-200 hover:border-amber-400',
    },
    {
      rating: 'easy' as const,
      emoji: '😊',
      label: '쉬움',
      nextDay: '7일 후',
      onClick: handleEasy,
      bgColor: 'hover:bg-green-50 border-green-200 hover:border-green-400',
    },
  ]

  return (
    <div className="w-full max-w-lg mx-auto mt-8 space-y-3">
      <p className="text-center text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
        이 카드의 난이도는?
      </p>

      <div className="grid grid-cols-3 gap-3">
        {reviewOptions.map((option, idx) => (
          <motion.button
            key={option.rating}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={option.onClick}
            className={`py-4 px-3 rounded-xl border-2 font-semibold text-sm transition-all ${option.bgColor} dark:hover:bg-opacity-10`}
          >
            <div className="text-2xl mb-2">{option.emoji}</div>
            <div className="text-slate-900 dark:text-slate-100">{option.label}</div>
            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              {option.nextDay}
            </div>
          </motion.button>
        ))}
      </div>

      <p className="text-center text-xs text-slate-500 dark:text-slate-500 mt-6">
        현재 복습 주기: {currentInterval}일
      </p>
    </div>
  )
}
