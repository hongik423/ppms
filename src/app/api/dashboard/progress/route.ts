import { NextResponse } from 'next/server';
import { getCurrentPrismaUser } from '@/lib/api-auth';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const user = await getCurrentPrismaUser();

    if (!user) {
      return NextResponse.json({
        success: true,
        stats: getDefaultStats(),
      });
    }

    const [subjects, progressList, mockExamCount] = await Promise.all([
      prisma.subject.findMany({ orderBy: { order: 'asc' } }),
      prisma.userProgress.findMany({
        where: { userId: user.id },
        include: {
          detailItem: {
            include: {
              subTopic: { include: { mainTopic: true } },
            },
          },
        },
      }),
      prisma.mockExam.count({
        where: { userId: user.id, status: 'completed' },
      }),
    ]);

    const subjectKeys = ['procurement', 'contract', 'finance'] as const;
    const subjectProgress: Record<string, { percentage: number; cardsMastered: number; questionsCorrect: number }> = {};
    let totalCardsMastered = 0;
    let totalQuestionsCorrect = 0;
    let totalQuestionsAttempted = 0;

    subjects.forEach((subj, idx) => {
      const itemsInSubject = progressList.filter(
        (p) => p.detailItem?.subTopic?.mainTopic?.subjectId === subj.id
      );
      const key = subjectKeys[idx] ?? 'procurement';
      const cardsMastered = itemsInSubject.filter((i) => i.conceptCardMastered).length;
      const totalInSubject = itemsInSubject.length || 1;
      const questionsCorrect = itemsInSubject.reduce(
        (sum, i) => sum + Math.round((i.questionCorrectRate / 100) * i.questionAttempts),
        0
      );
      const questionsAttempted = itemsInSubject.reduce((sum, i) => sum + i.questionAttempts, 0);

      totalCardsMastered += cardsMastered;
      totalQuestionsCorrect += questionsCorrect;
      totalQuestionsAttempted += questionsAttempted;

      subjectProgress[key] = {
        percentage: totalInSubject > 0 ? Math.round((cardsMastered / totalInSubject) * 100) : 0,
        cardsMastered,
        questionsCorrect,
      };
    });

    const itemsMastery = progressList
      .filter((p) => p.detailItem)
      .slice(0, 6)
      .map((p) => ({
        name: p.detailItem!.name,
        completion: Math.round(p.questionCorrectRate),
      }));

    const stats = {
      totalCardsMastered,
      totalQuestionsSolved: totalQuestionsAttempted,
      totalExamsTaken: mockExamCount,
      currentPhase: user.currentPhase,
      passRate: totalQuestionsAttempted > 0
        ? Math.round((totalQuestionsCorrect / totalQuestionsAttempted) * 100)
        : 0,
      subjectProgress,
      itemsMastery,
    };

    return NextResponse.json({ success: true, stats });
  } catch (error) {
    console.error('Dashboard progress error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch progress', success: false, stats: getDefaultStats() },
      { status: 500 }
    );
  }
}

function getDefaultStats() {
  return {
    totalCardsMastered: 0,
    totalQuestionsSolved: 0,
    totalExamsTaken: 0,
    currentPhase: 1,
    passRate: 0,
    subjectProgress: {
      procurement: { percentage: 0, cardsMastered: 0, questionsCorrect: 0 },
      contract: { percentage: 0, cardsMastered: 0, questionsCorrect: 0 },
      finance: { percentage: 0, cardsMastered: 0, questionsCorrect: 0 },
    },
    itemsMastery: [],
  };
}
