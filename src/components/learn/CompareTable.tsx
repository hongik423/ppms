'use client'

import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'

interface CompareTableProps {
  title: string
  headers: string[]
  rows: Array<{
    label: string
    cells: string[]
  }>
  quizMode?: boolean
  onAnswerCheck?: (rowIdx: number, cellIdx: number, answer: string) => boolean
}

export function CompareTable({
  title,
  headers,
  rows,
  quizMode = false,
  onAnswerCheck,
}: CompareTableProps) {
  const [blankCells, setBlankCells] = useState<Set<string>>(new Set())
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({})
  const [isAnswered, setIsAnswered] = useState<Set<string>>(new Set())

  // Initialize quiz mode with random blanked cells
  useMemo(() => {
    if (quizMode && blankCells.size === 0) {
      const newBlanks = new Set<string>()
      const totalCells = rows.length * headers.length
      const numBlanks = Math.min(Math.max(Math.floor(totalCells * 0.2), 1), 3)

      while (newBlanks.size < numBlanks) {
        const rowIdx = Math.floor(Math.random() * rows.length)
        const cellIdx = Math.floor(Math.random() * headers.length)
        if (cellIdx > 0) {
          // Don't blank the first column (labels)
          newBlanks.add(`${rowIdx}-${cellIdx}`)
        }
      }
      setBlankCells(newBlanks)
    }
  }, [quizMode, rows.length, headers.length, blankCells.size])

  const handleInputChange = (key: string, value: string) => {
    setUserAnswers((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmitAnswer = (rowIdx: number, cellIdx: number, key: string) => {
    const userAnswer = userAnswers[key] || ''
    const isCorrect = onAnswerCheck
      ? onAnswerCheck(rowIdx, cellIdx, userAnswer)
      : userAnswer.toLowerCase().trim() === rows[rowIdx].cells[cellIdx].toLowerCase().trim()

    if (isCorrect) {
      setIsAnswered((prev) => new Set(prev).add(key))
      setBlankCells((prev) => {
        const newSet = new Set(prev)
        newSet.delete(key)
        return newSet
      })
    }
  }

  const handleReveal = (rowIdx: number, cellIdx: number, key: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [key]: rows[rowIdx].cells[cellIdx],
    }))
    setBlankCells((prev) => {
      const newSet = new Set(prev)
      newSet.delete(key)
      return newSet
    })
    setIsAnswered((prev) => new Set(prev).add(key))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{title}</h2>
        {quizMode && (
          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
            📝 빈칸을 채워보세요
          </p>
        )}
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-800 text-white">
              <th className="px-4 py-3 text-left font-semibold text-sm">항목</th>
              {headers.map((header) => (
                <th key={header} className="px-4 py-3 text-left font-semibold text-sm">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
              >
                <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900/50 whitespace-nowrap">
                  {row.label}
                </td>
                {row.cells.map((cell, cellIdx) => {
                  const key = `${rowIdx}-${cellIdx}`
                  const isBlank = blankCells.has(key)
                  const isAnsweredCell = isAnswered.has(key)

                  return (
                    <td key={key} className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">
                      {isBlank && quizMode ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={userAnswers[key] || ''}
                            onChange={(e) => handleInputChange(key, e.target.value)}
                            placeholder="답을 입력하세요"
                            className={`w-full px-3 py-2 rounded-lg border-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition ${
                              isAnsweredCell
                                ? 'border-green-500 bg-green-50 dark:bg-green-950'
                                : 'border-amber-300 focus:border-blue-500'
                            }`}
                            disabled={isAnsweredCell}
                          />
                          <div className="flex gap-2">
                            {!isAnsweredCell && (
                              <>
                                <button
                                  onClick={() =>
                                    handleSubmitAnswer(rowIdx, cellIdx, key)
                                  }
                                  className="flex-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded transition"
                                >
                                  제출
                                </button>
                                <button
                                  onClick={() =>
                                    handleReveal(rowIdx, cellIdx, key)
                                  }
                                  className="flex-1 px-2 py-1 bg-slate-300 hover:bg-slate-400 text-slate-800 text-xs font-semibold rounded transition"
                                >
                                  힌트
                                </button>
                              </>
                            )}
                            {isAnsweredCell && (
                              <span className="text-green-600 dark:text-green-400 font-semibold text-xs">
                                ✅ {userAnswers[key]}
                              </span>
                            )}
                          </div>
                        </div>
                      ) : (
                        cell
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {quizMode && blankCells.size === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-4 bg-green-50 dark:bg-green-950/30 border border-green-300 dark:border-green-800 rounded-lg text-center"
        >
          <p className="text-green-700 dark:text-green-400 font-semibold">
            🎉 모든 빈칸을 채웠습니다!
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}
