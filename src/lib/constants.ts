import { StudyPhase } from '@/types/user.types';

export const EXAM_CONFIG = {
  WRITTEN_DATE: '2026-10-03',
  WRITTEN_DATE_DISPLAY: '2026년 10월 3일',
  PRACTICAL_DATE: '2026-11-14',
  PRACTICAL_DATE_DISPLAY: '2026년 11월 14일',
  TOTAL_QUESTIONS: 80,
  EXAM_TIME_MINUTES: 120,
  PASS_SCORE_SUBJECT: 40, // 40% per subject
  PASS_SCORE_AVERAGE: 60, // 60% average
  SUBJECTS: [
    {
      id: 's1',
      name: '공공조달과 법제도 이해',
      questions: 30,
      weight: 37.5,
    },
    {
      id: 's2',
      name: '공공조달계획 수립 및 분석',
      questions: 20,
      weight: 25.0,
    },
    {
      id: 's3',
      name: '공공계약관리',
      questions: 30,
      weight: 37.5,
    },
  ] as const,
};

/**
 * Ebbinghaus forgetting curve intervals (in days)
 * Used for spaced repetition scheduling
 */
export const EBBINGHAUS_INTERVALS = [1, 3, 7, 14, 30];

/**
 * Study phases with duration and focus ratios
 */
export const STUDY_PHASES: StudyPhase[] = [
  {
    phase: 1,
    name: '기초 다지기',
    description: '핵심 개념과 이론 완전 학습',
    daysRange: 'D-180~D-120',
    dailyHours: 2,
    theoryRatio: 100,
    practiceRatio: 0,
  },
  {
    phase: 2,
    name: '심화 학습',
    description: '심화 개념과 기본 문제 풀이',
    daysRange: 'D-120~D-60',
    dailyHours: 3,
    theoryRatio: 60,
    practiceRatio: 40,
  },
  {
    phase: 3,
    name: '실전 훈련',
    description: '모의고사 풀이와 약점 보강',
    daysRange: 'D-60~D-14',
    dailyHours: 3.5,
    theoryRatio: 30,
    practiceRatio: 70,
  },
  {
    phase: 4,
    name: '최종 정리',
    description: '중요 개념 복습과 실전 모의고사',
    daysRange: 'D-14~D-Day',
    dailyHours: 2,
    theoryRatio: 50,
    practiceRatio: 50,
  },
];

/**
 * Card categories for concept cards
 */
export const CARD_CATEGORIES = [
  { value: 'concept', label: '개념카드' },
  { value: 'compare', label: '비교카드' },
  { value: 'number', label: '숫자카드' },
  { value: 'law', label: '법규카드' },
  { value: 'procedure', label: '절차카드' },
] as const;

/**
 * Difficulty levels
 */
export const DIFFICULTY_LEVELS = [
  { value: 1, label: '기초', color: 'green' },
  { value: 2, label: '응용', color: 'orange' },
  { value: 3, label: '고급', color: 'red' },
] as const;

/**
 * Review ratings and their meanings
 */
export const REVIEW_RATINGS = [
  { value: 'hard', label: '어려움', color: 'red', intervalMultiplier: 1 },
  { value: 'normal', label: '보통', color: 'yellow', intervalMultiplier: 1 },
  { value: 'easy', label: '쉬움', color: 'green', intervalMultiplier: 2 },
] as const;

/**
 * Practical exam grades and their score ranges
 */
export const PRACTICAL_GRADES = [
  { grade: 'A', range: '90-100', color: 'green' },
  { grade: 'B', range: '80-89', color: 'blue' },
  { grade: 'C', range: '70-79', color: 'yellow' },
  { grade: 'D', range: '60-69', color: 'orange' },
  { grade: 'F', range: '0-59', color: 'red' },
] as const;

/**
 * Default daily study plan targets
 */
export const DAILY_STUDY_TARGETS = {
  PHASE_1: { cards: 10, questions: 5 },
  PHASE_2: { cards: 15, questions: 10 },
  PHASE_3: { cards: 10, questions: 20 },
  PHASE_4: { cards: 5, questions: 30 },
} as const;

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  USER: '/api/user',
  QUESTIONS: '/api/questions',
  CARDS: '/api/cards',
  EXAMS: '/api/exams',
  PROGRESS: '/api/progress',
  PRACTICAL: '/api/practical',
  STUDY_PLAN: '/api/study-plan',
} as const;

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  USER: 'ppms_user',
  EXAM_ANSWERS: 'ppms_exam_answers',
  CARD_QUEUE: 'ppms_card_queue',
  LAST_STUDY_DATE: 'ppms_last_study_date',
  THEME: 'ppms_theme',
} as const;
