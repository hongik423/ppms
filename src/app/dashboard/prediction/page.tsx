import { TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';

export default function PredictionPage() {
  const predictedScore = 74;
  const passProbability = 82;

  const subjectPredictions = [
    { subject: '공공조달', score: 25, probability: 85, maxScore: 30 },
    { subject: '계약관리', score: 16, probability: 78, maxScore: 20 },
    { subject: '재정관리', score: 33, probability: 82, maxScore: 50 }
  ];

  const recommendations = [
    '낙찰율과 수의계약 영역에 주력하면 공공조달 점수를 +3~5점 향상시킬 수 있습니다',
    '기성금 청구 절차를 완벽히 숙달하면 계약관리를 안정적으로 확보할 수 있습니다',
    '약점 영역(5개 항목)을 집중 학습하면 합격 확률을 92%까지 높일 수 있습니다'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">합격 예측</h1>
          <p className="text-gray-600">현재 학습 수준을 기반으로 한 합격 예측</p>
        </div>

        {/* Main Prediction */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 p-8 mb-8">
          <div className="text-center mb-8">
            <p className="text-gray-600 text-lg mb-2">예상 점수</p>
            <div className="flex items-baseline justify-center gap-2 mb-6">
              <span className="text-6xl font-bold text-blue-800">{predictedScore}</span>
              <span className="text-2xl text-gray-600">/100</span>
            </div>

            {/* Score Gauge */}
            <div className="max-w-xs mx-auto mb-8">
              <div className="w-full bg-gray-300 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-blue-600 to-blue-800 h-4 rounded-full transition-all"
                  style={{ width: `${predictedScore}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="text-center p-4 bg-white rounded-lg">
              <p className="text-gray-600 text-sm mb-1">합격 확률</p>
              <p className="text-4xl font-bold text-green-600">{passProbability}%</p>
              <p className="text-xs text-gray-500 mt-2">매우 높음</p>
            </div>

            <div className="text-center p-4 bg-white rounded-lg">
              <p className="text-gray-600 text-sm mb-1">합격선까지</p>
              <p className="text-4xl font-bold text-blue-600">{predictedScore - 60}</p>
              <p className="text-xs text-gray-500 mt-2">점수 초과</p>
            </div>
          </div>
        </div>

        {/* Subject Predictions */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">과목별 예측</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {subjectPredictions.map((subject) => (
            <div key={subject.subject} className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">{subject.subject}</h3>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">예상 점수</span>
                  <span className="font-bold text-gray-900">{subject.score}/{subject.maxScore}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(subject.score / subject.maxScore) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-700">
                  합격 확률: <span className="font-bold">{subject.probability}%</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-800" />
            합격까지 필요한 학습
          </h2>

          <div className="space-y-4">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="flex gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm">
                    {idx + 1}
                  </div>
                </div>
                <p className="text-gray-700 text-sm">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              강점 영역
            </h3>
            <ul className="space-y-2 text-sm text-green-800">
              <li>✓ 공공조달 기본 개념 이해도 높음</li>
              <li>✓ 계약 절차에 대한 습득 우수</li>
              <li>✓ 최근 모의고사 성적 상승세</li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <h3 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              개선 필요 영역
            </h3>
            <ul className="space-y-2 text-sm text-amber-800">
              <li>⚠️ 특정 법령 조항 정확성</li>
              <li>⚠️ 예산 관련 계산 문제</li>
              <li>⚠️ 사례 문제 문제해결 능력</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
