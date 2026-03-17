'use client';

import { Calendar, CheckCircle2, Circle } from 'lucide-react';
import { useState } from 'react';

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

export default function StudyPlanPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const phases = [
    {
      phase: 1,
      name: '기초 이론',
      startDate: '2024-02-01',
      endDate: '2024-02-28',
      completed: true
    },
    {
      phase: 2,
      name: '심화 학습',
      startDate: '2024-03-01',
      endDate: '2024-03-31',
      completed: true
    },
    {
      phase: 3,
      name: '실전 연습',
      startDate: '2024-04-01',
      endDate: '2024-04-30',
      completed: false,
      isCurrent: true
    },
    {
      phase: 4,
      name: '최종 점검',
      startDate: '2024-05-01',
      endDate: '2024-05-31',
      completed: false
    }
  ];

  const dailyTargets = [
    { date: '2024-12-16', cardsToReview: 20, questionsToSolve: 10, completed: 15, completedQ: 8 },
    { date: '2024-12-17', cardsToReview: 20, questionsToSolve: 10, completed: 20, completedQ: 10 },
    { date: '2024-12-18', cardsToReview: 25, questionsToSolve: 12, completed: 25, completedQ: 12 },
    { date: '2024-12-19', cardsToReview: 20, questionsToSolve: 10, completed: 20, completedQ: 9 },
    { date: '2024-12-20', cardsToReview: 30, questionsToSolve: 15, completed: 0, completedQ: 0 },
    { date: '2024-12-21', cardsToReview: 25, questionsToSolve: 12, completed: 0, completedQ: 0 },
    { date: '2024-12-22', cardsToReview: 20, questionsToSolve: 10, completed: 0, completedQ: 0 }
  ];

  const getCompletionPercentage = (target: typeof dailyTargets[0]) => {
    const cardPct = (target.completed / target.cardsToReview) * 100;
    const qPct = (target.completedQ / target.questionsToSolve) * 100;
    return Math.round((cardPct + qPct) / 2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">학습 계획</h1>
          <p className="text-gray-600">개인화된 학습 로드맵 및 일일 목표</p>
        </div>

        {/* Learning Phases Timeline */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6">학습 단계별 일정</h2>

          <div className="space-y-4">
            {phases.map((phase) => (
              <div key={phase.phase} className="flex gap-4">
                <div className="flex-shrink-0 w-24">
                  <div className={`px-3 py-2 rounded-lg text-center font-bold ${
                    phase.isCurrent
                      ? 'bg-blue-100 text-blue-700'
                      : phase.completed
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {phase.phase}단계
                  </div>
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{phase.name}</p>
                  <p className="text-sm text-gray-600">{phase.startDate} ~ {phase.endDate}</p>
                </div>

                <div className="flex-shrink-0">
                  {phase.completed ? (
                    <div className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm font-medium">
                      ✓ 완료
                    </div>
                  ) : phase.isCurrent ? (
                    <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium">
                      진행 중
                    </div>
                  ) : (
                    <div className="px-3 py-1 bg-gray-100 text-gray-500 rounded text-sm font-medium">
                      예정
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Calendar */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            이주 학습 목표
          </h2>

          <div className="space-y-3">
            {dailyTargets.map((target) => {
              const completion = getCompletionPercentage(target);
              const isCompleted = target.completed > 0;

              return (
                <div key={target.date} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex-shrink-0 w-20">
                    <p className="font-medium text-gray-900">
                      {new Date(target.date).toLocaleDateString('ko-KR', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-xs text-gray-600">
                      {DAYS[new Date(target.date).getDay()]}
                    </p>
                  </div>

                  <div className="flex-1">
                    <div className="grid grid-cols-2 gap-4 mb-2">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">카드 복습</p>
                        <p className="text-sm font-medium text-gray-900">
                          {target.completed} / {target.cardsToReview}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">문제 풀이</p>
                        <p className="text-sm font-medium text-gray-900">
                          {target.completedQ} / {target.questionsToSolve}
                        </p>
                      </div>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          completion === 100 ? 'bg-green-600' : completion >= 50 ? 'bg-blue-600' : 'bg-amber-600'
                        }`}
                        style={{ width: `${completion}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex-shrink-0 text-right">
                    {isCompleted ? (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900">{completion}%</span>
                        <CheckCircle2 className={`w-5 h-5 ${
                          completion === 100 ? 'text-green-600' : 'text-amber-600'
                        }`} />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900">대기</span>
                        <Circle className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">학습 설정</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">시험 예정일</label>
              <input
                type="date"
                defaultValue="2024-05-31"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">일일 카드 복습</label>
                <input
                  type="number"
                  defaultValue="20"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">일일 문제 풀이</label>
                <input
                  type="number"
                  defaultValue="10"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>
            </div>

            <button className="w-full px-4 py-2 bg-blue-800 text-white rounded-lg font-medium hover:bg-blue-900 transition-colors">
              설정 저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
