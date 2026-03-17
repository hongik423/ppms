'use client'

interface QuestionNavigatorProps {
  totalQuestions: number;
  currentQuestion: number;
  answeredQuestions: Set<number>;
  flaggedQuestions: Set<number>;
  onNavigate: (questionNumber: number) => void;
}

export function QuestionNavigator({
  totalQuestions,
  currentQuestion,
  answeredQuestions,
  flaggedQuestions,
  onNavigate
}: QuestionNavigatorProps) {
  const questions = Array.from({ length: totalQuestions }, (_, i) => i + 1);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2 justify-start">
        {questions.map((num) => {
          let bgColor = 'bg-gray-100 text-gray-900';
          let borderColor = 'border-gray-300';

          if (num === currentQuestion) {
            bgColor = 'bg-blue-800 text-white';
          } else if (flaggedQuestions.has(num)) {
            bgColor = 'bg-amber-50 text-gray-900';
            borderColor = 'border-amber-500';
          } else if (answeredQuestions.has(num)) {
            bgColor = 'bg-blue-100 text-gray-900';
            borderColor = 'border-blue-300';
          }

          return (
            <button
              key={num}
              onClick={() => onNavigate(num)}
              className={`w-10 h-10 rounded text-sm font-medium border-2 transition-colors hover:opacity-75 ${bgColor} ${borderColor}`}
            >
              {num}
            </button>
          );
        })}
      </div>

      <div className="flex gap-4 text-xs pt-2 border-t">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
          <span className="text-gray-600">풀이함</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-amber-50 border-2 border-amber-500 rounded"></div>
          <span className="text-gray-600">표시</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
          <span className="text-gray-600">미풀이</span>
        </div>
      </div>
    </div>
  );
}
