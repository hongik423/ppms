'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { BookmarkIcon } from 'lucide-react'

interface ConceptCardProps {
  front: string
  back: string
  category: 'concept' | 'compare' | 'number' | 'law' | 'procedure'
  difficulty: 1 | 2 | 3
  lawReference?: string
  onFlip?: (isFlipped: boolean) => void
}

export function ConceptCard({
  front,
  back,
  category,
  difficulty,
  lawReference,
  onFlip,
}: ConceptCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const categoryColors: Record<string, string> = {
    concept: 'bg-blue-100 text-blue-700',
    compare: 'bg-purple-100 text-purple-700',
    number: 'bg-orange-100 text-orange-700',
    law: 'bg-indigo-100 text-indigo-700',
    procedure: 'bg-green-100 text-green-700',
  }

  const categoryLabels: Record<string, string> = {
    concept: '개념',
    compare: '비교',
    number: '숫자',
    law: '법조문',
    procedure: '절차',
  }

  const difficultyLabels: Record<number, string> = {
    1: '기초',
    2: '응용',
    3: '실전',
  }

  const difficultyColors: Record<number, string> = {
    1: 'bg-green-100 text-green-700',
    2: 'bg-amber-100 text-amber-700',
    3: 'bg-red-100 text-red-700',
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
    onFlip?.(!isFlipped)
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <motion.div
        onClick={handleFlip}
        initial={{ rotateY: 0 }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        style={{
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d',
          cursor: 'pointer',
        }}
        className="relative w-full aspect-[3/4] md:aspect-auto md:h-96"
      >
        {/* Front */}
        <motion.div
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          className="absolute inset-0 bg-gradient-to-br from-blue-800 to-blue-900 rounded-2xl p-8 flex flex-col justify-between shadow-lg border border-blue-700"
        >
          <div className="flex items-start justify-between">
            <div className="flex flex-wrap gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[category]}`}>
                {categoryLabels[category]}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyColors[difficulty]}`}>
                {difficultyLabels[difficulty]}
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsBookmarked(!isBookmarked)
              }}
              className="p-2 hover:bg-white/10 rounded-lg transition"
            >
              <BookmarkIcon
                size={24}
                className={isBookmarked ? 'fill-yellow-300 text-yellow-300' : 'text-white/60'}
              />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <h3 className="text-white text-center text-2xl md:text-3xl font-bold leading-relaxed">
              {front}
            </h3>
          </div>

          <div className="text-center text-blue-200 text-sm font-medium">
            클릭하여 답안 보기
          </div>
        </motion.div>

        {/* Back */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            position: 'absolute',
            inset: 0,
          }}
          className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 flex flex-col justify-between shadow-lg border border-blue-200"
        >
          <div className="flex-1 overflow-y-auto">
            <h3 className="text-slate-900 text-xl md:text-2xl font-bold mb-4 leading-relaxed">
              {back}
            </h3>

            {lawReference && (
              <div className="mt-6 pt-6 border-t border-slate-200">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                  📜 관련 법조문
                </p>
                <p className="text-sm text-slate-700 leading-relaxed bg-blue-50 rounded-lg p-3 border-l-4 border-blue-800">
                  {lawReference}
                </p>
              </div>
            )}
          </div>

          <div className="text-center text-slate-500 text-sm font-medium mt-4">
            클릭하여 문제로 돌아가기
          </div>
        </div>
      </motion.div>

      <p className="text-center text-slate-600 text-sm mt-6 dark:text-slate-400">
        카드를 클릭하여 앞뒤를 넘겨보세요
      </p>
    </div>
  )
}
