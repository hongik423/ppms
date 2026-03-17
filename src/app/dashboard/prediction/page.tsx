import { TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';
import subjects from '@/data/rawdata/subjects.json';

export default function PredictionPage() {
  // Calculate prediction from subjects data
  const subjectPredictions = subjects.subjects.map(subject => {
    const totalItems = subject.mainTopics.reduce((sum, mt) =>
      sum + mt.subTopics.reduce((st_sum, st) => st_sum + st.detailItems.length, 0), 0
    );

    const avgPredictionScore = subject.mainTopics.reduce((sum, mt) =>
      sum + mt.subTopics.reduce((st_sum, st) =>
        st_sum + st.detailItems.reduce((d_sum, d) => d_sum + d.predictionScore, 0) / st.detailItems.length, 0)
      / mt.subTopics.length, 0
    ) / subject.mainTopics.length;

    const predictedScore = Math.round((avgPredictionScore / 3) * subject.questionCount);
    const probability = Math.min(95, 60 + (predictedScore / subject.questionCount) * 40);

    return {
      subjectId: subject.id,
      subject: subject.name.split(':')[1].trim(),
      score: predictedScore,
      probability: Math.round(probability),
      maxScore: subject.questionCount
    };
  });

  const totalPredictedScore = subjectPredictions.reduce((sum, s) => sum + s.score, 0);
  const totalMaxScore = subjectPredictions.reduce((sum, s) => sum + s.maxScore, 0);
  const avgProbability = Math.round(subjectPredictions.reduce((sum, s) => sum + s.probability, 0) / subjectPredictions.length);

  const recommendations = [
    '약점 항목(1과목의 수의계약, 3과목의 기성금 청구)을 집중 학습하면 5~8점 향상 가능',
    '법령 관련 조항의 정확한 숙지로 계산 오류 감소',
    '모의고사 반복 풀이로 합격 확률을 92% 이상으로 높일 수 있습니다'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">합격 예측</h1>
          <p className="text-slate-600 dark:text-slate-400">현재 학습 수준을 기반으로 한 합격 예측</p>
        </div>

        {/* Main Prediction */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-800 p-8 mb-8">
          <div className="text-center mb-8">
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-2">예상 점수</p>
            <div className="flex items-baseline justify-center gap-2 mb-6">
              <span className="text-6xl font-bold text-blue-800 dark:text-blue-300">{totalPredictedScore}</span>
              <span className="text-2xl text-slate-600 dark:text-slate-400">/{totalMaxScore}</span>
            </div>

            {/* Score Gauge */}
            <div className="max-w-xs mx-auto mb-8">
              <div className="w-full bg-gray-300 dark:bg-slate-700 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-blue-600 to-blue-800 h-4 rounded-full transition-all"
                  style={{ width: `${(totalPredictedScore / totalMaxScore) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg">
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">합격 확률</p>
              <p className="text-4xl font-bold text-green-600 dark:text-green-400">{avgProbability}%</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                {avgProbability >= 80 ? '매우 높음' : avgProbability >= 60 ? '높음' : '중간'}
              </p>
            </div>

            <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg">
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">합격선까지</p>
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{Math.max(0, totalPredictedScore - 60)}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">점수 초과</p>
            </div>
          </div>
        </div>

        {/* Subject Predictions */}
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">과목별 예측</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {subjectPredictions.map((subject) => (
            <div key={subject.subjectId} className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4 text-sm">{subject.subject}</h3>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-slate-600 dark:text-slate-400">예상 점수</span>
                  <span className="font-bold text-slate-900 dark:text-white">{subject.score}/{subject.maxScore}</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(subject.score / subject.maxScore) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-xs text-slate-700 dark:text-slate-300">
                  합격 확률: <span className="font-bold">{subject.probability}%</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-800 dark:text-blue-400" />
            합격까지 필요한 학습
          </h2>

          <div className="space-y-4">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="flex gap-4 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-700 text-white font-bold text-sm">
                    {idx + 1}
                  </div>
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-sm">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-6">
            <h3 className="font-semibold text-green-900 dark:text-green-300 mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              강점 영역
            </h3>
            <ul className="space-y-2 text-sm text-green-800 dark:text-green-400">
              <li>✓ 공공조달 기본 개념 이해도 높음</li>
              <li>✓ 계약 절차에 대한 습득 우수</li>
              <li>✓ 전자조달시스템 운영 원리 이해</li>
            </ul>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
            <h3 className="font-semibold text-amber-900 dark:text-amber-300 mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              개선 필요 영역
            </h3>
            <ul className="space-y-2 text-sm text-amber-800 dark:text-amber-400">
              <li>⚠️ 수의계약 허용 사유의 정확한 이해</li>
              <li>⚠️ 기성금 청구 절차의 세부 규정</li>
              <li>⚠️ 리스크 관리 절차의 실무 적용</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
