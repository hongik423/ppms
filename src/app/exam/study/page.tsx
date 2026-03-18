'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Filter,
  Lightbulb,
  BookMarked,
} from 'lucide-react';

interface ExamQuestion {
  id: string;
  number: number;
  subject: 'procurement' | 'finance' | 'contract';
  content: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'normal' | 'hard';
}

interface TextbookRef {
  chapter: number;
  chapterTitle: string;
  pages: string;
  keyword: string;
}

interface EnhancedExplanation {
  originalExplanation: string;
  textbookReferences: TextbookRef[];
  enhancedContent: string;
}

const SUBJECT_LABELS: Record<string, string> = {
  procurement: '제1과목 공공조달이론',
  finance: '제2과목 재무회계',
  contract: '제3과목 계약관리',
};

const SUBJECT_COLORS: Record<string, string> = {
  procurement: 'bg-violet-100 text-violet-700 border-violet-200',
  finance: 'bg-blue-100 text-blue-700 border-blue-200',
  contract: 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

function QuestionStudyCard({
  question,
  index,
  total,
  onPrev,
  onNext,
}: {
  question: ExamQuestion;
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [enhancedData, setEnhancedData] = useState<EnhancedExplanation | null>(null);
  const [loadingEnhanced, setLoadingEnhanced] = useState(false);
  const [showEnhanced, setShowEnhanced] = useState(false);

  useEffect(() => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setEnhancedData(null);
    setShowEnhanced(false);
  }, [question.id]);

  const fetchEnhanced = useCallback(async () => {
    if (enhancedData || loadingEnhanced) return;
    setLoadingEnhanced(true);
    try {
      const res = await fetch(`/api/exam/enhanced-explanation?id=${question.id}`);
      if (res.ok) {
        const data = await res.json();
        setEnhancedData(data);
      }
    } catch {
      // Enhanced explanation not available
    } finally {
      setLoadingEnhanced(false);
    }
  }, [question.id, enhancedData, loadingEnhanced]);

  const handleSelectAnswer = (idx: number) => {
    setSelectedAnswer(idx);
    setShowExplanation(true);
    if (question.subject === 'procurement') {
      fetchEnhanced();
    }
  };

  const isCorrect = selectedAnswer !== null && selectedAnswer === question.correctAnswer;
  const isWrong = selectedAnswer !== null && selectedAnswer !== question.correctAnswer;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className={`px-2 py-1 rounded text-xs font-semibold border ${
                SUBJECT_COLORS[question.subject] || 'bg-gray-100 text-gray-600'
              }`}
            >
              {SUBJECT_LABELS[question.subject] || question.subject}
            </span>
          </div>
          <span className="text-sm font-medium text-gray-700">
            {index + 1} / {total}
          </span>
        </div>
        <div className="max-w-3xl mx-auto mt-2">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-violet-500 h-1.5 rounded-full transition-all"
              style={{ width: `${((index + 1) / total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-6">
        {/* Difficulty */}
        <div className="flex items-center gap-2 mb-4">
          <span
            className={`text-xs px-2 py-0.5 rounded font-medium ${
              question.difficulty === 'hard'
                ? 'bg-red-100 text-red-600'
                : question.difficulty === 'easy'
                ? 'bg-green-100 text-green-600'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {question.difficulty === 'hard' ? '어려움' : question.difficulty === 'easy' ? '쉬움' : '보통'}
          </span>
          {question.subject === 'procurement' && (
            <span className="text-xs text-violet-600 flex items-center gap-1">
              <BookMarked className="w-3 h-3" />
              1권 연계 해설 제공
            </span>
          )}
        </div>

        {/* Question */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
          <p className="text-gray-900 leading-relaxed font-medium">
            {question.content}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-2 mb-4">
          {question.options.map((opt, idx) => {
            let buttonClass =
              'w-full text-left p-4 rounded-xl border-2 transition-all ';
            if (selectedAnswer === null) {
              buttonClass += 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50';
            } else if (idx === question.correctAnswer) {
              buttonClass += 'border-green-500 bg-green-50';
            } else if (idx === selectedAnswer && idx !== question.correctAnswer) {
              buttonClass += 'border-red-400 bg-red-50';
            } else {
              buttonClass += 'border-gray-100 bg-gray-50 opacity-60';
            }

            return (
              <button
                key={idx}
                onClick={() => selectedAnswer === null && handleSelectAnswer(idx)}
                disabled={selectedAnswer !== null}
                className={buttonClass}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-sm font-bold shrink-0 ${
                      selectedAnswer !== null && idx === question.correctAnswer
                        ? 'border-green-500 bg-green-500 text-white'
                        : selectedAnswer === idx && idx !== question.correctAnswer
                        ? 'border-red-400 bg-red-400 text-white'
                        : 'border-gray-300 text-gray-600'
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-gray-800 text-sm leading-relaxed">{opt}</span>
                  {selectedAnswer !== null && idx === question.correctAnswer && (
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 ml-auto" />
                  )}
                  {selectedAnswer === idx && idx !== question.correctAnswer && (
                    <XCircle className="w-5 h-5 text-red-400 shrink-0 ml-auto" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Result feedback */}
        {selectedAnswer !== null && (
          <div
            className={`rounded-xl p-4 mb-4 border ${
              isCorrect
                ? 'bg-green-50 border-green-200'
                : 'bg-red-50 border-red-200'
            }`}
          >
            <p className={`font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
              {isCorrect ? '✅ 정답입니다!' : `❌ 오답입니다. 정답: ${String.fromCharCode(65 + question.correctAnswer)}번`}
            </p>
          </div>
        )}

        {/* Explanation */}
        {showExplanation && question.explanation && (
          <div className="space-y-3 mb-4">
            {/* Basic explanation */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-blue-700 text-sm">기본 해설</span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{question.explanation}</p>
            </div>

            {/* Enhanced explanation (procurement only) */}
            {question.subject === 'procurement' && (
              <>
                <button
                  onClick={() => {
                    setShowEnhanced(!showEnhanced);
                    if (!enhancedData) fetchEnhanced();
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 bg-violet-50 border border-violet-200 rounded-xl hover:bg-violet-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <BookMarked className="w-4 h-4 text-violet-600" />
                    <span className="text-sm font-semibold text-violet-700">
                      1권 연계 고도화 해설 · 거꾸로 학습
                    </span>
                  </div>
                  {showEnhanced ? (
                    <EyeOff className="w-4 h-4 text-violet-500" />
                  ) : (
                    <Eye className="w-4 h-4 text-violet-500" />
                  )}
                </button>

                {showEnhanced && (
                  <div className="bg-violet-50 border border-violet-200 rounded-xl p-5">
                    {loadingEnhanced ? (
                      <div className="flex items-center gap-2 text-violet-600">
                        <div className="w-4 h-4 border-2 border-violet-400 border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm">고도화 해설 로딩 중...</span>
                      </div>
                    ) : enhancedData ? (
                      <>
                        {/* Textbook references */}
                        {enhancedData.textbookReferences?.length > 0 && (
                          <div className="mb-4">
                            <p className="text-xs font-semibold text-violet-600 uppercase tracking-wide mb-2">
                              📚 교재 참조 (1권 공공조달의 이해)
                            </p>
                            <div className="space-y-1">
                              {enhancedData.textbookReferences.map((ref, i) => (
                                <div
                                  key={i}
                                  className="flex items-center gap-2 text-sm text-violet-800 bg-white rounded-lg px-3 py-2"
                                >
                                  <span className="font-bold text-violet-500">
                                    제{ref.chapter}장
                                  </span>
                                  <span className="text-gray-600">{ref.chapterTitle}</span>
                                  <span className="ml-auto text-violet-600 font-medium text-xs">
                                    p.{ref.pages}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Enhanced content */}
                        <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                          {enhancedData.enhancedContent}
                        </div>
                      </>
                    ) : (
                      <p className="text-sm text-gray-500">
                        이 문제에 대한 고도화 해설이 준비 중입니다.
                      </p>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div className="bg-white border-t border-gray-200 px-4 py-4 sticky bottom-0">
        <div className="max-w-3xl mx-auto flex gap-3">
          <button
            onClick={onPrev}
            disabled={index === 0}
            className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
            이전
          </button>
          <button
            onClick={onNext}
            disabled={index === total - 1}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            다음
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function StudyModePage() {
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [studyMode, setStudyMode] = useState(false);
  const [filterSubject, setFilterSubject] = useState<string>('all');

  useEffect(() => {
    async function loadQuestions() {
      try {
        // Get a fresh set of 30 procurement questions for study
        const res = await fetch('/api/exam/mock/create', { method: 'POST' });
        const data = await res.json();
        if (data.exam?.questions) {
          setQuestions(data.exam.questions);
        }
      } catch {
        // fallback
      } finally {
        setLoading(false);
      }
    }
    loadQuestions();
  }, []);

  const filteredQuestions =
    filterSubject === 'all'
      ? questions
      : questions.filter((q) => q.subject === filterSubject);

  if (studyMode && filteredQuestions.length > 0) {
    return (
      <QuestionStudyCard
        question={filteredQuestions[currentIndex]}
        index={currentIndex}
        total={filteredQuestions.length}
        onPrev={() => setCurrentIndex((i) => Math.max(0, i - 1))}
        onNext={() => setCurrentIndex((i) => Math.min(filteredQuestions.length - 1, i + 1))}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-violet-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-violet-700" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">문제 학습 모드</h1>
              <p className="text-sm text-gray-500">
                문제를 풀고 고도화 해설로 원리를 이해하는 거꾸로 학습
              </p>
            </div>
          </div>
        </div>

        {/* Feature highlight */}
        <div className="bg-violet-50 border border-violet-200 rounded-xl p-5 mb-6">
          <h3 className="font-semibold text-violet-800 mb-3 flex items-center gap-2">
            <BookMarked className="w-4 h-4" />
            1권 연계 고도화 해설이란?
          </h3>
          <ul className="space-y-1.5 text-sm text-violet-700">
            <li className="flex gap-2">
              <span>✓</span>
              <span>제1과목 문제에서 <strong>1권 교재의 정확한 페이지 번호</strong>를 제공합니다</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>단순 암기가 아닌 <strong>원리 이해 중심</strong>의 심층 해설을 제공합니다</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span><strong>거꾸로 학습</strong>: 문제 풀이 → 원리 이해 → 응용력 향상</span>
            </li>
          </ul>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-semibold text-gray-700">과목 선택</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {[
              { value: 'all', label: '전체 (80문제)' },
              { value: 'procurement', label: '제1과목 공공조달이론 (30문제) ✦ 1권 연계' },
              { value: 'finance', label: '제2과목 재무회계 (20문제)' },
              { value: 'contract', label: '제3과목 계약관리 (30문제)' },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFilterSubject(opt.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  filterSubject === opt.value
                    ? 'bg-violet-700 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-violet-600 mx-auto mb-3" />
            <p className="text-gray-500">문제를 준비하는 중...</p>
          </div>
        ) : (
          <button
            onClick={() => {
              setCurrentIndex(0);
              setStudyMode(true);
            }}
            className="w-full py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <BookOpen className="w-6 h-6" />
            학습 시작 ({filteredQuestions.length}문제)
          </button>
        )}
      </div>
    </div>
  );
}
