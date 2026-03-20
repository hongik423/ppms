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
  ArrowLeft,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

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
  section?: string;
  keyword: string;
}

interface EnhancedExplanation {
  originalExplanation: string;
  textbook: '1권' | '2권' | '3권';
  textbookReferences: TextbookRef[];
  enhancedContent: string;
}

const SUBJECT_LABELS: Record<string, string> = {
  procurement: '제1과목 공공조달이론',
  finance: '제2과목 공공조달 계획분석',
  contract: '제3과목 계약관리',
};

const SUBJECT_COLORS: Record<string, string> = {
  procurement: 'bg-violet-100 text-violet-700 border-violet-200',
  finance: 'bg-blue-100 text-blue-700 border-blue-200',
  contract: 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

const TEXTBOOK_COLORS: Record<string, { bg: string; text: string; border: string; badge: string; bar: string }> = {
  '1권': {
    bg: 'bg-violet-50',
    text: 'text-violet-800',
    border: 'border-violet-200',
    badge: 'bg-violet-100 text-violet-700',
    bar: '#7c3aed',
  },
  '2권': {
    bg: 'bg-blue-50',
    text: 'text-blue-800',
    border: 'border-blue-200',
    badge: 'bg-blue-100 text-blue-700',
    bar: '#1d4ed8',
  },
  '3권': {
    bg: 'bg-emerald-50',
    text: 'text-emerald-800',
    border: 'border-emerald-200',
    badge: 'bg-emerald-100 text-emerald-700',
    bar: '#059669',
  },
};

const SUBJECT_TEXTBOOK: Record<string, string> = {
  procurement: '1권 공공조달의 이해',
  finance: '2권 공공조달 계획분석',
  contract: '3권 공공계약관리',
};

const SUBJECT_TEXTBOOK_KEY: Record<string, '1권' | '2권' | '3권'> = {
  procurement: '1권',
  finance: '2권',
  contract: '3권',
};

/** 교재 권수 → subject ID 매핑 (PDF URL 생성용) */
const TEXTBOOK_SUBJECT_ID: Record<string, string> = {
  '1권': 'S1',
  '2권': 'S2',
  '3권': 'S3',
};

/** pages 문자열에서 시작 페이지 추출 (예: "300-320" → 300) */
function parseStartPage(pages: string): number {
  const match = pages.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

/** 교재 PDF URL 생성 — /api/textbook?s=S1#page=N */
function getTextbookPdfUrl(textbookKey: string, pages: string): string {
  const subjectId = TEXTBOOK_SUBJECT_ID[textbookKey];
  const startPage = parseStartPage(pages);
  if (!subjectId || startPage < 1) return '#';
  return `/api/textbook?s=${subjectId}#page=${startPage}`;
}

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
        if (data.success) {
          setEnhancedData(data);
          setShowEnhanced(true); // 자동으로 고도화 해설 펼침
        }
      }
    } catch {
      /* not available */
    } finally {
      setLoadingEnhanced(false);
    }
  }, [question.id, enhancedData, loadingEnhanced]);

  const handleSelectAnswer = (idx: number) => {
    setSelectedAnswer(idx);
    setShowExplanation(true);
    fetchEnhanced(); // Always prefetch → 자동 펼침
  };

  const isCorrect = selectedAnswer !== null && selectedAnswer === question.correctAnswer;
  // Use enhancedData.textbook if available; otherwise fallback to subject default
  const tbKey: '1권' | '2권' | '3권' = enhancedData?.textbook || SUBJECT_TEXTBOOK_KEY[question.subject] || '2권';
  const textbookName = enhancedData?.textbook
    ? { '1권': '1권 공공조달의 이해', '2권': '2권 공공조달 계획분석', '3권': '3권 공공계약관리' }[enhancedData.textbook]
    : (SUBJECT_TEXTBOOK[question.subject] || '교재');
  const tbColors = TEXTBOOK_COLORS[tbKey];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/exam/study" className="p-1 hover:bg-gray-100 rounded">
              <ArrowLeft className="w-4 h-4 text-gray-500" />
            </Link>
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
              className="h-1.5 rounded-full transition-all"
              style={{
                width: `${((index + 1) / total) * 100}%`,
                backgroundColor: tbColors.bar,
              }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-6">
        {/* Textbook badge + difficulty */}
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
          <span className={`text-xs px-2 py-0.5 rounded font-medium flex items-center gap-1 ${tbColors.badge}`}>
            <BookMarked className="w-3 h-3" />
            {textbookName} 연계 해설
          </span>
        </div>

        {/* Question */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
          <p className="text-gray-900 leading-relaxed font-medium">{question.content}</p>
        </div>

        {/* Options */}
        <div className="space-y-2 mb-4">
          {question.options.map((opt, idx) => {
            let cls = 'w-full text-left p-4 rounded-xl border-2 transition-all ';
            if (selectedAnswer === null) {
              cls += 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50';
            } else if (idx === question.correctAnswer) {
              cls += 'border-green-500 bg-green-50';
            } else if (idx === selectedAnswer) {
              cls += 'border-red-400 bg-red-50';
            } else {
              cls += 'border-gray-100 bg-gray-50 opacity-60';
            }
            return (
              <button
                key={idx}
                onClick={() => selectedAnswer === null && handleSelectAnswer(idx)}
                disabled={selectedAnswer !== null}
                className={cls}
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
              isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
            }`}
          >
            <p className={`font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
              {isCorrect
                ? '✅ 정답입니다!'
                : `❌ 오답입니다. 정답: ${String.fromCharCode(65 + question.correctAnswer)}번`}
            </p>
          </div>
        )}

        {/* Explanations */}
        {showExplanation && (
          <div className="space-y-3 mb-4">
            {/* Basic explanation */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-blue-700 text-sm">기본 해설</span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{question.explanation}</p>
            </div>

            {/* Enhanced explanation button */}
            <button
              onClick={() => {
                setShowEnhanced(!showEnhanced);
                if (!enhancedData) fetchEnhanced();
              }}
              className={`w-full flex items-center justify-between px-4 py-3 border rounded-xl transition-colors ${tbColors.bg} ${tbColors.border} hover:opacity-90`}
            >
              <div className="flex items-center gap-2">
                <BookMarked className={`w-4 h-4 ${tbColors.text}`} />
                <span className={`text-sm font-semibold ${tbColors.text}`}>
                  {textbookName} 연계 고도화 해설 · 거꾸로 학습
                </span>
              </div>
              {showEnhanced ? (
                <EyeOff className={`w-4 h-4 ${tbColors.text} opacity-60`} />
              ) : (
                <Eye className={`w-4 h-4 ${tbColors.text} opacity-60`} />
              )}
            </button>

            {/* Enhanced content */}
            {showEnhanced && (
              <div className={`${tbColors.bg} border ${tbColors.border} rounded-xl p-5`}>
                {loadingEnhanced ? (
                  <div className={`flex items-center gap-2 ${tbColors.text}`}>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm">고도화 해설 로딩 중...</span>
                  </div>
                ) : enhancedData ? (
                  <>
                    {/* Textbook references — 클릭 시 PDF 해당 페이지로 이동 */}
                    {enhancedData.textbookReferences?.length > 0 && (
                      <div className="mb-4">
                        <p className={`text-xs font-semibold uppercase tracking-wide mb-2 ${tbColors.text}`}>
                          📚 교재 참조 ({textbookName}) — 클릭하면 해당 페이지로 이동
                        </p>
                        <div className="space-y-1">
                          {enhancedData.textbookReferences.map((ref, i) => (
                            <a
                              key={i}
                              href={getTextbookPdfUrl(tbKey, ref.pages)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm bg-white rounded-lg px-3 py-2 hover:bg-gray-50 hover:shadow-sm transition-all cursor-pointer group border border-transparent hover:border-gray-200"
                            >
                              <span className={`font-bold text-sm ${tbColors.text}`}>
                                제{ref.chapter}장
                              </span>
                              <span className="text-gray-600 text-xs">{ref.chapterTitle}</span>
                              {ref.section && (
                                <span className="text-gray-400 text-xs hidden sm:block">
                                  · {ref.section}
                                </span>
                              )}
                              <span className={`ml-auto font-medium text-xs ${tbColors.text} flex items-center gap-1`}>
                                p.{ref.pages}
                                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Full enhanced content */}
                    <div className={`text-sm leading-relaxed whitespace-pre-wrap ${tbColors.text}`}>
                      {enhancedData.enhancedContent}
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-gray-500">이 문제의 고도화 해설이 준비 중입니다.</p>
                )}
              </div>
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
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-700 text-white rounded-xl font-semibold hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed"
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
        const res = await fetch('/api/exam/mock/create', { method: 'POST' });
        const data = await res.json();
        if (data.exam?.questions) {
          setQuestions(data.exam.questions);
        }
      } catch {
        /* ignore */
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
      <div className="max-w-3xl mx-auto px-3 md:px-4 py-5 md:py-8">
        {/* Header */}
        <div className="mb-5 md:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-blue-700" />
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-gray-900">문제 학습 모드</h1>
              <p className="text-xs md:text-sm text-gray-500">
                문제풀이 → 교재 연계 해설로 원리를 이해하는 거꾸로 학습
              </p>
            </div>
          </div>
        </div>

        {/* Feature highlight - 3 textbooks */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="bg-violet-50 border border-violet-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <BookMarked className="w-4 h-4 text-violet-600" />
              <span className="font-semibold text-violet-800 text-sm">1권 공공조달의 이해</span>
            </div>
            <ul className="space-y-1 text-xs text-violet-700">
              <li>✓ 제1과목 공공조달이론 연계</li>
              <li>✓ 1권 7개 장 페이지 참조</li>
              <li>✓ 법령·원칙·제도 원리 해설</li>
            </ul>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <BookMarked className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-blue-800 text-sm">2권 공공조달 계획분석</span>
            </div>
            <ul className="space-y-1 text-xs text-blue-700">
              <li>✓ 제2과목 입찰·계획·평가 연계</li>
              <li>✓ 2권 6개 장 페이지 참조</li>
              <li>✓ 입찰절차·원가·리스크 해설</li>
            </ul>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <BookMarked className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold text-emerald-800 text-sm">3권 공공계약관리</span>
            </div>
            <ul className="space-y-1 text-xs text-emerald-700">
              <li>✓ 제3과목 계약관리 전 문제 연계</li>
              <li>✓ 3권 6개 장 페이지 참조</li>
              <li>✓ 계약변경·지체·하자·MAS 해설</li>
            </ul>
          </div>
        </div>

        {/* Learning method */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 md:p-5 mb-6">
          <h3 className="font-semibold text-amber-800 mb-3 text-sm md:text-base">💡 거꾸로 학습법 (Reverse Learning)</h3>
          <div className="grid grid-cols-4 gap-1.5 md:gap-2 text-center">
            {[
              { step: '1', label: '문제 읽기', icon: '📖' },
              { step: '2', label: '답 선택', icon: '✏️' },
              { step: '3', label: '정오 확인', icon: '✅' },
              { step: '4', label: '원리 이해', icon: '📚' },
            ].map((s) => (
              <div key={s.step} className="bg-white rounded-lg p-1.5 md:p-2">
                <div className="text-base md:text-xl mb-0.5 md:mb-1">{s.icon}</div>
                <div className="text-[10px] md:text-xs font-bold text-amber-700">{s.step}단계</div>
                <div className="text-[10px] md:text-xs text-gray-600 leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-semibold text-gray-700">과목 선택</span>
          </div>
          <div className="space-y-2">
            {[
              { value: 'all', label: '전체', sub: '80문제', color: 'bg-gray-700' },
              {
                value: 'procurement',
                label: '제1과목 공공조달이론',
                sub: '30문제 · 1권 연계',
                color: 'bg-violet-700',
              },
              {
                value: 'finance',
                label: '제2과목 공공조달 계획분석',
                sub: '20문제 · 2권 연계',
                color: 'bg-blue-700',
              },
              {
                value: 'contract',
                label: '제3과목 계약관리',
                sub: '30문제 · 3권 연계',
                color: 'bg-emerald-700',
              },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFilterSubject(opt.value)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all ${
                  filterSubject === opt.value
                    ? `${opt.color} text-white border-transparent`
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="font-medium text-sm">{opt.label}</span>
                <span
                  className={`text-xs ${
                    filterSubject === opt.value ? 'text-white/80' : 'text-gray-400'
                  }`}
                >
                  {opt.sub}
                </span>
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-3" />
            <p className="text-gray-500">문제를 준비하는 중...</p>
          </div>
        ) : (
          <button
            onClick={() => {
              setCurrentIndex(0);
              setStudyMode(true);
            }}
            disabled={filteredQuestions.length === 0}
            className="w-full py-4 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-sm disabled:opacity-40"
          >
            <BookOpen className="w-6 h-6" />
            학습 시작 ({filteredQuestions.length}문제)
          </button>
        )}
      </div>
    </div>
  );
}
