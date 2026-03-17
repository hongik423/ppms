import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines classNames using clsx and tailwind-merge
 * Resolves Tailwind CSS class conflicts
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date to Korean format (YYYY년 M월 D일)
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  return `${year}년 ${month}월 ${day}일`;
}

/**
 * Calculates days until a target date (D-day)
 * Returns negative number if date is in the past
 */
export function calculateDday(targetDate: Date | string): number {
  const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  
  const difference = target.getTime() - today.getTime();
  const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
  return days;
}

/**
 * Formats seconds into HH:MM:SS format
 */
export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  const pad = (num: number) => String(num).padStart(2, '0');
  
  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
  }
  return `${pad(minutes)}:${pad(secs)}`;
}

/**
 * Calculates pass status based on subject scores and average score
 * Pass: all subjects >= 40% AND average >= 60%
 * Conditional: average >= 60% but some subjects < 40%
 * Fail: otherwise
 */
export function calculatePassStatus(
  scores: Array<{ percentage: number }>
): 'pass' | 'fail' | 'conditional' {
  if (scores.length === 0) return 'fail';
  
  const average = scores.reduce((sum, s) => sum + s.percentage, 0) / scores.length;
  const allSubjectsPass = scores.every(s => s.percentage >= 40);
  
  if (allSubjectsPass && average >= 60) {
    return 'pass';
  } else if (average >= 60) {
    return 'conditional';
  }
  return 'fail';
}

/**
 * Shuffles an array and returns a new array
 * Uses Fisher-Yates shuffle algorithm
 */
export function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Clamps a number between min and max values
 */
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

/**
 * Formats percentage with specified decimal places
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${(value).toFixed(decimals)}%`;
}

/**
 * Calculates the percentage of correct answers
 */
export function calculateCorrectRate(correct: number, total: number): number {
  if (total === 0) return 0;
  return (correct / total) * 100;
}

/**
 * Parses a time string "HH:MM:SS" or "MM:SS" to seconds
 */
export function parseTimeToSeconds(timeStr: string): number {
  const parts = timeStr.split(':').map(Number);
  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts;
    return hours * 3600 + minutes * 60 + seconds;
  } else if (parts.length === 2) {
    const [minutes, seconds] = parts;
    return minutes * 60 + seconds;
  }
  return 0;
}

/**
 * Determines study phase based on days until exam
 * Phase 1: D-180 to D-120
 * Phase 2: D-120 to D-60
 * Phase 3: D-60 to D-14
 * Phase 4: D-14 to D-Day
 */
export function getStudyPhase(daysUntilExam: number): 1 | 2 | 3 | 4 {
  if (daysUntilExam > 120) return 1;
  if (daysUntilExam > 60) return 2;
  if (daysUntilExam > 14) return 3;
  return 4;
}
