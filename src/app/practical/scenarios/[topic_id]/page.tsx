'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import subjectsData from '@/data/rawdata/subjects.json';
import textbookData from '@/data/rawdata/textbook-content.json';
import { ArrowLeft, BookOpen, CheckCircle, Clock } from 'lucide-react';

// S4 실기 과목 데이터
const s4Subject = subjectsData.subjects.find(s => s.id === 'S4');
const s4MainTopics = s4Subject?.mainTopics || [];

// TB4 교재 데이터
const tb4 = textbookData.textbooks.find(t => t.id === 'TB4');

// mainTopicId로 토픽 데이터 찾기
function getTopicData(topicId: string) {
  const mainTopic = s4MainTopics.find(mt => mt.id === topicId);
  if (!mainTopic) return null;

  const chapter = tb4?.chapters.find(ch => ch.mainTopicId === topicId);
  return { mainTopic, chapter };
}

export default function ScenariosPage() {
  const params = useParams();
  const router = useRouter();
  const topicId = String(params.topic_id);
  const [expandedST, setExpandedST] = useState<string | null>(null);

  const data = getTopicData(topicId);

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">주제를 찾을 수 없습니다</h2>
          <button
            onClick={() => router.push('/practical')}
            className="text-blue-800 font-medium hover:underline"
          >
            실무 코칭으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const { mainTopic, chapter } = data;
  const totalItems = mainTopic.subTopics.reduce(
    (sum, st) => sum + st.detailItems.length, 0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/practical')}
            className="flex items-center gap-2 text-blue-800 font-medium hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            실무 코칭으로 돌아가기
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{mainTopic.name}</h1>
          <p className="text-gray-600">
            {mainTopic.subTopics.length}개 세부항목 · {totalItems}개 세세항목
          </p>
        </div>

        {/* 교재 핵심 개념 */}
        {chapter && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-blue-800" />
              <h2 className="text-lg font-bold text-gray-900">핵심 개념 (교재 {tb4?.title})</h2>
            </div>
            <ul className="space-y-2">
              {chapter.keyConcepts.map((concept, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-gray-700">
                  <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                  <span>{concept}</span>
                </li>
              ))}
            </ul>
            {chapter.keyLaws.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase mb-2">관련 법령</p>
                <div className="flex flex-wrap gap-2">
                  {chapter.keyLaws.map((law, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                      {law}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 세부항목 및 세세항목 */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">학습 항목</h2>
        <div className="space-y-4 mb-8">
          {mainTopic.subTopics.map((subTopic) => (
            <div key={subTopic.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <button
                onClick={() => setExpandedST(expandedST === subTopic.id ? null : subTopic.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">{subTopic.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{subTopic.detailItems.length}개 세세항목</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < Math.round(subTopic.detailItems.reduce((sum, d) => sum + d.predictionScore, 0) / subTopic.detailItems.length)
                            ? 'bg-red-500'
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${expandedST === subTopic.id ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {expandedST === subTopic.id && (
                <div className="px-6 pb-4 border-t border-gray-100">
                  <div className="space-y-2 pt-3">
                    {subTopic.detailItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 text-gray-300" />
                          <span className="text-sm text-gray-700">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className={`text-xs ${i < item.predictionScore ? 'text-red-500' : 'text-gray-300'}`}>★</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* STAR-L 프레임워크 안내 */}
        <div className="bg-orange-50 rounded-xl border border-orange-200 p-6">
          <h3 className="font-bold text-gray-900 mb-3">✍️ STAR-L 답안 작성 프레임워크</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex gap-3">
              <span className="font-bold text-orange-700 w-6">S</span>
              <span><strong>Situation</strong> - 문제에서 제시한 상황을 명확히 정리</span>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-orange-700 w-6">T</span>
              <span><strong>Task</strong> - 해결해야 할 과업/요구사항 식별</span>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-orange-700 w-6">A</span>
              <span><strong>Action</strong> - 관련 법령/제도에 근거한 구체적 조치사항 서술</span>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-orange-700 w-6">R</span>
              <span><strong>Result</strong> - 예상 결과 및 후속 절차 기술</span>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-orange-700 w-6">L</span>
              <span><strong>Legal</strong> - 관련 법적 근거 조문 명시</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
