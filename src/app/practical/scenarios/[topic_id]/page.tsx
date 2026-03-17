'use client';

import { ScenarioCard } from '@/components/practical/ScenarioCard';
import { SAMPLE_SCENARIOS } from '@/lib/mockData';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

const TOPICS_MAP: Record<string, string> = {
  '1': '계약 방법 선택',
  '2': '계약금 및 기성금 관리',
  '3': '재정 및 예산 관리'
};

export default function ScenariosPage() {
  const params = useParams();
  const router = useRouter();
  const topicId = String(params.topic_id);
  const topicName = TOPICS_MAP[topicId] || '주제';

  const scenarios = SAMPLE_SCENARIOS.filter(s => s.topicId === topicId);
  const [selectedScenario, setSelectedScenario] = useState<typeof SAMPLE_SCENARIOS[0] | null>(null);

  const handleScenarioClick = (scenario: typeof SAMPLE_SCENARIOS[0]) => {
    router.push(`/practical/scenarios/${topicId}/practice?scenarioId=${scenario.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="text-blue-800 font-medium hover:underline mb-4 inline-block"
          >
            ← 돌아가기
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{topicName}</h1>
          <p className="text-gray-600">실무 시나리오를 통해 STAR-L을 연습하세요</p>
        </div>

        {/* Scenario Cards */}
        <div className="grid grid-cols-1 gap-4">
          {scenarios.map((scenario) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              onClick={() => handleScenarioClick(scenario)}
            />
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-12 bg-blue-50 rounded-xl border border-blue-200 p-6">
          <h3 className="font-bold text-gray-900 mb-3">💡 학습 팁</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• 시나리오를 먼저 꼼꼼하게 읽으세요</li>
            <li>• STAR-L 프레임워크에 따라 구조적으로 답변하세요</li>
            <li>• 법적 근거를 명확하게 인용하세요</li>
            <li>• AI 피드백을 통해 개선사항을 파악하세요</li>
            <li>• 같은 주제를 여러 번 연습하면 실력이 향상됩니다</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
