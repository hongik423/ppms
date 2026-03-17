'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function StudySettingsPage() {
  const [formData, setFormData] = useState({
    examDate: '2024-05-31',
    dailyCards: '20',
    dailyQuestions: '10',
    notificationTime: '09:00'
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/settings" className="text-blue-800 font-medium hover:underline mb-4 inline-block">
            ← 설정으로 돌아가기
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">학습 설정</h1>
          <p className="text-gray-600">학습 목표 및 알림을 설정하세요</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="examDate" className="block text-sm font-medium text-gray-900 mb-2">
                시험 예정일
              </label>
              <input
                type="date"
                id="examDate"
                name="examDate"
                value={formData.examDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
              />
              <p className="text-xs text-gray-500 mt-1">학습 계획은 이 날짜를 기준으로 수립됩니다</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="dailyCards" className="block text-sm font-medium text-gray-900 mb-2">
                  일일 카드 복습 목표
                </label>
                <input
                  type="number"
                  id="dailyCards"
                  name="dailyCards"
                  value={formData.dailyCards}
                  onChange={handleChange}
                  min="5"
                  max="100"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
                <p className="text-xs text-gray-500 mt-1">개</p>
              </div>

              <div>
                <label htmlFor="dailyQuestions" className="block text-sm font-medium text-gray-900 mb-2">
                  일일 문제 풀이 목표
                </label>
                <input
                  type="number"
                  id="dailyQuestions"
                  name="dailyQuestions"
                  value={formData.dailyQuestions}
                  onChange={handleChange}
                  min="3"
                  max="50"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
                <p className="text-xs text-gray-500 mt-1">개</p>
              </div>
            </div>

            <div>
              <label htmlFor="notificationTime" className="block text-sm font-medium text-gray-900 mb-2">
                알림 시간
              </label>
              <input
                type="time"
                id="notificationTime"
                name="notificationTime"
                value={formData.notificationTime}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
              />
              <p className="text-xs text-gray-500 mt-1">매일 이 시간에 학습 알림을 받습니다</p>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-800 text-white rounded-lg font-medium hover:bg-blue-900 transition-colors"
              >
                저장
              </button>

              {saved && (
                <div className="mt-4 px-4 py-3 bg-green-100 border border-green-300 text-green-700 rounded-lg text-sm">
                  ✓ 설정이 저장되었습니다.
                </div>
              )}
            </div>
          </div>
        </form>

        {/* Study Tips */}
        <div className="mt-8 bg-blue-50 rounded-lg border border-blue-200 p-6">
          <h3 className="font-bold text-gray-900 mb-3">💡 추천 학습 시간</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• 카드 복습: 20개 = 약 15분</li>
            <li>• 문제 풀이: 10개 = 약 20분</li>
            <li>• 총 권장 시간: 하루 30-40분</li>
            <li>• 매일 꾸준한 학습이 가장 효과적입니다</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
