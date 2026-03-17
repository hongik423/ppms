'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, BookOpen, Target, Zap } from 'lucide-react';

interface SidebarSubject {
  id: string;
  name: string;
  color: string;
  topics: Array<{
    id: string;
    name: string;
    completed: number;
    total: number;
  }>;
}

const subjects: SidebarSubject[] = [
  {
    id: 'subject1',
    name: '1과목',
    color: 'violet-600',
    topics: [
      { id: 't1', name: '총론 및 입찰 절차', completed: 12, total: 15 },
      { id: 't2', name: '계약 관리', completed: 8, total: 12 },
      { id: 't3', name: '조달 법규', completed: 10, total: 18 },
    ],
  },
  {
    id: 'subject2',
    name: '2과목',
    color: 'blue-600',
    topics: [
      { id: 't4', name: '예가 기준', completed: 15, total: 20 },
      { id: 't5', name: '원가 계산', completed: 7, total: 15 },
      { id: 't6', name: '비용 분석', completed: 12, total: 16 },
    ],
  },
  {
    id: 'subject3',
    name: '3과목',
    color: 'emerald-600',
    topics: [
      { id: 't7', name: '경제학 기초', completed: 14, total: 18 },
      { id: 't8', name: '시장 분석', completed: 9, total: 14 },
      { id: 't9', name: '가격 정책', completed: 11, total: 17 },
    ],
  },
];

interface ExpandedState {
  [key: string]: boolean;
}

export default function Sidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<ExpandedState>({
    subject1: true,
    subject2: false,
    subject3: false,
  });

  const toggleSubject = (subjectId: string) => {
    setExpanded((prev) => ({
      ...prev,
      [subjectId]: !prev[subjectId],
    }));
  };

  // Calculate study progress
  const totalCompleted = subjects.reduce(
    (sum, subject) => sum + subject.topics.reduce((topicSum, topic) => topicSum + topic.completed, 0),
    0
  );
  const totalItems = subjects.reduce(
    (sum, subject) => sum + subject.topics.reduce((topicSum, topic) => topicSum + topic.total, 0),
    0
  );
  const progressPercentage = Math.round((totalCompleted / totalItems) * 100);

  return (
    <aside className="hidden lg:flex flex-col w-64 fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 overflow-y-auto">
      {/* Quick Stats */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
          학습 통계
        </h3>

        <div className="space-y-3">
          {/* Study Progress */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">학습 진도</span>
              <span className="text-xs font-bold text-blue-800 dark:text-blue-400">{progressPercentage}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-800 to-blue-600 rounded-full transition-all"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Study Streak */}
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">연속학습</span>
            <span className="ml-auto text-sm font-bold text-slate-900 dark:text-white">12일</span>
          </div>

          {/* Today's Study */}
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-blue-800 dark:text-blue-400" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">오늘 남은 학습</span>
            <span className="ml-auto text-sm font-bold text-slate-900 dark:text-white">5개</span>
          </div>
        </div>
      </div>

      {/* Study Phase Indicator */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
          현재 학습 단계
        </h3>
        <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg border border-blue-200 dark:border-blue-700">
          <BookOpen className="w-4 h-4 text-blue-800 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-900 dark:text-blue-300">개념학습 → 문제풀이</span>
        </div>
      </div>

      {/* Subject Navigation */}
      <div className="flex-1 overflow-y-auto">
        {subjects.map((subject) => (
          <div key={subject.id} className="border-b border-slate-200 dark:border-slate-700">
            <button
              onClick={() => toggleSubject(subject.id)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-6 bg-${subject.color} rounded-full`} />
                <span className="font-semibold text-slate-900 dark:text-white">{subject.name}</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 dark:text-slate-500 transition-transform ${
                  expanded[subject.id] ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Topics */}
            {expanded[subject.id] && (
              <div className="px-4 py-2 space-y-1 bg-slate-50 dark:bg-slate-900/30">
                {subject.topics.map((topic) => {
                  const topicProgress = Math.round((topic.completed / topic.total) * 100);
                  const isActive = pathname.includes(topic.id);

                  return (
                    <Link
                      key={topic.id}
                      href={`/learn/${subject.id}/${topic.id}`}
                      className={`block px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-800 text-white'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium">{topic.name}</span>
                        <span className="text-xs font-semibold">{topicProgress}%</span>
                      </div>
                      <div className="h-1 bg-slate-300 dark:bg-slate-600 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            isActive ? 'bg-blue-300' : `bg-${subject.color}`
                          }`}
                          style={{ width: `${topicProgress}%` }}
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
