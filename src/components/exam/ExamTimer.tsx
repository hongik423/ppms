'use client';

import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ExamTimerProps {
  totalSeconds: number;
  onTimeUp: () => void;
  isRunning: boolean;
}

export function ExamTimer({ totalSeconds, onTimeUp, isRunning }: ExamTimerProps) {
  const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, onTimeUp]);

  const hours = Math.floor(remainingSeconds / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;

  const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  let textColor = 'text-gray-900';
  if (remainingSeconds <= 600) {
    textColor = 'text-red-600 animate-pulse';
  } else if (remainingSeconds <= 1800) {
    textColor = 'text-amber-600';
  }

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg border border-gray-200">
      <Clock className="w-5 h-5 text-blue-800" />
      <time className={`font-mono text-lg font-semibold ${textColor}`}>
        {timeString}
      </time>
      {remainingSeconds <= 600 && (
        <span className="ml-2 text-xs font-medium text-red-600">긴급</span>
      )}
    </div>
  );
}
