/**
 * @fileoverview 모의고사 상세 조회 (문항 포함) - JSON 데이터 사용
 * @encoding UTF-8
 */

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import path from 'path';
import fs from 'fs';

interface ExamQuestion {
  id: number;
  subject: 'procurement' | 'finance' | 'contract' | 'practice';
  questionText: string;
  options: string[];
  correctAnswer: number;
  difficulty: number;
  explanation: string;
  tags: string[];
  sourceSection: string;
  questionNum: number;
}

let cachedQuestionsMap: Map<string, ExamQuestion> | null = null;

function getQuestionsMap(): Map<string, ExamQuestion> {
  if (cachedQuestionsMap) return cachedQuestionsMap;
  try {
    const jsonPath = path.join(process.cwd(), 'src', 'data', 'rawdata', 'exam-questions.json');
    const raw = fs.readFileSync(jsonPath, 'utf-8');
    const data = JSON.parse(raw);
    const map = new Map<string, ExamQuestion>();
    for (const q of data.questions as ExamQuestion[]) {
      map.set(String(q.id), q);
    }
    cachedQuestionsMap = map;
    return map;
  } catch (e) {
    console.error('Failed to load exam-questions.json:', e);
    return new Map();
  }
}

const diffMap: Record<number, 'easy' | 'normal' | 'hard'> = {
  1: 'easy',
  2: 'normal',
  3: 'hard',
};

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

    const qMap = getQuestionsMap();

    const orderedQuestions = exam.questionIds
      .map((id, idx) => {
        const q = qMap.get(id);
        if (!q) return null;
        return {
          id,
          number: idx + 1,
          subject: q.subject,
          content: q.questionText,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation ?? '',
          difficulty: diffMap[q.difficulty] ?? 'normal',
        };
      })
      .filter(Boolean);

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
