/**
 * @fileoverview 오늘 복습할 개념카드 조회 (Prisma + Supabase 연동)
 * @encoding UTF-8
 */

import { NextResponse } from 'next/server';
import { getCurrentPrismaUser } from '@/lib/api-auth';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const user = await getCurrentPrismaUser();

    if (!user) {
      return NextResponse.json({
        success: true,
        cards: [],
        totalDue: 0,
      });
    }

    const now = new Date();
    now.setHours(23, 59, 59, 999);

    const progressDueToday = await prisma.userProgress.findMany({
      where: {
        userId: user.id,
        OR: [
          { nextReviewAt: { lte: now } },
          { nextReviewAt: null, lastReviewedAt: { not: null } },
        ],
      },
      include: {
        detailItem: {
          include: {
            conceptCards: { orderBy: { order: 'asc' } },
            subTopic: { include: { mainTopic: { include: { subject: true } } } },
          },
        },
      },
    });

    const cardsToReview: Array<{
      id: string;
      front: string;
      back: string;
      category: string;
      difficulty: number;
      lawReference?: string;
      lastReviewedAt: Date | null;
      nextReviewAt: Date | null;
      reviewCount: number;
    }> = [];

    for (const p of progressDueToday) {
      if (!p.detailItem?.conceptCards?.length) continue;
      const cc = p.detailItem.conceptCards[0];
      const diffMap: Record<string, number> = { basic: 1, applied: 2, advanced: 3 };
      cardsToReview.push({
        id: cc.id,
        front: cc.frontText,
        back: cc.backText,
        category: cc.category,
        difficulty: diffMap[cc.difficulty] ?? 1,
        lawReference: cc.category === 'law' ? cc.backText.split('\n')[0] : undefined,
        lastReviewedAt: p.lastReviewedAt,
        nextReviewAt: p.nextReviewAt,
        reviewCount: p.reviewCount,
      });
    }

    return NextResponse.json({
      success: true,
      cards: cardsToReview,
      totalDue: cardsToReview.length,
    });
  } catch (error) {
    console.error('Cards today error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cards', success: false },
      { status: 500 }
    );
  }
}
