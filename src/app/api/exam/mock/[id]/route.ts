/**
 * @fileoverview 모의고사 상세 조회 (문항 포함)
 * @encoding UTF-8
 */

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const exam = await prisma.mockExam.findUnique({
      where: { id: params.id },
      include: { user: true },
    });

    if (!exam) {
      return NextResponse.json({ error: 'Exam not found' }, { status: 404 });
    }

    const questions = await prisma.question.findMany({
      where: { id: { in: exam.questionIds } },
    });
    const qMap = new Map(questions.map((q) => [q.id, q]));

    const subjects = await prisma.subject.findMany({ orderBy: { order: 'asc' } });
    const subjectKeyMap: Record<string, 'procurement' | 'contract' | 'finance'> = {
      [subjects[0]?.id ?? '']: 'procurement',
      [subjects[1]?.id ?? '']: 'contract',
      [subjects[2]?.id ?? '']: 'finance',
    };
    const diffMap: Record<number, 'easy' | 'normal' | 'hard'> = {
      1: 'easy',
      2: 'normal',
      3: 'hard',
    };

    const orderedQuestions = exam.questionIds
      .map((id) => qMap.get(id))
      .filter(Boolean)
      .map((q, idx) => ({
        id: q!.id,
        number: idx + 1,
        subject: subjectKeyMap[q!.subjectId] ?? 'procurement',
        content: q!.questionText,
        options: q!.options,
        correctAnswer: q!.correctAnswer,
        explanation: q!.explanation ?? '',
        difficulty: diffMap[q!.difficulty] ?? 'normal',
      }));

    return NextResponse.json({
      success: true,
      exam: {
        id: exam.id,
        status: exam.status,
        answers: exam.answers,
        createdAt: exam.createdAt,
      },
      questions: orderedQuestions,
    });
  } catch (error) {
    console.error('Get exam error:', error);
    return NextResponse.json({ error: 'Failed to fetch exam' }, { status: 500 });
  }
}
