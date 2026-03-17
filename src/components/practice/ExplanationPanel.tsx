'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDownIcon } from 'lucide-react'

interface ExplanationPanelProps {
  explanation: string
  wrongExplanations: string[]
  lawReference?: string
}

export function ExplanationPanel({
  explanation,
  wrongExplanations,
  lawReference,
}: ExplanationPanelProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    explanation: true,
    wrong: false,
    law: false,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="w-full max-w-3xl mx-auto space-y-4 mt-8"
    >
      {/* Explanation Section */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
        <button
          onClick={() => toggleSection('explanation')}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition bg-gradient-to-r from-blue-50 dark:from-blue-950/30 to-transparent dark:to-transparent"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">📗</span>
            <span className="font-bold text-slate-900 dark:text-white">정답 해설</span>
          </div>
          <motion.div
            animate={{ rotate: expandedSections.explanation ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDownIcon
              size={24}
              className="text-slate-600 dark:text-slate-400"
            />
          </motion.div>
        </button>

        <AnimatePresence>
          {expandedSections.explanation && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-slate-200 dark:border-slate-700"
            >
              <p className="px-6 py-4 text-slate-700 dark:text-slate-300 leading-relaxed">
                {explanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Wrong Explanations */}
      {wrongExplanations.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
          <button
            onClick={() => toggleSection('wrong')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition bg-gradient-to-r from-red-50 dark:from-red-950/30 to-transparent dark:to-transparent"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">❌</span>
              <span className="font-bold text-slate-900 dark:text-white">
                각 선지별 오답 해설
              </span>
            </div>
            <motion.div
              animate={{ rotate: expandedSections.wrong ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDownIcon
                size={24}
                className="text-slate-600 dark:text-slate-400"
              />
            </motion.div>
          </button>

          <AnimatePresence>
            {expandedSections.wrong && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-slate-200 dark:border-slate-700"
              >
                <div className="px-6 py-4 space-y-4">
                  {wrongExplanations.map((explanation, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700"
                    >
                      <div className="flex gap-3">
                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400 font-bold text-sm">
                          {['①', '②', '③', '④'][idx]}
                        </span>
                        <p className="flex-1 text-slate-700 dark:text-slate-300 leading-relaxed">
                          {explanation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Law Reference */}
      {lawReference && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
          <button
            onClick={() => toggleSection('law')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition bg-gradient-to-r from-indigo-50 dark:from-indigo-950/30 to-transparent dark:to-transparent"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">📜</span>
              <span className="font-bold text-slate-900 dark:text-white">관련 법조문</span>
            </div>
            <motion.div
              animate={{ rotate: expandedSections.law ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDownIcon
                size={24}
                className="text-slate-600 dark:text-slate-400"
              />
            </motion.div>
          </button>

          <AnimatePresence>
            {expandedSections.law && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-slate-200 dark:border-slate-700"
              >
                <div className="px-6 py-4">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-mono text-sm bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border-l-4 border-indigo-800">
                    {lawReference}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  )
}
