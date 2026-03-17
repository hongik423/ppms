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
    <div className="w-full bg-gradient-to-r from-blue-800 to-blue-600 rounded-2xl p-8 text-white overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400/20 rounded-full -ml-16 -mb-16" />

      <div className="relative z-10">
        <p className="text-sm font-semibold opacity-90 mb-2">필기시험까지</p>
        <div className="text-5xl font-bold mb-3">
          D-<span className="text-6xl">{dDay}</span>
        </div>
        <p className="text-base opacity-75">{formattedDate}</p>
      </div>
    </div>
  );
}
