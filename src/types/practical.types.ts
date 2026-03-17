export interface PracticalScenario {
  id: string;
  topicId: string;
  topicName: string;
  title: string;
  situation: string;
  requirements: string[];
  timeGuide: number;
  modelAnswer: string;
}

export interface PracticalAnswer {
  id: string;
  userId: string;
  scenarioId: string;
  topicId: string;
  answerText: string;
  aiScore: number | null;
  structureScore: number | null;
  legalScore: number | null;
  logicScore: number | null;
  keywordScore: number | null;
  feedbackText: string | null;
  modelAnswerDiff: string | null;
  grade: string | null;
  createdAt: Date;
}

export interface StarLFramework {
  situation: string;
  task: string;
  action: string;
  result: string;
  legal: string;
}

export interface PracticalTopic {
  id: string;
  name: string;
}

export const PRACTICAL_TOPICS: PracticalTopic[] = [
  { id: 'p1', name: '공공조달 입찰 참가 준비' },
  { id: 'p2', name: '공공조달 입찰계획 수립' },
  { id: 'p3', name: '입찰실행 관리' },
  { id: 'p4', name: '계약일반관리' },
  { id: 'p5', name: '공급대상물 유형별 계약관리' },
  { id: 'p6', name: '공공조달 리스크 관리' },
  { id: 'p7', name: '공공조달 법제도 활용' },
  { id: 'p8', name: '전자조달시스템 활용' },
];

export interface PracticalExamResult {
  userId: string;
  topicId: string;
  totalScore: number;
  structureScore: number;
  legalScore: number;
  logicScore: number;
  keywordScore: number;
  feedback: string;
  completedAt: Date;
}
