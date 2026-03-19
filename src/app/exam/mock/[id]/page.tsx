'use client';

import { ExamTimer } from '@/components/exam/ExamTimer';
import { QuestionNavigator } from '@/components/exam/QuestionNavigator';
import { generateExamQuestions } from '@/lib/mockData';
import type { ExamQuestion } from '@/lib/mockData';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Flag, ChevronLeft, ChevronRight, Grid3X3, X } from 'lucide-react';

const EXAM_DURATION = 120 * 60; // 120 minutes in seconds

export default function ExamPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isRunning, setIsRunning] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [questions, setQuestions] = useState<ExamQuestion[]>(() => generateExamQuestions(80));
  const [questionsLoaded, setQuestionsLoaded] = useState(false);
  const [showNavDrawer, setShowNavDrawer] = useState(false);

  useEffect(() => {
    fetch(`/api/exam/mock/${params.id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.questions?.length) {
          setQuestions(data.questions);
        }
        setQuestionsLoaded(true);
      })
      .catch(() => setQuestionsLoaded(true));
  }, [params.id]);

  const answeredQuestions = new Set(Object.keys(answers).map(Number));
  const currentQ = questions[currentQuestion - 1];

  useEffect(() => {
    // Auto-save answers
    const timer = setInterval(() => {
      // Save to localStorage
      localStorage.setItem(`exam-${params.id}-answers`, JSON.stringify(answers));
    }, 5000);

    return () => clearInterval(timer);
  }, [answers, params.id]);

  const handleTimeUp = () => {
    setIsRunning(false);
    handleSubmit();
  };

  const handleAnswer = (optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: optionIndex
    }));
  };

  const toggleFlag = () => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(currentQuestion)) {
        newSet.delete(currentQuestion);
      } else {
        newSet.add(currentQuestion);
      }
      return newSet;
    });
  };

  const handleNavigate = (num: number) => {
    setCurrentQuestion(num);
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < 80) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/exam/mock/${params.id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: Object.entries(answers).map(([num, ans]) => ({
            questionNumber: Number(num),
            answer: ans
          }))
        })
      });

      const result = await response.json();
      router.push(`/exam/mock/${params.id}/result?resultId=${result.resultId}`);
    } catch (error) {
      console.error('Failed to submit exam:', error);
    }
  };

  if (!currentQ) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 py-3 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <h1 className="text-base font-bold text-gray-900 leading-tight">실전 모의고사</h1>
            <p className="text-xs text-gray-600">{currentQuestion}/80</p>
          </div>

          <ExamTimer
            totalSeconds={EXAM_DURATION}
            onTimeUp={handleTimeUp}
            isRunning={isRunning}
          />

          <div className="flex items-center gap-2">
            {/* 모바일 문제 이동 버튼 */}
            <button
              onClick={() => setShowNavDrawer(true)}
              className="lg:hidden flex items-center gap-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowSubmitDialog(true)}
              className="px-3 py-2 bg-blue-800 text-white rounded-lg font-medium hover:bg-blue-900 text-sm"
            >
              제출
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-3xl mx-auto px-3 py-4 md:px-4 md:py-8">
            {/* Question */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 mb-4 md:mb-6">
              <div className="flex items-start justify-between mb-3 md:mb-4">
                <div className="flex-1">
                  <p className="text-xs md:text-sm text-gray-600 mb-1.5">문제 {currentQuestion}</p>
                  <h2 className="text-base md:text-lg font-semibold text-gray-900 leading-relaxed">{currentQ.content}</h2>
                </div>
                <button
                  onClick={toggleFlag}
                  className={`ml-3 p-2 rounded-lg transition-colors flex-shrink-0 ${
                    flaggedQuestions.has(currentQuestion)
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  title="표시"
                >
                  <Flag className="w-5 h-5" />
                </button>
              </div>

              {/* Options */}
              <div className="space-y-2 md:space-y-3">
                {currentQ.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className={`w-full text-left p-3 md:p-4 rounded-lg border-2 transition-colors ${
                      answers[currentQuestion] === idx
                        ? 'border-blue-800 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          answers[currentQuestion] === idx
                            ? 'border-blue-800 bg-blue-800'
                            : 'border-gray-300'
                        }`}
                      >
                        {answers[currentQuestion] === idx && (
                          <span className="text-white text-xs font-bold">✓</span>
                        )}
                      </div>
                      <span className="text-gray-900 text-sm md:text-base leading-relaxed">
                        {String.fromCharCode(65 + idx)}) {option}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-3">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 1}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-900 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                이전
              </button>
              <button
                onClick={handleNext}
                disabled={currentQuestion === 80}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-900 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
              >
                다음
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar - Question Navigator (데스크탑 전용) */}
        <div className="hidden lg:block w-80 border-l border-gray-200 bg-white p-4 overflow-auto">
          <h3 className="font-bold text-gray-900 mb-4">문제 네비게이션</h3>
          <QuestionNavigator
            totalQuestions={80}
            currentQuestion={currentQuestion}
            answeredQuestions={answeredQuestions}
            flaggedQuestions={flaggedQuestions}
            onNavigate={handleNavigate}
          />
        </div>
      </div>

      {/* 모바일 문제 네비게이션 드로어 */}
      {showNavDrawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* 백드롭 */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowNavDrawer(false)}
          />
          {/* 드로어 패널 */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[70vh] overflow-auto">
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 sticky top-0 bg-white">
              <h3 className="font-bold text-gray-900">문제 이동</h3>
              <button
                onClick={() => setShowNavDrawer(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="p-4">
              <QuestionNavigator
                totalQuestions={80}
                currentQuestion={currentQuestion}
                answeredQuestions={answeredQuestions}
                flaggedQuestions={flaggedQuestions}
                onNavigate={(num) => {
                  handleNavigate(num);
                  setShowNavDrawer(false);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Submit Dialog */}
      {showSubmitDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-2">시험을 제출하시겠습니까?</h2>
            <p className="text-gray-600 mb-4">
              답변하지 않은 문항이 {80 - answeredQuestions.size}개 있습니다.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSubmitDialog(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-900 font-medium hover:bg-gray-50"
              >
                계속 풀기
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-2 bg-blue-800 text-white rounded-lg font-medium hover:bg-blue-900"
              >
                제출하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
