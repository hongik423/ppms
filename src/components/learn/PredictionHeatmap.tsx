'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface DetailItem {
  id: string
  name: string
  score: number // 0-100
}

interface MainTopic {
  id: string
  name: string
  detailItems: DetailItem[]
}

interface Subject {
  id: string
  name: string
  mainTopics: MainTopic[]
}

interface PredictionHeatmapProps {
  subjects: Subject[]
  selectedSubjectId?: string
  onCellClick?: (mainTopicId: string, detailItemId: string) => void
}

export function PredictionHeatmap({
  subjects,
  selectedSubjectId,
  onCellClick,
}: PredictionHeatmapProps) {
  const [activeSubject, setActiveSubject] = useState(
    selectedSubjectId || subjects[0]?.id
  )
  const [hoveredCell, setHoveredCell] = useState<string | null>(null)

  const currentSubject = subjects.find((s) => s.id === activeSubject)

  const getHeatmapColor = (score: number) => {
    if (score < 20) return 'bg-blue-100 dark:bg-blue-900'
    if (score < 40) return 'bg-blue-300 dark:bg-blue-700'
    if (score < 60) return 'bg-amber-300 dark:bg-amber-700'
    if (score < 80) return 'bg-orange-400 dark:bg-orange-600'
    return 'bg-red-500 dark:bg-red-700'
  }

  const getTextColor = (score: number) => {
    return score >= 60 ? 'text-white' : 'text-slate-900 dark:text-white'
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full"
    >
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          출제확률 히트맵
        </h2>

        {/* Subject tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {subjects.map((subject) => (
            <motion.button
              key={subject.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveSubject(subject.id)}
              className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
                activeSubject === subject.id
                  ? 'bg-blue-800 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600'
              }`}
            >
              {subject.name}
            </motion.button>
          ))}
        </div>
      </div>

      {currentSubject && (
        <div className="space-y-6">
          {currentSubject.mainTopics.map((mainTopic, topicIdx) => (
            <motion.div
              key={mainTopic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: topicIdx * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700"
            >
              <div className="bg-gradient-to-r from-blue-800 to-blue-900 px-6 py-4">
                <h3 className="text-lg font-bold text-white">{mainTopic.name}</h3>
              </div>

              <div className="p-6">
                <div className="overflow-x-auto">
                  <div className="grid gap-3 min-w-max md:min-w-0">
                    {mainTopic.detailItems.map((item, itemIdx) => {
                      const cellId = `${mainTopic.id}-${item.id}`
                      const isHovered = hoveredCell === cellId

                      return (
                        <motion.div
                          key={item.id}
                          whileHover={{ scale: 1.05 }}
                          onHoverStart={() => setHoveredCell(cellId)}
                          onHoverEnd={() => setHoveredCell(null)}
                          onClick={() => onCellClick?.(mainTopic.id, item.id)}
                          className={`cursor-pointer p-4 rounded-lg transition-all ${getHeatmapColor(item.score)} ${
                            isHovered ? 'shadow-lg ring-2 ring-blue-400' : 'shadow-sm'
                          }`}
                        >
                          <div className={`text-sm font-semibold ${getTextColor(item.score)}`}>
                            {item.name}
                          </div>
                          <div className={`text-lg font-bold mt-1 ${getTextColor(item.score)}`}>
                            {item.score}%
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700"
      >
        <h3 className="font-bold text-slate-900 dark:text-white mb-4">출제확률 범위</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { range: '0-20%', color: 'bg-blue-100 dark:bg-blue-900' },
            { range: '20-40%', color: 'bg-blue-300 dark:bg-blue-700' },
            { range: '40-60%', color: 'bg-amber-300 dark:bg-amber-700' },
            { range: '60-80%', color: 'bg-orange-400 dark:bg-orange-600' },
            { range: '80-100%', color: 'bg-red-500 dark:bg-red-700' },
          ].map((item) => (
            <div key={item.range} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg ${item.color}`} />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {item.range}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl"
      >
        <p className="text-sm text-slate-700 dark:text-slate-300">
          <span className="font-semibold text-blue-700 dark:text-blue-400">💡 Tip:</span> 높은 출제확률의 항목(붉은색)을 우선적으로 학습하세요.
        </p>
      </motion.div>
    </motion.div>
  )
}
