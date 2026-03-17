'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ExamHistory } from '@/types';

interface ScoreTrendProps {
  examHistory: ExamHistory[];
}

export function ScoreTrend({ examHistory }: ScoreTrendProps) {
  if (examHistory.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center py-12">
        <p className="text-gray-500">시험 기록이 없습니다.</p>
      </div>
    );
  }

  const data = examHistory.map((exam, index) => {
    const s1 = exam.subjectScores.find(s => s.subjectName === '공공조달');
    const s2 = exam.subjectScores.find(s => s.subjectName === '계약관리');
    const s3 = exam.subjectScores.find(s => s.subjectName === '재정관리');
    return {
      exam: `${index + 1}회`,
      '총점': exam.score,
      '공공조달': s1?.percentage ?? 0,
      '계약관리': s2?.percentage ?? 0,
      '재정관리': s3?.percentage ?? 0,
      '합격선': 60,
    };
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">점수 추이</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="exam" />
          <YAxis domain={[0, 100]} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="총점" stroke="#1E40AF" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="공공조달" stroke="#3b82f6" strokeWidth={1.5} dot={false} />
          <Line type="monotone" dataKey="계약관리" stroke="#a855f7" strokeWidth={1.5} dot={false} />
          <Line type="monotone" dataKey="재정관리" stroke="#10b981" strokeWidth={1.5} dot={false} />
          <Line type="monotone" dataKey="합격선" stroke="#ef4444" strokeDasharray="5 5" dot={false} />
        </LineChart>
      </ResponsiveContainer>

      <p className="text-xs text-gray-500 mt-4 text-center">
        빨간 점선은 합격선(60점)입니다.
      </p>
    </div>
  );
}
