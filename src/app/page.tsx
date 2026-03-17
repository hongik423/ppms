'use client';

import DdayCounter from '@/components/dashboard/DdayCounter';
import DailyPlan from '@/components/dashboard/DailyPlan';
import SubjectProgress from '@/components/dashboard/SubjectProgress';
import WeaknessAlert from '@/components/dashboard/WeaknessAlert';
import ScoreSummary from '@/components/dashboard/ScoreSummary';
import StudyStreak from '@/components/dashboard/StudyStreak';
import { useDashboardData } from '@/hooks/useDashboardData';

const defaultDailyPlan = [
  { id: '1', title: '개념카드', icon: 'card' as const, count: 15, completed: 8 },
  { id: '2', title: '문제풀이', icon: 'question' as const, count: 20, completed: 12 },
  { id: '3', title: '복습', icon: 'review' as const, count: 10, completed: 3 },
];
const defaultStreak = { streakDays: 12, lastSevenDays: [
  { date: '2026-03-10', completed: true }, { date: '2026-03-11', completed: true },
  { date: '2026-03-12', completed: false }, { date: '2026-03-13', completed: true },
  { date: '2026-03-14', completed: true }, { date: '2026-03-15', completed: true },
  { date: '2026-03-16', completed: true },
], milestones: [
  { days: 7, reached: true }, { days: 14, reached: true },
  { days: 30, reached: false }, { days: 100, reached: false },
]};

export default function DashboardPage() {
  const { stats, progress, isLoading } = useDashboardData();

  const dailyPlan = stats
    ? [
        { ...defaultDailyPlan[0], completed: Math.min(stats.totalCardsMastered, 15), count: 15 },
        { ...defaultDailyPlan[1], completed: Math.min(stats.totalQuestionsSolved % 20, 20), count: 20 },
        { ...defaultDailyPlan[2], completed: 3, count: 10 },
      ]
    : defaultDailyPlan;
  const streakDays = stats ? (stats as { streakDays?: number }).streakDays ?? defaultStreak.streakDays : defaultStreak.streakDays;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
      <div className="mb-6 md:mb-8">
        <DdayCounter targetDate="2026-10-03" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 md:mb-8">
        <DailyPlan dailyPlan={dailyPlan} />
        <StudyStreak
          streakDays={streakDays}
          lastSevenDays={defaultStreak.lastSevenDays}
          milestones={defaultStreak.milestones}
        />
      </div>

      <div className="mb-6 md:mb-8">
        <SubjectProgress progress={isLoading ? undefined : progress} />
      </div>

      {/* Weakness Alert + Score Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeaknessAlert
          weakItems={[
            {
              id: '1',
              subject: '1과목',
              topic: '공공조달법률 이해',
              correctRate: 42,
              href: '/learn/subject1/t5',
            },
            {
              id: '2',
              subject: '2과목',
              topic: '입찰/제안평가 및 계약체결',
              correctRate: 38,
              href: '/learn/subject2/t6',
            },
            {
              id: '3',
              subject: '3과목',
              topic: '용역/MAS 계약관리',
              correctRate: 51,
              href: '/learn/subject3/t9',
            },
          ]}
        />
        <ScoreSummary
          lastExamScore={{
            score: 72,
            passingScore: 70,
            maxScore: 100,
            date: '2026-03-10',
            isPassed: true,
          }}
        />
      </div>
    </div>
  );
}
