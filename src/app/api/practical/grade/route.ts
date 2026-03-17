import { NextResponse, NextRequest } from 'next/server';

interface GradeRequest {
  scenarioId: string;
  answerText: string;
}

// Mock AI grading function
function gradeAnswer(answer: string): {
  score: number;
  grade: 'A' | 'B' | 'C' | 'D';
  structureScore: number;
  legalScore: number;
  logicScore: number;
  keywordScore: number;
  strengths: string[];
  improvements: string[];
  missingPoints: string[];
} {
  const answerLength = answer.length;
  const hasSTAR = /\[상황\]|\[과제\]|\[행동\]|\[결과\]/.test(answer);
  const hasLegal = /법|규|령|조/.test(answer);

  let baseScore = 50;

  // Structure score (20%)
  let structureScore = hasSTAR ? 18 : 12;
  if (answer.split('\n').length > 5) structureScore += 2;

  // Legal score (30%)
  let legalScore = hasLegal ? 25 : 15;
  if (/공공조달법|건설기술/.test(answer)) legalScore += 5;

  // Logic score (25%)
  let logicScore = answerLength > 300 ? 20 : 15;
  if (/따라서|그러므로|결과적으로/.test(answer)) logicScore += 3;

  // Keyword score (25%)
  const keywords = ['절차', '법령', '요건', '기준'].filter(k => answer.includes(k));
  let keywordScore = keywords.length * 5;

  const totalScore = Math.round(
    (structureScore / 20) * 25 +
    (legalScore / 30) * 30 +
    (logicScore / 25) * 25 +
    (keywordScore / 25) * 20
  );

  let grade: 'A' | 'B' | 'C' | 'D' = 'D';
  if (totalScore >= 85) grade = 'A';
  else if (totalScore >= 70) grade = 'B';
  else if (totalScore >= 60) grade = 'C';

  return {
    score: totalScore,
    grade,
    structureScore: Math.min(structureScore, 20),
    legalScore: Math.min(legalScore, 30),
    logicScore: Math.min(logicScore, 25),
    keywordScore: Math.min(keywordScore, 25),
    strengths: [
      '체계적인 STAR-L 구조 사용',
      '법적 근거 명확히 제시',
      '구체적 사례 제시'
    ],
    improvements: [
      '더 구체적인 절차 설명 필요',
      '각 단계별 법적 근거 강화',
      '결과 부분의 성과 강조'
    ],
    missingPoints: [
      '원천징수 등 세무 관점 검토',
      '리스크 관리 방안'
    ]
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: GradeRequest = await request.json();

    const feedback = gradeAnswer(body.answerText);

    return NextResponse.json({
      success: true,
      feedback,
      scenarioId: body.scenarioId
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to grade answer' }, { status: 500 });
  }
}
