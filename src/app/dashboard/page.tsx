'use client';

import React from 'react';
import { motion } from 'framer-motion';
import DdayCounter from '@/components/dashboard/DdayCounter';
import DailyPlan from '@/components/dashboard/DailyPlan';
import SubjectProgress from '@/components/dashboard/SubjectProgress';
import WeaknessAlert from '@/components/dashboard/WeaknessAlert';
import ScoreSummary from '@/components/dashboard/ScoreSummary';
import StudyStreak from '@/components/dashboard/StudyStreak';

export default function DashboardPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">
            대시보드
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            당신의 학습 진행 상황을 한눈에 확인하세요
          </p>
        </div>

        {/* Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* D-Day Counter - Full width on mobile, 1 column */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <DdayCounter />
          </motion.div>

          {/* Study Streak */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <StudyStreak />
          </motion.div>

          {/* Score Summary */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <ScoreSummary />
          </motion.div>

          {/* Daily Plan - Full width on mobile, 2 columns on tablet/desktop */}
          <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-2">
            <DailyPlan />
          </motion.div>

          {/* Weakness Alert - Full width */}
          <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-2">
            <WeaknessAlert />
          </motion.div>

          {/* Subject Progress - Full width */}
          <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-3">
            <SubjectProgress />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
