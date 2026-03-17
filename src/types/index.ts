// Re-export all types from individual files
export type { Subject, MainTopic, SubTopic, DetailItem, Question, Difficulty, QuestionDifficulty } from './question.types';
export type { ConceptCard, CardCategory, ReviewRating, CardReviewResult, CardReviewSession } from './card.types';
export type { MockExam, ExamResult, SubjectScore, DetailItemResult, QuestionAnswer, ExamHistory } from './exam.types';
export type { User, StudyPhaseNumber, UserProgress, StudyPhase, DailyStudyPlan, UserStats } from './user.types';
export type { PracticalScenario, PracticalAnswer, StarLFramework, PracticalTopic, PracticalExamResult } from './practical.types';
export { PRACTICAL_TOPICS } from './practical.types';

// Additional UI-specific types
export type SubjectType = 'procurement' | 'contract' | 'finance';

export interface Scenario {
  id: string;
  topicId: string;
  title: string;
  difficulty: 'easy' | 'normal' | 'hard';
  content: string;
  requirements: string[];
  timeGuide: number;
  topic: string;
}

export interface PracticalFeedback {
  score: number;
  grade: 'A' | 'B' | 'C' | 'D';
  structureScore: number;
  legalScore: number;
  logicScore: number;
  keywordScore: number;
  strengths: string[];
  improvements: string[];
  missingPoints: string[];
}

export interface StudyStats {
  totalCardsMastered: number;
  totalQuestionsSolved: number;
  totalExamsTaken: number;
  currentPhase: 1 | 2 | 3 | 4;
  passRate: number;
}

export interface WeakItem {
  id: string;
  name: string;
  correctRate: number;
  appearanceRate: number;
  subject: string;
  priority: 'critical' | 'high' | 'medium';
}

export interface PassPrediction {
  predictedScore: number;
  passProbability: number;
  subjectPredictions: Record<string, { score: number; probability: number }>;
  recommendations: string[];
}

export interface DailyTarget {
  date: Date;
  cardsToReview: number;
  questionsToSolve: number;
  completedCards: number;
  completedQuestions: number;
}
