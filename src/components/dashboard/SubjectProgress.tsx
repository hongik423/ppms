'use client';

interface SubjectProgressData {
  name: string;
  color: string;
  percentage: number;
  completed: number;
  total: number;
}

interface SubjectProgressProps {
  progress?: SubjectProgressData[];
}

const defaultProgress: SubjectProgressData[] = [
  { name: '1과목 (총론 및 입찰)', color: 'violet-600', percentage: 68, completed: 34, total: 50 },
  { name: '2과목 (예가 및 계약)', color: 'blue-600', percentage: 72, completed: 36, total: 50 },
  { name: '3과목 (경제학 및 분석)', color: 'emerald-600', percentage: 55, completed: 28, total: 51 },
];

export default function SubjectProgress({ progress = defaultProgress }: SubjectProgressProps) {
  const averageProgress = Math.round(
    progress.reduce((sum, subject) => sum + subject.percentage, 0) / progress.length
  );

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">과목별 학습 진도</h2>
        <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
          <span className="text-xs font-semibold text-blue-800 dark:text-blue-400">평균 {averageProgress}%</span>
        </div>
      </div>

      <div className="space-y-5">
        {progress.map((subject, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full bg-${subject.color}`} />
                <span className="text-sm font-semibold text-slate-900 dark:text-white">{subject.name}</span>
              </div>
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                {subject.percentage}%
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-${subject.color} rounded-full transition-all`}
                  style={{ width: `${subject.percentage}%` }}
                />
              </div>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">
                {subject.completed}/{subject.total}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Overall Progress */}
      <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-slate-900 dark:text-white">전체 진도</span>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
            {averageProgress}%
          </span>
        </div>
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-800 to-blue-600 rounded-full transition-all"
            style={{ width: `${averageProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
