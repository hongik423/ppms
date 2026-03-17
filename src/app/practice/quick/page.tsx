'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeftIcon, CheckCircleIcon, BarChart3Icon, XCircleIcon } from 'lucide-react';
import { QuestionCard } from '@/components/practice/QuestionCard';
import { ExplanationPanel } from '@/components/practice/ExplanationPanel';

interface Question {
  id: string;
  questionNumber: number;
  totalQuestions: number;
  subject: string;
  difficulty: 1 | 2 | 3;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  wrongExplanations: string[];
  lawReference?: string;
}

const allQuestions: Question[] = [
  // 1과목 (공공조달과 법제도 이해)
  {
    id: '1',
    questionNumber: 1,
    totalQuestions: 20,
    subject: '1과목',
    difficulty: 1,
    text: '공공조달의 정의로서 가장 적절한 것은?',
    options: [
      '국가·지방자치단체·공공기관이 업무수행에 필요한 물품·용역·공사를 외부로부터 취득하는 행위',
      '개인이 필요한 물품을 구매하는 행위',
      '공급업체가 정부에 판매하는 행위',
      '조달청이 물품을 비축하는 행위'
    ],
    correctAnswer: 0,
    explanation: '공공조달의 정의는 국가·지방자치단체·공공기관이 업무수행에 필요한 물품·용역·공사를 외부로부터 취득하는 행위입니다.',
    wrongExplanations: [
      '개인의 물품 구매는 공공조달이 아닙니다.',
      '공급업체의 판매 행위는 공공조달의 정의에 해당하지 않습니다.',
      '비축은 공공조달의 범위에 포함되지 않습니다.'
    ],
    lawReference: '조달사업법 제1조'
  },
  {
    id: '2',
    questionNumber: 2,
    totalQuestions: 20,
    subject: '1과목',
    difficulty: 1,
    text: '추정가격과 예정가격의 가장 큰 차이점은?',
    options: [
      '추정가격은 부가가치세 제외, 예정가격은 부가가치세 포함',
      '추정가격은 부가가치세 포함, 예정가격은 부가가치세 제외',
      '추정가격은 입찰 후 결정, 예정가격은 입찰 전 결정',
      '추정가격과 예정가격은 동일한 개념이다'
    ],
    correctAnswer: 0,
    explanation: '추정가격은 계약금액의 적정성을 판단하기 위해 입찰 전에 산정되며 부가가치세를 제외한 가격입니다. 반면 예정가격은 부가가치세를 포함한 가격입니다.',
    wrongExplanations: [
      '부가가치세 포함 여부가 반대입니다.',
      '두 가격 모두 입찰 전에 결정됩니다.',
      '추정가격과 예정가격은 서로 다른 목적의 가격입니다.'
    ],
    lawReference: '국가계약법 시행령 제7조, 제9조'
  },
  {
    id: '3',
    questionNumber: 3,
    totalQuestions: 20,
    subject: '1과목',
    difficulty: 2,
    text: '수의계약이 허용되는 경우로 가장 적절하지 않은 것은?',
    options: [
      '천재지변으로 인한 긴급한 복구공사',
      '특허품이나 전문기술을 가진 특정인과의 계약',
      '모든 기업이 동등하게 경쟁할 수 있는 일반적인 물품 구매',
      '추정가격이 소액기준(물품 2천만원) 이하인 경우'
    ],
    correctAnswer: 2,
    explanation: '수의계약은 경쟁 없이 특정인과 직접 계약하는 방식으로, 일반적이고 모든 기업이 동등하게 경쟁할 수 있는 경우에는 일반경쟁입찰을 해야 합니다.',
    wrongExplanations: [
      '긴급한 복구공사는 수의계약의 허용 사유입니다.',
      '특허품이나 전문기술은 수의계약의 허용 사유입니다.',
      '소액기준 이하는 수의계약의 허용 사유입니다.'
    ],
    lawReference: '국가계약법 시행령 제26조'
  },
  {
    id: '4',
    questionNumber: 4,
    totalQuestions: 20,
    subject: '1과목',
    difficulty: 2,
    text: '계약보증금에 대한 설명으로 가장 적절한 것은?',
    options: [
      '계약금액의 10~15%, 발주자 귀속, 계약이행 확보 목적',
      '계약금액의 20~25%, 계약상대자 귀속, 손해배상 목적',
      '추정가격의 10%, 계약기간 중 계약상대자가 보관',
      '낙찰가격의 5%, 입찰 후 반환'
    ],
    correctAnswer: 0,
    explanation: '계약보증금은 계약금액의 10~15%로, 계약이행을 확보하기 위한 담보금입니다. 계약이행이 완료되지 않거나 채무불이행이 발생하면 발주자가 귀속합니다.',
    wrongExplanations: [
      '계약보증금의 비율과 귀속이 부정확합니다.',
      '계약보증금은 발주자를 위한 담보이므로 발주자 귀속입니다.',
      '이는 입찰보증금에 대한 설명입니다.'
    ],
    lawReference: '국가계약법 시행령 제50조'
  },
  {
    id: '5',
    questionNumber: 5,
    totalQuestions: 20,
    subject: '1과목',
    difficulty: 3,
    text: '부정당업자 제재 절차와 제재기간에 대한 설명으로 가장 적절한 것은?',
    options: [
      '통보 → 청문 → 처분 → 관보공고, 제재기간 1개월 이상 2년 이하',
      '청문 → 통보 → 처분, 제재기간 1년 이상 3년 이하',
      '즉시 처분 후 청문, 제재기간 6개월 이상 2년 이하',
      '민간 중재위원회 심의 후 처분, 제재기간 정해지지 않음'
    ],
    correctAnswer: 0,
    explanation: '부정당업자 제재 절차는 ①통보 ②청문 ③처분 ④관보공고 순서로 진행되며, 제재기간은 1개월 이상 2년 이하입니다.',
    wrongExplanations: [
      '제재 절차 순서와 기간이 부정확합니다.',
      '청문은 제재 통보 후에 실시됩니다.',
      '제재기간은 법으로 정해져 있습니다.'
    ],
    lawReference: '국가계약법 제27조, 시행령 제76조'
  },
  {
    id: '6',
    questionNumber: 6,
    totalQuestions: 20,
    subject: '2과목',
    difficulty: 1,
    text: '공공조달 계획 수립의 기본 원칙으로 가장 적절한 것은?',
    options: [
      '투명성, 공정성, 효율성, 경제성',
      '신속성, 기밀성, 효율성, 판매성',
      '효율성, 선택성, 공개성, 제한성',
      '공정성, 독점성, 효율성, 획일성'
    ],
    correctAnswer: 0,
    explanation: '공공조달의 기본 원칙은 투명성, 공정성, 효율성, 경제성입니다. 이는 공공 자원의 효율적 사용과 공정한 경쟁을 보장합니다.',
    wrongExplanations: [
      '신속성과 기밀성은 공공조달의 기본 원칙이 아닙니다.',
      '공공조달은 투명하고 개방적이어야 합니다.',
      '공공조달은 경쟁을 촉진하고 독점을 배제합니다.'
    ],
    lawReference: '조달사업법 제1조의2'
  },
  {
    id: '7',
    questionNumber: 7,
    totalQuestions: 20,
    subject: '2과목',
    difficulty: 2,
    text: '적격심사에 대한 설명으로 가장 적절한 것은?',
    options: [
      '최저가 입찰자부터 순서대로 계약이행 능력을 심사하는 제도',
      '모든 입찰자를 동시에 종합적으로 평가하는 제도',
      '가장 높은 가격을 제시한 자를 자동으로 낙찰자로 결정',
      '입찰 전에 참가자격을 사전에 심사하는 제도'
    ],
    correctAnswer: 0,
    explanation: '적격심사는 최저가 입찰자부터 순서대로 계약이행 능력(이행실적, 기술능력, 재무상태 등)을 종합 심사하여 낙찰자를 결정하는 제도입니다.',
    wrongExplanations: [
      '적격심사는 최저가부터 순차적으로 진행됩니다.',
      '높은 가격을 자동 선택하지 않습니다.',
      '입찰참가자격 사전심사(PQ)와는 다른 개념입니다.'
    ],
    lawReference: '국가계약법 시행령 제42조'
  },
  {
    id: '8',
    questionNumber: 8,
    totalQuestions: 20,
    subject: '2과목',
    difficulty: 2,
    text: '다수공급자계약(MAS)의 특징으로 가장 적절하지 않은 것은?',
    options: [
      '2단계 경쟁을 통해 2인 이상의 공급자와 단가계약 체결',
      '동일한 규격의 물품을 대상으로 적용',
      '수요기관이 2단계에서 최종 공급자 선택',
      '1단계에서 모든 공급자를 낙찰자로 확정'
    ],
    correctAnswer: 3,
    explanation: 'MAS는 1단계에서 가격경쟁을 통해 공급자를 선정하고, 2단계에서 수요기관이 가격·비가격 요소를 종합 평가하여 최종 공급자를 선택합니다.',
    wrongExplanations: [
      '2단계 경쟁은 MAS의 핵심 절차입니다.',
      '동일 규격 물품이 MAS의 대상입니다.',
      '2단계에서 수요기관의 선택이 이루어집니다.'
    ],
    lawReference: '조달사업법 제5조의2'
  },
  {
    id: '9',
    questionNumber: 9,
    totalQuestions: 20,
    subject: '3과목',
    difficulty: 1,
    text: '계약관리의 주요 단계로 가장 적절한 것은?',
    options: [
      '계약 체결, 계약 이행, 계약 종료',
      '계획 수립, 예정가격 산정, 낙찰자 결정',
      '입찰공고, 개찰, 이의제기',
      '보증금 납부, 기성금 청구, 계약이행'
    ],
    correctAnswer: 0,
    explanation: '계약관리는 계약 체결 후 계약 이행 여부를 감독하고, 계약 종료 후 정산하는 일련의 과정입니다.',
    wrongExplanations: [
      '계획 수립과 예정가격 산정은 계약관리 전의 과정입니다.',
      '입찰 관련 절차는 계약 체결 전의 과정입니다.',
      '보증금과 기성금은 계약 이행의 일부이지만 전체 단계는 아닙니다.'
    ],
    lawReference: '국가계약법 제46조'
  },
  {
    id: '10',
    questionNumber: 10,
    totalQuestions: 20,
    subject: '3과목',
    difficulty: 2,
    text: '설계변경이 필요한 경우로 가장 적절한 것은?',
    options: [
      '발주자의 요구 또는 현장 상황 변화로 설계 내용이 변경되어야 하는 경우',
      '계약상대자가 단순히 방법을 달리하고자 하는 경우',
      '계약상대자의 자체 판단에 의한 모든 변경',
      '기상악화로 인한 일시적 작업 중단'
    ],
    correctAnswer: 0,
    explanation: '설계변경은 발주자의 요구 또는 현장조건 변화(지하수 발생, 지반 상태 변화 등)로 인해 설계 내용 변경이 불가피한 경우에 승인됩니다.',
    wrongExplanations: [
      '계약상대자의 개인적 판단은 설계변경 사유가 아닙니다.',
      '발주자 승인 없이 변경할 수 없습니다.',
      '일시적 중단은 설계변경이 아닙니다.'
    ],
    lawReference: '국가계약법 시행령 제65조'
  },
  {
    id: '11',
    questionNumber: 11,
    totalQuestions: 20,
    subject: '3과목',
    difficulty: 2,
    text: '하도급관리에서 하도급지킴이 시스템의 주요 목적은?',
    options: [
      '하도급 대금의 적정한 지급을 확보하고 모니터링하는 것',
      '하도급 업체의 임금을 정부가 직접 지급하는 것',
      '하도급을 완전히 금지하는 것',
      '하도급 업체를 선정하는 것'
    ],
    correctAnswer: 0,
    explanation: '하도급지킴이 시스템은 공사의 하도급 대금이 적정하게 지급되고 있는지 모니터링하여 하도급 업체를 보호하기 위한 제도입니다.',
    wrongExplanations: [
      '정부가 직접 임금을 지급하지는 않습니다.',
      '하도급 자체를 금지하지 않으며, 합리적 범위 내에서 허용합니다.',
      '선정은 시스템의 목적이 아닙니다.'
    ],
    lawReference: '건설산업기본법 제29조'
  },
  {
    id: '12',
    questionNumber: 12,
    totalQuestions: 20,
    subject: '3과목',
    difficulty: 3,
    text: '계약 해제와 해지의 차이점으로 가장 적절한 것은?',
    options: [
      '해제는 소급 효과, 해지는 장래 효과',
      '해제와 해지는 동일한 개념',
      '해제는 장래 효과, 해지는 소급 효과',
      '해제는 채무불이행만 가능, 해지는 모든 사유 가능'
    ],
    correctAnswer: 0,
    explanation: '계약 해제는 계약을 원래 상태로 돌리는 소급 효과를 가지며, 계약 해지는 앞으로의 계약을 종료하는 장래 효과를 가집니다.',
    wrongExplanations: [
      '두 개념은 법적 효과가 다릅니다.',
      '해제와 해지의 효과가 반대입니다.',
      '계약 해제의 사유가 더 광범위합니다.'
    ],
    lawReference: '민법 제543조~제553조, 국가계약법 시행령 제76조'
  },
  {
    id: '13',
    questionNumber: 13,
    totalQuestions: 20,
    subject: '4과목',
    difficulty: 1,
    text: '공공조달 관리실무에서 전자조달시스템(나라장터)의 주요 기능은?',
    options: [
      '공공 입찰 공고부터 대금결제까지 전 과정을 전자적으로 처리',
      '물품의 물리적 배송을 담당',
      '입찰자의 자격 확인만 수행',
      '민간기업 물품 판매만 처리'
    ],
    correctAnswer: 0,
    explanation: '나라장터는 조달청이 운영하는 국가종합전자조달시스템으로, 공공 입찰 공고에서부터 투찰, 개찰, 낙찰, 계약, 대금결제까지 전 과정을 전자적으로 처리합니다.',
    wrongExplanations: [
      '나라장터는 물품 배송을 담당하지 않습니다.',
      '나라장터는 종합 조달 업무를 수행합니다.',
      '나라장터는 공공조달을 전문으로 합니다.'
    ],
    lawReference: '전자조달법 제2조'
  },
  {
    id: '14',
    questionNumber: 14,
    totalQuestions: 20,
    subject: '4과목',
    difficulty: 2,
    text: '나라장터의 주요 서비스로 가장 적절하지 않은 것은?',
    options: [
      '소비자 직구매 쇼핑몰',
      '종합쇼핑몰(MAS 물품 구매)',
      '혁신장터(혁신제품 전용)',
      '벤처나라(벤처기업 제품)'
    ],
    correctAnswer: 0,
    explanation: '나라장터는 공공기관의 조달을 위한 시스템이므로, 일반 소비자 직구매 쇼핑몰은 주요 서비스가 아닙니다.',
    wrongExplanations: [
      '종합쇼핑몰은 나라장터의 주요 서비스입니다.',
      '혁신장터는 혁신제품 지원 서비스입니다.',
      '벤처나라는 벤처기업 지원 서비스입니다.'
    ],
    lawReference: '전자조달법 시행령'
  },
  {
    id: '15',
    questionNumber: 15,
    totalQuestions: 20,
    subject: '4과목',
    difficulty: 2,
    text: '지체상금에 대한 설명으로 가장 적절한 것은?',
    options: [
      '납기 지연 시 부과되는 배상금이며, 물품·용역은 0.25%, 공사는 0.5‰',
      '모든 경우 필수 부과되며 면제가 불가능',
      '낙찰자의 입찰가격에 포함되어 있음',
      '계약보증금으로 전액 환수'
    ],
    correctAnswer: 0,
    explanation: '지체상금은 계약상대자가 계약서에 정한 납기 내에 이행하지 못한 경우 부과되는 배상금으로, 물품·용역은 0.25%, 공사는 0.5‰의 율로 계산됩니다. 단, 불가항력 사유는 면제됩니다.',
    wrongExplanations: [
      '불가항력 사유 등으로 면제될 수 있습니다.',
      '지체상금은 입찰가에 별도로 가산됩니다.',
      '지체상금은 별도로 청구합니다.'
    ],
    lawReference: '국가계약법 시행령 제74조'
  },
  {
    id: '16',
    questionNumber: 16,
    totalQuestions: 20,
    subject: '4과목',
    difficulty: 3,
    text: '리스크 관리의 주요 단계로 가장 적절한 것은?',
    options: [
      '리스크 식별 → 정성적/정량적 분석 → 대응전략 수립 → 모니터링',
      '즉시 회피 → 사후 처리 → 종료',
      '책임자 지정 → 처벌 → 보상',
      '보험 가입 → 보험사 통지 → 청구'
    ],
    correctAnswer: 0,
    explanation: '공공조달의 리스크 관리는 사전에 리스크를 식별하고, 정성적 및 정량적 분석을 거쳐, 회피·전가·완화·수용의 대응전략을 수립한 후, 지속적으로 모니터링합니다.',
    wrongExplanations: [
      '리스크 관리는 사후 처리가 아닌 사전 예방입니다.',
      '리스크 관리는 징벌이 아닌 관리입니다.',
      '리스크 관리는 보험 가입만으로 완성되지 않습니다.'
    ],
    lawReference: '공공조달 리스크 관리 가이드'
  },
  {
    id: '17',
    questionNumber: 17,
    totalQuestions: 20,
    subject: '1과목',
    difficulty: 3,
    text: '혁신제품 지정 제도의 단계로 가장 적절한 것은?',
    options: [
      '혁신시제품 지정 → 성능인증 → 혁신제품 지정',
      '혁신제품 지정 → 성능인증 → 시장 출시',
      '신청 → 평가 → 구매약정만 필요',
      '조달청장 자의적 지정'
    ],
    correctAnswer: 0,
    explanation: '혁신제품 지정 절차는 혁신시제품 지정(개발 제품) → 성능인증(신청자 의뢰) → 혁신제품 지정(조달청)의 3단계로 진행됩니다.',
    wrongExplanations: [
      '혁신제품 지정은 성능인증을 거쳐야 합니다.',
      '구매약정만으로는 지정되지 않습니다.',
      '조달청장도 일정한 기준에 따라 지정합니다.'
    ],
    lawReference: '조달사업법 제9조의2, 제9조의3'
  },
  {
    id: '18',
    questionNumber: 18,
    totalQuestions: 20,
    subject: '2과목',
    difficulty: 3,
    text: '협상계약(분리입찰)의 절차로 가장 적절한 것은?',
    options: [
      '제안요청 → 기술평가 → 기술협상 → 가격협상 → 계약',
      '가격입찰 → 기술입찰 → 낙찰자 결정',
      '최저가 선택 → 계약',
      '일괄 입찰 → 개찰 → 낙찰'
    ],
    correctAnswer: 0,
    explanation: '협상계약은 기술과 가격을 분리하여 입찰하고, 기술평가 → 우선협상대상자 선정 → 기술협상 → 가격협상 → 최종 계약의 순서로 진행됩니다.',
    wrongExplanations: [
      '협상계약은 협상 과정이 포함됩니다.',
      '가격과 기술을 분리하여 진행합니다.',
      '협상 없이는 진행되지 않습니다.'
    ],
    lawReference: '국가계약법 시행령 제43조'
  },
  {
    id: '19',
    questionNumber: 19,
    totalQuestions: 20,
    subject: '3과목',
    difficulty: 1,
    text: '기성금 청구의 기본 요건으로 가장 적절한 것은?',
    options: [
      '검사합격 + 청구 요청 + 기성 현황표 제출',
      '낙찰자 선정만으로 자동 지급',
      '계약체결 후 즉시 지급',
      '기성금 청구 기한 없음'
    ],
    correctAnswer: 0,
    explanation: '기성금 청구는 공사가 진행되면서 준공부분이 검사에 합격해야 하며, 계약상대자가 청구서와 기성 현황표를 제출해야 합니다.',
    wrongExplanations: [
      '낙찰자 선정만으로는 기성금이 지급되지 않습니다.',
      '계약 체결 후 공사 진행 부분에 대해 청구 가능합니다.',
      '기성금 청구는 공사 기간 중 가능합니다.'
    ],
    lawReference: '국가계약법 시행령 제70조'
  },
  {
    id: '20',
    questionNumber: 20,
    totalQuestions: 20,
    subject: '4과목',
    difficulty: 3,
    text: '분쟁조정과 유권해석의 차이점으로 가장 적절한 것은?',
    options: [
      '분쟁조정은 분쟁 해결, 유권해석은 법령 해석의 공식 견해',
      '둘 다 동일하게 법적 구속력이 있음',
      '분쟁조정은 기획재정부, 유권해석은 법원',
      '유권해석이 분쟁조정보다 항상 우선'
    ],
    correctAnswer: 0,
    explanation: '분쟁조정은 국가계약분쟁조정위원회 또는 지방계약분쟁조정위원회에서 계약 관련 분쟁을 해결하는 것이며, 유권해석은 기획재정부(국가) 또는 행정안전부(지방)가 법령 해석을 공식 제시하는 것입니다.',
    wrongExplanations: [
      '유권해석은 해석일 뿐 분쟁 해결 기구가 아닙니다.',
      '분쟁조정은 당사자 간 분쟁 해결 절차입니다.',
      '유권해석은 기획재정부나 행정안전부가 제시합니다.'
    ],
    lawReference: '국가계약법 제29조, 지방계약법 제35조'
  }
];

type Step = 'settings' | 'solving' | 'results';

interface Settings {
  subject: '전과목' | '1과목' | '2과목' | '3과목' | '4과목';
  difficulty: 1 | 2 | 3;
  count: 5 | 10 | 15 | 20;
}

interface Answer {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
}

export default function QuickPracticePage() {
  const [step, setStep] = useState<Step>('settings');
  const [settings, setSettings] = useState<Settings>({
    subject: '전과목',
    difficulty: 2,
    count: 5,
  });
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [mockQuestions, setMockQuestions] = useState<Question[]>([]);

  const getFilteredQuestions = (selectedSettings: Settings) => {
    let filtered = allQuestions;

    // Filter by subject
    if (selectedSettings.subject !== '전과목') {
      filtered = filtered.filter(q => q.subject === selectedSettings.subject);
    }

    // Filter by difficulty
    filtered = filtered.filter(q => q.difficulty === selectedSettings.difficulty);

    // Return only the requested count
    return filtered.slice(0, selectedSettings.count);
  };

  const handleStartQuiz = () => {
    const questions = getFilteredQuestions(settings);
    setMockQuestions(questions.map((q, idx) => ({ ...q, questionNumber: idx + 1, totalQuestions: questions.length })));
    setStep('solving');
    setAnswers([]);
    setCurrentQuestionIdx(0);
  };

  const handleAnswerSelected = (optionIndex: number) => {
    const question = mockQuestions[currentQuestionIdx];
    const isCorrect = optionIndex === question.correctAnswer;

    setAnswers([
      ...answers,
      {
        questionId: question.id,
        selectedAnswer: optionIndex,
        isCorrect,
      },
    ]);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < mockQuestions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
      setShowExplanation(false);
    } else {
      setStep('results');
    }
  };

  const currentQuestion = mockQuestions[currentQuestionIdx];
  const currentAnswer = answers[currentQuestionIdx];
  const correctCount = answers.filter((a) => a.isCorrect).length;
  const accuracy = answers.length > 0 ? Math.round((correctCount / answers.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/practice"
            className="flex items-center gap-2 text-blue-100 hover:text-white mb-4 w-fit transition"
          >
            <ChevronLeftIcon size={20} />
            뒤로 가기
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">빠른 문제 풀이</h1>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {/* Settings step */}
          {step === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-md border border-slate-200 dark:border-slate-700">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
                  학습 설정
                </h2>

                <div className="space-y-6">
                  {/* Subject selection */}
                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">
                      과목 선택
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {['전과목', '1과목', '2과목', '3과목', '4과목'].map((subject) => (
                        <motion.button
                          key={subject}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            setSettings({
                              ...settings,
                              subject: subject as Settings['subject'],
                            })
                          }
                          className={`py-3 px-4 rounded-lg font-bold transition ${
                            settings.subject === subject
                              ? 'bg-blue-800 text-white'
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-600 hover:border-blue-400'
                          }`}
                        >
                          {subject}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Difficulty selection */}
                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">
                      난이도 선택
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: 1, label: '기초' },
                        { value: 2, label: '응용' },
                        { value: 3, label: '실전' },
                      ].map((level) => (
                        <motion.button
                          key={level.value}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            setSettings({
                              ...settings,
                              difficulty: level.value as Settings['difficulty'],
                            })
                          }
                          className={`py-3 px-4 rounded-lg font-bold transition ${
                            settings.difficulty === level.value
                              ? level.value === 1
                                ? 'bg-green-600 text-white'
                                : level.value === 2
                                ? 'bg-amber-600 text-white'
                                : 'bg-red-600 text-white'
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-600 hover:border-blue-400'
                          }`}
                        >
                          {level.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Question count selection */}
                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">
                      문항 수 선택
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                      {[5, 10, 15, 20].map((count) => (
                        <motion.button
                          key={count}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            setSettings({
                              ...settings,
                              count: count as Settings['count'],
                            })
                          }
                          className={`py-3 px-4 rounded-lg font-bold transition ${
                            settings.count === count
                              ? 'bg-blue-800 text-white'
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-600 hover:border-blue-400'
                          }`}
                        >
                          {count}문제
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Start button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStartQuiz}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg transition mt-8"
                  >
                    풀이 시작하기
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Solving step */}
          {step === 'solving' && mockQuestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    진행 상황
                  </span>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    {currentQuestionIdx + 1} / {mockQuestions.length}
                  </span>
                </div>
                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${((currentQuestionIdx + 1) / mockQuestions.length) * 100}%`,
                    }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                  />
                </div>
              </div>

              {/* Question */}
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <QuestionCard
                  question={currentQuestion}
                  onAnswer={handleAnswerSelected}
                  selectedAnswer={currentAnswer?.selectedAnswer ?? null}
                  showResult={showExplanation}
                />

                {/* Explanation */}
                {showExplanation && currentAnswer && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <ExplanationPanel
                      explanation={currentQuestion.explanation}
                      wrongExplanations={currentQuestion.wrongExplanations}
                      lawReference={currentQuestion.lawReference}
                    />

                    {/* Next button */}
                    <div className="flex justify-center mt-8">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextQuestion}
                        className="px-8 py-3 bg-blue-800 hover:bg-blue-900 text-white font-bold rounded-lg transition"
                      >
                        {currentQuestionIdx === mockQuestions.length - 1
                          ? '결과 보기'
                          : '다음 문제'}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}

          {/* Results step */}
          {step === 'results' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="max-w-2xl mx-auto">
                {/* Result cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700 text-center"
                  >
                    <BarChart3Icon size={32} className="mx-auto text-blue-600 dark:text-blue-400 mb-2" />
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold uppercase mb-2">
                      정답률
                    </p>
                    <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                      {accuracy}%
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700 text-center"
                  >
                    <CheckCircleIcon size={32} className="mx-auto text-green-600 dark:text-green-400 mb-2" />
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold uppercase mb-2">
                      정답
                    </p>
                    <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                      {correctCount}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700 text-center"
                  >
                    <XCircleIcon size={32} className="mx-auto text-red-600 dark:text-red-400 mb-2" />
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold uppercase mb-2">
                      오답
                    </p>
                    <p className="text-4xl font-bold text-red-600 dark:text-red-400">
                      {answers.length - correctCount}
                    </p>
                  </motion.div>
                </div>

                {/* Answer review */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-700 mb-8">
                  <div className="bg-slate-50 dark:bg-slate-900/50 px-6 py-4 border-b border-slate-200 dark:border-slate-700">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      답변 검토
                    </h3>
                  </div>
                  <div className="divide-y divide-slate-200 dark:divide-slate-700">
                    {answers.map((answer, idx) => {
                      const question = mockQuestions[idx];
                      return (
                        <div key={answer.questionId} className="p-6">
                          <div className="flex items-start justify-between mb-2">
                            <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                              Q{idx + 1}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold ${
                                answer.isCorrect
                                  ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
                                  : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
                              }`}
                            >
                              {answer.isCorrect ? '정답' : '오답'}
                            </span>
                          </div>
                          <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                            {question.text.substring(0, 60)}...
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setStep('settings')}
                    className="flex-1 py-4 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-bold rounded-lg transition hover:bg-slate-300 dark:hover:bg-slate-600"
                  >
                    다시 풀기
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="/practice"
                      className="flex-1 py-4 bg-blue-800 hover:bg-blue-900 text-white font-bold rounded-lg transition block text-center"
                    >
                      문제 풀이로 돌아가기
                    </Link>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
