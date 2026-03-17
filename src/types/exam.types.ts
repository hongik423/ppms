export interface MockExam {
  id: string;
  userId: string;
  questionIds: string[];
  answers: Record<string, number>; // questionId -> selectedAnswerIndex
  scoreBySubject: SubjectScore[] | null;
  totalScore: number | null;
  timeSpent: number | null;
  status: 'in_progress' | 'completed';
  createdAt: Date;
  completedAt?: Date | null;
}

export interface ExamResult {
  totalScore: number;
  maxScore: number;
  passStatus: 'pass' | 'fail' | 'conditional';
  scoreBySubject: SubjectScore[];
  weakItems: DetailItemResult[];
  timeSpent: number;
  completedAt: Date;
}

export interface SubjectScore {
  subjectId: string;
  subjectName: string;
  correct: number;
  total: number;
  percentage: number;
  passed: boolean; // >= 40%
}

export interface DetailItemResult {
  detailItemId: string;
  detailItemName: string;
  mainTopicName: string;
  correctCount: number;
  totalCount: number;
  percentage: number;
  difficulty: number;
}

export interface QuestionAnswer {
  questionId: string;
  selectedAnswer: number;
  correctAnswer: number;
  isCorrect: boolean;
  difficulty: 1 | 2 | 3;
  timeSpent: number;
}

export interface ExamHistory {
  examId: string;
  date: Date;
  score: number;
  maxScore: number;
  timeSpent: number;
  subjectScores: SubjectScore[];
}
