'use client';

import { Calendar, CheckCircle2, Circle } from 'lucide-react';
import { useState } from 'react';

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

export default function StudyPlanPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Calculate D-day (exam date: 2026-10-03, current date: 2026-03-18)
  const examDate = new Date(2026, 9, 3); // October 3, 2026
  const currentDate = new Date(2026, 2, 18); // March 18, 2026
  const daysUntilExam = Math.ceil((examDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));

  // Calculate phase dates
  const phase1Start = new Date(2026, 2, 18); // Current date
  const phase1End = new Date(2026, 5, 15); // ~90 days
  const phase2Start = new Date(2026, 5, 16);
  const phase2End = new Date(2026, 7, 14); // ~60 days
  const phase3Start = new Date(2026, 7, 15);
  const phase3End = new Date(2026, 8, 17); // ~34 days
  const phase4Start = new Date(2026, 8, 18);

  const phases = [
    {
      phase: 1,
      name: '기초 다지기 (D-180~D-120)',
      description: '교재 4권 정독',
      startDate: phase1Start.toLocaleDateString('ko-KR'),
      endDate: phase1End.toLocaleDateString('ko-KR'),
      completed: false,
      isCurrent: true
    },
    {
      phase: 2,
      name: '심화 학습 (D-120~D-60)',
      description: 'A등급 항목 집중',
      startDate: phase2Start.toLocaleDateString('ko-KR'),
      endDate: phase2End.toLocaleDateString('ko-KR'),
      completed: false
    },
    {
      phase: 3,
      name: '실전 훈련 (D-60~D-14)',
      description: '모의고사 반복',
      startDate: phase3Start.toLocaleDateString('ko-KR'),
      endDate: phase3End.toLocaleDateString('ko-KR'),
      completed: false
    },
    {
      phase: 4,
      name: '최종 정리 (D-14~D-Day)',
      description: 'TOP 20 키워드 총정리',
      startDate: phase4Start.toLocaleDateString('ko-KR'),
      endDate: examDate.toLocaleDateString('ko-KR'),
      completed: false
    }
  ];

  const dailyTargets = [
    { date: '2026-03-18', cardsToReview: 20, questionsToSolve: 10, completed: 20, completedQ: 10 },
    { date: '2026-03-19', cardsToReview: 20, questionsToSolve: 10, completed: 20, completedQ: 10 },
    { date: '2026-03-20', cardsToReview: 25, questionsToSolve: 12, completed: 25, completedQ: 12 },
    { date: '2026-03-21', cardsToReview: 20, questionsToSolve: 10, completed: 20, completedQ: 9 },
    { date: '2026-03-22', cardsToReview: 30, questionsToSolve: 15, completed: 0, completedQ: 0 },
    { date: '2026-03-23', cardsToReview: 25, questionsToSolve: 12, completed: 0, completedQ: 0 },
    { date: '2026-03-24', cardsToReview: 20, questionsToSolve: 10, completed: 0, completedQ: 0 }
  ];

  const getCompletionPercentage = (target: typeof dailyTargets[0]) => {
    const cardPct = (target.completed / target.cardsToReview) * 100;
    const qPct = (target.completedQ / target.questionsToSolve) * 100;
    return Math.round((cardPct + qPct) / 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">학습 계획</h1>
          <p className="text-slate-600 dark:text-slate-400">개인화된 학습 로드맵 및 일일 목표</p>
        </div>

        {/* D-Day Counter */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-700 dark:to-blue-800 rounded-xl p-6 text-white text-center">
            <p className="text-sm font-semibold opacity-90 mb-2">시험까지 남은 일수</p>
            <h2 className="text-5xl font-bold mb-2">D-{daysUntilExam}</h2>
            <p className="text-sm opacity-90">{examDate.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}</p>
          </div>
        </div>

        {/* Learning Phases Timeline */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-8">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">학습 단계별 일정</h2>

          <div className="space-y-4">
            {phases.map((phase) => (
              <div key={phase.phase} className="flex gap-4">
                <div className="flex-shrink-0 w-24">
                  <div
                    className={`px-3 py-2 rounded-lg text-center font-bold ${
                      phase.isCurrent
                        ? 'bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300'
                        : phase.completed
                        ? 'bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {phase.phase}단계
                  </div>
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-slate-900 dark:text-white">{phase.name}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{phase.description}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{phase.startDate} ~ {phase.endDate}</p>
                </div>

                <div className="flex-shrink-0">
                  {phase.completed ? (
                    <div className="px-3 py-1 bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300 rounded text-sm font-medium">
                      ✓ 완료
                    </div>
                  ) : phase.isCurrent ? (
                    <div className="px-3 py-1 bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 rounded text-sm font-medium">
                      진행 중
                    </div>
                  ) : (
                    <div className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded text-sm font-medium">
                      예정
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Calendar */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-8">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            이주 학습 목표
          </h2>

          <div className="space-y-3">
            {dailyTargets.map((target) => {
              const completion = getCompletionPercentage(target);
              const isCompleted = target.completed > 0;

              return (
                <div
                  key={target.date}
                  className="flex items-center gap-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition"
                >
                  <div className="flex-shrink-0 w-20">
                    <p className="font-medium text-slate-900 dark:text-white">
                      {new Date(target.date).toLocaleDateString('ko-KR', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {DAYS[new Date(target.date).getDay()]}
                    </p>
                  </div>

                  <div className="flex-1">
                    <div className="grid grid-cols-2 gap-4 mb-2">
                      <div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">카드 복습</p>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {target.completed} / {target.cardsToReview}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">문제 풀이</p>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {target.completedQ} / {target.questionsToSolve}
                        </p>
                      </div>
                    </div>

                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          completion === 100
                            ? 'bg-green-600 dark:bg-green-500'
                            : completion >= 50
                            ? 'bg-blue-600 dark:bg-blue-500'
                            : 'bg-amber-600 dark:bg-amber-500'
                        }`}
                        style={{ width: `${completion}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex-shrink-0 text-right">
                    {isCompleted ? (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{completion}%</span>
                        <CheckCircle2
                          className={`w-5 h-5 ${
                            completion === 100
                              ? 'text-green-600 dark:text-green-500'
                              : 'text-amber-600 dark:text-amber-500'
                          }`}
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">대기</span>
                        <Circle className="w-5 h-5 text-slate-400 dark:text-slate-600" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">학습 설정</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">시험 예정일</label>
              <input
                type="date"
                defaultValue="2026-10-03"
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">일일 카드 복습</label>
                <input
                  type="number"
                  defaultValue="20"
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">일일 문제 풀이</label>
                <input
                  type="number"
                  defaultValue="10"
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 dark:text-white"
                />
              </div>
            </div>

            <button className="w-full px-4 py-2 bg-blue-800 dark:bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-900 dark:hover:bg-blue-600 transition-colors">
              설정 저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
