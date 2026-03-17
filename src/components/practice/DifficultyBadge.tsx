'use client'

import React from 'react'

interface DifficultyBadgeProps {
  difficulty: 1 | 2 | 3
}

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  const difficultyMap = {
    1: {
      label: '기초',
      colors: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
    },
    2: {
      label: '응용',
      colors: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
    },
    3: {
      label: '실전',
      colors: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300',
    },
  }

  const config = difficultyMap[difficulty]

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-bold ${config.colors}`}
    >
      {config.label}
    </span>
  )
}
