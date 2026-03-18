'use client';

import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  BookOpen,
  ArrowLeft,
  Star,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Lightbulb,
  BookMarked,
  FileQuestion,
  X,
  AlertCircle,
  TrendingUp,
  RotateCcw,
} from 'lucide-react';
import subjectsData from '@/data/rawdata/subjects.json';

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
    const globalIndex = parseInt(match[1], 10);
    let localIndex = 0;
    if (subjectId === 'S1') localIndex = globalIndex - 1;
    else if (subjectId === 'S2') localIndex = globalIndex - 4;
    else if (subjectId === 'S3') localIndex = globalIndex - 7;
    else if (subjectId === 'S4') localIndex = globalIndex - 10;
    if (localIndex >= 0 && localIndex < subject.mainTopics.length) {
      return { mainTopic: subject.mainTopics[localIndex], topicIndex: localIndex };
    }
  }
  const direct = subject.mainTopics.find((mt) => mt.id === topicParam);
  if (direct) return { mainTopic: direct, topicIndex: subject.mainTopics.indexOf(direct) };
  return { mainTopic: subject.mainTopics[0] || null, topicIndex: 0 };
}

interface Question {
  id: number;
  questionText: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'normal' | 'hard';
  explanation: string;
  subject: string;
  questionNum: number;
}

interface EnhancedData {
  originalExplanation: string;
  textbook: string;
  textbookReferences: Array<{
    chapter: number; chapterTitle: string; pages: string; section?: string; keyword: string;
  }>;
  enhancedContent: string;
}

function PredictionStars({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((i) => (
        <Star key={i} className={`w-3 h-3 ${i<=score?'text-amber-500 fill-amber-500':'text-slate-300'}`} />
      ))}
    </div>
  );
}

function QuizModal({ questions, startIndex, topicName, onClose }: {
  questions: Question[]; startIndex: number; topicName: string; onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIndex);
  const [selected, setSelected] = useState<number|null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [enhanced, setEnhanced] = useState<EnhancedData|null>(null);
  const [loadingEnhanced, setLoadingEnhanced] = useState(false);
  const [showEnhanced, setShowEnhanced] = useState(false);
  const [scoreHistory, setScoreHistory] = useState<Record<number,boolean>>({});

  const q = questions[idx];

  useEffect(() => {
    setSelected(null); setShowExplanation(false); setEnhanced(null); setShowEnhanced(false);
  }, [idx]);

  const fetchEnhanced = useCallback(async () => {
    if (enhanced || loadingEnhanced) return;
    setLoadingEnhanced(true);
    try {
      const res = await fetch(`/api/exam/enhanced-explanation?id=${q.id}`);
      if (res.ok) { const d = await res.json(); if (d.success) setEnhanced(d); }
    } catch {}
    finally { setLoadingEnhanced(false); }
  }, [q.id, enhanced, loadingEnhanced]);

  const handleSelect = (oi: number) => {
    if (selected !== null) return;
    setSelected(oi); setShowExplanation(true);
    setScoreHistory((p) => ({ ...p, [q.id]: oi === q.correctAnswer }));
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
            <FileQuestion className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-xs text-gray-500">{topicName}</p>
              <p className="text-sm font-semibold text-gray-900">
                {idx+1} / {questions.length}
                {answeredCount>0 && <span className="ml-2 text-xs font-normal text-green-600">정답률 {Math.round(correctCount/answeredCount*100)}%</span>}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-5 h-5 text-gray-500" /></button>
        </div>
        <div className="w-full h-1 bg-gray-100 shrink-0">
          <div className="h-1 bg-blue-500 transition-all" style={{width:`${(idx+1)/questions.length*100}%`}} />
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-0.5 rounded font-medium ${q.difficulty==='hard'?'bg-red-100 text-red-600':q.difficulty==='easy'?'bg-green-100 text-green-600':'bg-gray-100 text-gray-600'}`}>
              {q.difficulty==='hard'?'어려움':q.difficulty==='easy'?'쉬움':'보통'}
            </span>
            <span className="text-xs text-gray-400">문제 #{q.questionNum||q.id}</span>
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
                <button key={oi} onClick={()=>handleSelect(oi)} disabled={selected!==null} className={cls}>
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
              <button onClick={()=>{setShowEnhanced(!showEnhanced);if(!enhanced)fetchEnhanced();}} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-colors ${tc.bg} ${tc.border}`}>
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
            <button onClick={()=>setIdx(i=>Math.max(0,i-1))} disabled={idx===0} className="flex-1 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-white disabled:opacity-40 flex items-center justify-center gap-1">
              <ChevronRight className="w-4 h-4 rotate-180"/>이전
            </button>
            {idx<questions.length-1?(
              <button onClick={()=>setIdx(i=>i+1)} className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 flex items-center justify-center gap-1">
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

function SubTopicCard({ subTopic, mainTopicId, isS1 }: {
  subTopic: (typeof subjectsData.subjects)[0]['mainTopics'][0]['subTopics'][0];
  mainTopicId: string; isS1: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState<number|null>(null);
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizStartIdx, setQuizStartIdx] = useState(0);

  const fetchQ = useCallback(async () => {
    if (questions.length>0||loading) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/exam/topic-questions?topicId=${mainTopicId}&subTopicId=${subTopic.id}&limit=30`);
      if (res.ok) { const d=await res.json(); if(d.success){setQuestions(d.questions||[]);setTotalCount(d.total??0);} }
    } catch {}
    finally { setLoading(false); }
  }, [subTopic.id,mainTopicId,questions.length,loading]);

  const handleToggle = () => {
    const next=!open; setOpen(next);
    if(next&&isS1&&questions.length===0) fetchQ();
  };

  const highPred=subTopic.detailItems.filter(d=>d.predictionScore>=4).length;

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <button onClick={handleToggle} className="w-full px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between hover:bg-slate-100 transition-colors">
          <div className="text-left">
            <h2 className="font-semibold text-slate-900 text-sm">{subTopic.name}</h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs text-slate-500">{subTopic.detailItems.length}개 항목</span>
              {highPred>0&&<span className="text-xs text-amber-600 flex items-center gap-0.5"><Star className="w-3 h-3 fill-amber-500 text-amber-500"/>고출제 {highPred}개</span>}
              {isS1&&totalCount!==null&&totalCount>0&&<span className="text-xs text-blue-600 flex items-center gap-0.5"><FileQuestion className="w-3 h-3"/>관련 문제 {totalCount}개</span>}
            </div>
          </div>
          {open?<ChevronUp className="w-5 h-5 text-slate-400 shrink-0"/>:<ChevronDown className="w-5 h-5 text-slate-400 shrink-0"/>}
        </button>
        {open&&(
          <>
            <div className="divide-y divide-slate-100">
              {subTopic.detailItems.map((item)=>(
                <div key={item.id} className="px-6 py-3 flex items-center gap-4 hover:bg-blue-50 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-blue-300 shrink-0"/>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-900 leading-relaxed">{item.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.id}</p>
                  </div>
                  <PredictionStars score={item.predictionScore}/>
                </div>
              ))}
            </div>
            {isS1&&(
              <div className="border-t border-slate-200 bg-blue-50">
                {loading?(
                  <div className="px-6 py-4 flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"/>
                    <span className="text-sm text-blue-700">관련 문제 불러오는 중...</span>
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
                        <FileQuestion className="w-4 h-4 text-blue-600"/>
                        <span className="text-sm font-semibold text-blue-800">관련 예상문제 {totalCount}개</span>
                        <span className="text-xs text-blue-500">(최대 30개)</span>
                      </div>
                      <button onClick={()=>{setQuizStartIdx(0);setQuizOpen(true);}} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                        <TrendingUp className="w-3.5 h-3.5"/>전체 풀기
                      </button>
                    </div>
                    <div className="space-y-2">
                      {questions.slice(0,5).map((q,qi)=>(
                        <button key={q.id} onClick={()=>{setQuizStartIdx(qi);setQuizOpen(true);}} className="w-full text-left bg-white border border-blue-200 hover:border-blue-400 hover:bg-blue-50 rounded-xl px-4 py-3 transition-all group">
                          <div className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0 group-hover:bg-blue-200">{qi+1}</span>
                            <p className="text-sm text-gray-800 line-clamp-2 flex-1 leading-relaxed">{q.questionText}</p>
                            <ChevronRight className="w-4 h-4 text-blue-400 shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity"/>
                          </div>
                          <div className="mt-1.5 flex items-center gap-2 ml-9">
                            <span className={`text-xs px-1.5 py-0.5 rounded ${q.difficulty==='hard'?'bg-red-100 text-red-600':q.difficulty==='easy'?'bg-green-100 text-green-600':'bg-gray-100 text-gray-500'}`}>
                              {q.difficulty==='hard'?'어려움':q.difficulty==='easy'?'쉬움':'보통'}
                            </span>
                          </div>
                        </button>
                      ))}
                      {questions.length>5&&(
                        <button onClick={()=>{setQuizStartIdx(5);setQuizOpen(true);}} className="w-full text-center text-xs text-blue-600 hover:text-blue-800 py-2 font-medium flex items-center justify-center gap-1">
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
      {quizOpen&&<QuizModal questions={questions} startIndex={quizStartIdx} topicName={subTopic.name} onClose={()=>setQuizOpen(false)}/>}
    </>
  );
}

function MainTopicQuizLauncher({ mainTopicId, mainTopicName, isS1 }: {
  mainTopicId: string; mainTopicName: string; isS1: boolean;
}) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState<number|null>(null);
  const [quizOpen, setQuizOpen] = useState(false);
  const [fetched, setFetched] = useState(false);

  const fetchAll = useCallback(async () => {
    if (fetched||loading) return;
    setLoading(true);
    try {
      const res=await fetch(`/api/exam/topic-questions?topicId=${mainTopicId}&limit=50`);
      if(res.ok){const d=await res.json();if(d.success){setQuestions(d.questions||[]);setTotal(d.total??0);}}
    } catch {}
    finally{setLoading(false);setFetched(true);}
  }, [mainTopicId,fetched,loading]);

  if(!isS1) return null;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-5 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-base mb-1">📝 {mainTopicName} 전체 문제 풀기</h3>
          <p className="text-blue-100 text-sm">{total!==null?`이론 연계 예상문제 ${total}개 · 거꾸로 학습법`:'관련 예상문제로 이론 원리를 확인하세요'}</p>
        </div>
        <button onClick={async()=>{if(!fetched)await fetchAll();setQuizOpen(true);}} disabled={loading} className="px-4 py-2 bg-white text-blue-700 rounded-xl font-semibold text-sm hover:bg-blue-50 transition-colors disabled:opacity-60 shrink-0 flex items-center gap-2">
          {loading?<div className="w-4 h-4 border-2 border-blue-700 border-t-transparent rounded-full animate-spin"/>:<TrendingUp className="w-4 h-4"/>}학습 시작
        </button>
      </div>
      {quizOpen&&questions.length>0&&<QuizModal questions={questions} startIndex={0} topicName={mainTopicName} onClose={()=>setQuizOpen(false)}/>}
    </div>
  );
}

export default function TopicDetailPage() {
  const params = useParams();
  const subjectParam = params.subjectId as string;
  const topicParam = params.topicId as string;
  const subjectId = resolveSubjectId(subjectParam);
  const subject = useMemo(()=>subjectsData.subjects.find(s=>s.id===subjectId),[subjectId]);
  const { mainTopic } = useMemo(()=>resolveTopicToMainTopic(subjectId,topicParam),[subjectId,topicParam]);
  const isS1 = subjectId === 'S1';

  if(!subject||!mainTopic) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-slate-900">학습 항목을 찾을 수 없습니다</h1>
          <p className="text-slate-500">요청하신 과목 또는 토픽이 존재하지 않습니다.</p>
          <Link href="/learn" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <ArrowLeft className="w-4 h-4"/>학습 메인으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const totalDetailItems=mainTopic.subTopics.reduce((s,st)=>s+st.detailItems.length,0);
  const highPredItems=mainTopic.subTopics.reduce((s,st)=>s+st.detailItems.filter(d=>d.predictionScore>=4).length,0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/learn" className="hover:text-blue-600 transition-colors">학습</Link>
        <ChevronRight className="w-4 h-4"/>
        <span className="text-slate-900 font-medium">{subject.name}</span>
        <ChevronRight className="w-4 h-4"/>
        <span className="text-blue-600 font-medium">{mainTopic.name}</span>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-6 h-6 text-blue-600"/>
              <h1 className="text-2xl font-bold text-slate-900">{mainTopic.name}</h1>
            </div>
            <p className="text-slate-500 text-sm">{subject.name} · 주요항목 {mainTopic.order}</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500 mb-1">예상 비중</div>
            <div className="text-2xl font-bold text-blue-600">{mainTopic.estimatedWeight}%</div>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-6 text-sm flex-wrap">
          <div className="flex items-center gap-2"><span className="text-slate-500">세부항목</span><span className="font-bold text-slate-900">{mainTopic.subTopics.length}개</span></div>
          <div className="flex items-center gap-2"><span className="text-slate-500">세세항목</span><span className="font-bold text-slate-900">{totalDetailItems}개</span></div>
          <div className="flex items-center gap-2"><Star className="w-4 h-4 text-amber-500 fill-amber-500"/><span className="text-slate-500">고출제</span><span className="font-bold text-amber-600">{highPredItems}개</span></div>
          {isS1&&<div className="flex items-center gap-2"><FileQuestion className="w-4 h-4 text-blue-500"/><span className="text-slate-500">예상문제</span><span className="font-bold text-blue-600">이론 연계</span></div>}
        </div>
      </div>

      {isS1&&<MainTopicQuizLauncher mainTopicId={mainTopic.id} mainTopicName={mainTopic.name} isS1={isS1}/>}

      {isS1&&(
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5"/>
          <div>
            <p className="text-sm font-semibold text-amber-800 mb-1">💡 이론 연계 문제 학습법 (거꾸로 학습)</p>
            <p className="text-xs text-amber-700 leading-relaxed">
              각 세부항목을 클릭하면 <strong>관련 예상문제</strong>가 펼쳐집니다. 문제 카드 클릭 → 정답 확인 → <strong>1권 교재 페이지 연계 고도화 해설</strong>까지 확인하는 거꾸로 학습으로 합격 실력을 완성하세요!
            </p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {mainTopic.subTopics.map((subTopic)=>(
          <SubTopicCard key={subTopic.id} subTopic={subTopic} mainTopicId={mainTopic.id} isS1={isS1}/>
        ))}
      </div>

      <div className="flex gap-3 justify-center pt-4">
        <Link href="/learn" className="flex items-center gap-2 px-6 py-3 bg-slate-200 text-slate-900 font-semibold rounded-xl hover:bg-slate-300 transition-colors">
          <ArrowLeft className="w-4 h-4"/>학습 목록으로
        </Link>
        {isS1&&(
          <Link href="/exam/study" className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
            <TrendingUp className="w-4 h-4"/>전체 학습 모드
          </Link>
        )}
      </div>
    </div>
  );
}
