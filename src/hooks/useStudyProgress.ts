'use client';

import { useState, useEffect } from 'react';
import { UserProgress, User } from '@/types/user.types';
import { DetailItem } from '@/types/question.types';

interface StudyProgressData {
  overallProgress: number; // 0-100
  subjectProgress: Record<string, number>; // subjectId -> progress%
  masteredCount: number;
  totalItems: number;
  weakItems: DetailItem[];
  averageCorrectRate: number;
}

interface UseStudyProgressReturn extends StudyProgressData {
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook for tracking and calculating study progress
 *
 * @param userId - The user ID to fetch progress for
 * @returns Progress data and methods
 */
export function useStudyProgress(userId?: string): UseStudyProgressReturn {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [progressData, setProgressData] = useState<StudyProgressData>({
    overallProgress: 0,
    subjectProgress: {},
    masteredCount: 0,
    totalItems: 0,
    weakItems: [],
    averageCorrectRate: 0,
  });

  /**
   * Fetch progress data from API
   */
  const fetchProgress = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!userId) {
        setProgressData({
          overallProgress: 0,
          subjectProgress: {},
          masteredCount: 0,
          totalItems: 0,
          weakItems: [],
          averageCorrectRate: 0,
        });
        setIsLoading(false);
        return;
      }

      const response = await fetch(`/api/progress?userId=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch progress data');
      }

      const data = await response.json();
      calculateProgress(data.progressItems, data.detailItems);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Calculate progress metrics from raw data
   */
  const calculateProgress = (
    progressItems: UserProgress[],
    detailItems: DetailItem[]
  ) => {
    const subjectProgress: Record<string, number> = {};
    let totalMastered = 0;
    let totalAttempted = 0;
    let totalCorrectRate = 0;

    // Group progress by subject
    const itemsBySubject = new Map<string, UserProgress[]>();

    progressItems.forEach((item) => {
      // Find subject from detail item
      const detailItem = detailItems.find((d) => d.id === item.detailItemId);
      if (!detailItem) return;

      const subjectId = detailItem.subTopicId; // Adjust based on actual structure
      if (!itemsBySubject.has(subjectId)) {
        itemsBySubject.set(subjectId, []);
      }
      itemsBySubject.get(subjectId)!.push(item);
    });

    // Calculate per-subject progress
    itemsBySubject.forEach((items, subjectId) => {
      const masteredInSubject = items.filter(
        (i) => i.questionCorrectRate >= 80
      ).length;
      const progress = (masteredInSubject / items.length) * 100;
      subjectProgress[subjectId] = progress;

      totalMastered += masteredInSubject;
      totalAttempted += items.length;
      totalCorrectRate += items.reduce((sum, i) => sum + i.questionCorrectRate, 0);
    });

    const overallProgress =
      totalAttempted > 0 ? (totalMastered / totalAttempted) * 100 : 0;
    const averageCorrectRate =
      totalAttempted > 0 ? totalCorrectRate / totalAttempted : 0;

    // Find weak items (correct rate < 60%)
    const weakItems = progressItems
      .filter((p) => p.questionCorrectRate < 60)
      .sort((a, b) => a.questionCorrectRate - b.questionCorrectRate)
      .slice(0, 5)
      .map((p) => detailItems.find((d) => d.id === p.detailItemId))
      .filter((item): item is DetailItem => item !== undefined);

    setProgressData({
      overallProgress,
      subjectProgress,
      masteredCount: totalMastered,
      totalItems: totalAttempted,
      weakItems,
      averageCorrectRate,
    });
  };

  /**
   * Refetch progress data
   */
  const refetch = async () => {
    await fetchProgress();
  };

  /**
   * Initial fetch on mount or when userId changes
   */
  useEffect(() => {
    fetchProgress();
  }, [userId]);

  return {
    ...progressData,
    isLoading,
    error,
    refetch,
  };
}
