/**
 * @fileoverview 제4과목 실기시험 문제 조회 API
 * @encoding UTF-8
 */

import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

interface PracticalQuestion {
  id: number;
  type: '서답형' | '사례분석형';
  questionNum: number;
  sectionRound: number;
  questionText: string;
  caseText: string | null;
  problemText: string | null;
  answer: string;
  explanation: string;
  subject: string;
  difficulty: number;
  tags: string[];
  chapter: string;
  sourceSection: string;
}

interface PracticalData {
  version: string;
  description: string;
  totalCount: number;
  byType: {
    서답형: number;
    사례분석형: number;
  };
  questions: PracticalQuestion[];
}

let cachedData: PracticalData | null = null;

function loadPracticalQuestions(): PracticalData {
  if (cachedData) return cachedData;
  try {
    const jsonPath = path.join(
      process.cwd(),
      'src',
      'data',
      'rawdata',
      'practical-questions.json'
    );
    const raw = fs.readFileSync(jsonPath, 'utf-8');
    cachedData = JSON.parse(raw) as PracticalData;
    return cachedData;
  } catch (e) {
    console.error('Failed to load practical-questions.json:', e);
    return {
      version: '1.0',
      description: '',
      totalCount: 0,
      byType: { 서답형: 0, 사례분석형: 0 },
      questions: [],
    };
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // '서답형' | '사례분석형' | null (all)
    const round = searchParams.get('round'); // '1'~'5' or null
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const data = loadPracticalQuestions();
    let questions = data.questions;

    // Filter by type
    if (type && (type === '서답형' || type === '사례분석형')) {
      questions = questions.filter((q) => q.type === type);
    }

    // Filter by round
    if (round) {
      const roundNum = parseInt(round);
      questions = questions.filter((q) => q.sectionRound === roundNum);
    }

    // Pagination
    const total = questions.length;
    const startIdx = (page - 1) * limit;
    const paginated = questions.slice(startIdx, startIdx + limit);

    return NextResponse.json({
      success: true,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        byType: data.byType,
      },
      questions: paginated,
    });
  } catch (error) {
    console.error('Practical questions API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch practical questions' },
      { status: 500 }
    );
  }
}
