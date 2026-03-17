'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { BookmarkIcon } from 'lucide-react'
import { OptionButton } from './OptionButton'
import { DifficultyBadge } from './DifficultyBadge'

interface Question {
  id: string
  questionNumber: number
  totalQuestions: number
  subject: string
  difficulty: 1 | 2 | 3
  text: string
  options: string[]
  correctAnswer: number // index of correct option
  explanation: string
  wrongExplanations: string[]
  lawReference?: string
}

interface QuestionCardProps {
  question: Question
  onAnswer: (optionIndex: number) => void
  selectedAnswer?: number | null
  showResult?: boolean
  isBookmarked?: boolean
  onToggleBookmark?: () => void
}

export function QuestionCard({
  question,
  onAnswer,
  selectedAnswer,
  showResult = false,
  isBookmarked = false,
  onToggleBookmark,
}: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="px-4 py-2 bg-blue-800 text-white rounded-lg font-bold text-sm">
            Q.{question.questionNumber}/{question.totalQuestions}
          </span>
          <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
            {question.subject}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <DifficultyBadge difficulty={question.difficulty} />
          <button
            onClick={onToggleBookmark}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
          >
            <BookmarkIcon
              size={20}
              className={
                isBookmarked
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-slate-400 dark:text-slate-600'
              }
            />
          </button>
        </div>
      </div>

      {/* Question text */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-8 mb-8 border border-slate-200 dark:border-slate-700 shadow-sm">
        <p className="text-lg md:text-xl font-medium text-slate-900 dark:text-white leading-relaxed">
          {question.text}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-8">
        {question.options.map((option, idx) => (
          <OptionButton
            key={idx}
            index={idx}
            text={option}
            isSelected={selectedAnswer === idx}
            isCorrect={idx === question.correctAnswer}
            showResult={showResult && selectedAnswer !== null}
            onClick={() => {
              if (!showResult) {
                onAnswer(idx)
              }
            }}
          />
        ))}
      </div>

      {/* Answer confirmation hint */}
      {selectedAnswer === null && !showResult && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-slate-500 dark:text-slate-400"
        >
          선택지를 클릭하여 답을 제출하세요
        </motion.div>
      )}

      {/* Correct/Wrong indicator */}
      {showResult && selectedAnswer !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg font-semibold text-center ${
            selectedAnswer === question.correctAnswer
              ? 'bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border border-green-300 dark:border-green-700'
              : 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-700'
          }`}
        >
          {selectedAnswer === question.correctAnswer ? '✅ 정답입니다!' : '❌ 틀렸습니다.'}
        </motion.div>
      )}
    </motion.div>
  )
}
