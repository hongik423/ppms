'use client';

import { CheckCircle2, Circle, BookMarked, Lightbulb, RotateCcw } from 'lucide-react';
import { useState } from 'react';

interface PlanItem {
  id: string;
  title: string;
  icon: 'card' | 'question' | 'review';
  count: number;
  completed: number;
}

interface DailyPlanProps {
  dailyPlan?: PlanItem[];
}

const defaultPlan: PlanItem[] = [
  { id: '1', title: '개념카드', icon: 'card', count: 15, completed: 8 },
  { id: '2', title: '문제풀이', icon: 'question', count: 20, completed: 12 },
  { id: '3', title: '복습', icon: 'review', count: 10, completed: 3 },
];

export default function DailyPlan({ dailyPlan = defaultPlan }: DailyPlanProps) {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getIcon = (iconType: 'card' | 'question' | 'review') => {
    switch (iconType) {
      case 'card':
        return <Lightbulb className="w-5 h-5" />;
      case 'question':
        return <BookMarked className="w-5 h-5" />;
      case 'review':
        return <RotateCcw className="w-5 h-5" />;
    }
  };

  const totalCompleted = dailyPlan.reduce((sum, item) => sum + item.completed, 0);
  const totalCount = dailyPlan.reduce((sum, item) => sum + item.count, 0);
  const progress = Math.round((totalCompleted / totalCount) * 100);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">오늘의 학습 계획</h2>
        <div className="text-right">
          <p className="text-sm text-slate-600 dark:text-slate-400">{totalCompleted}개 / {totalCount}개</p>
          <div className="w-20 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-1">
            <div
              className="h-full bg-gradient-to-r from-blue-800 to-blue-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {dailyPlan.map((item) => {
          const itemProgress = Math.round((item.completed / item.count) * 100);
          const isChecked = checkedItems[item.id] || itemProgress === 100;

          return (
            <div
              key={item.id}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                isChecked
                  ? 'bg-slate-50 dark:bg-slate-700/30 border-slate-200 dark:border-slate-600'
                  : 'bg-slate-50 dark:bg-slate-700/30 border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-600'
              }`}
            >
              <button
                onClick={() => toggleItem(item.id)}
                className={`flex-shrink-0 transition-colors ${
                  isChecked ? 'text-green-500' : 'text-slate-300 dark:text-slate-600 hover:text-blue-800 dark:hover:text-blue-400'
                }`}
              >
                {isChecked ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <Circle className="w-6 h-6" />
                )}
              </button>

              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-800 dark:text-blue-400">
                  {getIcon(item.icon)}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${isChecked ? 'text-slate-500 dark:text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                  {item.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-800 to-blue-600 transition-all"
                      style={{ width: `${itemProgress}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{itemProgress}%</span>
                </div>
              </div>

              <div className="flex-shrink-0 text-right">
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  {item.completed}/{item.count}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <button className="w-full mt-4 px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white text-sm font-medium rounded-lg transition-colors">
        학습 시작하기
      </button>
    </div>
  );
}
