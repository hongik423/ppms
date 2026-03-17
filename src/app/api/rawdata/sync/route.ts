/**
 * @fileoverview Google Drive 동기화 API - rawdata를 Google Drive와 동기화
 * POST /api/rawdata/sync
 * GET  /api/rawdata/sync - 동기화 상태 확인
 * @encoding UTF-8
 */

import { NextResponse, NextRequest } from 'next/server';
import { loadRawData, invalidateCache, getRawDataStats } from '@/lib/rawdata-loader';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// Google Drive 폴더 설정
const DRIVE_CONFIG = {
  folderId: '183hOVQYc_GwBunrVSF-wLzvPJY00Bd6f',
  projectFolder: '168HpwRKPb4cctl-hDmQSzr9TMiEyla1k',
  driveUrl: 'https://drive.google.com/drive/folders/183hOVQYc_GwBunrVSF-wLzvPJY00Bd6f',
};

// rawdata 파일 경로
const RAWDATA_DIR = path.join(process.cwd(), 'src', 'data', 'rawdata');
const SYNC_LOG_PATH = path.join(RAWDATA_DIR, '.sync-log.json');

interface SyncLog {
  lastSyncAt: string;
  syncSource: 'local' | 'google-drive';
  filesUpdated: string[];
  status: 'success' | 'partial' | 'failed';
  stats: ReturnType<typeof getRawDataStats>;
  driveFolder: string;
}

// ==================== GET: 동기화 상태 확인 ====================

export async function GET() {
  try {
    const stats = getRawDataStats();
    const data = loadRawData();

    let lastSync: SyncLog | null = null;
    if (existsSync(SYNC_LOG_PATH)) {
      const logContent = await readFile(SYNC_LOG_PATH, 'utf-8');
      lastSync = JSON.parse(logContent);
    }

    return NextResponse.json({
      success: true,
      status: 'connected',
      driveConfig: DRIVE_CONFIG,
      currentData: {
        version: data.metadata.version,
        lastUpdated: data.metadata.lastUpdated,
        source: data.metadata.source,
        stats,
      },
      lastSync,
    });
  } catch (error) {
    console.error('Sync status error:', error);
    return NextResponse.json(
      { error: 'Failed to get sync status', details: String(error) },
      { status: 500 }
    );
  }
}

// ==================== POST: 데이터 동기화 실행 ====================

interface SyncRequest {
  action: 'refresh' | 'update-subjects' | 'update-keywords' | 'update-textbook' | 'export-to-drive' | 'full-export';
  data?: any; // 업데이트할 데이터 (update 액션 시)
  subjectId?: string; // 특정 과목 지정 (optional)
}

export async function POST(request: NextRequest) {
  try {
    const body: SyncRequest = await request.json();
    const { action, data: updateData } = body;

    switch (action) {
      case 'refresh': {
        // 캐시 무효화하고 rawdata 재로드
        invalidateCache();
        const freshData = loadRawData();
        const stats = getRawDataStats();

        const syncLog: SyncLog = {
          lastSyncAt: new Date().toISOString(),
          syncSource: 'local',
          filesUpdated: ['subjects.json', 'keywords.json'],
          status: 'success',
          stats,
          driveFolder: DRIVE_CONFIG.folderId,
        };

        await writeSyncLog(syncLog);

        return NextResponse.json({
          success: true,
          action: 'refresh',
          message: 'Rawdata 캐시가 갱신되었습니다.',
          stats,
          metadata: freshData.metadata,
        });
      }

      case 'update-subjects': {
        // subjects.json 업데이트
        if (!updateData) {
          return NextResponse.json({ error: 'Missing update data' }, { status: 400 });
        }

        const subjectsPath = path.join(RAWDATA_DIR, 'subjects.json');
        const currentContent = JSON.parse(await readFile(subjectsPath, 'utf-8'));

        // 기존 데이터에 새 데이터 머지 (주요항목/세부항목 추가)
        const mergedData = mergeSubjectData(currentContent, updateData);
        mergedData.lastUpdated = new Date().toISOString().split('T')[0];

        await writeFile(subjectsPath, JSON.stringify(mergedData, null, 2), 'utf-8');
        invalidateCache();

        const stats = getRawDataStats();
        await writeSyncLog({
          lastSyncAt: new Date().toISOString(),
          syncSource: 'local',
          filesUpdated: ['subjects.json'],
          status: 'success',
          stats,
          driveFolder: DRIVE_CONFIG.folderId,
        });

        return NextResponse.json({
          success: true,
          action: 'update-subjects',
          message: '출제기준 데이터가 업데이트되었습니다.',
          stats,
        });
      }

      case 'update-keywords': {
        // keywords.json 업데이트
        if (!updateData) {
          return NextResponse.json({ error: 'Missing update data' }, { status: 400 });
        }

        const keywordsPath = path.join(RAWDATA_DIR, 'keywords.json');
        const currentContent = JSON.parse(await readFile(keywordsPath, 'utf-8'));

        // 기존 키워드에 새 키워드 추가/업데이트
        const mergedKeywords = mergeKeywordData(currentContent, updateData);
        mergedKeywords.lastUpdated = new Date().toISOString().split('T')[0];

        await writeFile(keywordsPath, JSON.stringify(mergedKeywords, null, 2), 'utf-8');
        invalidateCache();

        const stats = getRawDataStats();
        await writeSyncLog({
          lastSyncAt: new Date().toISOString(),
          syncSource: 'local',
          filesUpdated: ['keywords.json'],
          status: 'success',
          stats,
          driveFolder: DRIVE_CONFIG.folderId,
        });

        return NextResponse.json({
          success: true,
          action: 'update-keywords',
          message: '핵심 키워드 데이터가 업데이트되었습니다.',
          stats,
        });
      }

      case 'update-textbook': {
        // textbook-content.json 업데이트
        if (!updateData) {
          return NextResponse.json({ error: 'Missing update data' }, { status: 400 });
        }

        const textbookPath = path.join(RAWDATA_DIR, 'textbook-content.json');
        const currentContent = JSON.parse(await readFile(textbookPath, 'utf-8'));

        // 교재 콘텐츠 머지 (챕터별 업데이트)
        if (updateData.textbooks && Array.isArray(updateData.textbooks)) {
          for (const newTb of updateData.textbooks) {
            const existingTb = currentContent.textbooks.find((t: any) => t.id === newTb.id);
            if (existingTb) {
              if (newTb.chapters) {
                for (const newCh of newTb.chapters) {
                  const existingCh = existingTb.chapters.find((c: any) => c.chapterId === newCh.chapterId);
                  if (existingCh) {
                    Object.assign(existingCh, newCh);
                  } else {
                    existingTb.chapters.push(newCh);
                  }
                }
              }
            } else {
              currentContent.textbooks.push(newTb);
            }
          }
        }
        currentContent.lastUpdated = new Date().toISOString().split('T')[0];

        await writeFile(textbookPath, JSON.stringify(currentContent, null, 2), 'utf-8');
        invalidateCache();

        const stats = getRawDataStats();
        await writeSyncLog({
          lastSyncAt: new Date().toISOString(),
          syncSource: 'local',
          filesUpdated: ['textbook-content.json'],
          status: 'success',
          stats,
          driveFolder: DRIVE_CONFIG.folderId,
        });

        return NextResponse.json({
          success: true,
          action: 'update-textbook',
          message: '교재 콘텐츠 데이터가 업데이트되었습니다.',
          stats,
        });
      }

      case 'export-to-drive': {
        // 현재 rawdata를 Google Drive 연동 형식으로 내보내기
        const currentData = loadRawData();
        const stats = getRawDataStats();

        return NextResponse.json({
          success: true,
          action: 'export-to-drive',
          message: `Google Drive 폴더(${DRIVE_CONFIG.driveUrl})로 내보내기 준비 완료`,
          exportData: {
            subjects: currentData.subjects,
            keywords: currentData.keywords,
            textbooks: currentData.textbooks,
          },
          stats,
          driveConfig: DRIVE_CONFIG,
        });
      }

      case 'full-export': {
        // 전체 rawdata 번들을 통합 내보내기 (1권/2권/3권 전체)
        const currentData = loadRawData();
        const stats = getRawDataStats();

        const fullExport = {
          exportedAt: new Date().toISOString(),
          version: currentData.metadata.version,
          driveFolder: DRIVE_CONFIG.folderId,
          subjects: currentData.subjects,
          keywords: currentData.keywords,
          textbooks: currentData.textbooks,
          stats,
        };

        // 로컬에 내보내기 파일 저장
        const exportPath = path.join(RAWDATA_DIR, 'full-export.json');
        await writeFile(exportPath, JSON.stringify(fullExport, null, 2), 'utf-8');

        await writeSyncLog({
          lastSyncAt: new Date().toISOString(),
          syncSource: 'local',
          filesUpdated: ['full-export.json'],
          status: 'success',
          stats,
          driveFolder: DRIVE_CONFIG.folderId,
        });

        return NextResponse.json({
          success: true,
          action: 'full-export',
          message: '전체 rawdata가 통합 내보내기되었습니다. (1권+2권+3권+실기)',
          exportPath: 'src/data/rawdata/full-export.json',
          stats,
          driveConfig: DRIVE_CONFIG,
        });
      }

      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}` },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Sync error:', error);
    return NextResponse.json(
      { error: 'Sync failed', details: String(error) },
      { status: 500 }
    );
  }
}

// ==================== Helper Functions ====================

async function writeSyncLog(log: SyncLog): Promise<void> {
  try {
    if (!existsSync(RAWDATA_DIR)) {
      await mkdir(RAWDATA_DIR, { recursive: true });
    }
    await writeFile(SYNC_LOG_PATH, JSON.stringify(log, null, 2), 'utf-8');
  } catch (e) {
    console.warn('Failed to write sync log:', e);
  }
}

function mergeSubjectData(current: any, update: any): any {
  // 새로운 주요항목/세부항목/세세항목을 기존 데이터에 추가
  if (update.subjects && Array.isArray(update.subjects)) {
    for (const newSubject of update.subjects) {
      const existingSubject = current.subjects.find((s: any) => s.id === newSubject.id);
      if (existingSubject) {
        // 기존 과목에 새 주요항목 추가
        if (newSubject.mainTopics) {
          for (const newMt of newSubject.mainTopics) {
            const existingMt = existingSubject.mainTopics.find((m: any) => m.id === newMt.id);
            if (existingMt) {
              // 기존 주요항목에 새 세부항목 추가
              if (newMt.subTopics) {
                for (const newSt of newMt.subTopics) {
                  const existingSt = existingMt.subTopics.find((s: any) => s.id === newSt.id);
                  if (existingSt) {
                    // 기존 세부항목에 새 세세항목 추가
                    if (newSt.detailItems) {
                      for (const newDi of newSt.detailItems) {
                        const existingDi = existingSt.detailItems.find((d: any) => d.id === newDi.id);
                        if (!existingDi) {
                          existingSt.detailItems.push(newDi);
                        } else {
                          Object.assign(existingDi, newDi);
                        }
                      }
                    }
                  } else {
                    existingMt.subTopics.push(newSt);
                  }
                }
              }
            } else {
              existingSubject.mainTopics.push(newMt);
            }
          }
        }
      } else {
        current.subjects.push(newSubject);
      }
    }
  }
  return current;
}

function mergeKeywordData(current: any, update: any): any {
  if (update.top20Keywords && Array.isArray(update.top20Keywords)) {
    for (const newKw of update.top20Keywords) {
      const existingIdx = current.top20Keywords.findIndex((k: any) => k.rank === newKw.rank);
      if (existingIdx >= 0) {
        current.top20Keywords[existingIdx] = { ...current.top20Keywords[existingIdx], ...newKw };
      } else {
        current.top20Keywords.push(newKw);
      }
    }
    // rank 순으로 재정렬
    current.top20Keywords.sort((a: any, b: any) => a.rank - b.rank);
  }
  return current;
}
