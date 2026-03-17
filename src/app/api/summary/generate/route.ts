/**
 * @fileoverview 핵심요약 생성 API - rawdata 기반 요약 자동 생성
 * POST /api/summary/generate
 * @encoding UTF-8
 */

import { NextResponse, NextRequest } from 'next/server';
import {
  getSummaryData,
  getTop20Keywords,
  getAllSubjects,
  getDetailItemsBySubject,
  getTextbookBySubject,
  getTextbookChapterByMainTopic,
  type SubjectData,
  type KeywordData,
  type DetailItemData,
  type TextbookChapter,
} from '@/lib/rawdata-loader';

interface SummaryRequest {
  subjectId?: string;     // null이면 전체 과목
  type?: 'full' | 'keyword' | 'exam-focus' | 'law-focus';
  limit?: number;         // 항목 수 제한
}

interface SummarySection {
  title: string;
  items: SummaryItem[];
}

interface SummaryItem {
  id: string;
  name: string;
  content: string;
  predictionScore: number;
  relatedLaws?: string[];
  examTips?: string;
  category: 'concept' | 'keyword' | 'law' | 'procedure' | 'comparison';
}

interface GeneratedSummary {
  title: string;
  subjectId: string;
  subjectName: string;
  sections: SummarySection[];
  totalItems: number;
  highPriorityCount: number;
}

// ==================== 요약 생성 함수 ====================

function generateFullSummary(subject: SubjectData, keywords: KeywordData[]): GeneratedSummary {
  const sections: SummarySection[] = [];

  // 1. 주요항목별 핵심 세세항목 요약 (교재 콘텐츠 연동)
  for (const mt of subject.mainTopics) {
    const items: SummaryItem[] = [];
    const chapter = getTextbookChapterByMainTopic(mt.id);

    for (const st of mt.subTopics) {
      for (const di of st.detailItems) {
        const matchedKeyword = keywords.find(k => k.relatedItems.includes(di.id));

        // 교재 콘텐츠에서 관련 개념 찾기
        let enrichedContent: string;
        if (matchedKeyword) {
          enrichedContent = matchedKeyword.summary;
        } else if (chapter && chapter.keyConcepts.length > 0) {
          // 세세항목명과 가장 관련 있는 교재 핵심개념 매칭
          const matchedConcept = chapter.keyConcepts.find(c =>
            c.toLowerCase().includes(di.name.split('(')[0].trim().slice(0, 4).toLowerCase())
          );
          enrichedContent = matchedConcept
            ? matchedConcept
            : `${di.name}에 대한 핵심 개념으로, 출제예상점수 ${di.predictionScore}/5입니다.`;
        } else {
          enrichedContent = `${di.name}에 대한 핵심 개념으로, 출제예상점수 ${di.predictionScore}/5입니다.`;
        }

        // 교재 기반 법률 정보 통합
        const relatedLaws = [
          ...(matchedKeyword?.keyLaws || []),
          ...(chapter?.keyLaws || []),
        ].filter((v, i, a) => a.indexOf(v) === i); // 중복 제거

        items.push({
          id: di.id,
          name: di.name,
          content: enrichedContent,
          predictionScore: di.predictionScore,
          relatedLaws: relatedLaws.length > 0 ? relatedLaws : undefined,
          examTips: matchedKeyword?.examTips || (chapter?.practicePoints?.[0] ?? undefined),
          category: di.name.includes('절차') || di.name.includes('과정') ? 'procedure'
            : di.name.includes('법') || di.name.includes('규정') ? 'law'
            : di.name.includes('차이') || di.name.includes('비교') ? 'comparison'
            : 'concept',
        });
      }
    }

    // 출제예상점수 높은 순 정렬
    items.sort((a, b) => b.predictionScore - a.predictionScore);

    sections.push({
      title: mt.name,
      items,
    });
  }

  const allItems = sections.flatMap(s => s.items);

  return {
    title: `${subject.name} 핵심요약`,
    subjectId: subject.id,
    subjectName: subject.name,
    sections,
    totalItems: allItems.length,
    highPriorityCount: allItems.filter(i => i.predictionScore >= 4).length,
  };
}

function generateKeywordSummary(keywords: KeywordData[], subjectId?: string): GeneratedSummary {
  const filteredKeywords = subjectId
    ? keywords.filter(k => k.subjects.includes(subjectId))
    : keywords;

  const items: SummaryItem[] = filteredKeywords.map(k => ({
    id: `kw-${k.rank}`,
    name: `#${k.rank} ${k.keyword}`,
    content: k.summary,
    predictionScore: 5,
    relatedLaws: k.keyLaws,
    examTips: k.examTips,
    category: 'keyword' as const,
  }));

  return {
    title: subjectId ? `${subjectId} 핵심 키워드 요약` : 'TOP 20 핵심 키워드 종합요약',
    subjectId: subjectId || 'ALL',
    subjectName: subjectId || '전체 과목',
    sections: [{
      title: '핵심 키워드 (출제 가능성 최상)',
      items,
    }],
    totalItems: items.length,
    highPriorityCount: items.length,
  };
}

function generateExamFocusSummary(subject: SubjectData, keywords: KeywordData[]): GeneratedSummary {
  // 출제예상점수 4 이상만 추출
  const highPriorityItems: SummaryItem[] = [];

  for (const mt of subject.mainTopics) {
    for (const st of mt.subTopics) {
      for (const di of st.detailItems) {
        if (di.predictionScore >= 4) {
          const matchedKeyword = keywords.find(k => k.relatedItems.includes(di.id));
          highPriorityItems.push({
            id: di.id,
            name: di.name,
            content: matchedKeyword
              ? `${matchedKeyword.summary}\n\n📌 시험 팁: ${matchedKeyword.examTips}`
              : `${di.name} - 출제 가능성 높음 (${di.predictionScore}/5)`,
            predictionScore: di.predictionScore,
            relatedLaws: matchedKeyword?.keyLaws,
            examTips: matchedKeyword?.examTips,
            category: 'concept',
          });
        }
      }
    }
  }

  highPriorityItems.sort((a, b) => b.predictionScore - a.predictionScore);

  return {
    title: `${subject.name} 시험 집중 요약`,
    subjectId: subject.id,
    subjectName: subject.name,
    sections: [{
      title: '필수 암기 항목 (출제예상 ★★★★ 이상)',
      items: highPriorityItems,
    }],
    totalItems: highPriorityItems.length,
    highPriorityCount: highPriorityItems.length,
  };
}

function generateLawFocusSummary(keywords: KeywordData[], subjectId?: string): GeneratedSummary {
  const filteredKeywords = subjectId
    ? keywords.filter(k => k.subjects.includes(subjectId) && k.keyLaws.length > 0)
    : keywords.filter(k => k.keyLaws.length > 0);

  const items: SummaryItem[] = filteredKeywords.map(k => ({
    id: `law-${k.rank}`,
    name: k.keyword,
    content: `${k.summary}\n\n📋 관련 법률:\n${k.keyLaws.map(l => `  • ${l}`).join('\n')}`,
    predictionScore: 5,
    relatedLaws: k.keyLaws,
    examTips: k.examTips,
    category: 'law' as const,
  }));

  return {
    title: subjectId ? `${subjectId} 법령 중심 요약` : '법령 핵심 요약 (전체)',
    subjectId: subjectId || 'ALL',
    subjectName: subjectId || '전체 과목',
    sections: [{
      title: '법령 관련 핵심 요약',
      items,
    }],
    totalItems: items.length,
    highPriorityCount: items.length,
  };
}

// ==================== API Handler ====================

export async function POST(request: NextRequest) {
  try {
    const body: SummaryRequest = await request.json();
    const { subjectId, type = 'full', limit } = body;

    const allKeywords = getTop20Keywords();
    let summaries: GeneratedSummary[] = [];

    switch (type) {
      case 'keyword':
        summaries = [generateKeywordSummary(allKeywords, subjectId)];
        break;

      case 'law-focus':
        summaries = [generateLawFocusSummary(allKeywords, subjectId)];
        break;

      case 'exam-focus': {
        const subjects = subjectId
          ? getAllSubjects().filter(s => s.id === subjectId)
          : getAllSubjects();
        summaries = subjects.map(s =>
          generateExamFocusSummary(s, allKeywords.filter(k => k.subjects.includes(s.id)))
        );
        break;
      }

      case 'full':
      default: {
        const subjects = subjectId
          ? getAllSubjects().filter(s => s.id === subjectId)
          : getAllSubjects();
        summaries = subjects.map(s =>
          generateFullSummary(s, allKeywords.filter(k => k.subjects.includes(s.id)))
        );
        break;
      }
    }

    // limit 적용
    if (limit) {
      summaries = summaries.map(s => ({
        ...s,
        sections: s.sections.map(sec => ({
          ...sec,
          items: sec.items.slice(0, limit),
        })),
      }));
    }

    return NextResponse.json({
      success: true,
      type,
      summaryCount: summaries.length,
      summaries,
      metadata: {
        subjectId: subjectId || 'ALL',
        dataSource: 'rawdata/subjects.json + rawdata/keywords.json + rawdata/textbook-content.json',
        driveFolder: '183hOVQYc_GwBunrVSF-wLzvPJY00Bd6f',
        enrichedWithTextbook: true,
      },
    });
  } catch (error) {
    console.error('Summary generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate summary', details: String(error) },
      { status: 500 }
    );
  }
}
