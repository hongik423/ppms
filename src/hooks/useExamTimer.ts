'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { formatTime } from '@/lib/utils';

interface UseExamTimerReturn {
  timeLeft: number; // in seconds
  formattedTime: string;
  isRunning: boolean;
  isWarning: boolean; // 30 minutes or less
  isCritical: boolean; // 10 minutes or less
  progress: number; // 0-100
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  addTime: (seconds: number) => void;
}

/**
 * Custom hook for managing exam countdown timer
 *
 * @param totalMinutes - Total time for the exam in minutes
 * @param onTimeUp - Callback function when time runs out
 * @returns Timer state and control methods
 */
export function useExamTimer(
  totalMinutes: number,
  onTimeUp?: () => void
): UseExamTimerReturn {
  const totalSeconds = totalMinutes * 60;
  const [timeLeft, setTimeLeft] = useState<number>(totalSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const isWarning = timeLeft <= 30 * 60; // 30 minutes
  const isCritical = timeLeft <= 10 * 60; // 10 minutes
  const progress = ((totalSeconds - timeLeft) / totalSeconds) * 100;
  const formattedTime = formatTime(timeLeft);

  /**
   * Start the timer
   */
  const start = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
    }
  }, [isRunning]);

  /**
   * Pause the timer
   */
  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  /**
   * Resume the timer
   */
  const resume = useCallback(() => {
    setIsRunning(true);
  }, []);

  /**
   * Reset the timer to initial time
   */
  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(totalSeconds);
  }, [totalSeconds]);

  /**
   * Add extra time to the timer
   */
  const addTime = useCallback((seconds: number) => {
    setTimeLeft((prev) => prev + seconds);
  }, []);

  /**
   * Timer effect - decrement time every second
   */
  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          if (onTimeUp) {
            onTimeUp();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, onTimeUp]);

  return {
    timeLeft,
    formattedTime,
    isRunning,
    isWarning,
    isCritical,
    progress,
    start,
    pause,
    resume,
    reset,
    addTime,
  };
}
