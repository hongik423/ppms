'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  CheckCircle,
  RotateCcw,
  Filter,
  Target,
  FileText,
  Lightbulb,
} from 'lucide-react';

interface PracticalQuestion {
  id: number;
  type: '서답형' | '사례분석형';
  questionNum: number;
  sectionRound: number;
  questionText: string;
  caseText: string | null;
  problemText: string | null;
  answer: string;
  explanation: string;
  subject: string;
  difficulty: number;
  tags: string[];
  chapter: string;
  sourceSection: string;
}

type FilterType = '전체' | '서답형' | '사례분석형';
type FilterRound = 0 | 1 | 2 | 3 | 4 | 5;

function QuestionCard({
  question,
  index,
  total,
  onPrev,
  onNext,
}: {
  question: PracticalQuestion;
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [selfScore, setSelfScore] = useState<'good' | 'ok' | 'bad' | null>(null);

  // Reset when question changes
  useEffect(() => {
    setShowAnswer(false);
    setSelfScore(null);
  }, [question.id]);

  const isCase = question.type === '사례분석형';

  // Parse questionText for case/problem parts
  const caseText = question.caseText;
  const problemText = question.problemText;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className={`px-2 py-1 rounded text-xs font-semibold ${
                isCase
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-blue-100 text-blue-700'
              }`}
            >
              {question.type}
            </span>
            <span className="text-sm text-gray-500">
              {question.sourceSection.replace('제4과목_', '')} · Q{question.questionNum}
            </span>
          </div>
          <span className="text-sm font-medium text-gray-700">
            {index + 1} / {total}
          </span>
        </div>
        {/* Progress bar */}
        <div className="max-w-3xl mx-auto mt-2">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-blue-600 h-1.5 rounded-full transition-all"
              style={{ width: `${((index + 1) / total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-6">
        {/* Chapter badge */}
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-500">{question.chapter}</span>
          {question.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Question box */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
          {isCase && caseText ? (
            <>
              {/* Case scenario */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-semibold text-amber-700">사례 제시</span>
                </div>
                <p className="text-gray-800 leading-relaxed text-sm whitespace-pre-wrap">
                  {caseText}
                </p>
              </div>
              {/* Problem */}
              {problemText && (
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-700">문제</span>
                  </div>
                  <p className="text-gray-900 leading-relaxed font-medium">
                    {problemText}
                  </p>
                </div>
              )}
            </>
          ) : (
            <div>
              <p className="text-gray-900 leading-relaxed font-medium text-base whitespace-pre-wrap">
                {question.questionText}
              </p>
            </div>
          )}
        </div>

        {/* Think area */}
        {!showAnswer && (
          <div className="bg-white rounded-xl border border-dashed border-gray-300 p-6 mb-4">
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✏️</span>
              </div>
              <p className="text-gray-600 mb-2 font-medium">답안을 작성해보세요</p>
              <p className="text-gray-400 text-sm">충분히 생각한 후 아래 버튼으로 정답을 확인하세요</p>
            </div>
          </div>
        )}

        {/* Answer reveal button */}
        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className={`w-full py-3 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all mb-4 ${
            showAnswer
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              : 'bg-blue-700 text-white hover:bg-blue-800 shadow-sm'
          }`}
        >
          {showAnswer ? (
            <>
              <EyeOff className="w-5 h-5" />
              정답 숨기기
            </>
          ) : (
            <>
              <Eye className="w-5 h-5" />
              정답 확인하기
            </>
          )}
        </button>

        {/* Answer & Explanation */}
        {showAnswer && (
          <div className="space-y-4 mb-6">
            {/* Model Answer */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-700">모범 답안</span>
              </div>
              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-sm">
                {question.answer}
              </p>
            </div>

            {/* Explanation */}
            {question.explanation && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-blue-700">해설</span>
                </div>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">
                  {question.explanation}
                </p>
              </div>
            )}

            {/* Self-assessment */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-700 mb-3 text-center">
                스스로 평가: 내 답안은?
              </p>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { key: 'good', label: '완벽히 알고 있다', color: 'bg-green-500', hover: 'hover:bg-green-600', emoji: '🟢' },
                    { key: 'ok', label: '부분적으로 맞다', color: 'bg-yellow-500', hover: 'hover:bg-yellow-600', emoji: '🟡' },
                    { key: 'bad', label: '몰랐다 / 틀렸다', color: 'bg-red-500', hover: 'hover:bg-red-600', emoji: '🔴' },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setSelfScore(opt.key)}
                    className={`py-2 px-3 rounded-lg text-xs font-medium text-white transition-all ${opt.color} ${opt.hover} ${
                      selfScore === opt.key ? 'ring-2 ring-offset-1 ring-gray-400 scale-95' : ''
                    }`}
                  >
                    <span className="block text-base mb-1">{opt.emoji}</span>
                    {opt.label}
                  </button>
                ))}
              </div>
              {selfScore && (
                <p className="text-center text-xs text-gray-500 mt-2">
                  {selfScore === 'good'
                    ? '훌륭합니다! 다음 문제로 넘어가세요.'
                    : selfScore === 'ok'
                    ? '해설을 다시 한번 읽고 완성도를 높이세요.'
                    : '해설을 꼼꼼히 읽고 핵심 키워드를 암기하세요.'}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom navigation */}
      <div className="bg-white border-t border-gray-200 px-4 py-4 sticky bottom-0">
        <div className="max-w-3xl mx-auto flex gap-3">
          <button
            onClick={onPrev}
            disabled={index === 0}
            className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
            이전
          </button>
          <button
            onClick={onNext}
            disabled={index === total - 1}
            className="flex-2 flex-1 flex items-center justify-center gap-2 py-3 bg-blue-700 text-white rounded-xl font-semibold hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            다음
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PracticalExamPage() {
  const [questions, setQuestions] = useState<PracticalQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('전체');
  const [filterRound, setFilterRound] = useState<FilterRound>(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [examMode, setExamMode] = useState(false);

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: '200' });
      if (filterType !== '전체') params.set('type', filterType);
      if (filterRound > 0) params.set('round', String(filterRound));

      const res = await fetch(`/api/exam/practical/questions?${params}`);
      const data = await res.json();
      if (data.success) {
        setQuestions(data.questions);
        setCurrentIndex(0);
      } else {
        setError('문제를 불러오지 못했습니다.');
      }
    } catch {
      setError('서버 연결 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, [filterType, filterRound]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  if (examMode && questions.length > 0) {
    return (
      <QuestionCard
        question={questions[currentIndex]}
        index={currentIndex}
        total={questions.length}
        onPrev={() => setCurrentIndex((i) => Math.max(0, i - 1))}
        onNext={() => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-orange-700" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                제4과목 실기 예상문제
              </h1>
              <p className="text-sm text-gray-500">공공조달 관리실무 서답형·사례분석형 197문제</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        {!loading && questions.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{questions.length}</p>
              <p className="text-xs text-gray-500 mt-1">선택된 문제</p>
            </div>
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-4 text-center">
              <p className="text-2xl font-bold text-blue-700">
                {questions.filter((q) => q.type === '서답형').length}
              </p>
              <p className="text-xs text-blue-600 mt-1">서답형</p>
            </div>
            <div className="bg-purple-50 rounded-xl border border-purple-200 p-4 text-center">
              <p className="text-2xl font-bold text-purple-700">
                {questions.filter((q) => q.type === '사례분석형').length}
              </p>
              <p className="text-xs text-purple-600 mt-1">사례분석형</p>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="font-semibold text-gray-800 text-sm">필터 설정</span>
          </div>

          {/* Type filter */}
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">문제 유형</p>
            <div className="flex gap-2 flex-wrap">
              {(['전체', '서답형', '사례분석형'] as FilterType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    filterType === t
                      ? 'bg-blue-700 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Round filter */}
          <div>
            <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">회차</p>
            <div className="flex gap-2 flex-wrap">
              {([0, 1, 2, 3, 4, 5] as FilterRound[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setFilterRound(r)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    filterRound === r
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {r === 0 ? '전체' : `${r}차`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* How to use */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
          <h3 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
            <span>💡</span>
            거꾸로 학습법 (Reverse Learning)
          </h3>
          <ol className="space-y-2 text-sm text-amber-800">
            <li className="flex gap-2">
              <span className="font-bold w-5 shrink-0">1.</span>
              <span>문제를 읽고 <strong>스스로 답안을 생각</strong>해보세요 (종이에 직접 써보는 것도 좋아요)</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold w-5 shrink-0">2.</span>
              <span><strong>정답 확인</strong> 후 내 답안과 비교하세요</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold w-5 shrink-0">3.</span>
              <span><strong>스스로 평가</strong>를 선택해 취약 영역을 파악하세요</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold w-5 shrink-0">4.</span>
              <span>틀린 문제는 <strong>해설을 통해 원리를 이해</strong>한 후 다시 풀어보세요</span>
            </li>
          </ol>
        </div>

        {/* Start button */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-3" />
            <p className="text-gray-500">문제를 불러오는 중...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
            <p className="text-red-700">{error}</p>
            <button onClick={fetchQuestions} className="mt-3 text-sm text-red-600 underline flex items-center gap-1 mx-auto">
              <RotateCcw className="w-4 h-4" />
              다시 시도
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => {
                setCurrentIndex(0);
                setExamMode(true);
              }}
              className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-sm mb-4"
            >
              <BookOpen className="w-6 h-6" />
              학습 시작 ({questions.length}문제)
            </button>

            {/* Question list preview */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-800 text-sm">문제 목록</h3>
              </div>
              <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                {questions.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setExamMode(true);
                    }}
                    className="w-full text-left px-5 py-3 hover:bg-gray-50 transition-colors flex items-center gap-3"
                  >
                    <span className="text-sm font-medium text-gray-400 w-6 shrink-0">
                      {idx + 1}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-semibold shrink-0 ${
                        q.type === '사례분석형'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {q.type === '사례분석형' ? '사례' : '서답'}
                    </span>
                    <span className="text-sm text-gray-700 line-clamp-1">
                      {q.questionText.replace(/\[사례\]|\[문제\]/g, '').substring(0, 60)}...
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
