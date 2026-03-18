'use client';

import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  BookOpen, ArrowLeft, Star, ChevronRight, ChevronDown, ChevronUp,
  CheckCircle, XCircle, Eye, EyeOff, Lightbulb, BookMarked,
  FileQuestion, X, AlertCircle, TrendingUp, RotateCcw,
  Brain, Layers, RotateCw, ThumbsUp, ThumbsDown,
  ClipboardList, Shield, BadgeCheck, ChevronLeft,
} from 'lucide-react';
import subjectsData from '@/data/rawdata/subjects.json';

// ─────────────────────────────────────────────────────────────
// 유틸
// ─────────────────────────────────────────────────────────────
function resolveSubjectId(param: string): string {
  const map: Record<string, string> = {
    subject1: 'S1', subject2: 'S2', subject3: 'S3',
    subject4: 'S4', practical: 'S4',
  };
  return map[param] || param;
}

function resolveTopicToMainTopic(subjectId: string, topicParam: string) {
  const subject = subjectsData.subjects.find((s) => s.id === subjectId);
  if (!subject) return { mainTopic: null, topicIndex: -1 };
  const match = topicParam.match(/^t(\d+)$/);
  if (match) {
    const g = parseInt(match[1], 10);
    const offsets: Record<string, number> = { S1: 1, S2: 4, S3: 7, S4: 10 };
    const localIndex = g - (offsets[subjectId] ?? 1);
    if (localIndex >= 0 && localIndex < subject.mainTopics.length)
      return { mainTopic: subject.mainTopics[localIndex], topicIndex: localIndex };
  }
  const direct = subject.mainTopics.find((mt) => mt.id === topicParam);
  if (direct) return { mainTopic: direct, topicIndex: subject.mainTopics.indexOf(direct) };
  return { mainTopic: subject.mainTopics[0] || null, topicIndex: 0 };
}

// ─────────────────────────────────────────────────────────────
// 테마
// ─────────────────────────────────────────────────────────────
const SUBJECT_THEME: Record<string, {
  primary: string; light: string; border: string; text: string;
  badge: string; gradient: string; bookLabel: string;
  subjectNum: string; questionCount: number;
}> = {
  S1: {
    primary: 'bg-violet-600', light: 'bg-violet-50', border: 'border-violet-200',
    text: 'text-violet-700', badge: 'bg-violet-100 text-violet-700',
    gradient: 'from-violet-600 to-violet-700', bookLabel: '1권 공공조달론',
    subjectNum: '제1과목', questionCount: 30,
  },
  S2: {
    primary: 'bg-blue-600', light: 'bg-blue-50', border: 'border-blue-200',
    text: 'text-blue-700', badge: 'bg-blue-100 text-blue-700',
    gradient: 'from-blue-600 to-blue-700', bookLabel: '2권 공공구매실무',
    subjectNum: '제2과목', questionCount: 20,
  },
  S3: {
    primary: 'bg-emerald-600', light: 'bg-emerald-50', border: 'border-emerald-200',
    text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700',
    gradient: 'from-emerald-600 to-emerald-700', bookLabel: '3권 공공계약관리',
    subjectNum: '제3과목', questionCount: 30,
  },
};

// ─────────────────────────────────────────────────────────────
// 타입
// ─────────────────────────────────────────────────────────────
interface Question {
  id: number; questionText: string; options: string[];
  correctAnswer: number; difficulty: 'easy' | 'normal' | 'hard';
  explanation: string; subject: string; questionNum: number;
}

interface EnhancedData {
  originalExplanation: string; textbook: string;
  textbookReferences: Array<{ chapter: number; chapterTitle: string; pages: string; section?: string; keyword: string }>;
  enhancedContent: string;
}

interface ConceptCard {
  id: string; topicId: string; subTopicId: string;
  chapter: number; chapterTitle: string; section: string; pages: string;
  front: string; back: string; keyPoint: string;
  difficulty: 'easy' | 'normal' | 'hard';
}

interface CriteriaSubTopic { name: string; detailItems: string[] }
interface CriteriaTopic {
  mainTopicId: string; order: number; name: string; subTopics: CriteriaSubTopic[];
}
interface CriteriaData {
  criteria: CriteriaTopic;
  subject: { subjectId: string; subjectName: string; questionCount: number; color: string; book: string };
  meta: { version: string; appliedPeriod: string; totalDetailItems: number };
}

// ─────────────────────────────────────────────────────────────
// PredictionStars
// ─────────────────────────────────────────────────────────────
function PredictionStars({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((i) => (
        <Star key={i} className={`w-3 h-3 ${i<=score?'text-amber-500 fill-amber-500':'text-slate-300'}`}/>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ExamCriteriaSection: 출제기준 강조 섹션
// ─────────────────────────────────────────────────────────────
function ExamCriteriaSection({ mainTopicId, subjectId }: { mainTopicId: string; subjectId: string }) {
  const [data, setData] = useState<CriteriaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(true);

  const theme = SUBJECT_THEME[subjectId] || SUBJECT_THEME.S1;

  useEffect(() => {
    fetch(`/api/learn/exam-criteria?mainTopicId=${mainTopicId}`)
      .then(r => r.json())
      .then(d => { if (d.success) setData(d); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [mainTopicId]);

  if (loading) return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-center gap-3">
      <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"/>
      <span className="text-amber-700 text-sm">출제기준 불러오는 중...</span>
    </div>
  );

  if (!data) return null;

  const totalItems = data.criteria.subTopics.reduce((s, st) => s + st.detailItems.length, 0);

  return (
    <div className="bg-white rounded-2xl border-2 border-amber-300 overflow-hidden shadow-sm">
      {/* 헤더 */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center shrink-0">
            <ClipboardList className="w-5 h-5 text-white"/>
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-amber-900 text-sm">📋 출제기준 근거</span>
              <span className="text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full font-semibold">
                {SUBJECT_THEME[data.subject.subjectId]?.subjectNum ?? data.subject.subjectId} · 주요항목 {data.criteria.order}
              </span>
              <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-semibold">
                ⚠ 시험 필수 출제 범위
              </span>
            </div>
            <p className="text-xs text-amber-700 mt-0.5">
              {data.meta.appliedPeriod} 적용 · {data.criteria.subTopics.length}개 세부항목 · {totalItems}개 세세항목
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2.5 py-1 rounded-lg font-bold ${theme.badge}`}>
            {data.subject.questionCount}문제 과목
          </span>
          {expanded ? <ChevronUp className="w-5 h-5 text-amber-600"/> : <ChevronDown className="w-5 h-5 text-amber-600"/>}
        </div>
      </button>

      {/* 경고 배너 */}
      {expanded && (
        <div className="px-5 py-3 bg-red-50 border-b border-amber-200 flex items-start gap-2">
          <Shield className="w-4 h-4 text-red-500 shrink-0 mt-0.5"/>
          <p className="text-xs text-red-700 leading-relaxed">
            <strong>출제기준 완벽 대비 필수!</strong> 아래 세세항목은 <strong>{data.subject.subjectName}</strong> 시험에서
            <strong> 직접 출제되는 법정 출제 근거</strong>입니다. 모든 항목을 빠짐없이 학습하세요.
          </p>
        </div>
      )}

      {/* 세부항목 목록 */}
      {expanded && (
        <div className="divide-y divide-amber-100">
          {data.criteria.subTopics.map((st, si) => (
            <div key={si} className="px-5 py-4">
              <div className="flex items-start gap-3 mb-3">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {si + 1}
                </span>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm">{st.name}</h4>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {st.detailItems.map((item, ii) => (
                      <div key={ii} className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                        <BadgeCheck className="w-3.5 h-3.5 text-amber-600 shrink-0"/>
                        <span className="text-xs text-gray-800 leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 하단 */}
      {expanded && (
        <div className={`px-5 py-3 ${theme.light} border-t border-amber-200 flex items-center justify-between`}>
          <p className={`text-xs ${theme.text} font-medium`}>
            📚 출처: {data.meta.appliedPeriod} 공공조달관리사 필기 출제기준 공식 고시
          </p>
          <span className={`text-xs font-bold px-2 py-1 rounded ${theme.badge}`}>
            {theme.bookLabel}
          </span>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ConceptCardFlipModal
// ─────────────────────────────────────────────────────────────
function ConceptCardFlipModal({ cards, topicName, subjectId, onClose }: {
  cards: ConceptCard[]; topicName: string; subjectId: string; onClose: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Record<string, boolean>>({});
  const theme = SUBJECT_THEME[subjectId] || SUBJECT_THEME.S1;
  const card = cards[idx];
  const knownCount = Object.values(known).filter(Boolean).length;
  const unknownCount = Object.values(known).filter(v => !v).length;
  const diffColor = card.difficulty === 'hard' ? 'bg-red-100 text-red-600' : card.difficulty === 'easy' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500';

  useEffect(() => { setFlipped(false); }, [idx]);

  const handleKnow = () => {
    setKnown(p => ({ ...p, [card.id]: true }));
    if (idx < cards.length - 1) setIdx(i => i + 1);
  };
  const handleUnknow = () => {
    setKnown(p => ({ ...p, [card.id]: false }));
    if (idx < cards.length - 1) setIdx(i => i + 1);
  };

  const cardStatus = known[card.id];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-lg sm:rounded-2xl max-h-[96vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <Brain className={`w-5 h-5 ${theme.text}`}/>
            <div>
              <p className="text-xs text-gray-500">{topicName} · {theme.bookLabel}</p>
              <p className="text-sm font-semibold text-gray-900">
                {idx+1} / {cards.length}
                {(knownCount + unknownCount) > 0 && (
                  <span className="ml-2 text-xs font-normal">
                    <span className="text-green-600">✓{knownCount}</span>
                    <span className="text-gray-300 mx-1">|</span>
                    <span className="text-red-500">✗{unknownCount}</span>
                  </span>
                )}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-5 h-5 text-gray-500"/></button>
        </div>
        <div className={`w-full h-1.5 bg-gray-100 shrink-0`}>
          <div className={`h-1.5 ${theme.primary} transition-all`} style={{width:`${(idx+1)/cards.length*100}%`}}/>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs px-2 py-0.5 rounded font-medium ${diffColor}`}>
              {card.difficulty === 'hard' ? '어려움' : card.difficulty === 'easy' ? '쉬움' : '보통'}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded font-medium ${theme.badge}`}>제{card.chapter}장 · p.{card.pages}</span>
            {cardStatus === true && <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-600">✓ 암기완료</span>}
            {cardStatus === false && <span className="text-xs px-2 py-0.5 rounded bg-red-100 text-red-600">✗ 복습필요</span>}
          </div>
          <div
            onClick={() => setFlipped(!flipped)}
            className={`cursor-pointer rounded-2xl border-2 transition-all min-h-[200px] p-6 flex flex-col items-center justify-center text-center gap-3 select-none ${flipped ? `${theme.light} ${theme.border}` : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}
          >
            {!flipped ? (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="w-4 h-4 text-slate-400"/>
                  <span className="text-xs text-slate-400 font-medium">앞면 · 클릭하여 뒤집기</span>
                </div>
                <p className="text-lg font-bold text-slate-900 leading-snug">{card.front}</p>
                <p className="text-xs text-slate-400 mt-1">{card.section}</p>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <RotateCw className={`w-4 h-4 ${theme.text}`}/>
                  <span className={`text-xs font-medium ${theme.text}`}>뒷면 · 정답/해설</span>
                </div>
                <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap text-left w-full">{card.back}</p>
                {card.keyPoint && (
                  <div className={`w-full mt-3 p-3 rounded-xl ${theme.light} ${theme.border} border`}>
                    <p className={`text-xs font-semibold mb-1 ${theme.text}`}>💡 핵심 포인트</p>
                    <p className={`text-xs ${theme.text} leading-relaxed`}>{card.keyPoint}</p>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
            <RotateCcw className="w-3.5 h-3.5"/>
            <span>카드를 클릭하면 앞/뒤가 바뀝니다</span>
          </div>
        </div>
        <div className="px-5 py-4 border-t border-gray-100 bg-gray-50 shrink-0 space-y-3">
          <div className="flex gap-3">
            <button onClick={handleUnknow} className="flex-1 py-2.5 border-2 border-red-200 bg-red-50 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
              <ThumbsDown className="w-4 h-4"/>복습 필요
            </button>
            <button onClick={handleKnow} className="flex-1 py-2.5 border-2 border-green-200 bg-green-50 text-green-700 rounded-xl text-sm font-semibold hover:bg-green-100 transition-colors flex items-center justify-center gap-2">
              <ThumbsUp className="w-4 h-4"/>암기 완료
            </button>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setIdx(i => Math.max(0, i-1))} disabled={idx===0} className="flex-1 py-2 border border-gray-300 rounded-xl text-sm text-gray-700 hover:bg-white disabled:opacity-40 flex items-center justify-center gap-1">
              <ChevronLeft className="w-4 h-4"/>이전
            </button>
            {idx < cards.length - 1 ? (
              <button onClick={() => setIdx(i => i+1)} className={`flex-1 py-2 ${theme.primary} text-white rounded-xl text-sm font-semibold hover:opacity-90 flex items-center justify-center gap-1`}>
                다음<ChevronRight className="w-4 h-4"/>
              </button>
            ) : (
              <button onClick={onClose} className={`flex-1 py-2 ${theme.primary} text-white rounded-xl text-sm font-semibold hover:opacity-90 flex items-center justify-center gap-2`}>
                <CheckCircle className="w-4 h-4"/>학습 완료
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// QuizModal
// ─────────────────────────────────────────────────────────────
function QuizModal({ questions, startIndex, topicName, subjectId, onClose }: {
  questions: Question[]; startIndex: number; topicName: string; subjectId: string; onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIndex);
  const [selected, setSelected] = useState<number|null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [enhanced, setEnhanced] = useState<EnhancedData|null>(null);
  const [loadingEnhanced, setLoadingEnhanced] = useState(false);
  const [showEnhanced, setShowEnhanced] = useState(false);
  const [scoreHistory, setScoreHistory] = useState<Record<number,boolean>>({});
  const q = questions[idx];
  const theme = SUBJECT_THEME[subjectId] || SUBJECT_THEME.S1;

  useEffect(() => { setSelected(null); setShowExplanation(false); setEnhanced(null); setShowEnhanced(false); }, [idx]);

  const fetchEnhanced = useCallback(async () => {
    if (enhanced || loadingEnhanced) return;
    setLoadingEnhanced(true);
    try {
      const res = await fetch(`/api/exam/enhanced-explanation?id=${q.id}`);
      if (res.ok) { const d = await res.json(); if (d.success) setEnhanced(d); }
    } catch {} finally { setLoadingEnhanced(false); }
  }, [q.id, enhanced, loadingEnhanced]);

  const handleSelect = (oi: number) => {
    if (selected !== null) return;
    setSelected(oi); setShowExplanation(true);
    setScoreHistory(p => ({ ...p, [q.id]: oi === q.correctAnswer }));
    fetchEnhanced();
  };

  const isCorrect = selected !== null && selected === q.correctAnswer;
  const correctCount = Object.values(scoreHistory).filter(Boolean).length;
  const answeredCount = Object.keys(scoreHistory).length;
  const tbKey = (enhanced?.textbook as '1권'|'2권'|'3권') || '1권';
  const TC: Record<string,{bg:string;text:string;border:string}> = {
    '1권':{bg:'bg-violet-50',text:'text-violet-800',border:'border-violet-200'},
    '2권':{bg:'bg-blue-50',text:'text-blue-800',border:'border-blue-200'},
    '3권':{bg:'bg-emerald-50',text:'text-emerald-800',border:'border-emerald-200'},
  };
  const tc = TC[tbKey] || TC['1권'];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-2xl sm:rounded-2xl max-h-[92vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <FileQuestion className={`w-5 h-5 ${theme.text}`}/>
            <div>
              <p className="text-xs text-gray-500">{topicName}</p>
              <p className="text-sm font-semibold text-gray-900">
                {idx+1} / {questions.length}
                {answeredCount>0 && <span className="ml-2 text-xs font-normal text-green-600">정답률 {Math.round(correctCount/answeredCount*100)}%</span>}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-5 h-5 text-gray-500"/></button>
        </div>
        <div className="w-full h-1 bg-gray-100 shrink-0">
          <div className={`h-1 ${theme.primary} transition-all`} style={{width:`${(idx+1)/questions.length*100}%`}}/>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-0.5 rounded font-medium ${q.difficulty==='hard'?'bg-red-100 text-red-600':q.difficulty==='easy'?'bg-green-100 text-green-600':'bg-gray-100 text-gray-600'}`}>
              {q.difficulty==='hard'?'어려움':q.difficulty==='easy'?'쉬움':'보통'}
            </span>
            <span className="text-xs text-gray-400">문제 #{q.questionNum||q.id}</span>
            <span className={`text-xs px-2 py-0.5 rounded font-medium ml-auto ${theme.badge}`}>출제기준 근거</span>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <p className="text-gray-900 leading-relaxed font-medium text-sm">{q.questionText}</p>
          </div>
          <div className="space-y-2">
            {q.options.map((opt,oi) => {
              let cls='w-full text-left px-4 py-3 rounded-xl border-2 transition-all flex items-start gap-3 ';
              if(selected===null) cls+='border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50';
              else if(oi===q.correctAnswer) cls+='border-green-500 bg-green-50';
              else if(oi===selected) cls+='border-red-400 bg-red-50';
              else cls+='border-gray-100 bg-gray-50 opacity-50';
              return (
                <button key={oi} onClick={() => handleSelect(oi)} disabled={selected!==null} className={cls}>
                  <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 ${selected!==null&&oi===q.correctAnswer?'border-green-500 bg-green-500 text-white':selected===oi&&oi!==q.correctAnswer?'border-red-400 bg-red-400 text-white':'border-gray-300 text-gray-600'}`}>
                    {String.fromCharCode(65+oi)}
                  </span>
                  <span className="text-gray-800 text-sm leading-relaxed flex-1">{opt}</span>
                  {selected!==null&&oi===q.correctAnswer&&<CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5"/>}
                  {selected===oi&&oi!==q.correctAnswer&&<XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5"/>}
                </button>
              );
            })}
          </div>
          {selected!==null&&(
            <div className={`rounded-xl p-3 border ${isCorrect?'bg-green-50 border-green-200':'bg-red-50 border-red-200'}`}>
              <p className={`font-semibold text-sm ${isCorrect?'text-green-700':'text-red-700'}`}>
                {isCorrect?'✅ 정답입니다!':`❌ 오답. 정답: ${String.fromCharCode(65+q.correctAnswer)}번`}
              </p>
            </div>
          )}
          {showExplanation&&(
            <div className="space-y-3">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-blue-600"/>
                  <span className="font-semibold text-blue-700 text-xs">기본 해설</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{q.explanation}</p>
              </div>
              <button onClick={() => { setShowEnhanced(!showEnhanced); if(!enhanced) fetchEnhanced(); }} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-colors ${tc.bg} ${tc.border}`}>
                <div className="flex items-center gap-2">
                  <BookMarked className={`w-4 h-4 ${tc.text}`}/>
                  <span className={`text-xs font-semibold ${tc.text}`}>교재 연계 고도화 해설 (거꾸로 학습)</span>
                </div>
                {showEnhanced?<EyeOff className={`w-4 h-4 ${tc.text} opacity-60`}/>:<Eye className={`w-4 h-4 ${tc.text} opacity-60`}/>}
              </button>
              {showEnhanced&&(
                <div className={`${tc.bg} border ${tc.border} rounded-xl p-4`}>
                  {loadingEnhanced?(
                    <div className={`flex items-center gap-2 ${tc.text}`}>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"/>
                      <span className="text-xs">로딩 중...</span>
                    </div>
                  ):enhanced?(
                    <>
                      {enhanced.textbookReferences?.length>0&&(
                        <div className="mb-3">
                          <p className={`text-xs font-semibold mb-2 ${tc.text}`}>📚 교재 참조</p>
                          <div className="space-y-1">
                            {enhanced.textbookReferences.map((ref,ri)=>(
                              <div key={ri} className="flex items-center gap-2 text-xs bg-white rounded-lg px-3 py-2">
                                <span className={`font-bold ${tc.text}`}>제{ref.chapter}장</span>
                                <span className="text-gray-600 truncate">{ref.chapterTitle}</span>
                                {ref.section&&<span className="text-gray-400 hidden sm:block">· {ref.section}</span>}
                                <span className={`ml-auto font-medium ${tc.text} shrink-0`}>p.{ref.pages}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className={`text-xs leading-relaxed whitespace-pre-wrap ${tc.text}`}>{enhanced.enhancedContent}</div>
                    </>
                  ):(
                    <p className="text-xs text-gray-500">이 문제의 고도화 해설이 준비 중입니다.</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="px-5 py-4 border-t border-gray-100 bg-gray-50 shrink-0">
          <div className="flex gap-3">
            <button onClick={() => setIdx(i => Math.max(0,i-1))} disabled={idx===0} className="flex-1 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-white disabled:opacity-40 flex items-center justify-center gap-1">
              <ChevronLeft className="w-4 h-4"/>이전
            </button>
            {idx<questions.length-1?(
              <button onClick={() => setIdx(i => i+1)} className={`flex-1 py-2.5 ${theme.primary} text-white rounded-xl text-sm font-semibold hover:opacity-90 flex items-center justify-center gap-1`}>
                다음<ChevronRight className="w-4 h-4"/>
              </button>
            ):(
              <button onClick={onClose} className="flex-1 py-2.5 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 flex items-center justify-center gap-1">
                완료<CheckCircle className="w-4 h-4"/>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SubTopicCard
// ─────────────────────────────────────────────────────────────
function SubTopicCard({ subTopic, mainTopicId, subjectId }: {
  subTopic: (typeof subjectsData.subjects)[0]['mainTopics'][0]['subTopics'][0];
  mainTopicId: string; subjectId: string;
}) {
  const [open, setOpen] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState<number|null>(null);
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizStartIdx, setQuizStartIdx] = useState(0);
  const hasMapping = subjectId === 'S1' || subjectId === 'S2';
  const theme = SUBJECT_THEME[subjectId] || SUBJECT_THEME.S1;

  const fetchQ = useCallback(async () => {
    if (questions.length>0||loading) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/exam/topic-questions?topicId=${mainTopicId}&subTopicId=${subTopic.id}&limit=30`);
      if (res.ok) { const d = await res.json(); if(d.success){setQuestions(d.questions||[]);setTotalCount(d.total??0);} }
    } catch {} finally { setLoading(false); }
  }, [subTopic.id,mainTopicId,questions.length,loading]);

  const handleToggle = () => {
    const next=!open; setOpen(next);
    if(next&&hasMapping&&questions.length===0) fetchQ();
  };

  const highPred = subTopic.detailItems.filter(d => d.predictionScore>=4).length;

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <button onClick={handleToggle} className="w-full px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between hover:bg-slate-100 transition-colors">
          <div className="text-left">
            <h2 className="font-semibold text-slate-900 text-sm">{subTopic.name}</h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs text-slate-500">{subTopic.detailItems.length}개 항목</span>
              {highPred>0&&<span className="text-xs text-amber-600 flex items-center gap-0.5"><Star className="w-3 h-3 fill-amber-500 text-amber-500"/>고출제 {highPred}개</span>}
              {hasMapping&&totalCount!==null&&totalCount>0&&(
                <span className={`text-xs flex items-center gap-0.5 ${theme.text}`}>
                  <FileQuestion className="w-3 h-3"/>관련 문제 {totalCount}개
                </span>
              )}
            </div>
          </div>
          {open?<ChevronUp className="w-5 h-5 text-slate-400 shrink-0"/>:<ChevronDown className="w-5 h-5 text-slate-400 shrink-0"/>}
        </button>
        {open&&(
          <>
            <div className="divide-y divide-slate-100">
              {subTopic.detailItems.map((item)=>(
                <div key={item.id} className="px-6 py-3 flex items-center gap-4 hover:bg-amber-50 transition-colors">
                  <BadgeCheck className={`w-4 h-4 shrink-0 ${theme.text}`}/>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-900 leading-relaxed">{item.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.id}</p>
                  </div>
                  <PredictionStars score={item.predictionScore}/>
                </div>
              ))}
            </div>
            {hasMapping&&(
              <div className={`border-t border-slate-200 ${theme.light}`}>
                {loading?(
                  <div className="px-6 py-4 flex items-center gap-3">
                    <div className={`w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin ${theme.text}`}/>
                    <span className={`text-sm ${theme.text}`}>관련 문제 불러오는 중...</span>
                  </div>
                ):questions.length===0?(
                  <div className="px-6 py-4 flex items-center gap-2 text-gray-400">
                    <AlertCircle className="w-4 h-4"/>
                    <span className="text-xs">이 세부항목에 매핑된 예상문제가 없습니다.</span>
                  </div>
                ):(
                  <div className="px-6 py-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <FileQuestion className={`w-4 h-4 ${theme.text}`}/>
                        <span className={`text-sm font-semibold ${theme.text}`}>출제기준 연계 예상문제 {totalCount}개</span>
                      </div>
                      <button onClick={()=>{setQuizStartIdx(0);setQuizOpen(true);}} className={`flex items-center gap-1.5 px-3 py-1.5 ${theme.primary} text-white text-xs font-semibold rounded-lg hover:opacity-90`}>
                        <TrendingUp className="w-3.5 h-3.5"/>전체 풀기
                      </button>
                    </div>
                    <div className="space-y-2">
                      {questions.slice(0,5).map((q,qi)=>(
                        <button key={q.id} onClick={()=>{setQuizStartIdx(qi);setQuizOpen(true);}} className={`w-full text-left bg-white border ${theme.border} hover:${theme.light} rounded-xl px-4 py-3 transition-all group`}>
                          <div className="flex items-start gap-3">
                            <span className={`w-6 h-6 rounded-full ${theme.light} ${theme.text} text-xs font-bold flex items-center justify-center shrink-0`}>{qi+1}</span>
                            <p className="text-sm text-gray-800 line-clamp-2 flex-1 leading-relaxed">{q.questionText}</p>
                            <ChevronRight className={`w-4 h-4 ${theme.text} shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity`}/>
                          </div>
                          <div className="mt-1.5 flex items-center gap-2 ml-9">
                            <span className={`text-xs px-1.5 py-0.5 rounded ${q.difficulty==='hard'?'bg-red-100 text-red-600':q.difficulty==='easy'?'bg-green-100 text-green-600':'bg-gray-100 text-gray-500'}`}>
                              {q.difficulty==='hard'?'어려움':q.difficulty==='easy'?'쉬움':'보통'}
                            </span>
                          </div>
                        </button>
                      ))}
                      {questions.length>5&&(
                        <button onClick={()=>{setQuizStartIdx(5);setQuizOpen(true);}} className={`w-full text-center text-xs ${theme.text} hover:opacity-80 py-2 font-medium flex items-center justify-center gap-1`}>
                          <RotateCcw className="w-3 h-3"/>+{questions.length-5}개 문제 더 풀기
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
      {quizOpen&&<QuizModal questions={questions} startIndex={quizStartIdx} topicName={subTopic.name} subjectId={subjectId} onClose={()=>setQuizOpen(false)}/>}
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// TopicLearningPanel: 개념카드 + 문제풀이 버튼
// ─────────────────────────────────────────────────────────────
function TopicLearningPanel({ mainTopicId, mainTopicName, subjectId }: {
  mainTopicId: string; mainTopicName: string; subjectId: string;
}) {
  const [cards, setCards] = useState<ConceptCard[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loadingCards, setLoadingCards] = useState(false);
  const [loadingQ, setLoadingQ] = useState(false);
  const [totalQ, setTotalQ] = useState<number|null>(null);
  const [cardsFetched, setCardsFetched] = useState(false);
  const [qFetched, setQFetched] = useState(false);
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const hasMapping = subjectId === 'S1' || subjectId === 'S2';
  const theme = SUBJECT_THEME[subjectId] || SUBJECT_THEME.S1;

  const fetchCards = useCallback(async () => {
    if (cardsFetched||loadingCards) return;
    setLoadingCards(true);
    try {
      const res = await fetch(`/api/learn/concept-cards?topicId=${mainTopicId}&limit=100`);
      if (res.ok) { const d = await res.json(); if(d.success) setCards(d.cards||[]); }
    } catch {} finally { setLoadingCards(false); setCardsFetched(true); }
  }, [mainTopicId,cardsFetched,loadingCards]);

  const fetchQuestions = useCallback(async () => {
    if (qFetched||loadingQ) return;
    setLoadingQ(true);
    try {
      const res = await fetch(`/api/exam/topic-questions?topicId=${mainTopicId}&limit=50`);
      if (res.ok) { const d = await res.json(); if(d.success){setQuestions(d.questions||[]);setTotalQ(d.total??0);} }
    } catch {} finally { setLoadingQ(false); setQFetched(true); }
  }, [mainTopicId,qFetched,loadingQ]);

  if (!hasMapping) return null;

  return (
    <>
      <div className={`bg-gradient-to-r ${theme.gradient} rounded-2xl p-5 text-white`}>
        <div className="flex items-start gap-3 mb-4">
          <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
            <ClipboardList className="w-4 h-4 text-white"/>
          </div>
          <div>
            <h3 className="font-bold text-base">🎯 {mainTopicName} 학습 시작</h3>
            <p className="text-white/80 text-xs mt-0.5">{theme.bookLabel} · 출제기준 완벽 대비 · 거꾸로 학습법</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={async () => { await fetchCards(); setCardModalOpen(true); }}
            disabled={loadingCards}
            className="bg-white/15 hover:bg-white/25 border border-white/30 rounded-xl p-4 text-left transition-all disabled:opacity-60"
          >
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-5 h-5 text-white"/>
              {loadingCards && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>}
            </div>
            <p className="font-semibold text-sm text-white">개념카드 학습 시작</p>
            <p className="text-white/70 text-xs mt-0.5">출제기준 핵심개념 플래시카드</p>
          </button>
          <button
            onClick={async () => { await fetchQuestions(); setQuizModalOpen(true); }}
            disabled={loadingQ}
            className="bg-white/15 hover:bg-white/25 border border-white/30 rounded-xl p-4 text-left transition-all disabled:opacity-60"
          >
            <div className="flex items-center gap-2 mb-2">
              <FileQuestion className="w-5 h-5 text-white"/>
              {loadingQ && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>}
            </div>
            <p className="font-semibold text-sm text-white">문제풀이 시작</p>
            <p className="text-white/70 text-xs mt-0.5">
              {totalQ !== null ? `출제기준 연계 ${totalQ}문제` : '출제기준 연계 예상문제'}
            </p>
          </button>
        </div>
      </div>

      {cardModalOpen && cards.length > 0 && (
        <ConceptCardFlipModal cards={cards} topicName={mainTopicName} subjectId={subjectId} onClose={() => setCardModalOpen(false)}/>
      )}
      {cardModalOpen && cards.length === 0 && !loadingCards && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
            <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4"/>
            <h3 className="font-bold text-lg text-gray-900 mb-2">개념카드 준비 중</h3>
            <p className="text-gray-500 text-sm mb-6">출제기준 기반 개념카드가 곧 추가됩니다.</p>
            <button onClick={() => setCardModalOpen(false)} className={`px-6 py-2.5 ${theme.primary} text-white rounded-xl font-semibold text-sm`}>확인</button>
          </div>
        </div>
      )}
      {quizModalOpen && questions.length > 0 && (
        <QuizModal questions={questions} startIndex={0} topicName={mainTopicName} subjectId={subjectId} onClose={() => setQuizModalOpen(false)}/>
      )}
      {quizModalOpen && questions.length === 0 && !loadingQ && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
            <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4"/>
            <h3 className="font-bold text-lg text-gray-900 mb-2">매핑된 문제 없음</h3>
            <p className="text-gray-500 text-sm mb-6">출제기준 연계 예상문제를 준비 중입니다.</p>
            <button onClick={() => setQuizModalOpen(false)} className={`px-6 py-2.5 ${theme.primary} text-white rounded-xl font-semibold text-sm`}>확인</button>
          </div>
        </div>
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// 메인 페이지
// ─────────────────────────────────────────────────────────────
export default function TopicDetailPage() {
  const params = useParams();
  const subjectId = resolveSubjectId(params.subjectId as string);
  const subject = useMemo(() => subjectsData.subjects.find(s => s.id === subjectId), [subjectId]);
  const { mainTopic } = useMemo(() => resolveTopicToMainTopic(subjectId, params.topicId as string), [subjectId, params.topicId]);
  const hasMapping = subjectId === 'S1' || subjectId === 'S2' || subjectId === 'S3';
  const theme = SUBJECT_THEME[subjectId] || SUBJECT_THEME.S1;

  if (!subject || !mainTopic) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-slate-900">학습 항목을 찾을 수 없습니다</h1>
          <Link href="/learn" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <ArrowLeft className="w-4 h-4"/>학습 메인으로
          </Link>
        </div>
      </div>
    );
  }

  const totalDetailItems = mainTopic.subTopics.reduce((s,st) => s+st.detailItems.length, 0);
  const highPredItems = mainTopic.subTopics.reduce((s,st) => s+st.detailItems.filter(d => d.predictionScore>=4).length, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* 브레드크럼 */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/learn" className="hover:text-blue-600">학습</Link>
        <ChevronRight className="w-4 h-4"/>
        <span className="text-slate-900 font-medium">{subject.name}</span>
        <ChevronRight className="w-4 h-4"/>
        <span className={`font-medium ${theme.text}`}>{mainTopic.name}</span>
      </div>

      {/* 출제기준 강조 배너 */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl px-5 py-4 flex items-center gap-4">
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
          <Shield className="w-6 h-6 text-white"/>
        </div>
        <div className="flex-1">
          <p className="font-bold text-white text-sm">📋 공공조달관리사 필기 출제기준 근거 학습</p>
          <p className="text-white/85 text-xs mt-0.5">
            적용기간: 2026.03.01 ~ 2028.12.31 · {theme.subjectNum} {mainTopic.name} · {theme.questionCount}문제 과목
          </p>
        </div>
        <div className="text-right shrink-0">
          <div className="text-white/80 text-xs">주요항목</div>
          <div className="text-white font-bold text-xl">{mainTopic.order}</div>
        </div>
      </div>

      {/* 토픽 헤더 카드 */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className={`w-6 h-6 ${theme.text}`}/>
              <h1 className="text-2xl font-bold text-slate-900">{mainTopic.name}</h1>
            </div>
            <p className="text-slate-500 text-sm">{subject.name} · 주요항목 {mainTopic.order}</p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${theme.badge}`}>
                <BookMarked className="w-3.5 h-3.5"/>{theme.bookLabel}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                <ClipboardList className="w-3.5 h-3.5"/>출제기준 필수 범위
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500 mb-1">예상 비중</div>
            <div className={`text-2xl font-bold ${theme.text}`}>{mainTopic.estimatedWeight}%</div>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-6 text-sm flex-wrap">
          <div className="flex items-center gap-2"><span className="text-slate-500">세부항목</span><span className="font-bold text-slate-900">{mainTopic.subTopics.length}개</span></div>
          <div className="flex items-center gap-2"><span className="text-slate-500">세세항목</span><span className="font-bold text-slate-900">{totalDetailItems}개</span></div>
          <div className="flex items-center gap-2"><Star className="w-4 h-4 text-amber-500 fill-amber-500"/><span className="text-slate-500">고출제</span><span className="font-bold text-amber-600">{highPredItems}개</span></div>
        </div>
      </div>

      {/* 출제기준 상세 섹션 (모든 과목) */}
      {hasMapping && <ExamCriteriaSection mainTopicId={mainTopic.id} subjectId={subjectId}/>}

      {/* 학습 시작 패널 (S1, S2만) */}
      {(subjectId === 'S1' || subjectId === 'S2') && (
        <TopicLearningPanel mainTopicId={mainTopic.id} mainTopicName={mainTopic.name} subjectId={subjectId}/>
      )}

      {/* 학습법 안내 */}
      <div className={`${theme.light} border ${theme.border} rounded-xl px-5 py-4 flex items-start gap-3`}>
        <Lightbulb className={`w-5 h-5 shrink-0 mt-0.5 ${theme.text}`}/>
        <div>
          <p className={`text-sm font-semibold mb-1 ${theme.text}`}>
            💡 출제기준 근거 완벽 대비 학습법
          </p>
          <p className={`text-xs leading-relaxed ${theme.text} opacity-80`}>
            위 <strong>출제기준 세세항목</strong>이 곧 시험에 나오는 내용입니다.
            <strong> 개념카드</strong>로 출제기준 핵심개념을 먼저 암기하고,
            <strong> 문제풀이</strong>로 출제기준 연계 예상문제를 풀어보세요.
            각 세부항목을 클릭하면 <strong>{theme.bookLabel} 교재 연계 해설</strong>까지 확인할 수 있습니다.
          </p>
        </div>
      </div>

      {/* 세부 토픽 카드 목록 */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="font-bold text-slate-900">세부항목별 이론 학습</h2>
          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{mainTopic.subTopics.length}개</span>
        </div>
        <div className="space-y-4">
          {mainTopic.subTopics.map((subTopic) => (
            <SubTopicCard key={subTopic.id} subTopic={subTopic} mainTopicId={mainTopic.id} subjectId={subjectId}/>
          ))}
        </div>
      </div>

      {/* 하단 네비게이션 */}
      <div className="flex gap-3 justify-center pt-4">
        <Link href="/learn" className="flex items-center gap-2 px-6 py-3 bg-slate-200 text-slate-900 font-semibold rounded-xl hover:bg-slate-300">
          <ArrowLeft className="w-4 h-4"/>학습 목록으로
        </Link>
        <Link href="/exam/study" className={`flex items-center gap-2 px-6 py-3 ${theme.primary} text-white font-semibold rounded-xl hover:opacity-90`}>
          <TrendingUp className="w-4 h-4"/>전체 학습 모드
        </Link>
      </div>
    </div>
  );
}
