import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';

/**
 * Sync or create Prisma User from Supabase Auth.
 * Called when user logs in - ensures Prisma User exists for authUserId.
 */
export async function POST() {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const authUserId = authUser.id;
    const email = authUser.email ?? '';
    const nickname = authUser.user_metadata?.nickname ?? authUser.email?.split('@')[0] ?? '학습자';

    let prismaUser = await prisma.user.findFirst({
      where: { authUserId },
    });

    if (!prismaUser) {
      prismaUser = await prisma.user.create({
        data: {
          authUserId,
          email,
          nickname,
        },
      });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: prismaUser.id,
        email: prismaUser.email,
        nickname: prismaUser.nickname,
        targetExamDate: prismaUser.targetExamDate,
        currentPhase: prismaUser.currentPhase,
        studyStartDate: prismaUser.studyStartDate,
        streakDays: prismaUser.streakDays,
        lastStudyDate: prismaUser.lastStudyDate,
        createdAt: prismaUser.createdAt,
        updatedAt: prismaUser.updatedAt,
      },
    });
  } catch (error) {
    console.error('User sync error:', error);
    return NextResponse.json({ error: 'Failed to sync user' }, { status: 500 });
  }
}
