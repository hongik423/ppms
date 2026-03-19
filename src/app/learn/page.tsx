'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  BookOpenIcon,
  ListIcon,
  BarChart3Icon,
  BookmarkIcon,
  ScaleIcon,
  TargetIcon,
} from 'lucide-react'

type SubjectFilter = '전체' | '1과목' | '2과목' | '3과목' | '4권실무'

interface SubjectTab {
  id: SubjectFilter
  label: string
  activeColor: string
  inactiveColor: string
}

const subjectTabs: SubjectTab[] = [
  { id: '전체', label: '전체', activeColor: 'bg-slate-800 text-white', inactiveColor: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300' },
  { id: '1과목', label: '1과목 법제도', activeColor: 'bg-violet-700 text-white', inactiveColor: 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' },
  { id: '2과목', label: '2과목 조달계획', activeColor: 'bg-blue-700 text-white', inactiveColor: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  { id: '3과목', label: '3과목 계약관리', activeColor: 'bg-emerald-700 text-white', inactiveColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' },
  { id: '4권실무', label: '4권 관리실무', activeColor: 'bg-rose-700 text-white', inactiveColor: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300' },
]

const subjectBadgeColor: Record<SubjectFilter, string> = {
  '전체': 'bg-slate-100 text-slate-700',
  '1과목': 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
  '2과목': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  '3과목': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  '4권실무': 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
}

interface CardMeta {
  key: string
  href: string
  icon: React.ReactNode
  title: string
  color: string
  counts: Record<SubjectFilter, number>
  descriptions: Record<SubjectFilter, string>
}

const cardMetas: CardMeta[] = [
  {
    key: 'today',
    href: '/learn/cards/today',
    icon: <TargetIcon className="w-8 h-8" />,
    title: '오늘의 복습',
    color: 'from-blue-500 to-blue-600',
    counts: { '전체': 15, '1과목': 6, '2과목': 4, '3과목': 3, '4권실무': 5 },
    descriptions: {
      '전체': '4개 과목 핵심 개념카드 15개',
      '1과목': '법제도·전자조달 핵심개념 6개',
      '2과목': '조달계획·입찰분석 핵심개념 4개',
      '3과목': '계약관리 핵심개념 3개',
      '4권실무': '관리실무 실전개념 5개 (나라장터·원가·MAS)',
    },
  },
  {
    key: 'compare',
    href: '/learn/cards/compare',
    icon: <ScaleIcon className="w-8 h-8" />,
    title: '비교표 학습',
    color: 'from-purple-500 to-purple-600',
    counts: { '전체': 5, '1과목': 2, '2과목': 1, '3과목': 2, '4권실무': 2 },
    descriptions: {
      '전체': '핵심 비교표 5개 — 심사방법·경쟁방법·계약유형',
      '1과목': '경쟁방법·법률 비교표 2개',
      '2과목': '입찰평가방법 비교표 1개',
      '3과목': '계약유형·보증금 비교표 2개',
      '4권실무': '원가계산유형·MAS비교 2개 (4권 신규)',
    },
  },
  {
    key: 'numbers',
    href: '/learn/cards/numbers',
    icon: <BarChart3Icon className="w-8 h-8" />,
    title: '숫자 암기',
    color: 'from-orange-500 to-orange-600',
    counts: { '전체': 12, '1과목': 5, '2과목': 3, '3과목': 3, '4권실무': 4 },
    descriptions: {
      '전체': '전 과목 핵심 숫자·기준값 12개 퀴즈',
      '1과목': '소액기준·보증금 비율 5개',
      '2과목': '공고일수·평점기준·복수예비가격 3개',
      '3과목': '지체상금률·PQ기준 3개',
      '4권실무': '유효기간·생산실적·MAS기준·물가조정 4개',
    },
  },
  {
    key: 'laws',
    href: '/learn/laws',
    icon: <BookOpenIcon className="w-8 h-8" />,
    title: '법조문 학습',
    color: 'from-indigo-500 to-indigo-600',
    counts: { '전체': 20, '1과목': 8, '2과목': 5, '3과목': 5, '4권실무': 6 },
    descriptions: {
      '전체': '전 과목 핵심 법조문 20개 카테고리별 정리',
      '1과목': '국가·지방계약법·조달사업법·전자조달법 8개',
      '2과목': '입찰·낙찰·협상 관련 법규 5개',
      '3과목': '계약관리·하도급·건설 관련 법규 5개',
      '4권실무': '나라장터·원가계산·MAS·직접생산 6개',
    },
  },
  {
    key: 'procedures',
    href: '/learn/procedures',
    icon: <ListIcon className="w-8 h-8" />,
    title: '절차도 학습',
    color: 'from-green-500 to-green-600',
    counts: { '전체': 12, '1과목': 2, '2과목': 2, '3과목': 3, '4권실무': 5 },
    descriptions: {
      '전체': '전 과목 핵심 업무절차 흐름도 12개',
      '1과목': '부정당제재·전자조달 절차 2개',
      '2과목': '적격심사·협상계약 절차 2개',
      '3과목': '계약변경·MAS·공사계약 절차 3개',
      '4권실무': '나라장터등록·목록화·원가계산·협상·우수제품 5개',
    },
  },
  {
    key: 'heatmap',
    href: '/learn/prediction/heatmap',
    icon: <BookmarkIcon className="w-8 h-8" />,
    title: '출제확률 히트맵',
    color: 'from-red-500 to-red-600',
    counts: { '전체': 3, '1과목': 1, '2과목': 1, '3과목': 1, '4권실무': 1 },
    descriptions: {
      '전체': '3개 과목 전체 출제예상 항목 히트맵',
      '1과목': '법제도 과목 출제확률 분석',
      '2과목': '조달계획 과목 출제확률 분석',
      '3과목': '계약관리 과목 출제확률 분석',
      '4권실무': '관리실무 출제예상 항목 분석',
    },
  },
]

const subjectLinks = [
  {
    id: '1',
    name: '1과목: 공공조달과 법제도 이해',
    href: '/learn/subject1/t1',
    color: 'from-violet-500 to-violet-700',
    desc: '30문제 · 6개 주요항목',
    badge: '필기',
  },
  {
    id: '2',
    name: '2과목: 공공조달계획 수립 및 분석',
    href: '/learn/subject2/t4',
    color: 'from-blue-500 to-blue-700',
    desc: '20문제 · 3개 주요항목',
    badge: '필기',
  },
  {
    id: '3',
    name: '3과목: 공공계약관리',
    href: '/learn/subject3/t7',
    color: 'from-emerald-500 to-emerald-700',
    desc: '30문제 · 4개 주요항목',
    badge: '필기',
  },
  {
    id: '4',
    name: '4권: 공공조달 관리실무',
    href: '/learn/subject4/t10',
    color: 'from-rose-500 to-rose-700',
    desc: '전자조달기반 수행절차 일반',
    badge: '실무',
  },
]

export default function LearnPage() {
  const [selectedSubject, setSelectedSubject] = useState<SubjectFilter>('전체')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-7 md:py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">학습 허브</h1>
            <span className="px-2 py-1 bg-amber-400 text-amber-900 text-xs font-bold rounded-full">
              출제기준 100% 반영
            </span>
            <span className="px-2 py-1 bg-rose-400 text-white text-xs font-bold rounded-full">
              4권 실무 완전 업그레이드
            </span>
          </div>
          <p className="text-blue-100 text-sm md:text-lg">
            공공조달관리사 필기시험 맞춤형 학습 모듈 — 전자조달기반 수행절차 일반(4권) 포함 완전 학습
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">

        {/* Subject selection */}
        <section className="mb-8 md:mb-12">
          <h2 className="text-xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6">
            과목 선택
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {subjectLinks.map((subject) => (
              <Link key={subject.id} href={subject.href}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className={`bg-gradient-to-br ${subject.color} rounded-xl md:rounded-2xl p-4 md:p-8 text-white shadow-lg hover:shadow-xl cursor-pointer transition-shadow h-full`}
                >
                  <div className="flex items-center gap-2 mb-1 md:mb-2">
                    <h3 className="text-sm md:text-lg font-bold leading-snug">{subject.name}</h3>
                  </div>
                  <p className="text-white/80 text-xs md:text-sm">{subject.desc}</p>
                  <span className="inline-block mt-2 px-2 py-0.5 bg-white/20 rounded-full text-xs font-semibold">
                    {subject.badge}
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        {/* Quick access — full upgrade */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4 md:mb-5">
            <h2 className="text-xl md:text-3xl font-bold text-slate-900 dark:text-white">
              빠른 접근
            </h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium">
              출제기준 대비 누락없는 완전 학습 효율화 솔루션
            </p>
          </div>

          {/* Subject filter tabs */}
          <div className="flex gap-2 mb-5 overflow-x-auto pb-1 scrollbar-hide">
            {subjectTabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedSubject(tab.id)}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-semibold whitespace-nowrap transition-all border ${
                  selectedSubject === tab.id
                    ? tab.activeColor + ' border-transparent shadow-md'
                    : tab.inactiveColor + ' border-transparent hover:opacity-80'
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {cardMetas.map((card, idx) => {
              const href =
                selectedSubject === '전체'
                  ? card.href
                  : `${card.href}?subject=${encodeURIComponent(selectedSubject)}`
              return (
                <Link key={card.key} href={href}>
                  <motion.div
                    key={`${card.key}-${selectedSubject}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ y: -8 }}
                    className="h-full bg-white dark:bg-slate-800 rounded-xl md:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer border border-slate-200 dark:border-slate-700"
                  >
                    <div
                      className={`bg-gradient-to-br ${card.color} h-14 md:h-20 flex items-center justify-center text-white`}
                    >
                      <div className="w-6 h-6 md:w-8 md:h-8">{card.icon}</div>
                    </div>
                    <div className="p-3 md:p-5">
                      <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white mb-1 leading-tight">
                        {card.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 leading-snug min-h-[2.5em]">
                        {card.descriptions[selectedSubject]}
                      </p>
                      <div className="flex items-center flex-wrap gap-1.5">
                        <span className="inline-block px-2 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold">
                          {card.counts[selectedSubject]}개
                        </span>
                        {selectedSubject !== '전체' && (
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${subjectBadgeColor[selectedSubject]}`}
                          >
                            {selectedSubject}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* 출제기준 현황 */}
        <section className="mt-8 md:mt-10">
          <div className="grid md:grid-cols-4 gap-3 md:gap-4">
            {[
              { label: '1과목', sub: '법제도 이해', count: '30문제', color: 'bg-violet-50 border-violet-200 text-violet-800 dark:bg-violet-900/20 dark:border-violet-700 dark:text-violet-300' },
              { label: '2과목', sub: '조달계획 수립', count: '20문제', color: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-700 dark:text-blue-300' },
              { label: '3과목', sub: '공공계약관리', count: '30문제', color: 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/20 dark:border-emerald-700 dark:text-emerald-300' },
              { label: '4권실무', sub: '전자조달기반 절차', count: '실무학습', color: 'bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-900/20 dark:border-rose-700 dark:text-rose-300' },
            ].map((item) => (
              <div
                key={item.label}
                className={`${item.color} border rounded-xl p-3 md:p-4 text-center`}
              >
                <div className="font-bold text-sm md:text-base">{item.label}</div>
                <div className="text-xs opacity-80 mt-0.5">{item.sub}</div>
                <div className="font-semibold text-sm mt-1">{item.count}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Learning tips */}
        <section className="mt-6 md:mt-8">
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl md:rounded-2xl p-5 md:p-8">
            <h3 className="text-lg md:text-2xl font-bold text-blue-900 dark:text-blue-200 mb-3 md:mb-4">
              💡 효과적인 학습 팁
            </h3>
            <ul className="space-y-2 md:space-y-3 text-blue-800 dark:text-blue-300">
              <li className="flex gap-2 md:gap-3 text-sm md:text-base">
                <span className="flex-shrink-0 font-bold">1.</span>
                <span>매일 오늘의 복습으로 핵심 개념 15개를 반복 학습하세요</span>
              </li>
              <li className="flex gap-2 md:gap-3 text-sm md:text-base">
                <span className="flex-shrink-0 font-bold">2.</span>
                <span><strong>4권 실무</strong>는 절차도와 숫자 암기에 집중 — 나라장터·원가계산·MAS 절차를 확실히 익히세요</span>
              </li>
              <li className="flex gap-2 md:gap-3 text-sm md:text-base">
                <span className="flex-shrink-0 font-bold">3.</span>
                <span>히트맵으로 높은 출제확률 항목부터 집중 학습하세요</span>
              </li>
              <li className="flex gap-2 md:gap-3 text-sm md:text-base">
                <span className="flex-shrink-0 font-bold">4.</span>
                <span>비교표 퀴즈 모드로 헷갈리는 개념을 확실히 구분하세요</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
