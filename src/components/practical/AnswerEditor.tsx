'use client';

import { Save } from 'lucide-react';
import { useEffect, useState } from 'react';

interface AnswerEditorProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
}

export function AnswerEditor({ value, onChange, onSubmit }: AnswerEditorProps) {
  const [lastSavedTime, setLastSavedTime] = useState<Date | null>(null);
  const [isAutoSaving, setIsAutoSaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (value) {
        setIsAutoSaving(true);
        // Simulate auto-save
        setLastSavedTime(new Date());
        setTimeout(() => setIsAutoSaving(false), 800);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [value]);

  const charCount = value.length;
  const maxChars = 5000;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">답안 작성</h3>
        <p className="text-sm text-gray-600">STAR-L 프레임워크에 따라 체계적으로 답변하세요.</p>
      </div>

      <div className="space-y-3 mb-4 text-xs text-gray-500">
        <div className="flex gap-4">
          <span className="inline-block px-3 py-1 bg-blue-50 rounded">S: 상황</span>
          <span className="inline-block px-3 py-1 bg-purple-50 rounded">T: 과제</span>
          <span className="inline-block px-3 py-1 bg-amber-50 rounded">A: 행동</span>
          <span className="inline-block px-3 py-1 bg-green-50 rounded">R: 결과</span>
          <span className="inline-block px-3 py-1 bg-red-50 rounded">L: 법적근거</span>
        </div>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="상황(S)을 먼저 설명하고, 과제(T), 행동(A), 결과(R), 법적근거(L) 순서로 작성하세요."
        className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
        maxLength={maxChars}
      />

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-600">
            <span className={charCount > maxChars * 0.9 ? 'text-amber-600 font-semibold' : ''}>
              {charCount}
            </span>
            <span className="text-gray-500"> / {maxChars} 자</span>
          </div>

          {lastSavedTime && (
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <Save className="w-3 h-3" />
              {isAutoSaving ? '저장 중...' : '저장됨'}
            </div>
          )}
        </div>

        {onSubmit && (
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-blue-800 text-white rounded-lg font-medium hover:bg-blue-900 transition-colors text-sm"
          >
            채점 받기
          </button>
        )}
      </div>
    </div>
  );
}
