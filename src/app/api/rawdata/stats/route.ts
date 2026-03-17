/**
 * @fileoverview Rawdata 통계 API
 * GET /api/rawdata/stats
 * @encoding UTF-8
 */

import { NextResponse } from 'next/server';
import {
  getRawDataStats,
  loadRawData,
  getTopPredictionItems,
  getTop20Keywords,
} from '@/lib/rawdata-loader';

export async function GET() {
  try {
    const stats = getRawDataStats();
    const data = loadRawData();
    const topItems = getTopPredictionItems(10);
    const keywords = getTop20Keywords();

    // 과목별 통계
    const subjectStats = data.subjects.map(subject => {
      let detailItemCount = 0;
      let highPriorityCount = 0;
      let totalPrediction = 0;

      for (const mt of subject.mainTopics) {
        for (const st of mt.subTopics) {
          for (const di of st.detailItems) {
            detailItemCount++;
            totalPrediction += di.predictionScore;
            if (di.predictionScore >= 4) highPriorityCount++;
          }
        }
      }

      return {
        id: subject.id,
        name: subject.name,
        questionCount: subject.questionCount,
        weightPercent: subject.weightPercent,
        mainTopicCount: subject.mainTopics.length,
        detailItemCount,
        highPriorityCount,
        avgPredictionScore: detailItemCount > 0
          ? Math.round((totalPrediction / detailItemCount) * 10) / 10
          : 0,
        relatedKeywords: keywords.filter(k => k.subjects.includes(subject.id)).length,
      };
    });

    return NextResponse.json({
      success: true,
      stats,
      subjectStats,
      topPredictionItems: topItems.map(item => ({
        id: item.id,
        name: item.name,
        predictionScore: item.predictionScore,
        subjectId: item.subjectId,
        mainTopicName: item.mainTopicName,
      })),
      metadata: data.metadata,
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json(
      { error: 'Failed to get stats', details: String(error) },
      { status: 500 }
    );
  }
}
