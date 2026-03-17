'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ProfileSettingsPage() {
  const [formData, setFormData] = useState({
    nickname: '김관리',
    email: 'user@example.com',
    emailVisibility: 'private'
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">프로필 설정</h1>
          <p className="text-gray-600">개인정보 및 공개 설정을 관리하세요</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="nickname" className="block text-sm font-medium text-gray-900 mb-2">
                닉네임
              </label>
              <input
                type="text"
                id="nickname"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
              />
              <p className="text-xs text-gray-500 mt-1">다른 사용자에게 보여지는 이름입니다</p>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                이메일
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
              />
              <p className="text-xs text-gray-500 mt-1">계정 복구 및 알림에 사용됩니다</p>
            </div>

            <div>
              <label htmlFor="emailVisibility" className="block text-sm font-medium text-gray-900 mb-2">
                이메일 공개 여부
              </label>
              <select
                id="emailVisibility"
                name="emailVisibility"
                value={formData.emailVisibility}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
              >
                <option value="private">비공개 (추천)</option>
                <option value="public">공개</option>
              </select>
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
      </div>
    </div>
  );
}
