'use client';

import { TrendingUp, Target } from 'lucide-react';

interface ScoreSummaryProps {
  lastExamScore?: {
    score: number;
    passingScore: number;
    maxScore: number;
    date: string;
    isPassed: boolean;
  };
}

const defaultScore = {
  score: 72,
  passingScore: 70,
  maxScore: 100,
  date: '2026-03-10',
  isPassed: true,
};

export default function ScoreSummary({ lastExamScore = defaultScore }: ScoreSummaryProps) {
  const percentage = Math.round((lastExamScore.score / lastExamScore.maxScore) * 100);
  const goalGap = lastExamScore.passingScore - lastExamScore.score;
  const isCloseToPass = Math.abs(goalGap) <= 10;

  // Format date
  const formattedDate = new Date(lastExamScore.date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">최근 모의고사</h2>
        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{formattedDate}</span>
      </div>

      {/* Score Circle */}
      <div className="flex justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            {/* Background circle */}
            <circle
              cx="60"
              cy="60"
              r="55"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="8"
              className="dark:stroke-slate-700"
            />
            {/* Progress circle */}
            <circle
              cx="60"
              cy="60"
              r="55"
              fill="none"
              stroke="#1e40af"
              strokeWidth="8"
              strokeDasharray={`${(percentage / 100) * 346} 346`}
              strokeLinecap="round"
              className="dark:stroke-blue-400 transition-all"
            />
          </svg>

          {/* Score text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">{lastExamScore.score}</span>
            <span className="text-xs text-slate-600 dark:text-slate-400">/{lastExamScore.maxScore}</span>
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <div className="mb-4 text-center">
        {lastExamScore.isPassed ? (
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
            <div className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-400" />
            <span className="text-sm font-semibold text-green-700 dark:text-green-400">합격선 통과!</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 dark:bg-red-900/30 rounded-full">
            <div className="w-2 h-2 rounded-full bg-red-600 dark:bg-red-400" />
            <span className="text-sm font-semibold text-red-700 dark:text-red-400">합격선 미달</span>
          </div>
        )}
      </div>

      {/* Goal Message */}
      <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800 mb-4">
        {goalGap < 0 ? (
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              합격선을 <span className="font-bold text-green-600 dark:text-green-400">{Math.abs(goalGap)}점</span> 초과했습니다!
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              목표 점수까지 <span className={`font-bold ${isCloseToPass ? 'text-amber-600 dark:text-amber-400' : 'text-blue-600 dark:text-blue-400'}`}>
                +{goalGap}점
              </span> 필요합니다
            </p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 text-center pt-3 border-t border-slate-200 dark:border-slate-700">
        <div>
          <p className="text-xs text-slate-600 dark:text-slate-400">1과목</p>
          <p className="text-sm font-bold text-slate-900 dark:text-white">24/25</p>
        </div>
        <div>
          <p className="text-xs text-slate-600 dark:text-slate-400">2과목</p>
          <p className="text-sm font-bold text-slate-900 dark:text-white">23/25</p>
        </div>
        <div>
          <p className="text-xs text-slate-600 dark:text-slate-400">3과목</p>
          <p className="text-sm font-bold text-slate-900 dark:text-white">25/25</p>
        </div>
      </div>
    </div>
  );
}
