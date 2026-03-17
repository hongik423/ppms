/**
 * @fileoverview Rawdata Loader - Google Drive 연동 데이터 로더
 * 출제기준, 핵심키워드, 개념카드, 문제은행 데이터를 로컬 JSON 또는 Google Drive에서 로드
 * @encoding UTF-8
 */

import subjectsData from '@/data/rawdata/subjects.json';
import keywordsData from '@/data/rawdata/keywords.json';
import textbookData from '@/data/rawdata/textbook-content.json';

// ==================== Type Definitions ====================

export interface DetailItemData {
  id: string;
  name: string;
  predictionScore: number;
}

export interface SubTopicData {
  id: string;
  name: string;
  detailItems: DetailItemData[];
}

export interface MainTopicData {
  id: string;
  name: string;
  order: number;
  estimatedWeight: number;
  prediction: number;
  subTopics: SubTopicData[];
}

export interface SubjectData {
  id: string;
  name: string;
  questionCount: number;
  weightPercent: number;
  textbookVolume: number;
  order: number;
  mainTopics: MainTopicData[];
}

export interface KeywordData {
  rank: number;
  keyword: string;
  relatedItems: string[];
  subjects: string[];
  summary: string;
  keyLaws: string[];
  examTips: string;
}

export interface TextbookChapter {
  chapterId: string;
  title: string;
  mainTopicId?: string;
  keyConcepts: string[];
  keyLaws?: string[];
  practicePoints: string[];
}

export interface TextbookVolume {
  id: string;
  title: string;
  subjectId: string;
  volume: number;
  chapters: TextbookChapter[];
}

export interface RawDataBundle {
  subjects: SubjectData[];
  keywords: KeywordData[];
  textbooks: TextbookVolume[];
  metadata: {
    version: string;
    lastUpdated: string;
    source: string;
    driveFolder: string;
  };
}

// ==================== Google Drive Config ====================

const DRIVE_CONFIG = {
  folderId: '183hOVQYc_GwBunrVSF-wLzvPJY00Bd6f',
  projectFolder: '168HpwRKPb4cctl-hDmQSzr9TMiEyla1k',
};

// ==================== Data Cache ====================

let cachedData: RawDataBundle | null = null;
let cacheTimestamp: number = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5분 캐시

// ==================== Core Loader ====================

/**
 * 전체 rawdata 번들을 로드합니다.
 * 우선순위: 메모리 캐시 → 로컬 JSON 파일
 */
export function loadRawData(): RawDataBundle {
  const now = Date.now();
  if (cachedData && (now - cacheTimestamp) < CACHE_TTL) {
    return cachedData;
  }

  const bundle: RawDataBundle = {
    subjects: (subjectsData as any).subjects as SubjectData[],
    keywords: (keywordsData as any).top20Keywords as KeywordData[],
    textbooks: (textbookData as any).textbooks as TextbookVolume[],
    metadata: {
      version: (subjectsData as any).version,
      lastUpdated: (subjectsData as any).lastUpdated,
      source: (subjectsData as any).source,
      driveFolder: DRIVE_CONFIG.folderId,
    },
  };

  cachedData = bundle;
  cacheTimestamp = now;

  return bundle;
}

/**
 * 캐시를 무효화합니다 (Google Drive 동기화 후 사용)
 */
export function invalidateCache(): void {
  cachedData = null;
  cacheTimestamp = 0;
}

// ==================== Subject Queries ====================

/**
 * 특정 과목 데이터를 반환합니다
 */
export function getSubject(subjectId: string): SubjectData | undefined {
  const data = loadRawData();
  return data.subjects.find(s => s.id === subjectId);
}

/**
 * 모든 과목을 반환합니다
 */
export function getAllSubjects(): SubjectData[] {
  return loadRawData().subjects;
}

/**
 * 전체 세세항목 목록을 flat하게 반환합니다
 */
export function getAllDetailItems(): (DetailItemData & { subjectId: string; mainTopicId: string; subTopicId: string })[] {
  const data = loadRawData();
  const items: (DetailItemData & { subjectId: string; mainTopicId: string; subTopicId: string })[] = [];

  for (const subject of data.subjects) {
    for (const mt of subject.mainTopics) {
      for (const st of mt.subTopics) {
        for (const di of st.detailItems) {
          items.push({
            ...di,
            subjectId: subject.id,
            mainTopicId: mt.id,
            subTopicId: st.id,
          });
        }
      }
    }
  }

  return items;
}

/**
 * 출제예상점수 기준으로 상위 N개 세세항목을 반환합니다
 */
export function getTopPredictionItems(limit: number = 20): (DetailItemData & { subjectId: string; mainTopicName: string })[] {
  const data = loadRawData();
  const items: (DetailItemData & { subjectId: string; mainTopicName: string })[] = [];

  for (const subject of data.subjects) {
    for (const mt of subject.mainTopics) {
      for (const st of mt.subTopics) {
        for (const di of st.detailItems) {
          items.push({
            ...di,
            subjectId: subject.id,
            mainTopicName: mt.name,
          });
        }
      }
    }
  }

  return items
    .sort((a, b) => b.predictionScore - a.predictionScore)
    .slice(0, limit);
}

/**
 * 특정 과목의 세세항목만 반환합니다
 */
export function getDetailItemsBySubject(subjectId: string): DetailItemData[] {
  const subject = getSubject(subjectId);
  if (!subject) return [];

  const items: DetailItemData[] = [];
  for (const mt of subject.mainTopics) {
    for (const st of mt.subTopics) {
      items.push(...st.detailItems);
    }
  }
  return items;
}

// ==================== Keyword Queries ====================

/**
 * TOP 20 핵심 키워드를 반환합니다
 */
export function getTop20Keywords(): KeywordData[] {
  return loadRawData().keywords;
}

/**
 * 특정 과목에 해당하는 키워드를 반환합니다
 */
export function getKeywordsBySubject(subjectId: string): KeywordData[] {
  return loadRawData().keywords.filter(k => k.subjects.includes(subjectId));
}

/**
 * 키워드를 rank 또는 keyword로 검색합니다
 */
export function searchKeyword(query: string): KeywordData[] {
  const lower = query.toLowerCase();
  return loadRawData().keywords.filter(k =>
    k.keyword.toLowerCase().includes(lower) ||
    k.summary.toLowerCase().includes(lower)
  );
}

// ==================== Question Generation Helpers ====================

/**
 * 출제 문제 생성을 위한 세세항목 가중치 선택
 * predictionScore가 높을수록 더 자주 선택됩니다
 */
export function selectWeightedDetailItems(
  subjectId: string | null,
  count: number
): (DetailItemData & { subjectId: string })[] {
  const allItems = subjectId
    ? getDetailItemsBySubject(subjectId).map(item => ({ ...item, subjectId }))
    : getAllDetailItems();

  // 가중치 기반 랜덤 선택
  const totalWeight = allItems.reduce((sum, item) => sum + item.predictionScore, 0);
  const selected: (DetailItemData & { subjectId: string })[] = [];
  const usedIds = new Set<string>();

  while (selected.length < count && selected.length < allItems.length) {
    let random = Math.random() * totalWeight;
    for (const item of allItems) {
      if (usedIds.has(item.id)) continue;
      random -= item.predictionScore;
      if (random <= 0) {
        selected.push(item);
        usedIds.add(item.id);
        break;
      }
    }
  }

  return selected;
}

// ==================== Summary Generation Helpers ====================

/**
 * 핵심요약 생성을 위한 구조화된 데이터 반환
 */
export function getSummaryData(subjectId?: string): {
  subject: SubjectData;
  keywords: KeywordData[];
  highPriorityItems: DetailItemData[];
}[] {
  const data = loadRawData();
  const subjects = subjectId
    ? data.subjects.filter(s => s.id === subjectId)
    : data.subjects;

  return subjects.map(subject => ({
    subject,
    keywords: data.keywords.filter(k => k.subjects.includes(subject.id)),
    highPriorityItems: getDetailItemsBySubject(subject.id)
      .filter(item => item.predictionScore >= 4),
  }));
}

// ==================== Textbook Content Queries ====================

/**
 * 특정 과목의 교재 콘텐츠를 반환합니다
 */
export function getTextbookBySubject(subjectId: string): TextbookVolume | undefined {
  return loadRawData().textbooks.find(tb => tb.subjectId === subjectId);
}

/**
 * 특정 주요항목에 해당하는 교재 챕터를 반환합니다
 */
export function getTextbookChapterByMainTopic(mainTopicId: string): TextbookChapter | undefined {
  const data = loadRawData();
  for (const tb of data.textbooks) {
    const chapter = tb.chapters.find(ch => ch.mainTopicId === mainTopicId);
    if (chapter) return chapter;
  }
  return undefined;
}

/**
 * 특정 세세항목에 대한 교재 기반 핵심 콘텐츠를 반환합니다
 * - 해당 세세항목이 속한 주요항목의 교재 챕터에서 관련 개념과 법률 추출
 */
export function getEnrichedDetailItem(detailItemId: string): {
  detailItem: DetailItemData;
  textbookContent: {
    chapterTitle: string;
    keyConcepts: string[];
    keyLaws: string[];
    practicePoints: string[];
  } | null;
  keyword: KeywordData | null;
} | null {
  const data = loadRawData();

  // 세세항목 찾기
  for (const subject of data.subjects) {
    for (const mt of subject.mainTopics) {
      for (const st of mt.subTopics) {
        for (const di of st.detailItems) {
          if (di.id === detailItemId) {
            // 교재 콘텐츠 찾기
            const chapter = getTextbookChapterByMainTopic(mt.id);
            const keyword = data.keywords.find(k => k.relatedItems.includes(di.id)) || null;

            return {
              detailItem: di,
              textbookContent: chapter ? {
                chapterTitle: chapter.title,
                keyConcepts: chapter.keyConcepts,
                keyLaws: chapter.keyLaws || [],
                practicePoints: chapter.practicePoints,
              } : null,
              keyword,
            };
          }
        }
      }
    }
  }
  return null;
}

/**
 * 문제 생성을 위한 풍부한 컨텍스트 데이터를 반환합니다
 * - 세세항목 + 교재 핵심개념 + 키워드 요약을 통합
 */
export function getQuestionContext(
  detailItemId: string
): {
  topic: string;
  concepts: string[];
  laws: string[];
  tips: string[];
  keywordSummary: string;
} | null {
  const enriched = getEnrichedDetailItem(detailItemId);
  if (!enriched) return null;

  return {
    topic: enriched.detailItem.name,
    concepts: enriched.textbookContent?.keyConcepts || [],
    laws: [
      ...(enriched.textbookContent?.keyLaws || []),
      ...(enriched.keyword?.keyLaws || []),
    ],
    tips: [
      ...(enriched.textbookContent?.practicePoints || []),
      ...(enriched.keyword?.examTips ? [enriched.keyword.examTips] : []),
    ],
    keywordSummary: enriched.keyword?.summary || '',
  };
}

/**
 * Google Drive 동기화 설정 정보를 반환합니다
 */
export function getDriveSyncConfig(): {
  enabled: boolean;
  driveFolder: string;
  projectFolder: string;
  syncTargets: Record<string, string>;
} {
  const driveSync = (textbookData as any).driveSync;
  return {
    enabled: driveSync?.enabled ?? false,
    driveFolder: DRIVE_CONFIG.folderId,
    projectFolder: DRIVE_CONFIG.projectFolder,
    syncTargets: driveSync?.syncTargets ?? {},
  };
}

// ==================== Stats ====================

/**
 * rawdata 통계를 반환합니다
 */
export function getRawDataStats(): {
  subjectCount: number;
  mainTopicCount: number;
  subTopicCount: number;
  detailItemCount: number;
  keywordCount: number;
  avgPredictionScore: number;
  highPriorityCount: number;
  textbookVolumeCount: number;
  textbookChapterCount: number;
  driveConnected: boolean;
  perSubject: {
    id: string;
    name: string;
    mainTopics: number;
    subTopics: number;
    detailItems: number;
    highPriority: number;
    textbookChapters: number;
  }[];
} {
  const data = loadRawData();
  const allItems = getAllDetailItems();
  const avgScore = allItems.reduce((sum, i) => sum + i.predictionScore, 0) / allItems.length;

  let mainTopicCount = 0;
  let subTopicCount = 0;
  const perSubject: {
    id: string;
    name: string;
    mainTopics: number;
    subTopics: number;
    detailItems: number;
    highPriority: number;
    textbookChapters: number;
  }[] = [];

  for (const s of data.subjects) {
    let stCount = 0;
    let diCount = 0;
    let hpCount = 0;
    mainTopicCount += s.mainTopics.length;
    for (const mt of s.mainTopics) {
      stCount += mt.subTopics.length;
      subTopicCount += mt.subTopics.length;
      for (const st of mt.subTopics) {
        diCount += st.detailItems.length;
        hpCount += st.detailItems.filter(d => d.predictionScore >= 4).length;
      }
    }
    const tb = data.textbooks.find(t => t.subjectId === s.id);
    perSubject.push({
      id: s.id,
      name: s.name,
      mainTopics: s.mainTopics.length,
      subTopics: stCount,
      detailItems: diCount,
      highPriority: hpCount,
      textbookChapters: tb?.chapters.length ?? 0,
    });
  }

  let totalChapters = 0;
  for (const tb of data.textbooks) {
    totalChapters += tb.chapters.length;
  }

  return {
    subjectCount: data.subjects.length,
    mainTopicCount,
    subTopicCount,
    detailItemCount: allItems.length,
    keywordCount: data.keywords.length,
    avgPredictionScore: Math.round(avgScore * 10) / 10,
    highPriorityCount: allItems.filter(i => i.predictionScore >= 4).length,
    textbookVolumeCount: data.textbooks.length,
    textbookChapterCount: totalChapters,
    driveConnected: getDriveSyncConfig().enabled,
    perSubject,
  };
}
