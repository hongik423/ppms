'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronLeftIcon, ChevronRightIcon, CheckCircleIcon } from 'lucide-react'
import { ConceptCard } from '@/components/learn/ConceptCard'
import { CardReviewButtons } from '@/components/learn/CardReviewButtons'
import textbookContent from '@/data/rawdata/textbook-content.json'
import keywords from '@/data/rawdata/keywords.json'

interface ConceptCardData {
  id: string
  front: string
  back: string
  category: 'concept' | 'compare' | 'number' | 'law' | 'procedure'
  difficulty: 1 | 2 | 3
  lawReference?: string
}

// Generate cards from textbook keyConcepts and keywords
const generateCardsFromData = (): ConceptCardData[] => {
  const cards: ConceptCardData[] = []

  // Add textbook concept cards
  textbookContent.textbooks.forEach((textbook) => {
    textbook.chapters.forEach((chapter, chIdx) => {
      chapter.keyConcepts.forEach((concept, conIdx) => {
        cards.push({
          id: `${textbook.id}-CH${chapter.chapterId.split('-')[1]}-${conIdx}`,
          front: concept.split(': ')[0] || concept.substring(0, 50),
          back: concept + (chapter.keyLaws.length > 0 ? `\n\n법적 근거: ${chapter.keyLaws.slice(0, 2).join(', ')}` : ''),
          category: 'concept',
          difficulty: ((conIdx % 3) + 1) as 1 | 2 | 3,
          lawReference: chapter.keyLaws[0],
        })
      })
    })
  })

  // Add keyword summary cards
  keywords.top20Keywords.slice(0, 8).forEach((keyword, idx) => {
    cards.push({
      id: `keyword-${idx}`,
      front: keyword.keyword,
      back: keyword.summary + (keyword.keyLaws.length > 0 ? `\n\n법적 근거: ${keyword.keyLaws.slice(0, 2).join(', ')}` : ''),
      category: 'compare',
      difficulty: ((idx % 3) + 1) as 1 | 2 | 3,
      lawReference: keyword.keyLaws[0],
    })
  })

  return cards.slice(0, 15) // Return first 15 cards
}

const mockCards = generateCardsFromData()

export default function TodayReviewPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [showReviewButtons, setShowReviewButtons] = useState(false)
  const [completedCards, setCompletedCards] = useState<Set<string>>(new Set())

  const currentCard = mockCards[currentIndex]
  const totalCards = mockCards.length
  const completedCount = completedCards.size

  const handleNextCard = () => {
    if (currentIndex < mockCards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsFlipped(false)
      setShowReviewButtons(false)
    }
  }

  const handlePreviousCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setIsFlipped(false)
      setShowReviewButtons(false)
    }
  }

  const handleFlip = (flipped: boolean) => {
    setIsFlipped(flipped)
    if (flipped) {
      setShowReviewButtons(true)
    }
  }

  const handleReview = (rating: 'hard' | 'normal' | 'easy') => {
    setCompletedCards((prev) => new Set(prev).add(currentCard.id))

    const intervals = {
      hard: 1,
      normal: 3,
      easy: 7,
    }

    const nextDay = intervals[rating]

    if (currentIndex < mockCards.length - 1) {
      handleNextCard()
    } else {
      // Show completion
      setShowReviewButtons(false)
    }
  }

  const isAllComplete = completedCount === totalCards

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl md:text-4xl font-bold">오늘의 복습</h1>
            <Link
              href="/learn"
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition"
            >
              뒤로 가기
            </Link>
          </div>
          <p className="text-blue-100 text-lg">
            복습 진행률: {completedCount}/{totalCards}
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(completedCount / totalCards) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
            />
          </div>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 text-center">
            {Math.round((completedCount / totalCards) * 100)}% 완료
          </p>
        </div>

        {/* Completion message */}
        {isAllComplete ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/30 border border-green-300 dark:border-green-700 rounded-2xl p-12 text-center mb-8"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-4"
            >
              <CheckCircleIcon size={64} className="mx-auto text-green-600 dark:text-green-400" />
            </motion.div>
            <h2 className="text-3xl font-bold text-green-900 dark:text-green-200 mb-2">
              모든 카드를 완료했습니다! 🎉
            </h2>
            <p className="text-green-800 dark:text-green-300 mb-6">
              훌륭한 학습입니다. 내일 또 만나요!
            </p>
            <Link
              href="/learn"
              className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition"
            >
              학습 허브로 돌아가기
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Card display */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <ConceptCard
                front={currentCard.front}
                back={currentCard.back}
                category={currentCard.category}
                difficulty={currentCard.difficulty}
                lawReference={currentCard.lawReference}
                onFlip={handleFlip}
              />
            </motion.div>

            {/* Review buttons */}
            {showReviewButtons && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CardReviewButtons
                  onReview={handleReview}
                  currentInterval={currentIndex + 1}
                />
              </motion.div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-12">
              <button
                onClick={handlePreviousCard}
                disabled={currentIndex === 0}
                className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition"
              >
                <ChevronLeftIcon size={20} />
                이전 카드
              </button>

              <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                {currentIndex + 1} / {totalCards}
              </span>

              <button
                onClick={handleNextCard}
                disabled={currentIndex === totalCards - 1}
                className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition"
              >
                다음 카드
                <ChevronRightIcon size={20} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
