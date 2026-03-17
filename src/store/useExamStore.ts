'use client';

import { create } from 'zustand';
import { MockExam, ExamResult, SubjectScore } from '@/types/exam.types';
import { Question } from '@/types/question.types';
import { EXAM_CONFIG } from '@/lib/constants';

interface ExamStore {
  // State
  currentExam: MockExam | null;
  questions: Question[];
  answers: Record<string, number>; // questionId -> selectedAnswerIndex
  currentQuestionIndex: number;
  isSubmitted: boolean;
  examResult: ExamResult | null;
  isLoading: boolean;
  error: string | null;

  // Computed
  currentQuestion: Question | null;
  answered: number;
  notAnswered: number;
  progress: number; // 0-100
  timeSpent: number; // seconds

  // Actions
  initializeExam: (questions: Question[], mockExamId?: string) => void;
  setAnswer: (questionId: string, answerIndex: 0 | 1 | 2 | 3) => void;
  clearAnswer: (questionId: string) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  jumpToQuestion: (index: number) => void;
  calculateScore: () => void;
  submitExam: () => Promise<ExamResult | null>;
  reviewAnswer: (questionId: string) => number | null;
  resetExam: () => void;
}

export const useExamStore = create<ExamStore>()((set, get) => ({
  // Initial state
  currentExam: null,
  questions: [],
  answers: {},
  currentQuestionIndex: 0,
  isSubmitted: false,
  examResult: null,
  isLoading: false,
  error: null,

  // Computed properties
  get currentQuestion() {
    const { questions, currentQuestionIndex } = get();
    return questions[currentQuestionIndex] || null;
  },

  get answered() {
    return Object.keys(get().answers).length;
  },

  get notAnswered() {
    return get().questions.length - Object.keys(get().answers).length;
  },

  get progress() {
    const total = get().questions.length;
    if (total === 0) return 0;
    return (get().answered / total) * 100;
  },

  get timeSpent() {
    return get().currentExam?.timeSpent || 0;
  },

  // Actions
  initializeExam: (questions, mockExamId) => {
    const exam: MockExam = {
      id: mockExamId || `exam-${Date.now()}`,
      userId: '', // Will be set from user store
      questionIds: questions.map((q) => q.id),
      answers: {},
      scoreBySubject: [],
      totalScore: 0,
      timeSpent: 0,
      status: 'in_progress',
      createdAt: new Date(),
    };

    set({
      currentExam: exam,
      questions,
      answers: {},
      currentQuestionIndex: 0,
      isSubmitted: false,
      examResult: null,
      error: null,
    });
  },

  setAnswer: (questionId, answerIndex) => {
    set((state) => {
      const newAnswers = { ...state.answers };
      newAnswers[questionId] = answerIndex;
      return { answers: newAnswers };
    });
  },

  clearAnswer: (questionId) => {
    set((state) => {
      const newAnswers = { ...state.answers };
      delete newAnswers[questionId];
      return { answers: newAnswers };
    });
  },

  nextQuestion: () => {
    set((state) => {
      const nextIndex = Math.min(
        state.currentQuestionIndex + 1,
        state.questions.length - 1
      );
      return { currentQuestionIndex: nextIndex };
    });
  },

  prevQuestion: () => {
    set((state) => {
      const prevIndex = Math.max(state.currentQuestionIndex - 1, 0);
      return { currentQuestionIndex: prevIndex };
    });
  },

  jumpToQuestion: (index) => {
    set((state) => {
      const validIndex = Math.max(
        0,
        Math.min(index, state.questions.length - 1)
      );
      return { currentQuestionIndex: validIndex };
    });
  },

  calculateScore: () => {
    const { questions, answers } = get();
    const scoreBySubject = new Map<string, SubjectScore>();
    let totalCorrect = 0;

    questions.forEach((question) => {
      const selectedAnswer = answers[question.id];
      const isCorrect = selectedAnswer === question.correctAnswer;

      if (isCorrect) {
        totalCorrect++;
      }

      // Update subject score
      if (!scoreBySubject.has(question.subjectId)) {
        const subject = EXAM_CONFIG.SUBJECTS.find(
          (s) => s.id === question.subjectId
        );
        scoreBySubject.set(question.subjectId, {
          subjectId: question.subjectId,
          subjectName: subject?.name || 'Unknown',
          correct: 0,
          total: 0,
          percentage: 0,
          passed: false,
        });
      }

      const subject = scoreBySubject.get(question.subjectId)!;
      subject.total++;
      if (isCorrect) {
        subject.correct++;
      }
      subject.percentage = (subject.correct / subject.total) * 100;
      subject.passed = subject.percentage >= 40;
    });

    // Convert map to array for exam result
    const scoreArray = Array.from(scoreBySubject.values());
    const totalPercentage = (totalCorrect / questions.length) * 100;

    const examResult: ExamResult = {
      totalScore: totalPercentage,
      maxScore: 100,
      passStatus:
        scoreArray.every((s) => s.passed) && totalPercentage >= 60
          ? 'pass'
          : totalPercentage >= 60
            ? 'conditional'
            : 'fail',
      scoreBySubject: scoreArray,
      weakItems: [], // Will be populated separately
      timeSpent: get().timeSpent,
      completedAt: new Date(),
    };

    set({
      examResult,
      isSubmitted: true,
    });
  },

  submitExam: async () => {
    set({ isLoading: true, error: null });

    try {
      const { currentExam, answers, questions } = get();
      if (!currentExam) {
        throw new Error('No active exam');
      }

      // Calculate scores
      get().calculateScore();

      // Send to API
      const response = await fetch('/api/exams/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          examId: currentExam.id,
          answers: answers,
          totalQuestions: questions.length,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit exam');
      }

      const result = await response.json();
      set({
        examResult: result,
        currentExam: { ...currentExam, status: 'completed' },
      });

      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage });
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  reviewAnswer: (questionId) => {
    return get().answers[questionId] ?? null;
  },

  resetExam: () => {
    set({
      currentExam: null,
      questions: [],
      answers: {},
      currentQuestionIndex: 0,
      isSubmitted: false,
      examResult: null,
      error: null,
    });
  },
}));
