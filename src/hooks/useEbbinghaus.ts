import { useCallback, useMemo } from 'react';
import { EBBINGHAUS_INTERVALS } from '@/lib/constants';
import { ReviewRating } from '@/types/card.types';

interface UseEbbinghausReturn {
  nextInterval: number;
  getNextReviewDate: (baseDate?: Date) => Date;
  calculateNextInterval: (rating: ReviewRating, currentInterval: number) => number;
  getReviewStatus: (
    currentInterval: number,
    nextReviewAt: Date
  ) => 'due' | 'not-due' | 'overdue';
}

/**
 * Custom hook for managing Ebbinghaus spaced repetition intervals
 *
 * @param currentInterval - Current review interval in days (default: 0)
 * @param reviewCount - Number of times the card has been reviewed (default: 0)
 * @returns Object with interval calculation methods
 */
export function useEbbinghaus(
  currentInterval: number = 0,
  reviewCount: number = 0
): UseEbbinghausReturn {
  /**
   * Calculate the next interval based on review rating
   * hard: reset to 1 day
   * normal: keep current interval
   * easy: double the interval up to max (30 days)
   */
  const calculateNextInterval = useCallback(
    (rating: ReviewRating, interval: number): number => {
      const maxInterval = EBBINGHAUS_INTERVALS[EBBINGHAUS_INTERVALS.length - 1];

      switch (rating) {
        case 'hard':
          return EBBINGHAUS_INTERVALS[0]; // Reset to 1 day
        case 'normal':
          return interval; // Keep current interval
        case 'easy': {
          const currentIndex = EBBINGHAUS_INTERVALS.indexOf(interval);
          if (currentIndex === -1) {
            // If interval not in standard list, find the next one
            const nextStandard = EBBINGHAUS_INTERVALS.find(
              (i) => i > interval
            );
            return nextStandard || maxInterval;
          }
          // Move to next interval in the sequence
          return (
            EBBINGHAUS_INTERVALS[currentIndex + 1] ||
            EBBINGHAUS_INTERVALS[currentIndex]
          );
        }
        default:
          return interval;
      }
    },
    []
  );

  /**
   * Get the next review date based on current interval
   */
  const getNextReviewDate = useCallback(
    (baseDate: Date = new Date()): Date => {
      const nextDate = new Date(baseDate);
      const nextInterval =
        currentInterval === 0 ? EBBINGHAUS_INTERVALS[0] : currentInterval;
      nextDate.setDate(nextDate.getDate() + nextInterval);
      return nextDate;
    },
    [currentInterval]
  );

  /**
   * Determine review status
   */
  const getReviewStatus = useCallback(
    (interval: number, nextReviewAt: Date): 'due' | 'not-due' | 'overdue' => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const reviewDate = new Date(nextReviewAt);
      reviewDate.setHours(0, 0, 0, 0);

      if (reviewDate < today) {
        return 'overdue';
      } else if (reviewDate.getTime() === today.getTime()) {
        return 'due';
      }
      return 'not-due';
    },
    []
  );

  const nextInterval = useMemo(() => {
    return currentInterval === 0 ? EBBINGHAUS_INTERVALS[0] : currentInterval;
  }, [currentInterval]);

  return {
    nextInterval,
    getNextReviewDate,
    calculateNextInterval,
    getReviewStatus,
  };
}
