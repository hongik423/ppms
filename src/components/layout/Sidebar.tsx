'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, BookOpen, Target, Zap } from 'lucide-react';
import subjectsData from '@/data/rawdata/subjects.json';

interface SidebarSubject {
  id: string;
  name: string;
  colorClass: string;
  topics: Array<{
    id: string;
    name: string;
    completed: number;
    total: number;
  }>;
}

// subjects.json 데이터를 사이드바 형식으로 변환
function buildSidebarSubjects(): SidebarSubject[] {
  const colorMap: Record<string, string> = {
    S1: 'bg-violet-600',
    S2: 'bg-blue-600',
    S3: 'bg-emerald-600',
    S4: 'bg-orange-600',
  };

  // 사이드바 URL용 subject ID 매핑 (subject1, subject2 ...)
  const urlIdMap: Record<string, string> = {
    S1: 'subject1',
    S2: 'subject2',
    S3: 'subject3',
    S4: 'subject4',
  };

  // topic ID의 글로벌 시작 인덱스 (t1, t2, ...)
  const topicStartMap: Record<string, number> = {
    S1: 1,
    S2: 4,
    S3: 7,
    S4: 10,
  };

  return subjectsData.subjects.map((subject) => ({
    id: urlIdMap[subject.id] || subject.id,
    name: subject.name,
    colorClass: colorMap[subject.id] || 'bg-slate-600',
    topics: subject.mainTopics.map((mt, idx) => ({
      id: `t${(topicStartMap[subject.id] || 1) + idx}`,
      name: mt.name,
      completed: 0, // TODO: 실제 학습 진도 연동
      total: mt.subTopics.reduce((sum, st) => sum + st.detailItems.length, 0),
    })),
  }));
}

export default function Sidebar() {
  const pathname = usePathname();
  const subjects = useMemo(() => buildSidebarSubjects(), []);

  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    subject1: true,
    subject2: false,
    subject3: false,
    subject4: false,
  });

  const toggleSubject = (subjectId: string) => {
    setExpanded((prev) => ({
      ...prev,
      [subjectId]: !prev[subjectId],
    }));
  };

  // 총 학습 항목 수 계산
  const totalItems = subjects.reduce(
    (sum, subject) => sum + subject.topics.reduce((topicSum, topic) => topicSum + topic.total, 0),
    0
  );
  const totalCompleted = subjects.reduce(
    (sum, subject) => sum + subject.topics.reduce((topicSum, topic) => topicSum + topic.completed, 0),
    0
  );
  const progressPercentage = totalItems > 0 ? Math.round((totalCompleted / totalItems) * 100) : 0;

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
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">총 세세항목</span>
            <span className="ml-auto text-sm font-bold text-slate-900 dark:text-white">{totalItems}개</span>
          </div>

          {/* Today's Study */}
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-blue-800 dark:text-blue-400" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">과목 수</span>
            <span className="ml-auto text-sm font-bold text-slate-900 dark:text-white">{subjects.length}과목</span>
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
          <span className="text-sm font-medium text-blue-900 dark:text-blue-300">Phase 1: 기초 다지기</span>
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
                <div className={`w-2 h-6 ${subject.colorClass} rounded-full`} />
                <span className="font-semibold text-slate-900 dark:text-white text-sm">{subject.name}</span>
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
                  const isActive = pathname === `/learn/${subject.id}/${topic.id}`;

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
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium truncate">{topic.name}</span>
                        <span className="text-xs text-slate-400 ml-1 flex-shrink-0">{topic.total}</span>
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
