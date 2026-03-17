import type { Scenario, ExamHistory } from '@/types';

// ExamQuestion - UI전용 타입 (mock data)
export interface ExamQuestion {
  id: string;
  number: number;
  subject: 'procurement' | 'contract' | 'finance';
  content: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'normal' | 'hard';
}

export type SubjectKey = 'procurement' | 'contract' | 'finance';

// Sample exam questions
export const SAMPLE_QUESTIONS: ExamQuestion[] = [
  {
    id: 'q1', number: 1, subject: 'procurement',
    content: '공공조달의 기본원칙에 해당하지 않는 것은?',
    options: ['투명성', '공정성', '경쟁성', '비밀성'],
    correctAnswer: 3,
    explanation: '공공조달의 기본원칙은 투명성, 공정성, 경쟁성, 효율성입니다.',
    difficulty: 'normal'
  },
  {
    id: 'q2', number: 2, subject: 'procurement',
    content: '경쟁입찰의 최저가격낙찰제는 어떤 경우에 적용되는가?',
    options: ['기술력이 중요한 용역', '표준화된 물품 구매', '연구용역', '설계용역'],
    correctAnswer: 1,
    explanation: '최저가격낙찰제는 표준화되고 기술차별이 적은 물품 구매에 적용됩니다.',
    difficulty: 'normal'
  },
  {
    id: 'q3', number: 3, subject: 'procurement',
    content: '공고기간의 최소 기한은?',
    options: ['3일', '5일', '7일', '10일'],
    correctAnswer: 2,
    explanation: '공고기간은 일반적으로 최소 7일 이상입니다.',
    difficulty: 'easy'
  },
  {
    id: 'q4', number: 4, subject: 'contract',
    content: '계약금의 지급 시기는 일반적으로 언제인가?',
    options: ['계약체결 전', '계약체결 후', '공사 착공 후', '공사 준공 후'],
    correctAnswer: 1,
    explanation: '계약금은 계약체결 후 통상 30일 이내에 지급됩니다.',
    difficulty: 'normal'
  },
  {
    id: 'q5', number: 5, subject: 'contract',
    content: '기성금은 공사 진행도가 몇 % 이상일 때 청구할 수 있는가?',
    options: ['10%', '20%', '30%', '50%'],
    correctAnswer: 1,
    explanation: '기성금은 일반적으로 공사 진행도가 20% 이상일 때 청구할 수 있습니다.',
    difficulty: 'normal'
  },
  {
    id: 'q6', number: 6, subject: 'contract',
    content: '부실공사의 하자 보수 책임기간은?',
    options: ['준공일부터 1년', '준공일부터 2년', '준공일부터 3년', '준공일부터 5년'],
    correctAnswer: 0,
    explanation: '부실공사의 하자 보수 책임기간은 준공일부터 1년입니다.',
    difficulty: 'easy'
  },
  {
    id: 'q7', number: 7, subject: 'finance',
    content: '공공조달 예산의 보정 사유가 될 수 없는 것은?',
    options: ['인건비 인상', '재료비 급등', '설계 오류', '낙찰율 하락'],
    correctAnswer: 3,
    explanation: '낙찰율 하락은 이미 공고 시 반영된 요소로 보정사유가 될 수 없습니다.',
    difficulty: 'hard'
  },
  {
    id: 'q8', number: 8, subject: 'finance',
    content: '선금 지급액은 계약금의 몇 %까지 가능한가?',
    options: ['50%', '70%', '80%', '100%'],
    correctAnswer: 2,
    explanation: '선금 지급액은 계약금의 80% 범위 내에서 지급할 수 있습니다.',
    difficulty: 'normal'
  },
  {
    id: 'q9', number: 9, subject: 'finance',
    content: '기성금 청구 시 필요한 서류가 아닌 것은?',
    options: ['기성내역서', '시공사진', '근로자 건강검진 기록', '품질검사성적서'],
    correctAnswer: 2,
    explanation: '기성금 청구에는 기성내역서, 시공사진, 품질검사성적서가 필요합니다.',
    difficulty: 'normal'
  },
  {
    id: 'q10', number: 10, subject: 'procurement',
    content: '적격심사제의 주요 목적은?',
    options: ['가장 저렴한 가격 선정', '발주처 만족도 최대화', '적정한 자격을 갖춘 입찰자 선정', '신규 업체 육성'],
    correctAnswer: 2,
    explanation: '적격심사제는 기술력, 신뢰성, 이행능력 등 적정한 자격을 갖춘 업체를 선정하는 제도입니다.',
    difficulty: 'normal'
  },
];

export function generateExamQuestions(count: number): ExamQuestion[] {
  const questions: ExamQuestion[] = [];
  for (let i = 0; i < count; i++) {
    const baseQuestion = SAMPLE_QUESTIONS[i % SAMPLE_QUESTIONS.length];
    questions.push({ ...baseQuestion, id: `q${i + 1}`, number: i + 1 });
  }
  return questions;
}

// Sample scenarios for practical training
export const SAMPLE_SCENARIOS: Scenario[] = [
  {
    id: 's1', topicId: 'p1', title: '수의계약 선택 기준 판단', difficulty: 'normal',
    content: 'A 시에서 노후 상수도관 교체 공사가 필요합니다. 예정가격 2억 원, 긴급 상황으로 시간이 촉박합니다.',
    requirements: ['수의계약 적용 가능 여부 판단', '적용할 경우 법적 근거 제시', '입찰 대체 시 절차 설명', '관련 서류 준비 목록'],
    timeGuide: 30, topic: '계약 방법 선택'
  },
  {
    id: 's2', topicId: 'p1', title: '경쟁입찰 공고 절차', difficulty: 'normal',
    content: 'B 도청에서 도로 보수 공사(예정가격 5억 원)를 발주하려고 합니다.',
    requirements: ['적절한 입찰 방식 선택', '공고기간 설정', '입찰 참가 자격 기준', '예정가격 공개 방법'],
    timeGuide: 35, topic: '계약 방법 선택'
  },
  {
    id: 's3', topicId: 'p2', title: '기성금 청구 및 지급', difficulty: 'normal',
    content: '건설회사 D에서 공공 주택 신축 공사를 시공 중입니다. 현재 공사 진행도가 35%입니다.',
    requirements: ['기성금 청구 적격성 검토', '필요 서류 목록 작성', '원천징수 계산', '기성금 검사 절차'],
    timeGuide: 30, topic: '계약금 및 기성금 관리'
  },
];

// Generate realistic exam history
export const generateExamHistory = (): ExamHistory[] => {
  const history: ExamHistory[] = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);

  for (let i = 0; i < 5; i++) {
    const examDate = new Date(startDate);
    examDate.setDate(examDate.getDate() + i * 7);
    const score = 55 + Math.random() * 30;

    history.push({
      examId: `exam-${i + 1}`,
      date: examDate,
      score: Math.round(score),
      maxScore: 100,
      timeSpent: 6000 + Math.random() * 2400,
      subjectScores: [
        { subjectId: 's1', subjectName: '공공조달', correct: Math.round(18 + Math.random() * 9), total: 30, percentage: Math.round(60 + Math.random() * 30), passed: true },
        { subjectId: 's2', subjectName: '계약관리', correct: Math.round(12 + Math.random() * 7), total: 20, percentage: Math.round(55 + Math.random() * 35), passed: true },
        { subjectId: 's3', subjectName: '재정관리', correct: Math.round(15 + Math.random() * 10), total: 30, percentage: Math.round(50 + Math.random() * 35), passed: true },
      ],
    });
  }
  return history;
};

// Subject names and color mapping
export const SUBJECT_INFO: Record<string, { name: string; color: string; bgColor: string }> = {
  s1: { name: '공공조달', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  s2: { name: '계약관리', color: 'text-purple-600', bgColor: 'bg-purple-100' },
  s3: { name: '재정관리', color: 'text-green-600', bgColor: 'bg-green-100' },
  procurement: { name: '공공조달', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  contract: { name: '계약관리', color: 'text-purple-600', bgColor: 'bg-purple-100' },
  finance: { name: '재정관리', color: 'text-green-600', bgColor: 'bg-green-100' },
};
