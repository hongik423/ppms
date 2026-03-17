/**
 * @fileoverview 개념카드 복습 결과 저장 (에빙하우스 간격 반영)
 * @encoding UTF-8
 */

import { NextResponse, NextRequest } from 'next/server';
import { getCurrentPrismaUser } from '@/lib/api-auth';
import prisma from '@/lib/prisma';

interface ReviewRequest {
  rating: 'hard' | 'normal' | 'easy';
}

const INTERVALS = { hard: 1, normal: 3, easy: 7 };

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentPrismaUser();
    const body: ReviewRequest = await request.json();

    const newInterval = INTERVALS[body.rating];
    const nextReviewAt = new Date();
    nextReviewAt.setDate(nextReviewAt.getDate() + newInterval);
    const now = new Date();

    if (!user) {
      return NextResponse.json({
        success: true,
        progress: {
          cardId: params.id,
          lastReviewedAt: now,
          nextReviewAt,
          interval: newInterval,
          reviewCount: 1,
        },
      });
    }

    const conceptCard = await prisma.conceptCard.findUnique({
      where: { id: params.id },
      select: { detailItemId: true },
    });

    if (!conceptCard) {
      return NextResponse.json({ error: 'Card not found' }, { status: 404 });
    }

    const updated = await prisma.userProgress.upsert({
      where: {
        userId_detailItemId: { userId: user.id, detailItemId: conceptCard.detailItemId },
      },
      create: {
        userId: user.id,
        detailItemId: conceptCard.detailItemId,
        conceptCardMastered: body.rating === 'easy',
        lastReviewedAt: now,
        nextReviewAt,
        currentInterval: newInterval,
        reviewCount: 1,
      },
      update: {
        lastReviewedAt: now,
        nextReviewAt,
        currentInterval: newInterval,
        reviewCount: { increment: 1 },
        conceptCardMastered: body.rating === 'easy',
      },
    });

    await prisma.user.update({
      where: { id: user.id },
      data: {
        lastStudyDate: now,
        streakDays: await calculateStreak(user.id, now),
      },
    });

    return NextResponse.json({
      success: true,
      progress: {
        cardId: params.id,
        lastReviewedAt: updated.lastReviewedAt,
        nextReviewAt: updated.nextReviewAt,
        interval: newInterval,
        reviewCount: updated.reviewCount,
      },
    });
  } catch (error) {
    console.error('Card review error:', error);
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
  }
}

async function calculateStreak(userId: string, today: Date): Promise<number> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user?.lastStudyDate) return 1;

  const last = new Date(user.lastStudyDate);
  const diffDays = Math.floor((today.getTime() - last.getTime()) / 86400000);

  if (diffDays === 0) return user.streakDays;
  if (diffDays === 1) return user.streakDays + 1;
  return 1;
}
