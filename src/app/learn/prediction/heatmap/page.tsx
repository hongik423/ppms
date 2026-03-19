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

        {/* 2과목 출제 집중 분석 — 의미부여암기법 */}
        <div className="mt-10 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-8">
          <h3 className="text-xl font-bold text-blue-900 dark:text-blue-200 mb-4">
            🎯 2과목 출제 집중 분석 — 의미부여암기법으로 고득점 공략
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
              <div className="font-bold text-blue-800 dark:text-blue-300 mb-2">📋 입찰·낙찰 (출제확률 최상)</div>
              <ul className="text-blue-700 dark:text-blue-400 space-y-1">
                <li>• 경쟁입찰절차 — "일제지" 암기</li>
                <li>• 무효입찰 사유 — "보자동초허기"</li>
                <li>• 적격심사 95점 — "95 문턱!"</li>
                <li>• 평가위원회·이해충돌 — 5점 항목 집중</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
              <div className="font-bold text-blue-800 dark:text-blue-300 mb-2">📐 사전규격·계획 (출제확률 상)</div>
              <ul className="text-blue-700 dark:text-blue-400 space-y-1">
                <li>• 사전규격공개 20일 — "사전규격 20!"</li>
                <li>• 조달수명주기 5단계 — "조시입계종"</li>
                <li>• SMART 구매사양 — "명측달현시"</li>
                <li>• RFI·RFP·SOW — "정제과"</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
              <div className="font-bold text-blue-800 dark:text-blue-300 mb-2">📊 계약유형·협상 (출제확률 상)</div>
              <ul className="text-blue-700 dark:text-blue-400 space-y-1">
                <li>• 계약금액결정유형 — "확원원성시"</li>
                <li>• 낙찰방법 비교 — "적협희종"</li>
                <li>• 협상계약 흐름 — 기술→가격 2단계</li>
                <li>• 공고기간 — "물용7 공사15"</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 과목별 출제 비중 안내 */}
        <div className="mt-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-amber-900 dark:text-amber-200 mb-3">
            📌 출제기준 문항 배분 안내 (2026~2028 적용)
          </h3>
          <div className="grid md:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center gap-3">
              <span className="px-2 py-1 bg-violet-100 text-violet-700 rounded font-bold text-xs">1과목</span>
              <span className="text-amber-800 dark:text-amber-300">공공조달과 법제도 이해 — <strong>30문제</strong></span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded font-bold text-xs">2과목</span>
              <span className="text-amber-800 dark:text-amber-300">공공조달계획 수립 및 분석 — <strong>20문제</strong></span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded font-bold text-xs">3과목</span>
              <span className="text-amber-800 dark:text-amber-300">공공계약관리 — <strong>30문제</strong></span>
            </div>
          </div>
          <p className="mt-3 text-xs text-amber-700 dark:text-amber-400">
            ※ 총 80문제 객관식 / 2시간 / 합격기준: 60점 이상 (각 과목 40점 미만 과락)
          </p>
        </div>
      </div>
    </div>
  )
}
