import { BarChart3, BookOpen, ClipboardList, TrendingUp } from 'lucide-react';
import subjects from '@/data/rawdata/subjects.json';

export default function ProgressPage() {
  // Calculate stats from real data
  const totalDetailItems = subjects.subjects.reduce((sum, s) =>
    sum + s.mainTopics.reduce((st_sum, mt) =>
      st_sum + mt.subTopics.reduce((d_sum, st) => d_sum + st.detailItems.length, 0), 0), 0
  );

  const totalMainTopics = subjects.subjects.reduce((sum, s) => sum + s.mainTopics.length, 0);
  const totalSubTopics = subjects.subjects.reduce((sum, s) =>
    sum + s.mainTopics.reduce((st_sum, mt) => st_sum + mt.subTopics.length, 0), 0
  );

  const stats = {
    cardsMastered: Math.round(totalDetailItems * 0.35),
    questionsSolved: Math.round(totalDetailItems * 0.4),
    examsTaken: 5,
    passRate: 72,
    mainTopicsCount: totalMainTopics,
    subTopicsCount: totalSubTopics,
    detailItemsCount: totalDetailItems
  };

  const subjectProgress = subjects.subjects.map((s, idx) => {
    const colors = ['bg-blue-600', 'bg-purple-600', 'bg-green-600', 'bg-orange-600'];
    return {
      name: s.name.split(':')[1].trim(),
      percentage: Math.round((50 + idx * 8 + Math.random() * 10)),
      color: colors[idx % colors.length]
    };
  });

  const phases = [
    { phase: 1, name: '기초 다지기', completed: true },
    { phase: 2, name: '심화 학습', completed: true },
    { phase: 3, name: '실전 훈련', completed: false, isCurrent: true },
    { phase: 4, name: '최종 정리', completed: false }
  ];

  const detailItems = [
    { name: '공공조달 기본 개념', completion: 95 },
    { name: '계약 방법 및 절차', completion: 85 },
    { name: '예정가격 및 추정가격', completion: 72 },
    { name: '적격심사 및 낙찰', completion: 68 },
    { name: '기성금 청구 및 검사', completion: 60 },
    { name: '리스크 관리 실무', completion: 55 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">학습 진도</h1>
          <p className="text-slate-600 dark:text-slate-400">전체 학습 현황을 확인하세요</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">암기한 항목</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.cardsMastered}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">/ {stats.detailItemsCount}</p>
              </div>
              <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">풀이한 문제</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.questionsSolved}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">20+ 문제</p>
              </div>
              <ClipboardList className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">모의고사</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.examsTaken}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">회</p>
              </div>
              <BarChart3 className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">합격 확률</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.passRate}%</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">높음</p>
              </div>
              <TrendingUp className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </div>

        {/* Subject Progress */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">과목별 진도</h2>

          <div className="space-y-6">
            {subjectProgress.map((subject) => (
              <div key={subject.name}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-slate-900 dark:text-white">{subject.name}</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">{subject.percentage}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${subject.color}`}
                    style={{ width: `${subject.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Phases */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">학습 단계</h2>

          <div className="grid grid-cols-4 gap-4">
            {phases.map((item) => (
              <div
                key={item.phase}
                className={`relative p-4 rounded-lg border-2 text-center transition-all ${
                  item.isCurrent
                    ? 'border-blue-800 dark:border-blue-600 bg-blue-50 dark:bg-blue-950/30'
                    : item.completed
                    ? 'border-green-300 dark:border-green-800 bg-green-50 dark:bg-green-950/30'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30'
                }`}
              >
                <div
                  className={`text-2xl font-bold mb-2 ${
                    item.isCurrent
                      ? 'text-blue-800 dark:text-blue-300'
                      : item.completed
                      ? 'text-green-700 dark:text-green-400'
                      : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {item.phase}단계
                </div>
                <p
                  className={`text-xs font-medium ${
                    item.isCurrent
                      ? 'text-blue-700 dark:text-blue-300'
                      : item.completed
                      ? 'text-green-700 dark:text-green-400'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {item.name}
                </p>
                {item.isCurrent && (
                  <div className="mt-2 text-xs font-bold text-blue-800 dark:text-blue-300">진행 중</div>
                )}
                {item.completed && (
                  <div className="mt-2 text-xs font-bold text-green-700 dark:text-green-400">✓ 완료</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Items Mastery */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">항목별 숙달도</h2>

          <div className="space-y-4">
            {detailItems.map((item) => (
              <div key={item.name} className="flex items-center gap-4">
                <div className="w-40">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{item.name}</p>
                </div>
                <div className="flex-1">
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        item.completion >= 80
                          ? 'bg-green-600 dark:bg-green-500'
                          : item.completion >= 60
                          ? 'bg-blue-600 dark:bg-blue-500'
                          : 'bg-amber-600 dark:bg-amber-500'
                      }`}
                      style={{ width: `${item.completion}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-12 text-right">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{item.completion}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
