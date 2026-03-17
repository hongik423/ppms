/**
 * @fileoverview 출제문제 생성 API - rawdata 기반 문제 자동 생성
 * POST /api/questions/generate
 * @encoding UTF-8
 */

import { NextResponse, NextRequest } from 'next/server';
import {
  loadRawData,
  selectWeightedDetailItems,
  getKeywordsBySubject,
  getQuestionContext,
  type DetailItemData,
  type KeywordData,
} from '@/lib/rawdata-loader';

interface GenerateRequest {
  subjectId?: string;       // null이면 전체 과목
  count?: number;           // 생성할 문제 수 (기본 10)
  difficulty?: 1 | 2 | 3;  // 1:기초, 2:응용, 3:실전
  focusKeywords?: string[]; // 특정 키워드 집중
}

interface GeneratedQuestion {
  id: string;
  detailItemId: string;
  detailItemName: string;
  subjectId: string;
  questionText: string;
  options: string[];
  correctAnswer: number;
  difficulty: number;
  explanation: string;
  wrongExplanations: string[];
  tags: string[];
  relatedKeyword?: string;
  predictionScore: number;
}

// ==================== 문제 템플릿 ====================

const QUESTION_TEMPLATES = {
  definition: [
    '다음 중 {topic}(으)로 가장 적절한 것은?',
    '{topic}에 대한 설명으로 옳은 것은?',
    '{topic}의 의미로 적절하지 않은 것은?',
  ],
  comparison: [
    '{topicA}와(과) {topicB}의 차이점으로 옳은 것은?',
    '{topicA}에 해당하지만 {topicB}에는 해당하지 않는 것은?',
  ],
  procedure: [
    '{topic} 절차에서 가장 먼저 수행해야 할 단계는?',
    '{topic}의 올바른 순서는?',
    '{topic} 시 주의해야 할 사항이 아닌 것은?',
  ],
  law: [
    '{topic}의 법적 근거는?',
    '{topic}에 관한 규정으로 틀린 것은?',
    '{topic}에서 정하는 기준으로 옳은 것은?',
  ],
  application: [
    '다음 사례에서 적용되는 {topic}은(는)?',
    '{topic}이(가) 적용되지 않는 경우는?',
  ],
};

// ==================== 문제 생성 함수 ====================

function generateQuestionFromItem(
  item: DetailItemData & { subjectId: string },
  difficulty: number,
  keyword?: KeywordData,
  index?: number,
): GeneratedQuestion {
  const id = `gen-${Date.now()}-${index ?? Math.random().toString(36).slice(2, 6)}`;

  // 세세항목 이름에서 카테고리 추론
  const name = item.name.toLowerCase();
  let category: keyof typeof QUESTION_TEMPLATES = 'definition';
  if (name.includes('절차') || name.includes('단계') || name.includes('과정')) {
    category = 'procedure';
  } else if (name.includes('법') || name.includes('규정') || name.includes('조문')) {
    category = 'law';
  } else if (name.includes('차이') || name.includes('비교') || name.includes('vs')) {
    category = 'comparison';
  } else if (difficulty >= 2) {
    category = 'application';
  }

  const templates = QUESTION_TEMPLATES[category];
  const template = templates[Math.floor(Math.random() * templates.length)];
  const questionText = template
    .replace('{topic}', item.name)
    .replace('{topicA}', item.name.split('/')[0] || item.name)
    .replace('{topicB}', item.name.split('/')[1] || '관련 개념');

  // 교재 콘텐츠 기반 풍부한 컨텍스트 조회 (Google Drive rawdata 연동)
  const context = getQuestionContext(item.id);

  // 키워드 + 교재 콘텐츠 통합 설명 생성
  let explanation: string;
  if (context && context.concepts.length > 0) {
    const conceptStr = context.concepts.slice(0, 2).join(' ');
    const lawStr = context.laws.length > 0 ? ` (관련 법률: ${context.laws.slice(0, 3).join(', ')})` : '';
    const tipStr = context.tips.length > 0 ? `\n\n💡 학습 포인트: ${context.tips[0]}` : '';
    explanation = `${conceptStr}${lawStr}${tipStr}`;
  } else if (keyword) {
    explanation = `${keyword.summary} (관련 법률: ${keyword.keyLaws.join(', ')})`;
  } else {
    explanation = `${item.name}에 대한 핵심 개념을 정확히 이해해야 합니다.`;
  }

  // 교재 콘텐츠 기반 보기 생성 (정답 + 오답 3개)
  const correctOption = context && context.concepts.length > 0
    ? context.concepts[0].split(':').pop()?.trim() || `${item.name}의 핵심 원리에 부합하는 내용`
    : `${item.name}의 핵심 원리에 부합하는 내용`;
  const wrongOptions = [
    context && context.concepts.length > 1
      ? `${context.concepts[1].split(':')[0] || item.name}과 혼동되는 유사 개념의 내용`
      : `${item.name}과 관련 없는 일반적 내용`,
    `유사하지만 다른 개념의 내용`,
    `상위 개념과 혼동되는 내용`,
  ];

  const options = [correctOption, ...wrongOptions];
  // 정답 위치 랜덤화
  const correctIndex = Math.floor(Math.random() * 4);
  const shuffled = [...wrongOptions];
  shuffled.splice(correctIndex, 0, correctOption);

  const tags: string[] = [item.subjectId];
  if (keyword) tags.push(keyword.keyword);
  if (item.predictionScore >= 4) tags.push('고출제율');

  return {
    id,
    detailItemId: item.id,
    detailItemName: item.name,
    subjectId: item.subjectId,
    questionText,
    options: shuffled,
    correctAnswer: correctIndex,
    difficulty,
    explanation,
    wrongExplanations: wrongOptions.map((_, i) => `이 보기는 ${item.name}에 대한 올바른 설명이 아닙니다.`),
    tags,
    relatedKeyword: keyword?.keyword,
    predictionScore: item.predictionScore,
  };
}

// ==================== API Handler ====================

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json();
    const {
      subjectId = null,
      count = 10,
      difficulty = 2,
      focusKeywords = [],
    } = body;

    // rawdata에서 가중치 기반 세세항목 선택
    const selectedItems = selectWeightedDetailItems(subjectId ?? null, count);

    // 키워드 매핑
    const keywords = subjectId
      ? getKeywordsBySubject(subjectId)
      : loadRawData().keywords;

    // 문제 생성
    const questions: GeneratedQuestion[] = selectedItems.map((item, i) => {
      const matchedKeyword = keywords.find(k =>
        k.relatedItems.includes(item.id) ||
        (focusKeywords.length > 0 && focusKeywords.some(fk => k.keyword.includes(fk)))
      );
      return generateQuestionFromItem(item, difficulty, matchedKeyword, i);
    });

    // 출제예상점수 높은 순으로 정렬
    questions.sort((a, b) => b.predictionScore - a.predictionScore);

    return NextResponse.json({
      success: true,
      generated: questions.length,
      questions,
      metadata: {
        subjectId,
        difficulty,
        focusKeywords,
        dataSource: 'rawdata/subjects.json + rawdata/keywords.json + rawdata/textbook-content.json',
        driveFolder: '183hOVQYc_GwBunrVSF-wLzvPJY00Bd6f',
        enrichedWithTextbook: true,
      },
    });
  } catch (error) {
    console.error('Question generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate questions', details: String(error) },
      { status: 500 }
    );
  }
}
