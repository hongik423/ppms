/**
 * @fileoverview 공공조달관리사 출제기준 API
 * GET /api/learn/exam-criteria?mainTopicId=S1-MT1
 * GET /api/learn/exam-criteria?subjectId=S1
 * 출제기준 세부항목·세세항목 반환 (2026.03.01~2028.12.31 적용)
 */

import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

interface DetailItem {
  name: string;
  detailItems: string[];
}

interface MainTopicCriteria {
  mainTopicId: string;
  order: number;
  name: string;
  subTopics: DetailItem[];
}

interface SubjectCriteria {
  subjectId: string;
  subjectName: string;
  questionCount: number;
  color: string;
  book: string;
  mainTopics: MainTopicCriteria[];
}

interface ExamCriteriaData {
  version: string;
  appliedPeriod: string;
  qualification: string;
  examType: string;
  checkMethod: string;
  totalQuestions: number;
  examTime: string;
  jobDescription: string;
  subjects: SubjectCriteria[];
}

let cached: ExamCriteriaData | null = null;

function loadCriteria(): ExamCriteriaData {
  if (!cached) {
    const p = path.join(process.cwd(), 'src', 'data', 'rawdata', 'exam-criteria.json');
    cached = JSON.parse(fs.readFileSync(p, 'utf-8')) as ExamCriteriaData;
  }
  return cached!;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const mainTopicId = searchParams.get('mainTopicId'); // e.g. S1-MT1
    const subjectId = searchParams.get('subjectId');     // e.g. S1

    const data = loadCriteria();

    // 특정 mainTopic 조회
    if (mainTopicId) {
      const subjectPrefix = mainTopicId.split('-')[0]; // S1, S2, S3
      const subject = data.subjects.find((s) => s.subjectId === subjectPrefix);
      if (!subject) {
        return NextResponse.json({ success: false, error: 'Subject not found' }, { status: 404 });
      }
      const mt = subject.mainTopics.find((m) => m.mainTopicId === mainTopicId);
      if (!mt) {
        return NextResponse.json({ success: false, error: 'MainTopic not found' }, { status: 404 });
      }
      return NextResponse.json({
        success: true,
        mainTopicId,
        criteria: mt,
        subject: {
          subjectId: subject.subjectId,
          subjectName: subject.subjectName,
          questionCount: subject.questionCount,
          color: subject.color,
          book: subject.book,
        },
        meta: {
          version: data.version,
          appliedPeriod: data.appliedPeriod,
          totalDetailItems: mt.subTopics.reduce((s, st) => s + st.detailItems.length, 0),
        },
      });
    }

    // 과목 전체 조회
    if (subjectId) {
      const subject = data.subjects.find((s) => s.subjectId === subjectId);
      if (!subject) {
        return NextResponse.json({ success: false, error: 'Subject not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, subject, meta: { version: data.version, appliedPeriod: data.appliedPeriod } });
    }

    // 전체 반환
    return NextResponse.json({
      success: true,
      version: data.version,
      appliedPeriod: data.appliedPeriod,
      qualification: data.qualification,
      examType: data.examType,
      checkMethod: data.checkMethod,
      totalQuestions: data.totalQuestions,
      examTime: data.examTime,
      subjects: data.subjects.map((s) => ({
        subjectId: s.subjectId,
        subjectName: s.subjectName,
        questionCount: s.questionCount,
        color: s.color,
        book: s.book,
        mainTopicCount: s.mainTopics.length,
      })),
    });
  } catch (err) {
    console.error('[exam-criteria] error:', err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
