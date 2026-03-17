import { generateExamQuestions } from '@/lib/mockData';
import { NextResponse, NextRequest } from 'next/server';

interface GenerateRequest {
  subjectId?: string;
  difficulty?: 'easy' | 'normal' | 'hard';
  count: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json();

    // Generate questions
    let questions = generateExamQuestions(body.count || 10);

    // Filter by subject if specified
    if (body.subjectId) {
      questions = questions.filter(q => q.subject === body.subjectId);
    }

    // Filter by difficulty if specified
    if (body.difficulty) {
      questions = questions.filter(q => q.difficulty === body.difficulty);
    }

    // Shuffle options for each question
    const shuffledQuestions = questions.map(q => {
      const options = [...q.options];
      const correctOption = options[q.correctAnswer];

      // Fisher-Yates shuffle
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }

      const newCorrectAnswer = options.indexOf(correctOption);

      return {
        ...q,
        options,
        correctAnswer: newCorrectAnswer
      };
    });

    return NextResponse.json({
      success: true,
      questions: shuffledQuestions,
      count: shuffledQuestions.length
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate questions' }, { status: 500 });
  }
}
