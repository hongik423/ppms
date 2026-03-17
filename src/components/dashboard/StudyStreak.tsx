'use client';

import { Flame, Trophy } from 'lucide-react';

interface DayStatus {
  date: string;
  completed: boolean;
}

interface StudyStreakProps {
  streakDays?: number;
  lastSevenDays?: DayStatus[];
  milestones?: Array<{ days: number; reached: boolean }>;
}

const defaultLastSevenDays: DayStatus[] = [
  { date: '2026-03-10', completed: true },
  { date: '2026-03-11', completed: true },
  { date: '2026-03-12', completed: false },
  { date: '2026-03-13', completed: true },
  { date: '2026-03-14', completed: true },
  { date: '2026-03-15', completed: true },
  { date: '2026-03-16', completed: true },
];

const defaultMilestones = [
  { days: 7, reached: true },
  { days: 14, reached: true },
  { days: 30, reached: false },
  { days: 100, reached: false },
];

export default function StudyStreak({
  streakDays = 12,
  lastSevenDays = defaultLastSevenDays,
  milestones = defaultMilestones,
}: StudyStreakProps) {
  const dayLabels = ['일', '월', '화', '수', '목', '금', '토'];
  const today = new Date();

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
      {/* Header with streak */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
            <Flame className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">현재 연속학습</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{streakDays}일</p>
          </div>
        </div>

        {streakDays >= 7 && (
          <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <Trophy className="w-4 h-4 text-blue-800 dark:text-blue-400" />
            <span className="text-xs font-semibold text-blue-800 dark:text-blue-400">기록 중!</span>
          </div>
        )}
      </div>

      {/* Last 7 days calendar */}
      <div className="mb-6">
        <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-3">
          지난 7일 학습
        </p>
        <div className="grid grid-cols-7 gap-2">
          {lastSevenDays.map((day, index) => (
            <div
              key={day.date}
              className="flex flex-col items-center gap-1"
            >
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                {dayLabels[index]}
              </p>
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-xs transition-all ${
                  day.completed
                    ? 'bg-gradient-to-br from-blue-800 to-blue-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                }`}
              >
                {day.completed ? '✓' : '-'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestone badges */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
        <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-3">
          달성 목표
        </p>
        <div className="grid grid-cols-4 gap-2">
          {milestones.map((milestone) => (
            <div
              key={milestone.days}
              className={`px-2 py-2 rounded-lg text-center transition-all ${
                milestone.reached
                  ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700'
                  : 'bg-slate-100 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600'
              }`}
            >
              <p className={`text-xs font-bold ${
                milestone.reached
                  ? 'text-green-700 dark:text-green-400'
                  : 'text-slate-600 dark:text-slate-400'
              }`}>
                {milestone.days}일
              </p>
              {milestone.reached && (
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">달성!</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
