'use client';

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertCircle, Zap } from 'lucide-react';

export default function WeaknessPage() {
  const scatterData = [
    { name: '수의계약', correctRate: 45, appearanceRate: 35, priority: 'critical' },
    { name: '낙찰율', correctRate: 50, appearanceRate: 40, priority: 'critical' },
    { name: '기성금 검사', correctRate: 55, appearanceRate: 45, priority: 'high' },
    { name: '채무부담행위', correctRate: 60, appearanceRate: 35, priority: 'high' },
    { name: '하자보수', correctRate: 65, appearanceRate: 30, priority: 'medium' },
    { name: '계약 해제', correctRate: 70, appearanceRate: 25, priority: 'medium' },
    { name: '예산 보정', correctRate: 75, appearanceRate: 20, priority: 'low' }
  ];

  const criticalItems = [
    { name: '수의계약 선택 기준', correctRate: 45, subject: '공공조달' },
    { name: '낙찰율 관련 개념', correctRate: 50, subject: '공공조달' },
    { name: '기성금 청구 절차', correctRate: 55, subject: '계약관리' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">약점 분석</h1>
          <p className="text-gray-600">정답률과 출제율로 보는 취약 영역</p>
        </div>

        {/* Scatter Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">영역별 분석</h2>
          <p className="text-sm text-gray-600 mb-4">
            좌측 하단(정답률 낮음 + 출제율 높음)이 우선순위가 높습니다
          </p>

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

              {/* Quadrant lines */}
              <line x1={50} y1={0} x2={50} y2={400} stroke="#ccc" strokeDasharray="5 5" />
              <line x1={0} y1={37.5} x2={600} y2={37.5} stroke="#ccc" strokeDasharray="5 5" />

              {/* Scatter points */}
              <Scatter name="영역" data={scatterData} fill="#1E40AF">
                {scatterData.map((item, idx) => (
                  <circle
                    key={idx}
                    cx={item.correctRate}
                    cy={item.appearanceRate}
                    r={
                      item.priority === 'critical'
                        ? 8
                        : item.priority === 'high'
                        ? 6
                        : 4
                    }
                    fill={
                      item.priority === 'critical'
                        ? '#dc2626'
                        : item.priority === 'high'
                        ? '#f59e0b'
                        : '#3b82f6'
                    }
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>

          {/* Quadrant Labels */}
          <div className="grid grid-cols-2 gap-4 mt-4 text-xs">
            <div className="p-3 bg-red-50 border border-red-200 rounded">
              <p className="font-semibold text-red-700 mb-1">🔴 위험 영역</p>
              <p className="text-gray-600">정답률 낮음 + 출제율 높음</p>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded">
              <p className="font-semibold text-amber-700 mb-1">⚠️ 주의 영역</p>
              <p className="text-gray-600">정답률 낮음</p>
            </div>
          </div>
        </div>

        {/* Critical Items */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">우선 집중 학습 항목</h2>
        <div className="space-y-3 mb-8">
          {criticalItems.map((item, idx) => (
            <div key={idx} className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-1" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{item.subject}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="text-xs">정답률</div>
                    <div className="flex-1 max-w-xs bg-red-200 rounded-full h-2">
                      <div
                        className="bg-red-600 h-2 rounded-full"
                        style={{ width: `${item.correctRate}%` }}
                      ></div>
                    </div>
                    <div className="text-xs font-bold text-red-600">{item.correctRate}%</div>
                  </div>
                </div>
                <button className="flex-shrink-0 px-3 py-1.5 bg-red-600 text-white rounded text-sm font-medium hover:bg-red-700">
                  <Zap className="w-4 h-4 inline mr-1" />
                  집중 학습
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Subject-wise Analysis */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">과목별 약점</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                subject: '공공조달',
                weakItems: ['수의계약', '낙찰율', '예정가격'],
                avgCorrectRate: 58
              },
              {
                subject: '계약관리',
                weakItems: ['기성금 검사', '하자보수', '손해배상'],
                avgCorrectRate: 62
              },
              {
                subject: '재정관리',
                weakItems: ['채무부담행위', '예산 보정', '용역비'],
                avgCorrectRate: 65
              }
            ].map((subject) => (
              <div key={subject.subject} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">{subject.subject}</h3>
                <div className="mb-4">
                  <p className="text-xs text-gray-600 mb-1">평균 정답률</p>
                  <p className="text-2xl font-bold text-gray-900">{subject.avgCorrectRate}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-2 font-medium">주요 약점:</p>
                  <ul className="space-y-1">
                    {subject.weakItems.map((item, idx) => (
                      <li key={idx} className="text-xs text-gray-700 flex gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        {item}
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
