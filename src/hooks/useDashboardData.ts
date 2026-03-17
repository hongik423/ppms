'use client';

/**
 * @fileoverview 대시보드 API 데이터 + Supabase Realtime 구독
 * @encoding UTF-8
 */

import { useState, useEffect, useCallback } from 'react';
import { useRealtimeProgress } from './useRealtimeProgress';
import { useRealtimeUser } from './useRealtimeUser';

interface SubjectProgressItem {
  name: string;
  color: string;
  percentage: number;
  completed: number;
  total: number;
}

interface DashboardStats {
  totalCardsMastered: number;
  totalQuestionsSolved: number;
  totalExamsTaken: number;
  currentPhase: number;
  passRate: number;
  subjectProgress: {
    procurement?: { percentage: number; cardsMastered: number; questionsCorrect: number };
    contract?: { percentage: number; cardsMastered: number; questionsCorrect: number };
    finance?: { percentage: number; cardsMastered: number; questionsCorrect: number };
  };
  itemsMastery: Array<{ name: string; completion: number }>;
}

const defaultProgress: SubjectProgressItem[] = [
  { name: '1과목 (총론 및 입찰)', color: 'violet-600', percentage: 68, completed: 34, total: 50 },
  { name: '2과목 (예가 및 계약)', color: 'blue-600', percentage: 72, completed: 36, total: 50 },
  { name: '3과목 (경제학 및 분석)', color: 'emerald-600', percentage: 55, completed: 28, total: 51 },
];

export function useDashboardData() {
  const [userId, setUserId] = useState<string | undefined>();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [progress, setProgress] = useState<SubjectProgressItem[]>(defaultProgress);
  const [isLoading, setIsLoading] = useState(true);

  const refetch = useCallback(async () => {
    try {
      const [syncRes, progressRes] = await Promise.all([
        fetch('/api/user/sync'),
        fetch('/api/dashboard/progress'),
      ]);
      const syncData = syncRes.ok ? await syncRes.json() : null;
      const progressData = progressRes.ok ? await progressRes.json() : null;
      if (syncData?.user?.id) setUserId(syncData.user.id);
      if (progressData?.stats) {
        setStats(progressData.stats);
        const sp = progressData.stats.subjectProgress;
        if (sp) {
          setProgress([
            {
              name: '1과목 (총론 및 입찰)',
              color: 'violet-600',
              percentage: sp.procurement?.percentage ?? 0,
              completed: sp.procurement?.cardsMastered ?? 0,
              total: 50,
            },
            {
              name: '2과목 (예가 및 계약)',
              color: 'blue-600',
              percentage: sp.contract?.percentage ?? 0,
              completed: sp.contract?.cardsMastered ?? 0,
              total: 50,
            },
            {
              name: '3과목 (경제학 및 분석)',
              color: 'emerald-600',
              percentage: sp.finance?.percentage ?? 0,
              completed: sp.finance?.cardsMastered ?? 0,
              total: 51,
            },
          ]);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useRealtimeProgress(userId, () => {
    refetch();
  });

  useRealtimeUser(userId, () => {
    refetch();
  });

  return {
    stats,
    progress,
    isLoading,
    refetch,
  };
}
