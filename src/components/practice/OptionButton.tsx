'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircleIcon, XCircleIcon } from 'lucide-react'

interface OptionButtonProps {
  index: number
  text: string
  isSelected: boolean
  isCorrect?: boolean
  showResult: boolean
  onClick: () => void
}

export function OptionButton({
  index,
  text,
  isSelected,
  isCorrect = false,
  showResult,
  onClick,
}: OptionButtonProps) {
  const getButtonStyle = () => {
    if (!showResult) {
      return isSelected
        ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 dark:border-blue-500'
        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500'
    }

    if (isSelected) {
      return isCorrect
        ? 'bg-green-50 dark:bg-green-950/30 border-green-500 dark:border-green-500'
        : 'bg-red-50 dark:bg-red-950/30 border-red-500 dark:border-red-500'
    }

    return isCorrect
      ? 'bg-green-50 dark:bg-green-950/30 border-green-500 dark:border-green-500'
      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
  }

  const getTextColor = () => {
    if (!showResult) {
      return isSelected
        ? 'text-blue-700 dark:text-blue-300'
        : 'text-slate-900 dark:text-white'
    }

    if (isSelected) {
      return isCorrect
        ? 'text-green-700 dark:text-green-300'
        : 'text-red-700 dark:text-red-300'
    }

    return isCorrect
      ? 'text-green-700 dark:text-green-300'
      : 'text-slate-900 dark:text-white'
  }

  const optionLetters = ['①', '②', '③', '④']

  return (
    <motion.button
      whileHover={{ x: !showResult ? 4 : 0 }}
      whileTap={{ scale: !showResult ? 0.98 : 1 }}
      onClick={onClick}
      disabled={showResult}
      className={`w-full text-left p-4 md:p-6 rounded-xl border-2 font-medium text-base md:text-lg transition-all ${getButtonStyle()} ${!showResult ? 'cursor-pointer' : 'cursor-default'}`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-800 text-white font-bold text-sm`}>
            {optionLetters[index]}
          </span>
          <span className={`flex-1 leading-relaxed ${getTextColor()}`}>{text}</span>
        </div>

        <div className="flex-shrink-0">
          {showResult && isSelected && (
            <>
              {isCorrect ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <CheckCircleIcon
                    size={28}
                    className="text-green-600 dark:text-green-400"
                  />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <XCircleIcon
                    size={28}
                    className="text-red-600 dark:text-red-400"
                  />
                </motion.div>
              )}
            </>
          )}

          {showResult && !isSelected && isCorrect && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <CheckCircleIcon
                size={28}
                className="text-green-600 dark:text-green-400"
              />
            </motion.div>
          )}
        </div>
      </div>
    </motion.button>
  )
}
