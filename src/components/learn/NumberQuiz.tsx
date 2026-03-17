'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircleIcon, XCircleIcon } from 'lucide-react'

interface NumberQuizProps {
  question: string
  answer: string | number
  options?: string[]
  lawReference?: string
  onAnswer?: (isCorrect: boolean) => void
}

export function NumberQuiz({
  question,
  answer,
  options,
  lawReference,
  onAnswer,
}: NumberQuizProps) {
  const [userAnswer, setUserAnswer] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const handleSubmit = () => {
    const normalizedAnswer = answer.toString().toLowerCase().trim()
    const normalizedInput = userAnswer.toLowerCase().trim()
    const correct = normalizedInput === normalizedAnswer

    setIsCorrect(correct)
    setIsSubmitted(true)
    onAnswer?.(correct)
  }

  const handleSelectOption = (selected: string) => {
    const normalizedAnswer = answer.toString().toLowerCase().trim()
    const correct = selected.toLowerCase().trim() === normalizedAnswer

    setUserAnswer(selected)
    setIsCorrect(correct)
    setIsSubmitted(true)
    onAnswer?.(correct)
  }

  const handleReset = () => {
    setUserAnswer('')
    setIsSubmitted(false)
    setIsCorrect(null)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-2xl p-8 shadow-lg border border-blue-700">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center leading-relaxed">
          {question}
        </h2>

        {/* Multiple choice options */}
        {options && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {options.map((option, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectOption(option)}
                disabled={isSubmitted}
                className={`p-4 rounded-xl border-2 font-semibold text-lg transition ${
                  isSubmitted
                    ? option === userAnswer
                      ? isCorrect
                        ? 'bg-green-50 border-green-500 text-green-700'
                        : 'bg-red-50 border-red-500 text-red-700'
                      : option.toString().toLowerCase() === answer.toString().toLowerCase()
                      ? 'bg-green-50 border-green-500 text-green-700'
                      : 'bg-slate-100 border-slate-300 text-slate-700'
                    : 'bg-white text-slate-900 border-slate-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {isSubmitted && option === userAnswer && (
                    <>
                      {isCorrect ? (
                        <CheckCircleIcon size={24} className="text-green-600" />
                      ) : (
                        <XCircleIcon size={24} className="text-red-600" />
                      )}
                    </>
                  )}
                  {isSubmitted &&
                    option.toString().toLowerCase() === answer.toString().toLowerCase() &&
                    option !== userAnswer && (
                      <CheckCircleIcon size={24} className="text-green-600" />
                    )}
                </div>
              </motion.button>
            ))}
          </div>
        )}

        {/* Text input */}
        {!options && (
          <div className="mb-6">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !isSubmitted) {
                  handleSubmit()
                }
              }}
              disabled={isSubmitted}
              placeholder="답을 입력하세요"
              className={`w-full px-4 py-3 rounded-xl border-2 text-lg font-semibold text-center transition ${
                isSubmitted
                  ? isCorrect
                    ? 'bg-green-50 border-green-500 text-green-700'
                    : 'bg-red-50 border-red-500 text-red-700'
                  : 'bg-white text-slate-900 border-blue-300 focus:border-blue-500 focus:outline-none'
              }`}
            />
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 justify-center">
          {!isSubmitted ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              disabled={!userAnswer}
              className="px-8 py-3 bg-white hover:bg-slate-100 disabled:bg-slate-300 text-blue-800 font-bold rounded-xl transition disabled:cursor-not-allowed"
            >
              정답 확인
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="px-8 py-3 bg-white hover:bg-slate-100 text-blue-800 font-bold rounded-xl transition"
            >
              다시 풀기
            </motion.button>
          )}
        </div>

        {/* Result feedback */}
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 p-4 rounded-xl ${
              isCorrect
                ? 'bg-green-100 dark:bg-green-950 border border-green-300 dark:border-green-700'
                : 'bg-red-100 dark:bg-red-950 border border-red-300 dark:border-red-700'
            }`}
          >
            <p className={`font-bold text-lg ${isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
              {isCorrect ? '✅ 정답입니다!' : `❌ 오답입니다. 정답: ${answer}`}
            </p>
          </motion.div>
        )}

        {/* Law reference */}
        {lawReference && isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-800 rounded"
          >
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-2">
              📜 관련 법조문
            </p>
            <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
              {lawReference}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
