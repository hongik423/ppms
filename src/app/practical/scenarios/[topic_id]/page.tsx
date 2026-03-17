'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import subjectsData from '@/data/rawdata/subjects.json';
import textbookData from '@/data/rawdata/textbook-content.json';
import { ArrowLeft, BookOpen, CheckCircle, ChevronDown } from 'lucide-react';

// S4 실기 과목 데이터
const s4Subject = subjectsData.subjects.find((s) => s.id === 'S4');
const s4MainTopics = s4Subject?.mainTopics ?? [];

// TB4 교재 데이터
const tb4 = textbookData.textbooks.find((t) => t.id === 'TB4');

// 예측점수 → 별 색상
function PredictionStars({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`text-xs ${i < score ? 'text-red-500' : 'text-gray-200'}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function ScenariosPage() {
  const params = useParams();
  const router = useRouter();
  const topicId = Array.isArray(params.topic_id)
    ? params.topic_id[0]
    : String(params.topic_id ?? '');

  const [expandedST, setExpandedST] = useState<string | null>(null);

  // 토픽 데이터 조회
  const mainTopic = s4MainTopics.find((mt) => mt.id === topicId);
  const chapter = tb4?.chapters.find((ch) => ch.mainTopicId === topicId);

  // 토픽이 없으면 오류 화면
  if (!mainTopic) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">📭</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            주제를 찾을 수 없습니다
          </h2>
          <p className="text-gray-500 mb-6">
            요청하신 실기 학습 주제 ID({topicId})를 찾을 수 없습니다.
          </p>
          <button
            onClick={() => router.push('/practical')}
            className="px-6 py-3 bg-red-700 text-white rounded-lg font-semibold hover:bg-red-800 transition"
          >
            실무 코칭으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const totalItems = mainTopic.subTopics.reduce(
    (sum, st) => sum + st.detailItems.length,
    0
  );
  const avgScore =
    mainTopic.subTopics.length > 0
      ? mainTopic.subTopics.reduce((sum, st) => {
          const stAvg =
            st.detailItems.length > 0
              ? st.detailItems.reduce((s, d) => s + d.predictionScore, 0) /
                st.detailItems.length
              : 0;
          return sum + stAvg;
        }, 0) / mainTopic.subTopics.length
      : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/practical')}
            className="flex items-center gap-2 text-blue-800 font-medium hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            실무 코칭으로 돌아가기
          </button>

          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded">
                  실기 S4
                </span>
                <span className="text-sm text-gray-500">{topicId}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {mainTopic.name}
              </h1>
              <p className="text-gray-600">
                {mainTopic.subTopics.length}개 세부항목 · {totalItems}개
                세세항목
              </p>
            </div>
            <div className="text-center bg-white rounded-xl border border-gray-200 px-6 py-3">
              <p className="text-xs text-gray-500 mb-1">출제 예측</p>
              <PredictionStars score={Math.round(avgScore)} />
            </div>
          </div>
        </div>

        {/* 교재 핵심 개념 */}
        {chapter && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-blue-800" />
              <h2 className="text-lg font-bold text-gray-900">
                핵심 개념{tb4?.title ? ` (${tb4.title})` : ''}
              </h2>
            </div>
            <ul className="space-y-2 mb-4">
              {chapter.keyConcepts.map((concept, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-gray-700">
                  <span className="text-blue-600 font-bold flex-shrink-0 mt-0.5">
                    •
                  </span>
                  <span>{concept}</span>
                </li>
              ))}
            </ul>

            {chapter.keyLaws.length > 0 && (
              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase mb-2">
                  관련 법령
                </p>
                <div className="flex flex-wrap gap-2">
                  {chapter.keyLaws.map((law, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100"
                    >
                      {law}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 세부항목 / 세세항목 아코디언 */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">학습 항목</h2>
        <div className="space-y-3 mb-10">
          {mainTopic.subTopics.map((subTopic) => {
            const subAvg =
              subTopic.detailItems.length > 0
                ? subTopic.detailItems.reduce(
                    (s, d) => s + d.predictionScore,
                    0
                  ) / subTopic.detailItems.length
                : 0;
            const isExpanded = expandedST === subTopic.id;

            return (
              <div
                key={subTopic.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedST(isExpanded ? null : subTopic.id)
                  }
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                      {subTopic.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {subTopic.detailItems.length}개 세세항목
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <PredictionStars score={Math.round(subAvg)} />
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-4 border-t border-gray-100 bg-gray-50">
                    <div className="space-y-1 pt-3">
                      {subTopic.detailItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <CheckCircle className="w-4 h-4 text-gray-300 flex-shrink-0" />
                            <span className="text-sm text-gray-700 truncate">
                              {item.name}
                            </span>
                          </div>
                          <PredictionStars score={item.predictionScore} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* STAR-L 프레임워크 안내 */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4 text-lg">
            ✍️ STAR-L 답안 작성 프레임워크
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {[
              {
                key: 'S',
                label: 'Situation',
                desc: '문제 상황 객관적 서술',
                color: 'bg-blue-100 text-blue-700',
              },
              {
                key: 'T',
                label: 'Task',
                desc: '과업/요구사항 식별',
                color: 'bg-purple-100 text-purple-700',
              },
              {
                key: 'A',
                label: 'Action',
                desc: '법령 근거한 조치 서술',
                color: 'bg-amber-100 text-amber-700',
              },
              {
                key: 'R',
                label: 'Result',
                desc: '결과 및 후속 절차 기술',
                color: 'bg-green-100 text-green-700',
              },
              {
                key: 'L',
                label: 'Legal',
                desc: '관련 법적 근거 조문 명시',
                color: 'bg-red-100 text-red-700',
              },
            ].map((item) => (
              <div key={item.key} className="text-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 font-bold text-lg ${item.color}`}
                >
                  {item.key}
                </div>
                <p className="text-xs font-semibold text-gray-700 mb-1">
                  {item.label}
                </p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-orange-200">
            <button
              onClick={() => router.push('/practical/templates')}
              className="text-sm text-orange-700 font-medium hover:underline"
            >
              → STAR-L 모범 답안 자료 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
