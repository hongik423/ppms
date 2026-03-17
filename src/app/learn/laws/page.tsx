'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, ExternalLink } from 'lucide-react';
import keywordsData from '@/data/rawdata/keywords.json';

export default function LawsPage() {
  // 키워드에서 법조문 추출 (중복 제거)
  const allLaws = Array.from(
    new Set(
      keywordsData.top20Keywords.flatMap((kw) => kw.keyLaws)
    )
  ).filter(Boolean);

  // 법률 카테고리별 그룹핑
  const lawGroups: Record<string, string[]> = {};
  allLaws.forEach((law) => {
    let category = '기타 법령';
    if (law.includes('국가계약법')) category = '국가계약법';
    else if (law.includes('지방계약법')) category = '지방계약법';
    else if (law.includes('조달사업법')) category = '조달사업법';
    else if (law.includes('민법')) category = '민법';
    else if (law.includes('전자조달')) category = '전자조달법';
    else if (law.includes('건설')) category = '건설 관련법';
    else if (law.includes('중소기업') || law.includes('녹색') || law.includes('사회적기업') || law.includes('장애인'))
      category = '정책지원 관련법';
    else if (law.includes('하도급')) category = '하도급법';
    else if (law.includes('공기업')) category = '공기업 관련 규정';

    if (!lawGroups[category]) lawGroups[category] = [];
    lawGroups[category].push(law);
  });

  const categoryOrder = [
    '국가계약법', '지방계약법', '조달사업법', '전자조달법',
    '민법', '건설 관련법', '하도급법', '공기업 관련 규정',
    '정책지원 관련법', '기타 법령',
  ];
  const sortedCategories = categoryOrder.filter((c) => lawGroups[c]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* 상단 네비게이션 */}
      <div className="flex items-center gap-3">
        <Link
          href="/learn"
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            법조문 학습
          </h1>
          <p className="text-sm text-slate-500">
            공공조달관리사 시험 관련 핵심 법률·시행령·시행규칙 정리
          </p>
        </div>
      </div>

      {/* 통계 */}
      <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="w-6 h-6" />
          <span className="font-semibold text-lg">총 {allLaws.length}개 핵심 법조문</span>
        </div>
        <p className="text-indigo-100 text-sm">
          TOP 20 키워드에 연관된 주요 법률 조문을 카테고리별로 정리했습니다.
        </p>
      </div>

      {/* 카테고리별 법조문 */}
      {sortedCategories.map((category) => (
        <div
          key={category}
          className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
        >
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-600">
            <h2 className="font-semibold text-slate-900 dark:text-white">
              {category}
              <span className="ml-2 text-sm font-normal text-slate-500">
                ({lawGroups[category].length}개)
              </span>
            </h2>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-700">
            {lawGroups[category].map((law, idx) => {
              // 해당 법조문과 관련된 키워드 찾기
              const relatedKeywords = keywordsData.top20Keywords
                .filter((kw) => kw.keyLaws.includes(law))
                .map((kw) => kw.keyword);

              return (
                <div key={idx} className="px-6 py-3 hover:bg-blue-50 dark:hover:bg-slate-700/30 transition-colors">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{law}</p>
                  {relatedKeywords.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {relatedKeywords.map((kw) => (
                        <span
                          key={kw}
                          className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
