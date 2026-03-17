import type { Scenario, ExamHistory } from '@/types';
import subjectsData from '@/data/rawdata/subjects.json';
import keywordsData from '@/data/rawdata/keywords.json';

// ExamQuestion - UI전용 타입
export interface ExamQuestion {
  id: string;
  number: number;
  subject: string;
  content: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'normal' | 'hard';
}

export type SubjectKey = string;

// 실제 출제기준 기반 문제 - keywords.json과 subjects.json 데이터 활용
export const SAMPLE_QUESTIONS: ExamQuestion[] = [
  {
    id: 'q1', number: 1, subject: 'S1',
    content: '공공조달의 기본원칙에 해당하지 않는 것은?',
    options: ['투명성 원칙', '공정성 원칙', '비밀성 원칙', '효율성 원칙'],
    correctAnswer: 2,
    explanation: '공공조달의 기본원칙은 투명성·공정성·효율성·경제성입니다. 비밀성은 공공조달의 원칙이 아닙니다.',
    difficulty: 'easy'
  },
  {
    id: 'q2', number: 2, subject: 'S1',
    content: '추정가격과 예정가격에 대한 설명으로 옳지 않은 것은?',
    options: ['추정가격은 부가가치세를 제외한다', '예정가격은 부가가치세를 포함한다', '추정가격으로 계약방법을 결정한다', '추정가격은 예정가격보다 항상 높다'],
    correctAnswer: 3,
    explanation: '추정가격은 부가가치세 제외, 예정가격은 부가가치세 포함이므로 추정가격이 예정가격보다 항상 높은 것은 아닙니다.',
    difficulty: 'normal'
  },
  {
    id: 'q3', number: 3, subject: 'S1',
    content: '수의계약이 허용되는 경우에 해당하지 않는 것은?',
    options: ['천재지변·긴급복구', '특허·전매', '추정가격이 5천만원인 물품 구매', '특정인의 기술·용역이 필요한 경우'],
    correctAnswer: 2,
    explanation: '소액수의계약 기준은 물품 2천만원, 공사 8천만원, 용역 5천만원 이하입니다. 5천만원 물품은 소액수의계약 기준을 초과합니다.',
    difficulty: 'normal'
  },
  {
    id: 'q4', number: 4, subject: 'S1',
    content: '부정당업자 제재에 대한 설명으로 옳은 것은?',
    options: ['제재 기간은 최대 1년이다', '감경사유가 인정되지 않는다', '조달청장이 제재 결정을 한다', '청문 절차 없이 즉시 처분된다'],
    correctAnswer: 2,
    explanation: '부정당업자 제재는 조달청장이 결정하며, 제재기간은 1개월~2년, 감경사유가 인정되고, 통보→청문→처분 절차를 거칩니다.',
    difficulty: 'normal'
  },
  {
    id: 'q5', number: 5, subject: 'S1',
    content: '나라장터(G2B)에 대한 설명으로 옳지 않은 것은?',
    options: ['국가종합전자조달시스템이다', '연간 100조원 이상을 처리한다', '민간기업도 자유롭게 운영할 수 있다', '전자입찰, 종합쇼핑몰 등을 운영한다'],
    correctAnswer: 2,
    explanation: '나라장터는 조달청이 운영하는 국가종합전자조달시스템으로, 민간기업이 운영하는 것이 아닙니다.',
    difficulty: 'easy'
  },
  {
    id: 'q6', number: 6, subject: 'S1',
    content: '중소기업자간 경쟁제도에 대한 설명으로 옳은 것은?',
    options: ['대기업도 참여 가능하다', '중소벤처기업부장관이 경쟁제품을 지정한다', '직접생산확인과 관련이 없다', '모든 금액의 조달에 적용된다'],
    correctAnswer: 1,
    explanation: '중소기업자간 경쟁제도는 중소벤처기업부장관이 경쟁제품을 지정·고시하며, 중소기업만 입찰에 참여하도록 제한하는 제도입니다.',
    difficulty: 'normal'
  },
  {
    id: 'q7', number: 7, subject: 'S2',
    content: '적격심사에 대한 설명으로 옳은 것은?',
    options: ['최고가 입찰자부터 심사한다', '물품·용역은 종합평점 95점 이상이어야 한다', '기술능력은 심사 항목이 아니다', '모든 입찰자를 동시에 심사한다'],
    correctAnswer: 1,
    explanation: '적격심사는 최저가 입찰자부터 순서대로 이행실적·기술능력·재무상태 등을 심사하며, 물품·용역은 종합평점 95점 이상이어야 합니다.',
    difficulty: 'normal'
  },
  {
    id: 'q8', number: 8, subject: 'S2',
    content: '입찰공고문에서 반드시 포함해야 하는 사항이 아닌 것은?',
    options: ['입찰참가자격', '입찰보증금', '낙찰자 결정방법', '입찰참가자의 사업실적 상세 내역'],
    correctAnswer: 3,
    explanation: '입찰공고문에는 입찰참가자격, 입찰보증금, 낙찰자 결정방법 등이 포함되어야 하지만, 참가자의 상세 사업실적은 필수 포함 사항이 아닙니다.',
    difficulty: 'normal'
  },
  {
    id: 'q9', number: 9, subject: 'S2',
    content: '종합심사낙찰제에 대한 설명으로 옳은 것은?',
    options: ['물품계약에 주로 적용된다', '가격만으로 낙찰자를 결정한다', '공사계약에서 가격과 비가격 요소를 종합 평가한다', '적격심사와 동일한 절차이다'],
    correctAnswer: 2,
    explanation: '종합심사낙찰제는 공사계약에서 가격과 비가격 요소(공사이행능력, 사회적 책임 등)를 종합 평가하여 낙찰자를 결정합니다.',
    difficulty: 'hard'
  },
  {
    id: 'q10', number: 10, subject: 'S3',
    content: '계약변경에 대한 설명으로 옳지 않은 것은?',
    options: ['설계변경 시 계약금액을 조정할 수 있다', '물가변동에 의한 조정이 가능하다', '계약상대자가 임의로 변경할 수 있다', '발주자 요구에 의해 변경이 가능하다'],
    correctAnswer: 2,
    explanation: '계약변경은 발주자 요구 또는 현장조건 변화 시 가능하며, 계약상대자가 임의로 변경할 수 없습니다.',
    difficulty: 'normal'
  },
  {
    id: 'q11', number: 11, subject: 'S3',
    content: '다수공급자계약(MAS)에 대한 설명으로 옳은 것은?',
    options: ['1인의 공급자와 계약한다', '2단계경쟁을 통해 최종 공급자를 선택한다', '가격만으로 평가한다', '수요기관이 직접 계약을 체결한다'],
    correctAnswer: 1,
    explanation: 'MAS는 2인 이상의 공급자와 단가계약을 체결하고, 수요기관이 2단계경쟁을 통해 가격·비가격 요소를 종합 평가하여 최종 공급자를 선택합니다.',
    difficulty: 'normal'
  },
  {
    id: 'q12', number: 12, subject: 'S3',
    content: '지체상금에 대한 설명으로 옳은 것은?',
    options: ['공사계약의 지체상금률은 1/1000이다', '물품·용역의 지체상금률은 2.5/1000이다', '지체상금은 계약보증금에서 공제한다', '천재지변은 지체일수에서 제외된다'],
    correctAnswer: 3,
    explanation: '천재지변 등 불가항력 사유는 지체일수에서 제외됩니다. 공사 지체상금률은 0.5/1000, 물품·용역은 2.5/1000입니다.',
    difficulty: 'hard'
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

// S4 실기 기반 시나리오 - subjects.json S4 데이터 활용
const s4Subject = subjectsData.subjects.find(s => s.id === 'S4');
const s4MainTopics = s4Subject?.mainTopics || [];

export const SAMPLE_SCENARIOS: Scenario[] = [
  {
    id: 's1', topicId: 'S4-MT1', title: '입찰참가자격 등록 절차', difficulty: 'normal',
    content: '신규 중소기업 A사가 나라장터를 통해 공공조달에 처음 참가하려 합니다. 조달등록, 직접생산확인, 목록화 절차를 안내하세요.',
    requirements: ['조달업체 등록 절차 설명', '직접생산확인제도 요건 제시', '물품 목록화 절차 안내', '관련 법적 근거 제시'],
    timeGuide: 30, topic: '공공조달 입찰 참가 준비'
  },
  {
    id: 's2', topicId: 'S4-MT2', title: '입찰 환경 분석 및 전략 수립', difficulty: 'normal',
    content: 'B사가 정부 IT 용역 입찰에 참가하려 합니다. 경쟁 환경 분석과 입찰 전략을 수립하세요.',
    requirements: ['수요기관 정보 수집 방법', '경쟁 환경 분석', '입찰 전략 수립', '공급계획서 작성 요점'],
    timeGuide: 35, topic: '공공조달 입찰계획 수립'
  },
  {
    id: 's3', topicId: 'S4-MT3', title: '입찰서류 작성 및 평가기준 검증', difficulty: 'hard',
    content: '추정가격 3억원의 물품 납품 입찰에 참가합니다. 입찰서류 작성과 적격심사 대비 전략을 수립하세요.',
    requirements: ['입찰서류 체크리스트 작성', '적격심사 평가기준 검증', '가격 산정 전략', '무효입찰 사유 회피 방안'],
    timeGuide: 40, topic: '입찰실행 관리'
  },
  {
    id: 's4', topicId: 'S4-MT4', title: '계약 체결 및 이행 관리', difficulty: 'normal',
    content: 'C사가 공공기관과 5억원 규모의 용역 계약을 체결합니다. 계약 체결부터 종결까지의 관리 절차를 설명하세요.',
    requirements: ['계약보증금 납부 절차', '선급금 수령 및 관리', '기성검사 및 대가 청구', '계약 종결 및 하자보수'],
    timeGuide: 35, topic: '계약일반관리'
  },
  {
    id: 's5', topicId: 'S4-MT5', title: '물품·용역·공사 유형별 계약 관리', difficulty: 'hard',
    content: '조달청 MAS 계약을 통해 사무용품을 납품하고 있는 D사가 2단계경쟁에 참가합니다.',
    requirements: ['MAS 2단계경쟁 절차 설명', '가격 및 비가격 평가 대비', '납품 이행 관리', '계약 갱신 절차'],
    timeGuide: 40, topic: '공급대상물 유형별 계약관리'
  },
  {
    id: 's6', topicId: 'S4-MT6', title: '리스크 식별 및 대응 계획 수립', difficulty: 'normal',
    content: '대규모 공사 계약(30억원)에서 발생할 수 있는 리스크를 식별하고 대응 계획을 수립하세요.',
    requirements: ['리스크 식별 및 분류', '리스크 영향도·발생확률 평가', '리스크 대응 전략 수립', '리스크 모니터링 계획'],
    timeGuide: 35, topic: '공공조달 리스크 관리'
  },
  {
    id: 's7', topicId: 'S4-MT7', title: '법제도 활용 및 분쟁 대응', difficulty: 'hard',
    content: 'E사가 부정당업자 제재 처분을 받았습니다. 이의신청 절차와 분쟁 해결 방안을 제시하세요.',
    requirements: ['부정당업자 제재 절차 검토', '이의신청 및 청문 절차', '행정소송 가능성 검토', '감경사유 활용 전략'],
    timeGuide: 40, topic: '공공조달 법제도 활용'
  },
  {
    id: 's8', topicId: 'S4-MT8', title: '전자조달시스템 활용', difficulty: 'easy',
    content: 'F사가 나라장터를 활용하여 전자입찰에 참가하고 조달 데이터를 분석하려 합니다.',
    requirements: ['나라장터 전자입찰 절차', '입찰결과 데이터 활용', '조달 통계 분석 방법', '조달데이터 시각화 활용'],
    timeGuide: 25, topic: '전자조달시스템 활용'
  },
];

// 모의고사 이력 생성 - 실제 과목명 반영
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
        { subjectId: 'S1', subjectName: '공공조달과 법제도 이해', correct: Math.round(18 + Math.random() * 9), total: 30, percentage: Math.round(60 + Math.random() * 30), passed: true },
        { subjectId: 'S2', subjectName: '공공조달계획 수립 및 분석', correct: Math.round(12 + Math.random() * 7), total: 20, percentage: Math.round(55 + Math.random() * 35), passed: true },
        { subjectId: 'S3', subjectName: '공공계약관리', correct: Math.round(15 + Math.random() * 10), total: 30, percentage: Math.round(50 + Math.random() * 35), passed: true },
      ],
    });
  }
  return history;
};

// Subject names and color mapping - 실제 과목명 반영
export const SUBJECT_INFO: Record<string, { name: string; color: string; bgColor: string }> = {
  S1: { name: '공공조달과 법제도 이해', color: 'text-violet-600', bgColor: 'bg-violet-100' },
  S2: { name: '공공조달계획 수립 및 분석', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  S3: { name: '공공계약관리', color: 'text-emerald-600', bgColor: 'bg-emerald-100' },
  S4: { name: '공공조달 관리실무', color: 'text-orange-600', bgColor: 'bg-orange-100' },
  // 호환성을 위한 레거시 키
  s1: { name: '공공조달과 법제도 이해', color: 'text-violet-600', bgColor: 'bg-violet-100' },
  s2: { name: '공공조달계획 수립 및 분석', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  s3: { name: '공공계약관리', color: 'text-emerald-600', bgColor: 'bg-emerald-100' },
  procurement: { name: '공공조달과 법제도 이해', color: 'text-violet-600', bgColor: 'bg-violet-100' },
  contract: { name: '공공계약관리', color: 'text-emerald-600', bgColor: 'bg-emerald-100' },
  finance: { name: '공공조달계획 수립 및 분석', color: 'text-blue-600', bgColor: 'bg-blue-100' },
};
