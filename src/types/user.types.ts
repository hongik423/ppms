export interface User {
  id: string;
  authUserId?: string | null;
  email: string;
  nickname: string;
  targetExamDate: Date;
  currentPhase: StudyPhaseNumber;
  studyStartDate: Date;
  streakDays: number;
  lastStudyDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export type StudyPhaseNumber = 1 | 2 | 3 | 4;

export interface UserProgress {
  id: string;
  userId: string;
  detailItemId: string;
  conceptCardMastered: boolean;
  questionCorrectRate: number;
  questionAttempts: number;
  reviewCount: number;
  lastReviewedAt: Date | null;
  nextReviewAt: Date | null;
  currentInterval: number;
}

export interface StudyPhase {
  phase: StudyPhaseNumber;
  name: string;
  description: string;
  daysRange: string;
  dailyHours: number;
  theoryRatio: number;
  practiceRatio: number;
}

export interface DailyStudyPlan {
  id?: string;
  date: Date;
  userId: string;
  plannedCards: number;
  plannedQuestions: number;
  completedCards: number;
  completedQuestions: number;
  completed: boolean;
}

export interface UserStats {
  userId: string;
  totalStudyTime: number;
  totalQuestionsAttempted: number;
  totalQuestionsCorrect: number;
  correctRate: number;
  totalCardsReviewed: number;
  totalCardsMastered: number;
  averageDailyStudyTime: number;
  currentStreak: number;
  longestStreak: number;
}
