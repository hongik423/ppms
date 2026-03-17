'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

export default function NewMockExamPage() {
  const router = useRouter();
  const [isStarting, setIsStarting] = useState(false);

  const handleStartExam = async () => {
    setIsStarting(true);
    try {
      // Call API to create exam
      const response = await fetch('/api/exam/mock/create', {
        method: 'POST'
      });
      const data = await response.json();
      router.push(`/exam/mock/${data.examId}`);
    } catch (error) {
      console.error('Failed to start exam:', error);
      setIsStarting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">실전 모의고사</h1>
          <p className="text-lg text-gray-600">공공조달관리사 자격시험 모의고사</p>
        </div>

        {/* Exam Details Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">시험 안내</h2>

          <div className="space-y-6 mb-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-blue-800">📋</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">문항 구성</h3>
                <p className="text-gray-600 mt-1">총 80문항 (공공조달 30, 계약관리 20, 재정관리 30)</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-purple-800">⏱</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">시험 시간</h3>
                <p className="text-gray-600 mt-1">총 120분 (문항당 약 1분 30초)</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-green-800">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">합격 기준</h3>
                <p className="text-gray-600 mt-1">
                  총점 60점 이상 + 각 과목 40점 이상
                </p>
              </div>
            </div>
          </div>

          {/* Rules */}
          <div className="bg-blue-50 rounded-lg p-4 mb-8 border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-3">시험 규칙</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex gap-2">
                <span className="text-blue-800 font-bold">•</span>
                시험 중 페이지를 벗어날 수 없습니다
              </li>
              <li className="flex gap-2">
                <span className="text-blue-800 font-bold">•</span>
                시간 종료 시 자동으로 제출됩니다
              </li>
              <li className="flex gap-2">
                <span className="text-blue-800 font-bold">•</span>
                모든 답안은 즉시 저장됩니다
              </li>
              <li className="flex gap-2">
                <span className="text-blue-800 font-bold">•</span>
                질문 번호를 클릭하여 자유롭게 이동할 수 있습니다
              </li>
            </ul>
          </div>

          <button
            onClick={handleStartExam}
            disabled={isStarting}
            className="w-full px-6 py-4 bg-blue-800 text-white rounded-lg font-semibold hover:bg-blue-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isStarting ? '시험 준비 중...' : '시험 시작'}
            {!isStarting && <ArrowRight className="w-5 h-5" />}
          </button>
        </div>

        {/* Tips */}
        <div className="bg-amber-50 rounded-xl border border-amber-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-3">💡 시험 팁</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• 어려운 문제는 표시(flag)해두고 나중에 다시 풀어보세요</li>
            <li>• 시간이 부족할 때는 확실하지 않은 문제를 건너뛰세요</li>
            <li>• 문제를 꼼꼼히 읽고 선택지를 모두 검토하세요</li>
            <li>• 제출 전 모든 문항에 답변했는지 확인하세요</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
