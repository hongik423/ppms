'use client';

import { ExamResult } from '@/components/exam/ExamResult';
import { SubjectAnalysis } from '@/components/exam/SubjectAnalysis';
import { ScoreTrend } from '@/components/exam/ScoreTrend';
import { generateExamHistory } from '@/lib/mockData';
import { SubjectScore } from '@/types';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function ResultPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const resultId = searchParams.get('resultId');

  // Mock result data
  const totalScore = 72;
  const maxScore = 100;
  const passStatus = totalScore >= 60 ? 'PASS' : 'FAIL';
  const timeSpent = 6420; // 107 minutes

  const subjectScores: SubjectScore[] = [
    {
      subjectId: 's1',
      subjectName: '공공조달',
      correct: 25,
      total: 30,
      percentage: 83,
      passed: true
    },
    {
      subjectId: 's2',
      subjectName: '계약관리',
      correct: 16,
      total: 20,
      percentage: 80,
      passed: true
    },
    {
      subjectId: 's3',
      subjectName: '재정관리',
      correct: 19,
      total: 30,
      percentage: 62,
      passed: true
    }
  ];

  const weakItems = [
    '채무부담행위의 유효기간',
    '설계공모의 당선작 개수',
    '낙찰율 관련 보정',
    '용역비 지급 회차',
    '손해배상 청구 시효'
  ];

  const examHistory = generateExamHistory();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Link */}
        <Link href="/exam" className="text-blue-800 font-medium hover:underline mb-6 inline-block">
          ← 모의고사로 돌아가기
        </Link>

        {/* Result */}
        <div className="mb-8">
          <ExamResult
            totalScore={totalScore}
            maxScore={maxScore}
            passStatus={passStatus}
            timeSpent={timeSpent}
          />
        </div>

        {/* Subject Analysis */}
        <div className="mb-8">
          <SubjectAnalysis scores={subjectScores} />
        </div>

        {/* Weak Items */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">오답 분석 TOP 5</h2>
          <div className="space-y-3">
            {weakItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 bg-red-50 border border-red-200 rounded-lg"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-red-200 rounded-full flex items-center justify-center">
                  <span className="text-red-700 font-bold text-sm">{idx + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item}</p>
                </div>
                <button className="text-sm text-red-700 font-medium hover:underline">
                  복습
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Score Trend */}
        <div className="mb-8">
          <ScoreTrend examHistory={examHistory} />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <button className="px-6 py-3 bg-white text-blue-800 font-medium rounded-lg border border-blue-800 hover:bg-blue-50 transition-colors">
            오답 복습하기
          </button>
          <button className="px-6 py-3 bg-blue-800 text-white font-medium rounded-lg hover:bg-blue-900 transition-colors">
            상세 분석 보기
          </button>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
          <h3 className="font-bold text-gray-900 mb-3">다음 단계</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">1.</span>
              오답 복습을 통해 약점을 보완하세요
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">2.</span>
              관련 개념 카드를 다시 학습하세요
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">3.</span>
              1-2주 후 재시험을 통해 진도를 확인하세요
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
