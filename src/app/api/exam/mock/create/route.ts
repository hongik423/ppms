/**
 * @fileoverview 모의고사 생성 - Prisma DB 사용
 * @encoding UTF-8
 */

import { NextResponse } from 'next/server';
import { getCurrentPrismaUser } from '@/lib/api-auth';
import prisma from '@/lib/prisma';

export async function POST() {
  try {
    const user = await getCurrentPrismaUser();
    const subjects = await prisma.subject.findMany({ orderBy: { order: 'asc' } });

    if (subjects.length < 3) {
      return NextResponse.json(
        { error: 'Subject data not ready. Run db:seed first.' },
        { status: 503 }
      );
    }

    // 문항 구성: 1과목 30 + 2과목 20 + 3과목 30 = 80
    const [q1, q2, q3] = await Promise.all([
      prisma.question.findMany({
        where: { subjectId: subjects[0].id },
        take: 30,
      }),
      prisma.question.findMany({
        where: { subjectId: subjects[1].id },
        take: 20,
      }),
      prisma.question.findMany({
        where: { subjectId: subjects[2].id },
        take: 30,
      }),
    ]);

    const allQuestions = [...q1, ...q2, ...q3];
    if (allQuestions.length < 80) {
      const extra = await prisma.question.findMany({
        where: { id: { notIn: allQuestions.map((q) => q.id) } },
        take: 80 - allQuestions.length,
      });
      allQuestions.push(...extra);
    }

    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5).slice(0, 80);
    const questionIds = shuffled.map((q) => q.id);

    const subjectKeyMap: Record<string, 'procurement' | 'contract' | 'finance'> = {
      [subjects[0].id]: 'procurement',
      [subjects[1].id]: 'contract',
      [subjects[2].id]: 'finance',
    };
    const diffMap: Record<number, 'easy' | 'normal' | 'hard'> = {
      1: 'easy',
      2: 'normal',
      3: 'hard',
    };

    const questionsForFrontend = shuffled.map((q, idx) => ({
      id: q.id,
      number: idx + 1,
      subject: subjectKeyMap[q.subjectId] ?? 'procurement',
      content: q.questionText,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation ?? '',
      difficulty: diffMap[q.difficulty] ?? 'normal',
    }));

    let examId: string;

    if (user) {
      const exam = await prisma.mockExam.create({
        data: {
          userId: user.id,
          questionIds,
          answers: Array(80).fill(-1),
          status: 'in_progress',
        },
      });
      examId = exam.id;
    } else {
      examId = `exam-${Date.now()}`;
    }

    return NextResponse.json({
      success: true,
      examId,
      exam: {
        id: examId,
        createdAt: new Date(),
        questions: questionsForFrontend,
        status: 'in_progress',
      },
    });
  } catch (error) {
    console.error('Create mock exam error:', error);
    return NextResponse.json({ error: 'Failed to create exam' }, { status: 500 });
  }
}
