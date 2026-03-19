'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { NumberQuiz } from '@/components/learn/NumberQuiz'

type SubjectFilter = '1과목' | '2과목' | '3과목' | '4권실무'

interface NumberData {
  id: string
  question: string
  answer: string | number
  options?: string[]
  lawReference?: string
  subject: SubjectFilter
  tip?: string
}

const numberData: NumberData[] = [
  // ────────── 1과목 (5개) ──────────
  {
    id: '1',
    subject: '1과목',
    question: '소액수의계약 — 물품의 기준금액은?',
    answer: '2천만원 이하',
    options: ['1천만원 이하', '2천만원 이하', '3천만원 이하', '5천만원 이하'],
    lawReference: '국가계약법 시행령 제7조 — 물품 소액수의계약 기준',
    tip: '암기: 물2 공8 용5',
  },
  {
    id: '2',
    subject: '1과목',
    question: '소액수의계약 — 공사의 기준금액은?',
    answer: '8천만원 이하',
    options: ['5천만원 이하', '8천만원 이하', '1억원 이하', '2억원 이하'],
    lawReference: '국가계약법 시행령 제7조 — 공사 소액수의계약 기준',
    tip: '암기: 물2 공8 용5',
  },
  {
    id: '3',
    subject: '1과목',
    question: '소액수의계약 — 용역의 기준금액은?',
    answer: '5천만원 이하',
    options: ['2천만원 이하', '3천만원 이하', '5천만원 이하', '8천만원 이하'],
    lawReference: '국가계약법 시행령 제7조 — 용역 소액수의계약 기준',
    tip: '암기: 물2 공8 용5',
  },
  {
    id: '4',
    subject: '1과목',
    question: '입찰보증금의 기준은? (추정가격의 몇 % 이상)',
    answer: '추정가격의 5% 이상',
    options: ['추정가격의 3% 이상', '추정가격의 5% 이상', '추정가격의 10% 이상', '계약금액의 5% 이상'],
    lawReference: '국가계약법 시행령 제37조 — 입찰보증금 기준',
  },
  {
    id: '5',
    subject: '1과목',
    question: '계약보증금의 기준은? (계약금액의 몇 %)',
    answer: '계약금액의 10~15%',
    options: ['계약금액의 5~10%', '계약금액의 10~15%', '계약금액의 15~20%', '계약금액의 2~5%'],
    lawReference: '국가계약법 시행령 제50조 — 계약보증금 기준',
  },

  // ────────── 2과목 (3개) ──────────
  {
    id: '6',
    subject: '2과목',
    question: '복수예비가격의 범위는? (예정가격의 ±몇 %)',
    answer: '±3%',
    options: ['±1%', '±2%', '±3%', '±5%'],
    lawReference: '국가계약법 시행령 제50조 — 복수예비가격 범위',
    tip: '15개 복수예비가격 중 4개 추첨 → 산술평균 = 예정가격',
  },
  {
    id: '7',
    subject: '2과목',
    question: '일반경쟁입찰 최소 공고기간은 며칠 이상?',
    answer: '10일',
    options: ['5일', '7일', '10일', '14일'],
    lawReference: '국가계약법 시행령 — 일반경쟁입찰 공고기간',
    tip: '공사 공고: 15일 이상 (단, 긴급한 경우 단축 가능)',
  },
  {
    id: '8',
    subject: '2과목',
    question: '적격심사 기준 종합평점은 최소 몇 점 이상?',
    answer: '95점',
    options: ['80점', '85점', '90점', '95점'],
    lawReference: '국가계약법 시행령 제42조 — 적격심사 기준',
    tip: '물품·용역 95점 이상 → 낙찰자 결정',
  },

  // ────────── 3과목 (6개) — 의미부여암기법 완전 적용 ──────────
  {
    id: '9',
    subject: '3과목',
    question: '하자보수보증금의 기준은?',
    answer: '계약금액의 2~5%',
    options: ['계약금액의 1~2%', '계약금액의 2~5%', '계약금액의 5~10%', '계약금액의 10~15%'],
    lawReference: '국가계약법 시행령 제52조 — 하자보수보증금 기준',
    tip: '암기: "계10 이10~15 하2~5 입5"\n계(약)는 10%, 이(행)는 10~15%, 하(자)는 2~5%, 입(찰)은 5%',
  },
  {
    id: '10',
    subject: '3과목',
    question: '물품계약 지체상금률은? (1일당 계약금액 대비)',
    answer: '0.25/1000 (0.025%)',
    options: ['0.1/1000', '0.25/1000 (0.025%)', '0.5/1000', '1/1000'],
    lawReference: '국가계약법 시행령 제74조 — 지체상금률',
    tip: '암기: "물용0.25, 공사0.5 (공사는 2배!)"\n공사(公事)가 더 크니까 2배 벌금!',
  },
  {
    id: '11',
    subject: '3과목',
    question: '종합심사낙찰제(종심제) 적용 대상 공사비는?',
    answer: '300억원 이상',
    options: ['100억원 이상', '200억원 이상', '300억원 이상', '500억원 이상'],
    lawReference: '국가계약법 시행령 제42조의2 — 종합심사낙찰제',
    tip: '암기: "종심제·PQ는 300억 쌍둥이"\nPQ(입찰참가자격 사전심사)도 동일하게 300억원 이상!',
  },
  {
    id: 'n3-04',
    subject: '3과목',
    question: '물가변동(E/S) 계약금액 조정 — 기간 요건은?',
    answer: '계약체결일로부터 90일 이상 경과',
    options: ['30일 이상 경과', '60일 이상 경과', '90일 이상 경과', '180일 이상 경과'],
    lawReference: '국가계약법 시행령 제64조 — 물가변동 조정 기간요건',
    tip: '암기: "구삼(9·3)이 동시에 충족!"\n90일 경과 + 3% 이상 등락 → 2가지 조건 동시 충족 필요!',
  },
  {
    id: 'n3-05',
    subject: '3과목',
    question: '계약보증금의 기준은? (계약금액 대비)',
    answer: '계약금액의 10% 이상',
    options: ['계약금액의 5% 이상', '계약금액의 10% 이상', '계약금액의 15% 이상', '계약금액의 20% 이상'],
    lawReference: '국가계약법 시행령 제50조 — 계약보증금 기준',
    tip: '암기: "계10 이10~15 하2~5"\n계약보증금 10%, 이행보증금 10~15%, 하자보수보증금 2~5%',
  },
  {
    id: 'n3-06',
    subject: '3과목',
    question: '용역계약 착수 기한은? (계약체결 후 며칠 이내)',
    answer: '14일 이내',
    options: ['7일 이내', '10일 이내', '14일 이내', '30일 이내'],
    lawReference: '용역계약 일반조건 제13조 — 착수 및 보고',
    tip: '암기: "용역14 공사10/20"\n용역은 14일, 공사는 10억 미만 10일·10억 이상 20일!',
  },

  // ────────── 4권실무 (4개) ──────────
  {
    id: '12',
    subject: '4권실무',
    question: '경쟁입찰참가자격등록증의 유효기간은?',
    answer: '3년',
    options: ['1년', '2년', '3년', '5년'],
    lawReference: '국가종합전자조달시스템 입찰참가자격 등록규정',
    tip: '기간 만료 전 갱신 신청 필수 — 미갱신 시 입찰참가자격 상실',
  },
  {
    id: '13',
    subject: '4권실무',
    question: '직접생산확인 기준 — 연속 생산실적 기간은?',
    answer: '최근 3년 이상',
    options: ['최근 1년 이상', '최근 2년 이상', '최근 3년 이상', '최근 5년 이상'],
    lawReference: '중소기업자간 경쟁제품 직접생산확인에 관한 기준',
    tip: '중소벤처기업부장관이 확인 — 핵심부품 직접 제조 + 3년 연속 생산실적',
  },
  {
    id: '14',
    subject: '4권실무',
    question: 'MAS 2단계경쟁 적용 추정가격 기준은?',
    answer: '5천만원 이상',
    options: ['1천만원 이상', '3천만원 이상', '5천만원 이상', '1억원 이상'],
    lawReference: '다수공급자계약 물품 세부기준',
    tip: '5천만원 이상 + 동일 품목 MAS 업체 2개 이상 → 2단계경쟁 의무',
  },
  {
    id: '15',
    subject: '4권실무',
    question: '물가변동(E/S) 계약금액 조정 요건 — 입찰일로부터 몇 일 경과?',
    answer: '90일 경과 + 등락률 ±3% 이상',
    options: ['30일 경과 + ±1% 이상', '60일 경과 + ±2% 이상', '90일 경과 + ±3% 이상', '180일 경과 + ±5% 이상'],
    lawReference: '국가계약법 시행령 제64조 — 물가변동 계약금액 조정',
    tip: '두 가지 요건 동시 충족 필요: ①90일 경과 ②±3% 이상 등락',
  },
]

const subjectTabs = [
  { id: '1과목' as SubjectFilter, label: '1과목 법제도 (5개)', activeColor: 'bg-violet-700 text-white', inactiveColor: 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' },
  { id: '2과목' as SubjectFilter, label: '2과목 조달계획 (3개)', activeColor: 'bg-blue-700 text-white', inactiveColor: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  { id: '3과목' as SubjectFilter, label: '3과목 계약관리 (6개)', activeColor: 'bg-emerald-700 text-white', inactiveColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' },
  { id: '4권실무' as SubjectFilter, label: '4권 관리실무 (4개)', activeColor: 'bg-rose-700 text-white', inactiveColor: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300' },
]

export default function NumbersPage() {
  const [selectedSubject, setSelectedSubject] = useState<SubjectFilter>('1과목')
  const [score, setScore] = useState(0)
  const [totalAnswered, setTotalAnswered] = useState(0)

  const filteredData = numberData.filter((item) => item.subject === selectedSubject)

  const handleSubjectChange = (sub: SubjectFilter) => {
    setSelectedSubject(sub)
    setScore(0)
    setTotalAnswered(0)
  }

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) setScore(score + 1)
    setTotalAnswered(totalAnswered + 1)
  }

  const accuracy = totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-800 to-orange-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">숫자 암기 퀴즈</h1>
              <p className="text-orange-200 text-sm mt-1">3권 의미부여암기법 신규 반영 — 전 과목 18개 숫자 완전 정복</p>
            </div>
            <Link
              href="/learn"
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition text-sm"
            >
              뒤로 가기
            </Link>
          </div>
          <p className="text-orange-100 text-lg">
            시험에 자주 출제되는 중요한 숫자와 기준값을 암기하세요
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Score tracker */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 md:p-6 shadow-md border border-slate-200 dark:border-slate-700 text-center">
            <p className="text-xs md:text-sm text-slate-500 font-semibold mb-1">정답</p>
            <p className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">{score}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 md:p-6 shadow-md border border-slate-200 dark:border-slate-700 text-center">
            <p className="text-xs md:text-sm text-slate-500 font-semibold mb-1">푼 문제</p>
            <p className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400">{totalAnswered}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 md:p-6 shadow-md border border-slate-200 dark:border-slate-700 text-center">
            <p className="text-xs md:text-sm text-slate-500 font-semibold mb-1">정답률</p>
            <p className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400">{accuracy}%</p>
          </div>
        </motion.div>

        {/* Subject filter tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {subjectTabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSubjectChange(tab.id)}
              className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap text-xs md:text-sm transition ${
                selectedSubject === tab.id
                  ? tab.activeColor + ' shadow-lg'
                  : tab.inactiveColor
              }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* 4권실무 특별 안내 */}
        {selectedSubject === '4권실무' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-700 rounded-xl"
          >
            <h3 className="font-bold text-rose-800 dark:text-rose-300 mb-1 text-sm">📌 4권 실무 핵심 숫자</h3>
            <div className="grid grid-cols-2 gap-2 text-xs text-rose-700 dark:text-rose-300">
              <div>• 입찰참가자격 유효기간: <strong>3년</strong></div>
              <div>• 직접생산확인 생산실적: <strong>3년 연속</strong></div>
              <div>• MAS 2단계경쟁 기준: <strong>5천만원 이상</strong></div>
              <div>• 물가변동 조정요건: <strong>90일 + ±3%</strong></div>
            </div>
          </motion.div>
        )}

        {/* Quiz items */}
        <div className="space-y-10">
          {filteredData.map((data, idx) => (
            <motion.div
              key={data.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              {data.tip && (
                <div className="mb-2 px-3 py-1.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-700 rounded-lg text-xs text-amber-700 dark:text-amber-300 font-medium">
                  💡 {data.tip}
                </div>
              )}
              <NumberQuiz
                question={data.question}
                answer={data.answer}
                options={data.options}
                lawReference={data.lawReference}
                onAnswer={handleAnswer}
              />
            </motion.div>
          ))}
        </div>

        {/* Learning tips */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-14 p-6 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-2xl"
        >
          <h3 className="text-xl font-bold text-orange-900 dark:text-orange-200 mb-3">💡 숫자 암기 전략</h3>
          <ul className="space-y-2 text-orange-800 dark:text-orange-300 text-sm">
            <li className="flex gap-2"><span className="font-bold flex-shrink-0">1과목</span><span>소액수의: <strong>물2 공8 용5</strong> / 입찰보증금 5% / 계약보증금 10~15%</span></li>
            <li className="flex gap-2"><span className="font-bold flex-shrink-0">2과목</span><span>복수예비가격 ±3% / 공고기간 10일 / 적격심사 95점</span></li>
            <li className="flex gap-2"><span className="font-bold flex-shrink-0">3과목</span><span>하자보수 2~5% / 물품지체상금 0.25‰ / 종심제 300억↑</span></li>
            <li className="flex gap-2"><span className="font-bold flex-shrink-0">4권실무</span><span>등록 유효기간 3년 / 직접생산 3년 연속 / MAS 2단계 5천만원↑ / 물가변동 90일+3%</span></li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}
