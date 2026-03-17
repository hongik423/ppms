/**
 * @fileoverview 모의고사 제출 및 채점 - Prisma DB 사용
 * @encoding UTF-8
 */

import { NextResponse, NextRequest } from 'next/server';
import { getCurrentPrismaUser } from '@/lib/api-auth';
import prisma from '@/lib/prisma';
import { generateExamQuestions } from '@/lib/mockData'; // fallback for anonymous exams

interface SubmitRequest {
  answers: Array<{ questionNumber: number; answer: number }>;
  timeSpent?: number;
}

const SUBJECT_MAX = { procurement: 30, contract: 20, finance: 30 } as const;
const PASS_MIN = { procurement: 12, contract: 8, finance: 12 } as const;
const SUBJECT_NAMES = { procurement: '공공조달', contract: '계약관리', finance: '재정관리' } as const;

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body: SubmitRequest = await request.json();
    const answerMap = new Map(body.answers.map((a) => [a.questionNumber, a.answer]));

    const exam = await prisma.mockExam.findUnique({
      where: { id: params.id },
    });

    if (exam) {
      const user = await getCurrentPrismaUser();
      if (user && exam.userId !== user.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
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

      const subjectScores = {
        procurement: { score: 0, total: 0 },
        contract: { score: 0, total: 0 },
        finance: { score: 0, total: 0 },
      };

      let totalScore = 0;
      const answersArray = new Array(80).fill(-1);

      exam.questionIds.forEach((qId, idx) => {
        const q = qMap.get(qId);
        if (!q) return;
        const userAnswer = answerMap.get(idx + 1) ?? -1;
        answersArray[idx] = userAnswer;
        const subjectKey = subjectKeyMap[q.subjectId] ?? 'procurement';
        const isCorrect = userAnswer === q.correctAnswer;
        if (isCorrect) {
          totalScore++;
          subjectScores[subjectKey].score++;
        }
        subjectScores[subjectKey].total++;
      });

      const normalizedTotal = Math.round((totalScore / 80) * 100);
      const passStatus =
        normalizedTotal >= 60 &&
        subjectScores.procurement.score >= PASS_MIN.procurement &&
        subjectScores.contract.score >= PASS_MIN.contract &&
        subjectScores.finance.score >= PASS_MIN.finance
          ? 'PASS'
          : 'FAIL';

      const scoreBySubject = {
        procurement: subjectScores.procurement.score,
        contract: subjectScores.contract.score,
        finance: subjectScores.finance.score,
      };

      await prisma.mockExam.update({
        where: { id: params.id },
        data: {
          answers: answersArray,
          totalScore: normalizedTotal,
          scoreBySubject,
          timeSpent: body.timeSpent ?? undefined,
          status: 'completed',
          completedAt: new Date(),
        },
      });

      return NextResponse.json({
        success: true,
        resultId: params.id,
        examId: params.id,
        totalScore: normalizedTotal,
        maxScore: 100,
        passStatus,
        timeSpent: body.timeSpent ?? 0,
        subjectScores: [
          {
            subject: 'procurement',
            name: SUBJECT_NAMES.procurement,
            score: subjectScores.procurement.score,
            maxScore: SUBJECT_MAX.procurement,
            percentage: Math.round(
              (subjectScores.procurement.score / SUBJECT_MAX.procurement) * 100
            ),
            passStatus:
              subjectScores.procurement.score >= PASS_MIN.procurement ? 'PASS' : 'FAIL',
          },
          {
            subject: 'contract',
            name: SUBJECT_NAMES.contract,
            score: subjectScores.contract.score,
            maxScore: SUBJECT_MAX.contract,
            percentage: Math.round(
              (subjectScores.contract.score / SUBJECT_MAX.contract) * 100
            ),
            passStatus:
              subjectScores.contract.score >= PASS_MIN.contract ? 'PASS' : 'FAIL',
          },
          {
            subject: 'finance',
            name: SUBJECT_NAMES.finance,
            score: subjectScores.finance.score,
            maxScore: SUBJECT_MAX.finance,
            percentage: Math.round(
              (subjectScores.finance.score / SUBJECT_MAX.finance) * 100
            ),
            passStatus: subjectScores.finance.score >= PASS_MIN.finance ? 'PASS' : 'FAIL',
          },
        ],
      });
    }

    const questions = generateExamQuestions(80);
    const subjectScores: Record<string, { score: number; total: number }> = {
      procurement: { score: 0, total: 0 },
      contract: { score: 0, total: 0 },
      finance: { score: 0, total: 0 },
    };
    let totalScore = 0;
    questions.forEach((q) => {
      const userAnswer = answerMap.get(q.number);
      const isCorrect = userAnswer === q.correctAnswer;
      if (isCorrect) {
        totalScore++;
        if (subjectScores[q.subject]) subjectScores[q.subject].score++;
      }
      if (subjectScores[q.subject]) subjectScores[q.subject].total++;
    });
    const normalizedTotal = Math.round((totalScore / 80) * 100);
    const passStatus =
      normalizedTotal >= 60 &&
      subjectScores.procurement.score >= PASS_MIN.procurement &&
      subjectScores.contract.score >= PASS_MIN.contract &&
      subjectScores.finance.score >= PASS_MIN.finance
        ? 'PASS'
        : 'FAIL';

    return NextResponse.json({
      success: true,
      resultId: `result-${Date.now()}`,
      examId: params.id,
      totalScore: normalizedTotal,
      maxScore: 100,
      passStatus,
      timeSpent: body.timeSpent ?? 0,
      subjectScores: [
        {
          subject: 'procurement',
          name: SUBJECT_NAMES.procurement,
          score: subjectScores.procurement.score,
          maxScore: SUBJECT_MAX.procurement,
          percentage: Math.round(
            (subjectScores.procurement.score / SUBJECT_MAX.procurement) * 100
          ),
          passStatus:
            subjectScores.procurement.score >= PASS_MIN.procurement ? 'PASS' : 'FAIL',
        },
        {
          subject: 'contract',
          name: SUBJECT_NAMES.contract,
          score: subjectScores.contract.score,
          maxScore: SUBJECT_MAX.contract,
          percentage: Math.round(
            (subjectScores.contract.score / SUBJECT_MAX.contract) * 100
          ),
          passStatus:
            subjectScores.contract.score >= PASS_MIN.contract ? 'PASS' : 'FAIL',
        },
        {
          subject: 'finance',
          name: SUBJECT_NAMES.finance,
          score: subjectScores.finance.score,
          maxScore: SUBJECT_MAX.finance,
          percentage: Math.round(
            (subjectScores.finance.score / SUBJECT_MAX.finance) * 100
          ),
          passStatus: subjectScores.finance.score >= PASS_MIN.finance ? 'PASS' : 'FAIL',
        },
      ],
    });
  } catch (error) {
    console.error('Submit exam error:', error);
    return NextResponse.json({ error: 'Failed to submit exam' }, { status: 500 });
  }
}
