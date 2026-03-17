import Link from 'next/link';
import { BookOpen } from 'lucide-react';

const TOPICS = [
  { id: 1, name: '계약 방법 선택', scenarios: 3, completion: 67 },
  { id: 2, name: '계약금 및 기성금 관리', scenarios: 3, completion: 50 },
  { id: 3, name: '재정 및 예산 관리', scenarios: 2, completion: 33 },
  { id: 4, name: '입찰 및 낙찰', scenarios: 2, completion: 0 },
  { id: 5, name: '계약 이행 관리', scenarios: 2, completion: 0 },
  { id: 6, name: '분쟁 해결 및 하자 관리', scenarios: 2, completion: 0 },
  { id: 7, name: '공공조달 기록 관리', scenarios: 2, completion: 0 },
  { id: 8, name: '윤리 및 준칙 준수', scenarios: 2, completion: 0 }
];

export default function PracticalHub() {
  const totalScenarios = TOPICS.reduce((sum, t) => sum + t.scenarios, 0);
  const completedScenarios = Math.floor(totalScenarios * 0.35);
  const avgCompletion = Math.round(TOPICS.reduce((sum, t) => sum + t.completion, 0) / TOPICS.length);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">실무 코칭</h1>
          <p className="text-gray-600">STAR-L 프레임워크를 이용한 실무 기반 학습</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-1">완료한 시나리오</p>
            <p className="text-3xl font-bold text-gray-900">{completedScenarios}/{totalScenarios}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-1">학습 주제</p>
            <p className="text-3xl font-bold text-gray-900">{TOPICS.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-1">평균 완료도</p>
            <p className="text-3xl font-bold text-gray-900">{avgCompletion}%</p>
          </div>
        </div>

        {/* Learning Topics */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">주요 학습 주제</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {TOPICS.map((topic) => (
            <Link
              key={topic.id}
              href={`/practical/scenarios/${topic.id}`}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{topic.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{topic.scenarios}개 시나리오</p>
                </div>
                <div className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded">
                  {topic.completion}%
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-800 h-2 rounded-full transition-all"
                  style={{ width: `${topic.completion}%` }}
                ></div>
              </div>
            </Link>
          ))}
        </div>

        {/* Templates Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-blue-800" />
            <h2 className="text-2xl font-bold text-gray-900">학습 자료</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/practical/templates"
              className="p-6 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 mb-2">STAR-L 템플릿</h3>
              <p className="text-sm text-gray-600">실무 사례 작성의 올바른 구조를 배우세요</p>
              <span className="text-sm text-blue-800 font-medium mt-3 inline-block">자세히 보기 →</span>
            </Link>

            <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="font-semibold text-gray-900 mb-2">모범 답안 분석</h3>
              <p className="text-sm text-gray-600">각 주제별 A등급 답안 사례</p>
              <span className="text-sm text-gray-400 font-medium mt-3 inline-block">곧 제공 예정</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
