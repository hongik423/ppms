/**
 * @fileoverview 모의고사 생성 - JSON 데이터 사용 (990문제 풀)
 * @encoding UTF-8
 */

import { NextResponse } from 'next/server';
import { getCurrentPrismaUser } from '@/lib/api-auth';
import prisma from '@/lib/prisma';
import path from 'path';
import fs from 'fs';

// JSON 문제 데이터 로드 (서버 사이드)
let cachedQuestions: ExamQuestion[] | null = null;

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

function loadQuestions(): ExamQuestion[] {
  if (cachedQuestions) return cachedQuestions;
  try {
    const jsonPath = path.join(process.cwd(), 'src', 'data', 'rawdata', 'exam-questions.json');
    const raw = fs.readFileSync(jsonPath, 'utf-8');
    const data = JSON.parse(raw);
    cachedQuestions = data.questions as ExamQuestion[];
    return cachedQuestions;
  } catch (e) {
    console.error('Failed to load exam-questions.json:', e);
    return [];
  }
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const diffMap: Record<number, 'easy' | 'normal' | 'hard'> = {
  1: 'easy',
  2: 'normal',
  3: 'hard',
};

export async function POST() {
  try {
    const user = await getCurrentPrismaUser();
    const allQuestions = loadQuestions();

    if (allQuestions.length === 0) {
      return NextResponse.json(
        { error: '문제 데이터를 불러올 수 없습니다.' },
        { status: 503 }
      );
    }

    // 과목별 문제 풀 구성
    const bySubject = {
      procurement: allQuestions.filter((q) => q.subject === 'procurement'),
      finance: allQuestions.filter((q) => q.subject === 'finance'),
      contract: allQuestions.filter((q) => q.subject === 'contract'),
    };

    // 문항 구성: 제1과목 30 + 제2과목 20 + 제3과목 30 = 80
    const selected = [
      ...shuffleArray(bySubject.procurement).slice(0, 30),
      ...shuffleArray(bySubject.finance).slice(0, 20),
      ...shuffleArray(bySubject.contract).slice(0, 30),
    ];

    // 80문제가 안되는 경우 보충
    if (selected.length < 80) {
      const selectedIds = new Set(selected.map((q) => q.id));
      const extra = shuffleArray(allQuestions.filter((q) => !selectedIds.has(q.id)));
      selected.push(...extra.slice(0, 80 - selected.length));
    }

    const shuffled = shuffleArray(selected).slice(0, 80);
    const questionIds = shuffled.map((q) => String(q.id));

    const questionsForFrontend = shuffled.map((q, idx) => ({
      id: String(q.id),
      number: idx + 1,
      subject: q.subject,
      content: q.questionText,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation ?? '',
      difficulty: diffMap[q.difficulty] ?? 'normal',
    }));

    let examId: string;

    if (user) {
      try {
        const exam = await prisma.mockExam.create({
          data: {
            userId: user.id,
            questionIds,
            answers: Array(shuffled.length).fill(-1),
            status: 'in_progress',
          },
        });
        examId = exam.id;
      } catch (dbError) {
        console.warn('DB 저장 실패, 임시 ID 사용:', dbError);
        examId = `exam-${Date.now()}`;
      }
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
