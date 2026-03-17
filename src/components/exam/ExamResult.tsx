import { CheckCircle, XCircle } from 'lucide-react';

interface ExamResultProps {
  totalScore: number;
  maxScore: number;
  passStatus: 'PASS' | 'FAIL';
  timeSpent: number;
}

export function ExamResult({
  totalScore,
  maxScore,
  passStatus,
  timeSpent
}: ExamResultProps) {
  const percentage = Math.round((totalScore / maxScore) * 100);
  const hours = Math.floor(timeSpent / 3600);
  const minutes = Math.floor((timeSpent % 3600) / 60);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8">
      <div className="flex flex-col items-center gap-6">
        {/* Score Circle */}
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="12"
            />
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke={passStatus === 'PASS' ? '#1E40AF' : '#dc2626'}
              strokeWidth="12"
              strokeDasharray={`${5.655 * percentage} 565.5`}
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-gray-900">{totalScore}</div>
            <div className="text-sm text-gray-600">점 / {maxScore}점</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">{percentage}%</div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2">
          {passStatus === 'PASS' ? (
            <>
              <CheckCircle className="w-6 h-6 text-blue-800" />
              <span className="text-lg font-semibold text-blue-800">합격</span>
            </>
          ) : (
            <>
              <XCircle className="w-6 h-6 text-red-600" />
              <span className="text-lg font-semibold text-red-600">불합격</span>
            </>
          )}
        </div>

        {/* Time Spent */}
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-1">소요 시간</div>
          <div className="text-xl font-semibold text-gray-900">
            {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}
          </div>
        </div>

        {/* Pass Line Info */}
        <div className="w-full px-4 py-3 bg-blue-50 rounded-lg border border-blue-200 text-center">
          <p className="text-sm text-gray-700">
            합격선: <span className="font-semibold">60점</span>
          </p>
        </div>
      </div>
    </div>
  );
}
