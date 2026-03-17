'use client'

import React from 'react'
import Link from 'next/link'
import { PredictionHeatmap } from '@/components/learn/PredictionHeatmap'

interface DetailItem {
  id: string
  name: string
  score: number
}

interface MainTopic {
  id: string
  name: string
  detailItems: DetailItem[]
}

interface Subject {
  id: string
  name: string
  mainTopics: MainTopic[]
}

const heatmapData: Subject[] = [
  {
    id: '1',
    name: '1과목: 공공조달 관리',
    mainTopics: [
      {
        id: 'topic1-1',
        name: '입찰 및 계약 방식',
        detailItems: [
          { id: 'detail1-1-1', name: '일반경쟁입찰', score: 95 },
          { id: 'detail1-1-2', name: '제한경쟁입찰', score: 85 },
          { id: 'detail1-1-3', name: '지명경쟁입찰', score: 60 },
          { id: 'detail1-1-4', name: '협상계약', score: 75 },
        ],
      },
      {
        id: 'topic1-2',
        name: '예정가격 및 적격심사',
        detailItems: [
          { id: 'detail1-2-1', name: '예정가격 작성기준', score: 90 },
          { id: 'detail1-2-2', name: '적격심사 기준', score: 88 },
          { id: 'detail1-2-3', name: '기술점수 산정', score: 65 },
          { id: 'detail1-2-4', name: '가격점수 산정', score: 70 },
        ],
      },
      {
        id: 'topic1-3',
        name: '개찰 및 낙찰',
        detailItems: [
          { id: 'detail1-3-1', name: '개찰 절차', score: 80 },
          { id: 'detail1-3-2', name: '낙찰 결정', score: 75 },
          { id: 'detail1-3-3', name: '복수예비가격', score: 85 },
          { id: 'detail1-3-4', name: '입찰보증금', score: 60 },
        ],
      },
    ],
  },
  {
    id: '2',
    name: '2과목: 재정관리',
    mainTopics: [
      {
        id: 'topic2-1',
        name: '예산 편성 및 집행',
        detailItems: [
          { id: 'detail2-1-1', name: '예산 편성 절차', score: 85 },
          { id: 'detail2-1-2', name: '예산 배정', score: 75 },
          { id: 'detail2-1-3', name: '예산 변경', score: 65 },
          { id: 'detail2-1-4', name: '예산 이월', score: 55 },
        ],
      },
      {
        id: 'topic2-2',
        name: '기술용역비 관리',
        detailItems: [
          { id: 'detail2-2-1', name: '용역비 기준', score: 80 },
          { id: 'detail2-2-2', name: '기술료 비율', score: 90 },
          { id: 'detail2-2-3', name: '경비 구성', score: 70 },
          { id: 'detail2-2-4', name: '원가 분석', score: 60 },
        ],
      },
      {
        id: 'topic2-3',
        name: '기금 운용',
        detailItems: [
          { id: 'detail2-3-1', name: '기금 설치', score: 70 },
          { id: 'detail2-3-2', name: '기금 사용', score: 75 },
          { id: 'detail2-3-3', name: '기금 평가', score: 50 },
          { id: 'detail2-3-4', name: '기금 폐지', score: 45 },
        ],
      },
    ],
  },
  {
    id: '3',
    name: '3과목: 법규 및 윤리',
    mainTopics: [
      {
        id: 'topic3-1',
        name: '정부계약법',
        detailItems: [
          { id: 'detail3-1-1', name: '계약 원칙', score: 88 },
          { id: 'detail3-1-2', name: '계약 체결', score: 85 },
          { id: 'detail3-1-3', name: '계약 이행', score: 80 },
          { id: 'detail3-1-4', name: '계약 종료', score: 70 },
        ],
      },
      {
        id: 'topic3-2',
        name: '부정행위 방지',
        detailItems: [
          { id: 'detail3-2-1', name: '부정행위 유형', score: 92 },
          { id: 'detail3-2-2', name: '적발 및 처벌', score: 85 },
          { id: 'detail3-2-3', name: '신고 절차', score: 75 },
          { id: 'detail3-2-4', name: '명의자대여', score: 80 },
        ],
      },
      {
        id: 'topic3-3',
        name: '윤리 및 청렴',
        detailItems: [
          { id: 'detail3-3-1', name: '공직자 윤리법', score: 75 },
          { id: 'detail3-3-2', name: '이해충돌방지', score: 70 },
          { id: 'detail3-3-3', name: '부패방지법', score: 80 },
          { id: 'detail3-3-4', name: '청렴 의무', score: 78 },
        ],
      },
    ],
  },
]

export default function PredictionHeatmapPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-800 to-red-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl md:text-4xl font-bold">출제확률 분석</h1>
            <Link
              href="/learn"
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition"
            >
              뒤로 가기
            </Link>
          </div>
          <p className="text-red-100 text-lg">
            출제 예상 확률을 시각화한 히트맵으로 학습 방향을 설정하세요
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <PredictionHeatmap subjects={heatmapData} />

        {/* Usage tips */}
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-md border border-slate-200 dark:border-slate-700">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              📊 히트맵 활용법
            </h3>
            <ul className="space-y-3 text-slate-700 dark:text-slate-300">
              <li className="flex gap-3">
                <span className="flex-shrink-0 text-red-500 font-bold">●</span>
                <span>
                  <strong>빨간색(80-100%):</strong> 출제확률이 매우 높은 항목입니다. 반드시 학습하세요
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 text-orange-500 font-bold">●</span>
                <span>
                  <strong>주황색(60-80%):</strong> 자주 출제되는 항목입니다. 깊이 있게 학습하세요
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 text-amber-500 font-bold">●</span>
                <span>
                  <strong>노란색(40-60%):</strong> 중간 정도 출제빈도입니다. 기본 개념을 학습하세요
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 text-blue-500 font-bold">●</span>
                <span>
                  <strong>파란색(0-40%):</strong> 출제확률이 낮은 항목입니다. 시간이 남을 때 학습하세요
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-md border border-slate-200 dark:border-slate-700">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              ⚡ 효율적 학습 전략
            </h3>
            <ul className="space-y-3 text-slate-700 dark:text-slate-300">
              <li className="flex gap-3">
                <span className="flex-shrink-0 font-bold">1단계</span>
                <span>빨간색과 주황색 항목부터 집중 학습</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 font-bold">2단계</span>
                <span>노란색 항목으로 기본기를 다지기</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 font-bold">3단계</span>
                <span>파란색 항목은 여유가 있을 때만 학습</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 font-bold">4단계</span>
                <span>전체 문제 풀이로 최종 점검</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
