import Link from 'next/link';
import { BookOpen, Target, CheckCircle, ArrowRight } from 'lucide-react';
import subjectsData from '@/data/rawdata/subjects.json';

interface TopicInfo {
  id: string;
  name: string;
  scenarios: number;
  subTopics: number;
  avgPrediction: number;
}

function getS4Topics(): TopicInfo[] {
  const s4Subject = subjectsData.subjects.find((s) => s.id === 'S4');
  if (!s4Subject) return [];

  return s4Subject.mainTopics.map((mainTopic) => {
    const scenarioCount = mainTopic.subTopics.reduce(
      (sum, st) => sum + st.detailItems.length,
      0
    );
    // 평균 출제예측 점수
    const allItems = mainTopic.subTopics.flatMap((st) => st.detailItems);
    const avgPrediction =
      allItems.length > 0
        ? allItems.reduce((s, d) => s + d.predictionScore, 0) / allItems.length
        : 0;

    return {
      id: mainTopic.id,
      name: mainTopic.name,
      scenarios: scenarioCount,
      subTopics: mainTopic.subTopics.length,
      avgPrediction,
    };
  });
}

const TOPICS = getS4Topics();

// 출제 예측 점수 → 색상
function predictionColor(score: number): string {
  if (score >= 4) return 'text-red-600 bg-red-50 border-red-200';
  if (score >= 3) return 'text-orange-600 bg-orange-50 border-orange-200';
  return 'text-blue-600 bg-blue-50 border-blue-200';
}

function predictionLabel(score: number): string {
  if (score >= 4) return '출제 확률 높음';
  if (score >= 3) return '출제 가능성 보통';
  return '출제 가능성 낮음';
}

export default function PracticalHub() {
  const totalScenarios = TOPICS.reduce((t, tp) => t + tp.scenarios, 0);
  const highPriorityCount = TOPICS.filter((t) => t.avgPrediction >= 4).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded-full">
              실기 S4
            </span>
            <span className="text-gray-400 text-sm">필답형 · 2시간 30분</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            공공조달 관리실무 — 실기 코칭
          </h1>
          <p className="text-gray-600">
            STAR-L 프레임워크 기반 실무 사례 학습 · 출제기준 8개 주요항목
          </p>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs text-gray-500 mb-1">총 세세항목</p>
            <p className="text-2xl font-bold text-gray-900">{totalScenarios}개</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs text-gray-500 mb-1">주요항목</p>
            <p className="text-2xl font-bold text-gray-900">{TOPICS.length}개</p>
          </div>
          <div className="bg-white rounded-xl border border-red-200 p-5 bg-red-50">
            <p className="text-xs text-red-600 mb-1">⚠ 고출제 영역</p>
            <p className="text-2xl font-bold text-red-700">{highPriorityCount}개</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs text-gray-500 mb-1">시험 유형</p>
            <p className="text-lg font-bold text-gray-900">필답형</p>
          </div>
        </div>

        {/* 주요 학습 주제 */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">주요항목별 학습</h2>
          <span className="text-xs text-gray-400">
            ★ 출제 예측 점수 (1–5점)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {TOPICS.map((topic, idx) => (
            <Link
              key={topic.id}
              href={`/practical/scenarios/${topic.id}`}
              className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-red-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <h3 className="font-semibold text-gray-900 leading-snug">
                    {topic.name}
                  </h3>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-red-500 transition-colors flex-shrink-0 mt-1" />
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                <span>{topic.subTopics}개 세부항목</span>
                <span>·</span>
                <span>{topic.scenarios}개 세세항목</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-sm ${
                        i < Math.round(topic.avgPrediction)
                          ? 'text-red-500'
                          : 'text-gray-200'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full border font-medium ${predictionColor(
                    topic.avgPrediction
                  )}`}
                >
                  {predictionLabel(topic.avgPrediction)}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* 학습 자료 & STAR-L */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Link
            href="/practical/templates"
            className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-red-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-red-700" />
              </div>
              <h3 className="font-semibold text-gray-900">STAR-L 학습 자료</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Situation · Task · Action · Result · Legal 프레임워크와 모범 답안 사례
            </p>
            <span className="text-sm text-red-700 font-medium group-hover:underline">
              자세히 보기 →
            </span>
          </Link>

          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                <Target className="w-5 h-5 text-orange-700" />
              </div>
              <h3 className="font-semibold text-gray-900">실기 시험 안내</h3>
            </div>
            <ul className="space-y-1.5 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                시험일: 2026년 11월 14일
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                검정방법: 필답형 (서술형)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                시험시간: 2시간 30분
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                출제범위: 8개 주요항목 전체
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
