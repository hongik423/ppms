'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function DisplaySettingsPage() {
  const [formData, setFormData] = useState({
    darkMode: false,
    fontSize: 'normal',
    colorScheme: 'auto'
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: newValue }));
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">디스플레이 설정</h1>
          <p className="text-gray-600">UI 및 테마를 자신의 취향에 맞게 조정하세요</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="darkMode"
                  checked={formData.darkMode}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-gray-300"
                />
                <div>
                  <p className="font-medium text-gray-900">다크 모드</p>
                  <p className="text-xs text-gray-600">야간 학습을 위한 다크 테마 사용</p>
                </div>
              </label>
            </div>

            <div>
              <label htmlFor="fontSize" className="block text-sm font-medium text-gray-900 mb-3">
                글자 크기
              </label>
              <div className="space-y-2">
                {['small', 'normal', 'large'].map((size) => (
                  <label key={size} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="fontSize"
                      value={size}
                      checked={formData.fontSize === size}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <span className={`${
                      size === 'small' ? 'text-sm' : size === 'large' ? 'text-lg' : 'text-base'
                    } text-gray-700`}>
                      {size === 'small' ? '작음 (14px)' : size === 'large' ? '큼 (18px)' : '보통 (16px)'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="colorScheme" className="block text-sm font-medium text-gray-900 mb-2">
                색상 체계
              </label>
              <select
                id="colorScheme"
                name="colorScheme"
                value={formData.colorScheme}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
              >
                <option value="auto">자동 (시스템 설정)</option>
                <option value="light">밝은 모드</option>
                <option value="dark">다크 모드</option>
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

        {/* Preview */}
        <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4">미리보기</h3>
          <div
            className={`p-4 rounded ${formData.darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}
            style={{ fontSize: formData.fontSize === 'small' ? '14px' : formData.fontSize === 'large' ? '18px' : '16px' }}
          >
            <p>이것은 현재 설정에 따른 텍스트 미리보기입니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
