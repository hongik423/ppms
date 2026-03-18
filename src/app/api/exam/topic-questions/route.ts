/**
 * @fileoverview 이론 토픽별 관련 예상문제 API
 * GET /api/exam/topic-questions?topicId=S1-MT1&subTopicId=S1-MT1-ST1&limit=10
 * 토픽 ID 기반으로 매핑된 procurement 문제 반환
 */

import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

interface ExamQuestion {
  id: number;
  subject: string;
  questionText: string;
  options: string[];
  correctAnswer: number;
  difficulty: number;
  explanation: string;
  tags: string[];
  sourceSection: string;
  questionNum: number;
}

interface TopicMap {
  mainTopics: Record<string, {
    questionIds: number[];
    subTopics: Record<string, number[]>;
  }>;
}

let cachedQuestions: ExamQuestion[] | null = null;
let cachedTopicMap: TopicMap | null = null;

function loadData() {
  if (!cachedQuestions) {
    const qPath = path.join(process.cwd(), 'src', 'data', 'rawdata', 'exam-questions.json');
    const raw = JSON.parse(fs.readFileSync(qPath, 'utf-8'));
    cachedQuestions = raw.questions as ExamQuestion[];
  }
  if (!cachedTopicMap) {
    const mPath = path.join(process.cwd(), 'src', 'data', 'rawdata', 'topic-question-map.json');
    cachedTopicMap = JSON.parse(fs.readFileSync(mPath, 'utf-8')) as TopicMap;
  }
  return { questions: cachedQuestions!, topicMap: cachedTopicMap! };
}

const diffLabels: Record<number, 'easy' | 'normal' | 'hard'> = {
  1: 'easy', 2: 'normal', 3: 'hard',
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const topicId = searchParams.get('topicId');       // e.g. S1-MT1
    const subTopicId = searchParams.get('subTopicId'); // e.g. S1-MT1-ST1 (optional)
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    if (!topicId) {
      return NextResponse.json({ success: false, error: 'topicId required' }, { status: 400 });
    }

    const { questions, topicMap } = loadData();
    const questionMap = new Map(questions.map((q) => [q.id, q]));

    // 토픽에 매핑된 문제 ID 조회
    const mtData = topicMap.mainTopics[topicId];
    if (!mtData) {
      return NextResponse.json({ success: true, topicId, questions: [], total: 0 });
    }

    let targetIds: number[];

    if (subTopicId && mtData.subTopics[subTopicId]) {
      // 세부항목(subTopic) 기준 필터
      targetIds = mtData.subTopics[subTopicId];
    } else {
      // mainTopic 전체 문제
      targetIds = mtData.questionIds;
    }

    // 문제 데이터 조합 (limit 적용)
    const sliced = targetIds.slice(0, limit);
    const result = sliced
      .map((id) => questionMap.get(id))
      .filter(Boolean)
      .map((q) => ({
        id: q!.id,
        questionText: q!.questionText,
        options: q!.options,
        correctAnswer: q!.correctAnswer,
        difficulty: diffLabels[q!.difficulty] || 'normal',
        explanation: q!.explanation,
        subject: q!.subject,
        questionNum: q!.questionNum,
      }));

    // subTopic별 문제 수 통계
    const subTopicStats: Record<string, number> = {};
    for (const [stId, ids] of Object.entries(mtData.subTopics)) {
      subTopicStats[stId] = ids.length;
    }

    return NextResponse.json({
      success: true,
      topicId,
      subTopicId: subTopicId || null,
      total: targetIds.length,
      returned: result.length,
      subTopicStats,
      questions: result,
    });
  } catch (err) {
    console.error('[topic-questions] error:', err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
