'use client';

import { AlertCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface WeakItem {
  id: string;
  subject: string;
  topic: string;
  correctRate: number;
  href: string;
}

interface WeaknessAlertProps {
  weakItems?: WeakItem[];
}

const defaultWeakItems: WeakItem[] = [
  {
    id: '1',
    subject: '1과목',
    topic: '입찰 절차 및 방법',
    correctRate: 42,
    href: '/learn/subject1/weak1',
  },
  {
    id: '2',
    subject: '2과목',
    topic: '원가 계산 및 예가',
    correctRate: 38,
    href: '/learn/subject2/weak2',
  },
  {
    id: '3',
    subject: '3과목',
    topic: '시장 분석',
    correctRate: 51,
    href: '/learn/subject3/weak3',
  },
];

export default function WeaknessAlert({ weakItems = defaultWeakItems }: WeaknessAlertProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">약점 분석</h2>
      </div>

      <div className="space-y-3">
        {weakItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="flex items-center gap-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 hover:border-amber-300 dark:hover:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-all group"
          >
            {/* Color indicator */}
            <div className="w-1 h-12 bg-amber-600 dark:bg-amber-400 rounded-full flex-shrink-0" />

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-wider">
                {item.subject}
              </p>
              <p className="text-sm font-medium text-slate-900 dark:text-white mt-1">
                {item.topic}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                정답률 <span className="font-bold text-amber-600 dark:text-amber-400">{item.correctRate}%</span>
              </p>
            </div>

            {/* Arrow icon */}
            <ArrowRight className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
          </Link>
        ))}
      </div>

      <button className="w-full mt-4 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg transition-colors">
        약점 집중 학습
      </button>
    </div>
  );
}
