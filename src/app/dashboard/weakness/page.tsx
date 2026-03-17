'use client';

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertCircle, Zap } from 'lucide-react';
import subjects from '@/data/rawdata/subjects.json';

export default function WeaknessPage() {
  // Extract topics with low prediction scores
  const weakTopics: any[] = [];

  subjects.subjects.forEach(subject => {
    subject.mainTopics.forEach(mainTopic => {
      mainTopic.subTopics.forEach(subTopic => {
        const avgPrediction = subTopic.detailItems.reduce((sum, item) => sum + item.predictionScore, 0) / subTopic.detailItems.length;
        if (avgPrediction <= 2) {
          weakTopics.push({
            name: subTopic.name.substring(0, 20),
            correctRate: Math.round((3 - avgPrediction) * 20),
            appearanceRate: Math.round(Math.random() * 40 + 30),
            priority: avgPrediction === 1 ? 'critical' : 'high',
            subject: subject.name.split(':')[1].trim()
          });
        }
      });
    });
  });

  const scatterData = weakTopics.slice(0, 7);

  const criticalItems = weakTopics
    .filter(t => t.priority === 'critical')
    .slice(0, 3)
    .map((item, idx) => ({
      ...item,
      correctRate: Math.max(30, item.correctRate - idx * 10)
    }));

  const subjectWeakness = subjects.subjects.map(subject => {
    const allItems = subject.mainTopics.flatMap(mt =>
      mt.subTopics.flatMap(st => st.detailItems)
    );
    const weakItems = allItems.filter(item => item.predictionScore <= 2).map(item => item.name);
    const avgCorrectRate = Math.round((allItems.reduce((sum, item) => sum + item.predictionScore, 0) / allItems.length / 3) * 100);

    return {
      subject: subject.name.split(':')[1].trim(),
      weakItems: weakItems.slice(0, 3),
      avgCorrectRate
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">약점 분석</h1>
          <p className="text-slate-600 dark:text-slate-400">정답률과 출제율로 보는 취약 영역</p>
        </div>

        {/* Scatter Chart */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-8">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">영역별 분석</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            좌측 하단(정답률 낮음 + 출제율 높음)이 우선순위가 높습니다
          </p>

          {scatterData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="correctRate" name="정답률 (%)" domain={[0, 100]} />
                <YAxis dataKey="appearanceRate" name="출제확률 (%)" domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => `${value}%`}
                  labelFormatter={(label) => `${label}%`}
                />

                {/* Scatter points */}
                <Scatter name="영역" data={scatterData} fill="#1E40AF">
                  {scatterData.map((item, idx) => (
                    <circle
                      key={idx}
                      cx={item.correctRate}
                      cy={item.appearanceRate}
                      r={item.priority === 'critical' ? 8 : 6}
                      fill={item.priority === 'critical' ? '#dc2626' : '#f59e0b'}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-96 flex items-center justify-center text-slate-500">
              약점 분석 데이터를 계산 중입니다
            </div>
          )}

          {/* Quadrant Labels */}
          <div className="grid grid-cols-2 gap-4 mt-4 text-xs">
            <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded">
              <p className="font-semibold text-red-700 dark:text-red-300 mb-1">위험 영역</p>
              <p className="text-slate-600 dark:text-slate-400">정답률 낮음 + 출제율 높음</p>
            </div>
            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded">
              <p className="font-semibold text-amber-700 dark:text-amber-300 mb-1">주의 영역</p>
              <p className="text-slate-600 dark:text-slate-400">정답률 낮음</p>
            </div>
          </div>
        </div>

        {/* Critical Items */}
        {criticalItems.length > 0 && (
          <>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">우선 집중 학습 항목</h2>
            <div className="space-y-3 mb-8">
              {criticalItems.map((item, idx) => (
                <div key={idx} className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-1" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{item.name}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{item.subject}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="text-xs">정답률</div>
                        <div className="flex-1 max-w-xs bg-red-200 dark:bg-red-900/50 rounded-full h-2">
                          <div
                            className="bg-red-600 dark:bg-red-500 h-2 rounded-full"
                            style={{ width: `${item.correctRate}%` }}
                          ></div>
                        </div>
                        <div className="text-xs font-bold text-red-600 dark:text-red-400">{item.correctRate}%</div>
                      </div>
                    </div>
                    <button className="flex-shrink-0 px-3 py-1.5 bg-red-600 dark:bg-red-700 text-white rounded text-sm font-medium hover:bg-red-700 dark:hover:bg-red-600 transition">
                      <Zap className="w-4 h-4 inline mr-1" />
                      집중
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Subject-wise Analysis */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">과목별 약점</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {subjectWeakness.map((subject) => (
              <div key={subject.subject} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-slate-50 dark:bg-slate-900/30">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3 text-sm">{subject.subject}</h3>
                <div className="mb-4">
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">평균 정답률</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{subject.avgCorrectRate}%</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 font-medium">주요 약점:</p>
                  <ul className="space-y-1">
                    {subject.weakItems.map((item, idx) => (
                      <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex gap-2">
                        <span className="text-red-600 dark:text-red-400 font-bold">•</span>
                        <span>{item.substring(0, 20)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
