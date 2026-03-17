'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { BookmarkIcon } from 'lucide-react'

interface BookmarkButtonProps {
  isBookmarked: boolean
  onClick: () => void
}

export function BookmarkButton({ isBookmarked, onClick }: BookmarkButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`p-3 rounded-lg transition-all ${
        isBookmarked
          ? 'bg-yellow-100 dark:bg-yellow-900/30'
          : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
      }`}
    >
      <BookmarkIcon
        size={20}
        className={
          isBookmarked
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-slate-600 dark:text-slate-400'
        }
      />
    </motion.button>
  )
}
