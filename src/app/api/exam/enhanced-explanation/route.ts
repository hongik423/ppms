/**
 * @fileoverview 문제별 고도화 해설 조회 API (1권 연계)
 * @encoding UTF-8
 */

import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

interface TextbookReference {
  chapter: number;
  chapterTitle: string;
  pages: string;
  keyword: string;
}

interface EnhancedExplanation {
  originalExplanation: string;
  textbookReferences: TextbookReference[];
  enhancedContent: string;
}

interface EnhancedData {
  version: string;
  totalEnhanced: number;
  explanations: Record<string, EnhancedExplanation>;
}

let cachedData: EnhancedData | null = null;

function loadEnhancedData(): EnhancedData {
  if (cachedData) return cachedData;
  try {
    const jsonPath = path.join(
      process.cwd(),
      'src',
      'data',
      'rawdata',
      'enhanced-explanations.json'
    );
    const raw = fs.readFileSync(jsonPath, 'utf-8');
    cachedData = JSON.parse(raw) as EnhancedData;
    return cachedData;
  } catch (e) {
    console.error('Failed to load enhanced-explanations.json:', e);
    return { version: '1.0', totalEnhanced: 0, explanations: {} };
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const questionId = searchParams.get('id');

    if (!questionId) {
      return NextResponse.json({ error: 'Question ID required' }, { status: 400 });
    }

    const data = loadEnhancedData();
    const explanation = data.explanations[questionId];

    if (!explanation) {
      return NextResponse.json(
        { success: false, message: '이 문제에 대한 고도화 해설이 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      questionId,
      ...explanation,
    });
  } catch (error) {
    console.error('Enhanced explanation API error:', error);
    return NextResponse.json({ error: 'Failed to fetch explanation' }, { status: 500 });
  }
}
