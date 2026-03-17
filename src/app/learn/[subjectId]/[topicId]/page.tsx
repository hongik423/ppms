'use client';

import React, { useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, ArrowLeft, CheckCircle, Circle, Star, ChevronRight } from 'lucide-react';
import subjectsData from '@/data/rawdata/subjects.json';

// 사이드바의 subject1→S1, subject2→S2, subject3→S3, subject4→S4 매핑
function resolveSubjectId(param: string): string {
  const map: Record<string, string> = {
    subject1: 'S1',
    subject2: 'S2',
    subject3: 'S3',
    subject4: 'S4',
    practical: 'S4',
  };
  return map[param] || param;
}

// 사이드바의 t1~t9 → 실제 MainTopic 매핑
function resolveTopicToMainTopic(
  subjectId: string,
  topicParam: string
): { mainTopic: (typeof subjectsData.subjects)[0]['mainTopics'][0] | null; topicIndex: number } {
  const subject = subjectsData.subjects.find((s) => s.id === subjectId);
  if (!subject) return { mainTopic: null, topicIndex: -1 };

  // topicParam이 't1', 't2' 등이면 인덱스로 매핑
  const match = topicParam.match(/^t(\d+)$/);
  if (match) {
    // 전체 과목 통합 인덱스에서 해당 과목의 범위 계산
    const globalIndex = parseInt(match[1], 10);
    // subject1: t1-t3, subject2: t4-t6, subject3: t7-t9, subject4: t10-t17
    let localIndex: number;
    if (subjectId === 'S1') localIndex = globalIndex - 1;
    else if (subjectId === 'S2') localIndex = globalIndex - 4;
    else if (subjectId === 'S3') localIndex = globalIndex - 7;
    else if (subjectId === 'S4') localIndex = globalIndex - 10;
    else localIndex = globalIndex - 1;

    if (localIndex >= 0 && localIndex < subject.mainTopics.length) {
      return { mainTopic: subject.mainTopics[localIndex], topicIndex: localIndex };
    }
  }

  // 직접 MainTopic ID로 매칭 시도 (예: S1-MT1)
  const direct = subject.mainTopics.find((mt) => mt.id === topicParam);
  if (direct) {
    return { mainTopic: direct, topicIndex: subject.mainTopics.indexOf(direct) };
  }

  // 첫 번째 토픽 fallback
  return { mainTopic: subject.mainTopics[0] || null, topicIndex: 0 };
}

// 출제예측점수 별 표시
function PredictionStars({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i <= score ? 'text-amber-500 fill-amber-500' : 'text-slate-300 dark:text-slate-600'}`}
        />
      ))}
    </div>
  );
}

export default function TopicDetailPage() {
  const params = useParams();
  const subjectParam = params.subjectId as string;
  const topicParam = params.topicId as string;

  const subjectId = resolveSubjectId(subjectParam);
  const subject = useMemo(
    () => subjectsData.subjects.find((s) => s.id === subjectId),
    [subjectId]
  );
  const { mainTopic } = useMemo(
    () => resolveTopicToMainTopic(subjectId, topicParam),
    [subjectId, topicParam]
  );

  if (!subject || !mainTopic) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            학습 항목을 찾을 수 없습니다
          </h1>
          <p className="text-slate-500">요청하신 과목 또는 토픽이 존재하지 않습니다.</p>
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            학습 메인으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const totalItems = mainTopic.subTopics.reduce(
    (sum, st) => sum + st.detailItems.length,
    0
  );
  const highPredictionItems = mainTopic.subTopics.reduce(
    (sum, st) => sum + st.detailItems.filter((di) => di.predictionScore >= 4).length,
    0
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* 상단 네비게이션 */}
      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        <Link href="/learn" className="hover:text-blue-600 transition-colors">
          학습
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-slate-900 dark:text-white font-medium">{subject.name}</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-blue-600 font-medium">{mainTopic.name}</span>
      </div>

      {/* 주요항목 헤더 */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                {mainTopic.name}
              </h1>
            </div>
            <p className="text-slate-500 dark:text-slate-400">
              {subject.name} · 주요항목 {mainTopic.order}
            </p>
          </div>
          <div className="text-right space-y-1">
            <div className="text-sm text-slate-500">예상 비중</div>
            <div className="text-2xl font-bold text-blue-600">
              {mainTopic.estimatedWeight}%
            </div>
          </div>
        </div>

        {/* 통계 */}
        <div className="mt-4 flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-slate-500">세부항목</span>
            <span className="font-bold text-slate-900 dark:text-white">
              {mainTopic.subTopics.length}개
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500">세세항목</span>
            <span className="font-bold text-slate-900 dark:text-white">{totalItems}개</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="text-slate-500">고출제확률</span>
            <span className="font-bold text-amber-600">{highPredictionItems}개</span>
          </div>
        </div>
      </div>

      {/* 세부항목별 학습 목록 */}
      <div className="space-y-4">
        {mainTopic.subTopics.map((subTopic) => (
          <div
            key={subTopic.id}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
          >
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-600">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-slate-900 dark:text-white">
                  {subTopic.name}
                </h2>
                <span className="text-xs text-slate-500 bg-slate-200 dark:bg-slate-600 px-2 py-1 rounded-full">
                  {subTopic.detailItems.length}개 항목
                </span>
              </div>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-700">
              {subTopic.detailItems.map((item) => (
                <div
                  key={item.id}
                  className="px-6 py-3 flex items-center gap-4 hover:bg-blue-50 dark:hover:bg-slate-700/30 transition-colors"
                >
                  <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-900 dark:text-white leading-relaxed">
                      {item.name}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.id}</p>
                  </div>
                  <PredictionStars score={item.predictionScore} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 학습 시작 버튼 */}
      <div className="flex gap-3 justify-center pt-4">
        <Link
          href="/learn/cards/today"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
        >
          개념카드 학습 시작
        </Link>
        <Link
          href="/practice"
          className="px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-semibold rounded-xl hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
        >
          문제풀이 시작
        </Link>
      </div>
    </div>
  );
}
