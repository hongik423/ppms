import { Scenario } from '@/types';
import { Clock } from 'lucide-react';

interface ScenarioCardProps {
  scenario: Scenario;
  completed?: boolean;
  onClick?: () => void;
}

export function ScenarioCard({ scenario, completed = false, onClick }: ScenarioCardProps) {
  const difficultyColor = {
    easy: 'bg-green-100 text-green-700',
    normal: 'bg-blue-100 text-blue-700',
    hard: 'bg-red-100 text-red-700'
  };

  const difficultyLabel = {
    easy: '쉬움',
    normal: '보통',
    hard: '어려움'
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded mb-2">
            {scenario.topic}
          </span>
          <h3 className="font-semibold text-gray-900 text-base">{scenario.title}</h3>
        </div>
        {completed && (
          <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
            완료
          </span>
        )}
      </div>

      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{scenario.content.substring(0, 100)}...</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-xs text-gray-600">{scenario.timeGuide}분</span>
        </div>
        <span className={`text-xs font-semibold px-2 py-1 rounded ${difficultyColor[scenario.difficulty]}`}>
          {difficultyLabel[scenario.difficulty]}
        </span>
      </div>
    </div>
  );
}
