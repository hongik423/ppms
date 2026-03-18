/**
 * @fileoverview 이론 토픽별 개념카드 API
 * GET /api/learn/concept-cards?topicId=S1-MT1&subTopicId=S1-MT1-ST1&limit=20
 * 토픽 ID 기반으로 개념카드(플래시카드) 반환
 */

import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

interface ConceptCard {
  id: string;
  topicId: string;
  subTopicId: string;
  chapter: number;
  chapterTitle: string;
  section: string;
  pages: string;
  front: string;
  back: string;
  keyPoint: string;
  difficulty: 'easy' | 'normal' | 'hard';
}

interface ConceptCardData {
  version: string;
  description: string;
  subject: string;
  totalCards: number;
  cards: ConceptCard[];
}

let cachedS1Cards: ConceptCard[] | null = null;
let cachedS2Cards: ConceptCard[] | null = null;

function loadCards(subject: 'S1' | 'S2'): ConceptCard[] {
  if (subject === 'S1') {
    if (!cachedS1Cards) {
      const p = path.join(process.cwd(), 'src', 'data', 'rawdata', 'concept-cards-s1.json');
      const raw = JSON.parse(fs.readFileSync(p, 'utf-8')) as ConceptCardData;
      cachedS1Cards = raw.cards;
    }
    return cachedS1Cards!;
  } else {
    if (!cachedS2Cards) {
      const p = path.join(process.cwd(), 'src', 'data', 'rawdata', 'concept-cards-s2.json');
      const raw = JSON.parse(fs.readFileSync(p, 'utf-8')) as ConceptCardData;
      cachedS2Cards = raw.cards;
    }
    return cachedS2Cards!;
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const topicId = searchParams.get('topicId');       // e.g. S1-MT1 or S2-MT2
    const subTopicId = searchParams.get('subTopicId'); // e.g. S1-MT1-ST1 (optional)
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    if (!topicId) {
      return NextResponse.json({ success: false, error: 'topicId required' }, { status: 400 });
    }

    // 과목 판별
    const subject = topicId.startsWith('S2') ? 'S2' : 'S1';
    const allCards = loadCards(subject);

    // 필터링
    let topicCards = allCards.filter((c) => c.topicId === topicId);
    let filtered = topicCards;
    let fallback = false;

    if (subTopicId) {
      const bySubTopic = topicCards.filter((c) => c.subTopicId === subTopicId);
      if (bySubTopic.length > 0) {
        filtered = bySubTopic;
      } else {
        // subTopicId에 해당 카드 없음 → 토픽 전체 카드 반환 (관련도 정렬은 프론트에서)
        filtered = topicCards;
        fallback = true;
      }
    }

    const sliced = filtered.slice(0, limit);

    // 서브토픽별 카드 수 통계
    const subTopicStats: Record<string, number> = {};
    for (const card of filtered) {
      subTopicStats[card.subTopicId] = (subTopicStats[card.subTopicId] || 0) + 1;
    }

    return NextResponse.json({
      success: true,
      topicId,
      subTopicId: subTopicId || null,
      subject,
      total: filtered.length,
      returned: sliced.length,
      fallback,
      subTopicStats,
      cards: sliced,
    });
  } catch (err) {
    console.error('[concept-cards] error:', err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
