'use client'

import React from 'react'
import Link from 'next/link'
import { PredictionHeatmap } from '@/components/learn/PredictionHeatmap'
import subjectsData from '@/data/rawdata/subjects.json'

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

// Transform the raw subjects data into heatmap format
function transformSubjectsToHeatmapData(): Subject[] {
  return subjectsData.subjects.map((subject) => ({
    id: subject.id,
    name: subject.name,
    mainTopics: subject.mainTopics.map((mainTopic) => ({
      id: mainTopic.id,
      name: mainTopic.name,
      detailItems: mainTopic.subTopics
        .flatMap((subTopic) =>
          subTopic.detailItems.map((item) => ({
            id: item.id,
            name: item.name,
            score: item.predictionScore * 20, // Convert 1-5 to 0-100 percentage
          }))
        ),
    })),
  }))
}

const heatmapData = transformSubjectsToHeatmapData()

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
