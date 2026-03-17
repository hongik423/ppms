import { PracticalFeedback } from '@/types';
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

interface AiFeedbackProps {
  feedback: PracticalFeedback;
}

const GRADE_COLORS = {
  A: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
  B: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
  C: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' },
  D: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' }
};

export function AiFeedback({ feedback }: AiFeedbackProps) {
  const gradeColor = GRADE_COLORS[feedback.grade];

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header with Score */}
      <div className={`${gradeColor.bg} border-b ${gradeColor.border} px-6 py-6`}>
        <div className="flex items-end justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">AI 채점 결과</p>
            <div className="flex items-baseline gap-2">
              <span className={`text-4xl font-bold ${gradeColor.text}`}>{feedback.score}</span>
              <span className="text-gray-500">/100점</span>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-lg font-bold text-xl ${gradeColor.bg} ${gradeColor.text}`}>
            등급: {feedback.grade}
          </div>
        </div>
      </div>

      {/* Sub-scores */}
      <div className="px-6 py-4 border-b border-gray-200">
        <p className="text-sm font-semibold text-gray-900 mb-4">평가 항목</p>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-700">구조 및 논리성</span>
              <span className="text-sm font-semibold text-gray-900">{feedback.structureScore}점</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${feedback.structureScore}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">배점: 20%</p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-700">법적 근거</span>
              <span className="text-sm font-semibold text-gray-900">{feedback.legalScore}점</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{ width: `${feedback.legalScore}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">배점: 30%</p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-700">논리성</span>
              <span className="text-sm font-semibold text-gray-900">{feedback.logicScore}점</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-amber-600 h-2 rounded-full"
                style={{ width: `${feedback.logicScore}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">배점: 25%</p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-700">핵심 키워드</span>
              <span className="text-sm font-semibold text-gray-900">{feedback.keywordScore}점</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${feedback.keywordScore}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">배점: 25%</p>
          </div>
        </div>
      </div>

      {/* Feedback Sections */}
      <div className="px-6 py-4">
        {/* Strengths */}
        {feedback.strengths.length > 0 && (
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-900">잘한 점</h3>
            </div>
            <ul className="space-y-2">
              {feedback.strengths.map((item, idx) => (
                <li key={idx} className="text-sm text-gray-700 flex gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Improvements */}
        {feedback.improvements.length > 0 && (
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h3 className="font-semibold text-gray-900">보완점</h3>
            </div>
            <ul className="space-y-2">
              {feedback.improvements.map((item, idx) => (
                <li key={idx} className="text-sm text-gray-700 flex gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Missing Points */}
        {feedback.missingPoints.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <h3 className="font-semibold text-gray-900">누락사항</h3>
            </div>
            <ul className="space-y-2">
              {feedback.missingPoints.map((item, idx) => (
                <li key={idx} className="text-sm text-gray-700 flex gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
