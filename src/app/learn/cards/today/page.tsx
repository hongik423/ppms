'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronLeftIcon, ChevronRightIcon, CheckCircleIcon } from 'lucide-react'
import { ConceptCard } from '@/components/learn/ConceptCard'
import { CardReviewButtons } from '@/components/learn/CardReviewButtons'

type SubjectFilter = '전체' | '1과목' | '2과목' | '3과목' | '4권실무'

interface ConceptCardData {
  id: string
  front: string
  back: string
  category: 'concept' | 'compare' | 'number' | 'law' | 'procedure'
  difficulty: 1 | 2 | 3
  lawReference?: string
  subject: '1과목' | '2과목' | '3과목' | '4권실무'
}

// ── 1과목: 공공조달과 법제도 이해 (6개) ──────────────────────────────────────
const s1Cards: ConceptCardData[] = [
  {
    id: 's1-001',
    subject: '1과목',
    front: '공공조달의 정의 및 특성',
    back: '공공조달이란 국가·지자체·공공기관이 재화·용역·공사를 구매하는 행위이다.\n\n【상업적 구매 vs 공공조달 차이】\n• 상업적 구매: 이윤추구, 유연한 절차\n• 공공조달: 공익목적, 법령 기반, 경쟁원칙\n\n법적 근거: 국가계약법, 조달사업법',
    category: 'concept',
    difficulty: 1,
    lawReference: '국가계약법 제1조',
  },
  {
    id: 's1-002',
    subject: '1과목',
    front: '경쟁적 공공조달 방법 3가지',
    back: '①일반경쟁: 자격요건 없이 모든 사업자 참여 (원칙)\n②제한경쟁: 실적·기술 등 자격요건 충족자만 참여\n③지명경쟁: 2~5개사를 지명하여 입찰 실시\n\n【암기】 일제지(일반·제한·지명)\n\n비경쟁: 수의계약(1개사 직접 계약), 소액구매',
    category: 'compare',
    difficulty: 2,
    lawReference: '국가계약법 시행령 제12조~제14조',
  },
  {
    id: 's1-003',
    subject: '1과목',
    front: '전자조달시스템(나라장터) 연계 시스템',
    back: '나라장터(www.g2b.go.kr) 연계 5대 시스템:\n①종합쇼핑몰: MAS 물품 구매\n②혁신장터: 혁신제품 구매\n③벤처나라: 벤처기업 제품\n④디지털서비스몰: IT서비스·클라우드\n⑤이음장터: 소셜벤처·사회적기업\n\n【암기】 종혁벤디이',
    category: 'concept',
    difficulty: 2,
    lawReference: '전자조달의 이용 및 촉진에 관한 법률',
  },
  {
    id: 's1-004',
    subject: '1과목',
    front: '전략적 공공조달 — 사회적가치 지원제도',
    back: '【4대 우선구매제도】\n①장애인기업: 조달물자 우선구매\n②중증장애인생산품: 의무구매 (기관별 비율 설정)\n③여성기업: 물품·용역 우선구매\n④사회적기업: 제품·서비스 우선구매\n\n+ESG: 공공조달에서 환경·사회·지배구조 고려\n\n법근거: 장애인기업법, 중증장애인생산품법',
    category: 'concept',
    difficulty: 2,
    lawReference: '장애인기업활동 촉진법',
  },
  {
    id: 's1-005',
    subject: '1과목',
    front: '부정당업자 제재 처분 기준',
    back: '부정당업자: 담합·허위서류 제출·뇌물 등으로 공정경쟁을 저해한 업체\n\n【제재 내용】\n• 입찰참가자격 제한: 1개월~2년\n• 처분권자: 조달청장 또는 해당 발주기관 장\n• 부당이득금 환수 가능\n\n【절차】 사유 발생 → 사전통보 → 청문 → 처분결정 → 나라장터 공개\n\n법근거: 국가계약법 제27조',
    category: 'law',
    difficulty: 3,
    lawReference: '국가계약법 제27조 (부정당업자 제재)',
  },
  {
    id: 's1-006',
    subject: '1과목',
    front: '소액수의계약 기준금액 (국가계약법)',
    back: '【소액수의계약 기준】\n• 물품: 2천만원 이하\n• 공사: 8천만원 이하\n• 용역: 5천만원 이하\n\n【암기】 물2 공8 용5\n"물건(2)은 소파(公8)처럼 용(5)감하게"\n\n이 금액 이하는 경쟁입찰 생략, 수의계약 가능\n\n법근거: 국가계약법 시행령 제7조',
    category: 'number',
    difficulty: 1,
    lawReference: '국가계약법 시행령 제7조',
  },
]

// ── 2과목: 공공조달계획 수립 및 분석 (4개) ───────────────────────────────────
const s2Cards: ConceptCardData[] = [
  {
    id: 's2-001',
    subject: '2과목',
    front: '수요 분석 및 조달계획 수립 절차',
    back: '①공급 대상물 수요정보 식별\n②수요정보 평가와 요구사항 분석\n③공급계획 및 일정 수립\n④비상 공급계획 수립\n\n【공급역량 분석 포인트】\n• 공급방법 적정성 분석\n• 조달시장 분석\n• 위험관리 및 비상계획\n\n연계: 2과목 1번 주요항목',
    category: 'procedure',
    difficulty: 2,
  },
  {
    id: 's2-002',
    subject: '2과목',
    front: '사전규격공개와 입찰공고문 분석',
    back: '【사전규격공개 분석 포인트】\n• 과업내용 적정성 검토\n• 사업예산 적정성 검토\n• 법규 준수 여부 확인\n• 개선·보완 의견 제시\n\n【입찰공고문 분석】\n• 오류·법령위반 검토\n• 입찰보증금 제출방법 확인\n• 입찰설명회 참석 여부',
    category: 'concept',
    difficulty: 2,
  },
  {
    id: 's2-003',
    subject: '2과목',
    front: '낙찰자 결정 방법 4가지',
    back: '①적격심사: 최저가 순위자부터 이행능력 심사 (물품·용역 95점 이상)\n②협상계약: 기술+가격 분리평가, 우선협상대상자와 협상\n③희망수량경쟁입찰: 수량을 달리하여 입찰\n④종합심사낙찰제: 300억원 이상 공사, 가격+기술+신인도 종합평가\n\n【암기】 적협희종',
    category: 'compare',
    difficulty: 3,
    lawReference: '국가계약법 시행령 제42조',
  },
  {
    id: 's2-004',
    subject: '2과목',
    front: '입찰서 제출 및 무효 입찰 사유',
    back: '【입찰서 제출방법】\n나라장터 전자입찰 (원칙): 전자서명 후 제출\n\n【무효입찰 주요 사유】\n• 입찰보증금 미납\n• 자격 미달 업체\n• 동일인 2개 이상 입찰\n• 입찰가격이 예정가격 초과\n• 허위 서류 제출\n• 기재사항 오류 또는 불명확\n\n개찰 후 즉시 무효 처리',
    category: 'concept',
    difficulty: 2,
  },
]

// ── 3과목: 공공계약관리 (3개) ─────────────────────────────────────────────────
const s3Cards: ConceptCardData[] = [
  {
    id: 's3-001',
    subject: '3과목',
    front: '계약이행 관리 핵심 — 지체상금',
    back: '【지체상금률】\n• 물품: 지체일수 × 계약금액 × 0.25/1000\n• 공사: 지체일수 × 계약금액 × 0.5/1000\n• 용역: 지체일수 × 계약금액 × 0.25/1000\n\n【최고한도】 계약금액의 30%\n【면제 사유】 천재지변, 발주자 귀책사유, 불가항력\n\n법근거: 국가계약법 시행령 제74조',
    category: 'number',
    difficulty: 2,
    lawReference: '국가계약법 시행령 제74조',
  },
  {
    id: 's3-002',
    subject: '3과목',
    front: 'MAS(다수공급자계약) 2단계 경쟁',
    back: '【MAS 2단계경쟁 개념】\n나라장터 종합쇼핑몰에서 동일 품목 MAS 계약 업체들 간 추가 경쟁\n\n【2단계경쟁 적용 기준】\n• 추정가격 5천만원 이상\n• 동일 품목 MAS 업체 2개 이상\n\n【절차】 수요기관 요청 → 2단계경쟁 개시 → 가격·비가격 경쟁 → 최종 공급자 선정 → 납품·검수\n\n법근거: 다수공급자계약 물품 세부기준',
    category: 'procedure',
    difficulty: 3,
    lawReference: '다수공급자계약 물품 세부기준',
  },
  {
    id: 's3-003',
    subject: '3과목',
    front: '물가변동(E/S)으로 인한 계약금액 조정',
    back: '【조정요건】\n• 입찰일로부터 90일 경과\n• 물가변동 등락률 ±3% 이상\n\n【조정방법】\n①품목조정률: 계약품목별 가격 변동 적용\n②지수조정률: 생산자물가지수·노임단가 등 지수 적용\n\n【절차】 요건 확인 → 조정금액 산출 → 계약상대자 청구 → 변경계약 체결\n\n법근거: 국가계약법 시행령 제64조',
    category: 'procedure',
    difficulty: 3,
    lawReference: '국가계약법 시행령 제64조',
  },
]

// ── 4권실무: 공공조달 관리실무 (5개) ─────────────────────────────────────────
const s4Cards: ConceptCardData[] = [
  {
    id: 's4-001',
    subject: '4권실무',
    front: '나라장터 입찰참가자격 등록 절차 (4권 핵심)',
    back: '【전체 등록 절차 7단계】\n①개인회원 가입(본인인증)\n②이용약관 동의\n③입찰참가자격 등록신청\n④등록신청 온라인 서류제출\n⑤등록신청 현황 조회\n⑥입찰참가자격 등록신청 조회\n⑦승인 또는 반려\n\n유효기간: 3년\n관련 규정: 국가종합전자조달시스템 입찰참가자격 등록규정',
    category: 'procedure',
    difficulty: 2,
    lawReference: '국가종합전자조달시스템 입찰참가자격 등록규정',
  },
  {
    id: 's4-002',
    subject: '4권실무',
    front: '경쟁입찰참가자격 등록 필수서류 4가지',
    back: '【필수 제출 서류】\n①사업자등록증\n②법인등기부등본\n③인감증명서 또는 본인서명사실확인서\n④공동인증서\n\n【암기법】 사법인공\n"사(사업)업자가 법(법인)인인감(인)을 공(공인)인증받는다"\n\n등록증 유효기간: 3년 (기간 만료 전 갱신 필수)\n잘못된 정보 → 입찰참가자격 상실 위험',
    category: 'concept',
    difficulty: 1,
    lawReference: '국가종합전자조달시스템 입찰참가자격 등록규정',
  },
  {
    id: 's4-003',
    subject: '4권실무',
    front: '직접생산확인기준 — 중소기업자간 경쟁제품',
    back: '【직접생산확인 개요】\n• 확인 주체: 중소벤처기업부장관\n• 대상: 중소기업자간 경쟁제품 입찰 참여 업체\n\n【판단 기준 (2가지)】\n①해당 물품 핵심부품 직접 제조\n②최근 3년간 연속 생산실적 보유\n\n【암기】 중직핵생\n중소기업이 직접 핵심을 3년 생산해야 자격!\n\n미충족 시: 입찰참가자격 박탈',
    category: 'concept',
    difficulty: 3,
    lawReference: '중소기업자간 경쟁제품 직접생산확인에 관한 기준',
  },
  {
    id: 's4-004',
    subject: '4권실무',
    front: '원가계산 유형별 구성요소 (4권 제3장)',
    back: '【4가지 원가계산 유형】\n①공공조달 원가: 재료비+노무비+경비+일반관리비+이윤\n②제조원가: 직접원가(재료+노무+경비)+제조간접비+일반관리비+이윤\n③용역원가: 인건비+제경비+기술료+직접경비\n④공사원가: 재료비+노무비+경비+일반관리비+이윤+부가가치세\n\n【암기】 재노경관이\n법근거: 원가계산에 의한 예정가격작성 준칙',
    category: 'compare',
    difficulty: 3,
    lawReference: '원가계산에 의한 예정가격작성 준칙',
  },
  {
    id: 's4-005',
    subject: '4권실무',
    front: '기술(규격)협상과 가격협상 절차 (4권 제4장)',
    back: '【협상계약 전체 흐름】\n①RFP(제안요청서) 작성\n②제안서 접수\n③기술평가 → 기술적합자 선정\n④우선협상대상자 선정 (기술점수 최고득점자)\n⑤기술협상 (과업범위·규격 조정)\n⑥가격협상 (예산범위 내 합리적 가격 결정)\n⑦협상 성공 → 계약체결 / 실패 → 차순위자\n\n핵심: 기술평가와 가격평가를 분리하여 진행',
    category: 'procedure',
    difficulty: 2,
    lawReference: '국가계약법 시행령 제43조',
  },
]

// ── 전체 카드 병합 ───────────────────────────────────────────────────────────
const allCards: ConceptCardData[] = [
  ...s1Cards,
  ...s2Cards,
  ...s3Cards,
  ...s4Cards,
]

function getFilteredCards(filter: SubjectFilter): ConceptCardData[] {
  if (filter === '전체') {
    // 전체: 과목별 균형있게 선별하여 15개
    return [
      ...s1Cards.slice(0, 4),
      ...s2Cards.slice(0, 3),
      ...s3Cards.slice(0, 3),
      ...s4Cards.slice(0, 5),
    ]
  }
  return allCards.filter((c) => c.subject === filter)
}

const subjectTabs = [
  { id: '전체' as SubjectFilter, label: '전체 (15개)', color: 'bg-slate-800 text-white', inactive: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300' },
  { id: '1과목' as SubjectFilter, label: '1과목 법제도 (6개)', color: 'bg-violet-700 text-white', inactive: 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' },
  { id: '2과목' as SubjectFilter, label: '2과목 조달계획 (4개)', color: 'bg-blue-700 text-white', inactive: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  { id: '3과목' as SubjectFilter, label: '3과목 계약관리 (3개)', color: 'bg-emerald-700 text-white', inactive: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' },
  { id: '4권실무' as SubjectFilter, label: '4권 실무 (5개)', color: 'bg-rose-700 text-white', inactive: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300' },
]

const categoryLabel: Record<string, string> = {
  concept: '개념',
  compare: '비교',
  number: '숫자',
  law: '법조문',
  procedure: '절차',
}
const categoryColor: Record<string, string> = {
  concept: 'bg-blue-100 text-blue-700',
  compare: 'bg-purple-100 text-purple-700',
  number: 'bg-orange-100 text-orange-700',
  law: 'bg-indigo-100 text-indigo-700',
  procedure: 'bg-green-100 text-green-700',
}

export default function TodayReviewPage() {
  const [selectedSubject, setSelectedSubject] = useState<SubjectFilter>('전체')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [showReviewButtons, setShowReviewButtons] = useState(false)
  const [completedCards, setCompletedCards] = useState<Set<string>>(new Set())

  const cards = getFilteredCards(selectedSubject)
  const currentCard = cards[currentIndex] ?? cards[0]
  const totalCards = cards.length
  const completedCount = completedCards.size

  const handleSubjectChange = (sub: SubjectFilter) => {
    setSelectedSubject(sub)
    setCurrentIndex(0)
    setIsFlipped(false)
    setShowReviewButtons(false)
    setCompletedCards(new Set())
  }

  const handleNextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsFlipped(false)
      setShowReviewButtons(false)
    }
  }

  const handlePreviousCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setIsFlipped(false)
      setShowReviewButtons(false)
    }
  }

  const handleFlip = (flipped: boolean) => {
    setIsFlipped(flipped)
    if (flipped) setShowReviewButtons(true)
  }

  const handleReview = (rating: 'hard' | 'normal' | 'easy') => {
    setCompletedCards((prev) => new Set(prev).add(currentCard.id))
    if (currentIndex < cards.length - 1) {
      handleNextCard()
    } else {
      setShowReviewButtons(false)
    }
  }

  const isAllComplete = completedCount === totalCards && totalCards > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">오늘의 복습</h1>
              <p className="text-blue-200 text-sm mt-1">출제기준 100% 반영 — 4권 실무 포함 완전 학습</p>
            </div>
            <Link
              href="/learn"
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition text-sm"
            >
              뒤로 가기
            </Link>
          </div>
          <p className="text-blue-100 text-lg">
            복습 진행률: {completedCount}/{totalCards}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Subject filter tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {subjectTabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSubjectChange(tab.id)}
              className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-semibold whitespace-nowrap transition-all ${
                selectedSubject === tab.id ? tab.color + ' shadow-md' : tab.inactive
              }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${totalCards > 0 ? (completedCount / totalCards) * 100 : 0}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
            />
          </div>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 text-center">
            {totalCards > 0 ? Math.round((completedCount / totalCards) * 100) : 0}% 완료
          </p>
        </div>

        {/* Card subject badge */}
        {currentCard && !isAllComplete && (
          <div className="flex items-center gap-2 mb-4">
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
              currentCard.subject === '1과목' ? 'bg-violet-100 text-violet-700' :
              currentCard.subject === '2과목' ? 'bg-blue-100 text-blue-700' :
              currentCard.subject === '3과목' ? 'bg-emerald-100 text-emerald-700' :
              'bg-rose-100 text-rose-700'
            }`}>
              {currentCard.subject}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${categoryColor[currentCard.category]}`}>
              {categoryLabel[currentCard.category]}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
              currentCard.difficulty === 1 ? 'bg-green-100 text-green-700' :
              currentCard.difficulty === 2 ? 'bg-amber-100 text-amber-700' :
              'bg-red-100 text-red-700'
            }`}>
              {currentCard.difficulty === 1 ? '기본' : currentCard.difficulty === 2 ? '보통' : '심화'}
            </span>
          </div>
        )}

        {/* Completion message */}
        {isAllComplete ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/30 border border-green-300 dark:border-green-700 rounded-2xl p-12 text-center mb-8"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-4"
            >
              <CheckCircleIcon size={64} className="mx-auto text-green-600 dark:text-green-400" />
            </motion.div>
            <h2 className="text-3xl font-bold text-green-900 dark:text-green-200 mb-2">
              모든 카드를 완료했습니다! 🎉
            </h2>
            <p className="text-green-800 dark:text-green-300 mb-6">
              {selectedSubject === '전체' ? '전 과목' : selectedSubject} 핵심 개념 완료! 훌륭합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  setCurrentIndex(0)
                  setCompletedCards(new Set())
                  setIsFlipped(false)
                }}
                className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
              >
                다시 학습하기
              </button>
              <Link
                href="/learn"
                className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition"
              >
                학습 허브로 돌아가기
              </Link>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Card display */}
            {currentCard && (
              <motion.div
                key={`${selectedSubject}-${currentIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <ConceptCard
                  front={currentCard.front}
                  back={currentCard.back}
                  category={currentCard.category}
                  difficulty={currentCard.difficulty}
                  lawReference={currentCard.lawReference}
                  onFlip={handleFlip}
                />
              </motion.div>
            )}

            {/* Review buttons */}
            {showReviewButtons && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CardReviewButtons
                  onReview={handleReview}
                  currentInterval={currentIndex + 1}
                />
              </motion.div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10">
              <button
                onClick={handlePreviousCard}
                disabled={currentIndex === 0}
                className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition"
              >
                <ChevronLeftIcon size={20} />
                이전 카드
              </button>

              <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                {currentIndex + 1} / {totalCards}
              </span>

              <button
                onClick={handleNextCard}
                disabled={currentIndex === totalCards - 1}
                className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition"
              >
                다음 카드
                <ChevronRightIcon size={20} />
              </button>
            </div>
          </>
        )}

        {/* 학습 가이드 */}
        <div className="mt-10 p-5 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl">
          <h3 className="font-bold text-blue-900 dark:text-blue-200 mb-2">📚 과목별 학습 포인트</h3>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div className="space-y-1">
              <div className="flex items-start gap-2">
                <span className="px-1.5 py-0.5 bg-violet-100 text-violet-700 rounded text-xs font-semibold flex-shrink-0">1과목</span>
                <span className="text-blue-800 dark:text-blue-300">법령 근거와 원칙, 소액기준 암기</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-semibold flex-shrink-0">2과목</span>
                <span className="text-blue-800 dark:text-blue-300">입찰·낙찰 절차와 무효 사유</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-start gap-2">
                <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 rounded text-xs font-semibold flex-shrink-0">3과목</span>
                <span className="text-blue-800 dark:text-blue-300">지체상금률·MAS·물가변동 기준</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="px-1.5 py-0.5 bg-rose-100 text-rose-700 rounded text-xs font-semibold flex-shrink-0">4권실무</span>
                <span className="text-blue-800 dark:text-blue-300">나라장터 절차·원가계산·협상 흐름</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
