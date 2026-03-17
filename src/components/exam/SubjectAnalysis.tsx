import { SubjectScore } from '@/types';
import { SUBJECT_INFO } from '@/lib/mockData';

interface SubjectAnalysisProps {
  scores: SubjectScore[];
}

export function SubjectAnalysis({ scores }: SubjectAnalysisProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">과목별 분석</h2>

      <div className="space-y-3">
        {scores.map((score) => {
          const subjectInfo = SUBJECT_INFO[score.subjectId] || { name: score.subjectName, color: 'text-gray-600', bgColor: 'bg-gray-100' };

          return (
            <div key={score.subjectId} className="flex items-center gap-4 pb-4 border-b last:border-b-0">
              <div className="flex-shrink-0 w-20">
                <p className={`font-semibold text-sm ${subjectInfo.color}`}>
                  {subjectInfo.name}
                </p>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">
                    {score.correct}/{score.total}문제
                  </span>
                  <span className={`text-sm font-bold ${score.percentage >= 60 ? 'text-blue-600' : 'text-red-600'}`}>
                    {score.percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      score.percentage >= 60 ? 'bg-blue-600' : 'bg-red-600'
                    }`}
                    style={{ width: `${Math.min(score.percentage, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex-shrink-0 w-20 text-right">
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${
                    score.passed
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {score.passed ? '합격' : '불합격'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
