'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeftIcon, CheckCircleIcon, BarChart3Icon, XCircleIcon } from 'lucide-react';
import { QuestionCard } from '@/components/practice/QuestionCard';
import { ExplanationPanel } from '@/components/practice/ExplanationPanel';

interface Question {
  id: string;
  questionNumber: number;
  totalQuestions: number;
  subject: string;
  difficulty: 1 | 2 | 3;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  wrongExplanations: string[];
  lawReference?: string;
}

const mockQuestions: Question[] = [
  {
    id: '1',
    questionNumber: 1,
    totalQuestions: 5,
    subject: '1과목',
    difficulty: 2,
    text: '다음 중 일반경쟁입찰에 대한 설명으로 가장 적절하지 않은 것은?',
    options: [
      '관련 자격을 갖춘 모든 사업자가 참여할 수 있다',
      '가장 투명하고 공정한 입찰 방식이다',
      '반드시 적격심사를 거쳐야 한다',
      '입찰 기간은 최소 5일 이상이어야 한다',
    ],
    correctAnswer: 3,
    explanation:
      '일반경쟁입찰의 공고기간은 최소 10일 이상이어야 합니다. 따라서 옵션 4번이 정답입니다.',
    wrongExplanations: [
      '일반경쟁입찰은 자격 요건을 갖춘 모든 사업자가 참여할 수 있는 맞는 설명입니다.',
      '공개 입찰로 진행되어 투명성과 공정성이 높은 맞는 설명입니다.',
      '대부분의 계약이 적격심사를 거쳐야 하는 맞는 설명입니다.',
    ],
    lawReference:
      '「정부계약법 시행령」 제7조 - 일반경쟁입찰의 공고기간은 10일 이상',
  },
  {
    id: '2',
    questionNumber: 2,
    totalQuestions: 5,
    subject: '1과목',
    difficulty: 1,
    text: '예정가격의 정의로 가장 적절한 것은?',
    options: [
      '입찰참여자가 제시한 입찰가격',
      '가장 낮은 입찰가격',
      '공사, 용역 등의 적정한 가격을 미리 예정한 것',
      '입찰 후 낙찰업체가 계약한 가격',
    ],
    correctAnswer: 2,
    explanation:
      '예정가격은 발주자가 공사나 용역의 적정 가격을 사전에 산정하여 정한 것입니다. 이는 입찰가의 적절성을 판단하는 기준이 됩니다.',
    wrongExplanations: [
      '이는 입찰자의 제시 가격이므로 입찰가격입니다.',
      '가장 낮은 입찰가격은 최저 입찰가입니다.',
      '낙찰업체의 계약 가격은 낙찰가입니다.',
    ],
    lawReference:
      '「정부계약법」 제35조 - 예정가격은 발주자가 공사, 용역, 물품 등을 할 경우의 적정 가격',
  },
  {
    id: '3',
    questionNumber: 3,
    totalQuestions: 5,
    subject: '2과목',
    difficulty: 2,
    text: '기술용역비 산정에서 기술료의 비율은 다음 중 어떻게 규정되어 있는가?',
    options: [
      '예정가격의 10% 이상',
      '예정가격의 12% 이상',
      '예정가격의 15% 이상',
      '예정가격의 20% 이상',
    ],
    correctAnswer: 2,
    explanation:
      '정부계약법 시행령에 따르면 기술용역비의 기술료는 예정가격의 15% 이상으로 규정되어 있습니다.',
    wrongExplanations: [
      '10%는 기술료 비율의 최소 기준보다 낮습니다.',
      '12%는 기술료 비율의 최소 기준보다 낮습니다.',
      '20%는 특수한 경우에 적용되는 비율입니다.',
    ],
    lawReference:
      '「정부계약법 시행령」 제58조 - 용역계약의 기술료는 예정가격의 15% 이상',
  },
  {
    id: '4',
    questionNumber: 4,
    totalQuestions: 5,
    subject: '3과목',
    difficulty: 3,
    text: '다음 중 공공조달 관련 부정행위에 해당하지 않는 것은?',
    options: [
      '담합',
      '뇌물 수수',
      '명의자대여',
      '기술 이전',
    ],
    correctAnswer: 3,
    explanation:
      '기술 이전은 공공조달 부정행위가 아닙니다. 담합, 뇌물 수수, 명의자대여 등이 부정행위에 해당합니다.',
    wrongExplanations: [
      '담합은 대표적인 공공조달 부정행위입니다.',
      '뇌물 수수는 부정행위에 해당합니다.',
      '명의자대여는 부정행위에 해당합니다.',
    ],
    lawReference:
      '「정부계약법」 제26조 - 공공조달 관련 부정행위의 범위',
  },
  {
    id: '5',
    questionNumber: 5,
    totalQuestions: 5,
    subject: '1과목',
    difficulty: 1,
    text: '개찰이란 무엇인가?',
    options: [
      '계약 이행 여부를 확인하는 절차',
      '입찰서를 개봉하여 입찰가를 공개하는 절차',
      '낙찰자를 결정하는 절차',
      '계약금을 지급하는 절차',
    ],
    correctAnswer: 1,
    explanation:
      '개찰은 입찰에 참여한 사업자들이 제출한 입찰서의 봉투를 열어 입찰가를 공개하는 절차입니다.',
    wrongExplanations: [
      '계약 이행 여부를 확인하는 것은 검사입니다.',
      '낙찰자를 결정하는 것은 낙찰 결정입니다.',
      '계약금을 지급하는 것은 대금 지급입니다.',
    ],
    lawReference:
      '「정부계약법 시행령」 제33조 - 개찰의 정의 및 절차',
  },
];

type Step = 'settings' | 'solving' | 'results';

interface Settings {
  subject: '전과목' | '1과목' | '2과목' | '3과목';
  difficulty: 1 | 2 | 3;
  count: 5 | 10 | 15 | 20;
}

interface Answer {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
}

export default function QuickPracticePage() {
  const [step, setStep] = useState<Step>('settings');
  const [settings, setSettings] = useState<Settings>({
    subject: '전과목',
    difficulty: 2,
    count: 5,
  });
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleStartQuiz = () => {
    setStep('solving');
    setAnswers([]);
    setCurrentQuestionIdx(0);
  };

  const handleAnswerSelected = (optionIndex: number) => {
    const question = mockQuestions[currentQuestionIdx];
    const isCorrect = optionIndex === question.correctAnswer;

    setAnswers([
      ...answers,
      {
        questionId: question.id,
        selectedAnswer: optionIndex,
        isCorrect,
      },
    ]);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < mockQuestions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
      setShowExplanation(false);
    } else {
      setStep('results');
    }
  };

  const currentQuestion = mockQuestions[currentQuestionIdx];
  const currentAnswer = answers[currentQuestionIdx];
  const correctCount = answers.filter((a) => a.isCorrect).length;
  const accuracy = answers.length > 0 ? Math.round((correctCount / answers.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/practice"
            className="flex items-center gap-2 text-blue-100 hover:text-white mb-4 w-fit transition"
          >
            <ChevronLeftIcon size={20} />
            뒤로 가기
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">빠른 문제 풀이</h1>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {/* Settings step */}
          {step === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-md border border-slate-200 dark:border-slate-700">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
                  학습 설정
                </h2>

                <div className="space-y-6">
                  {/* Subject selection */}
                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">
                      과목 선택
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['전과목', '1과목', '2과목', '3과목'].map((subject) => (
                        <motion.button
                          key={subject}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            setSettings({
                              ...settings,
                              subject: subject as Settings['subject'],
                            })
                          }
                          className={`py-3 px-4 rounded-lg font-bold transition ${
                            settings.subject === subject
                              ? 'bg-blue-800 text-white'
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-600 hover:border-blue-400'
                          }`}
                        >
                          {subject}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Difficulty selection */}
                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">
                      난이도 선택
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: 1, label: '기초' },
                        { value: 2, label: '응용' },
                        { value: 3, label: '실전' },
                      ].map((level) => (
                        <motion.button
                          key={level.value}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            setSettings({
                              ...settings,
                              difficulty: level.value as Settings['difficulty'],
                            })
                          }
                          className={`py-3 px-4 rounded-lg font-bold transition ${
                            settings.difficulty === level.value
                              ? level.value === 1
                                ? 'bg-green-600 text-white'
                                : level.value === 2
                                ? 'bg-amber-600 text-white'
                                : 'bg-red-600 text-white'
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-600 hover:border-blue-400'
                          }`}
                        >
                          {level.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Question count selection */}
                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">
                      문항 수 선택
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                      {[5, 10, 15, 20].map((count) => (
                        <motion.button
                          key={count}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            setSettings({
                              ...settings,
                              count: count as Settings['count'],
                            })
                          }
                          className={`py-3 px-4 rounded-lg font-bold transition ${
                            settings.count === count
                              ? 'bg-blue-800 text-white'
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-600 hover:border-blue-400'
                          }`}
                        >
                          {count}문제
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Start button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStartQuiz}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg transition mt-8"
                  >
                    풀이 시작하기
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Solving step */}
          {step === 'solving' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    진행 상황
                  </span>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    {currentQuestionIdx + 1} / {mockQuestions.length}
                  </span>
                </div>
                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${((currentQuestionIdx + 1) / mockQuestions.length) * 100}%`,
                    }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                  />
                </div>
              </div>

              {/* Question */}
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <QuestionCard
                  question={currentQuestion}
                  onAnswer={handleAnswerSelected}
                  selectedAnswer={currentAnswer?.selectedAnswer ?? null}
                  showResult={showExplanation}
                />

                {/* Explanation */}
                {showExplanation && currentAnswer && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <ExplanationPanel
                      explanation={currentQuestion.explanation}
                      wrongExplanations={currentQuestion.wrongExplanations}
                      lawReference={currentQuestion.lawReference}
                    />

                    {/* Next button */}
                    <div className="flex justify-center mt-8">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextQuestion}
                        className="px-8 py-3 bg-blue-800 hover:bg-blue-900 text-white font-bold rounded-lg transition"
                      >
                        {currentQuestionIdx === mockQuestions.length - 1
                          ? '결과 보기'
                          : '다음 문제'}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}

          {/* Results step */}
          {step === 'results' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="max-w-2xl mx-auto">
                {/* Result cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700 text-center"
                  >
                    <BarChart3Icon size={32} className="mx-auto text-blue-600 dark:text-blue-400 mb-2" />
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold uppercase mb-2">
                      정답률
                    </p>
                    <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                      {accuracy}%
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700 text-center"
                  >
                    <CheckCircleIcon size={32} className="mx-auto text-green-600 dark:text-green-400 mb-2" />
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold uppercase mb-2">
                      정답
                    </p>
                    <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                      {correctCount}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700 text-center"
                  >
                    <XCircleIcon size={32} className="mx-auto text-red-600 dark:text-red-400 mb-2" />
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold uppercase mb-2">
                      오답
                    </p>
                    <p className="text-4xl font-bold text-red-600 dark:text-red-400">
                      {answers.length - correctCount}
                    </p>
                  </motion.div>
                </div>

                {/* Answer review */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-700 mb-8">
                  <div className="bg-slate-50 dark:bg-slate-900/50 px-6 py-4 border-b border-slate-200 dark:border-slate-700">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      답변 검토
                    </h3>
                  </div>
                  <div className="divide-y divide-slate-200 dark:divide-slate-700">
                    {answers.map((answer, idx) => {
                      const question = mockQuestions[idx];
                      return (
                        <div key={answer.questionId} className="p-6">
                          <div className="flex items-start justify-between mb-2">
                            <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                              Q{idx + 1}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold ${
                                answer.isCorrect
                                  ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
                                  : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
                              }`}
                            >
                              {answer.isCorrect ? '정답' : '오답'}
                            </span>
                          </div>
                          <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                            {question.text.substring(0, 60)}...
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setStep('settings')}
                    className="flex-1 py-4 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-bold rounded-lg transition hover:bg-slate-300 dark:hover:bg-slate-600"
                  >
                    다시 풀기
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="/practice"
                      className="flex-1 py-4 bg-blue-800 hover:bg-blue-900 text-white font-bold rounded-lg transition block text-center"
                    >
                      문제 풀이로 돌아가기
                    </Link>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
