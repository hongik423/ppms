'use client';

interface DdayCounterProps {
  targetDate?: string; // YYYY-MM-DD format
}

export default function DdayCounter({ targetDate = '2026-10-03' }: DdayCounterProps) {
  const target = new Date(targetDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  const dDay = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  // Format date to Korean format (YYYY.MM.DD)
  const formattedDate = `${target.getFullYear()}.${String(target.getMonth() + 1).padStart(2, '0')}.${String(target.getDate()).padStart(2, '0')}`;

  return (
    <div className="w-full bg-gradient-to-r from-blue-800 to-blue-600 rounded-xl md:rounded-2xl p-5 md:p-8 text-white overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 md:w-40 h-32 md:h-40 bg-blue-500/20 rounded-full -mr-16 md:-mr-20 -mt-16 md:-mt-20" />
      <div className="absolute bottom-0 left-0 w-24 md:w-32 h-24 md:h-32 bg-blue-400/20 rounded-full -ml-12 md:-ml-16 -mb-12 md:-mb-16" />

      <div className="relative z-10 flex items-center justify-between md:block">
        <div>
          <p className="text-xs md:text-sm font-semibold opacity-90 mb-1 md:mb-2">필기시험까지</p>
          <div className="text-3xl md:text-5xl font-bold md:mb-3">
            D-<span className="text-4xl md:text-6xl">{dDay}</span>
          </div>
          <p className="text-sm md:text-base opacity-75 mt-1 md:mt-0">{formattedDate}</p>
        </div>
        {/* 모바일 추가 정보 */}
        <div className="md:hidden text-right">
          <p className="text-xs opacity-75">공공조달관리사</p>
          <p className="text-xs font-bold opacity-90">필기시험</p>
        </div>
      </div>
    </div>
  );
}
