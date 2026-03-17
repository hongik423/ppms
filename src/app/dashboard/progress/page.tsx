import { BarChart3, BookOpen, ClipboardList, TrendingUp } from 'lucide-react';

export default function ProgressPage() {
  const stats = {
    cardsMastered: 145,
    questionsSolved: 342,
    examsTaken: 5,
    currentPhase: 3,
    passRate: 72
  };

  const subjectProgress = [
    { name: '공공조달', percentage: 78, color: 'bg-blue-600' },
    { name: '계약관리', percentage: 65, color: 'bg-purple-600' },
    { name: '재정관리', percentage: 72, color: 'bg-green-600' }
  ];

  const phases = [
    { phase: 1, name: '기초 이론', completed: true },
    { phase: 2, name: '심화 학습', completed: true },
    { phase: 3, name: '실전 연습', completed: false, isCurrent: true },
    { phase: 4, name: '최종 점검', completed: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">학습 진도</h1>
          <p className="text-gray-600">전체 학습 현황을 확인하세요</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">암기한 카드</p>
                <p className="text-3xl font-bold text-gray-900">{stats.cardsMastered}</p>
              </div>
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">풀이한 문제</p>
                <p className="text-3xl font-bold text-gray-900">{stats.questionsSolved}</p>
              </div>
              <ClipboardList className="w-6 h-6 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">모의고사</p>
                <p className="text-3xl font-bold text-gray-900">{stats.examsTaken}</p>
              </div>
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">합격 확률</p>
                <p className="text-3xl font-bold text-gray-900">{stats.passRate}%</p>
              </div>
              <TrendingUp className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>

        {/* Subject Progress */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">과목별 진도</h2>

          <div className="space-y-6">
            {subjectProgress.map((subject) => (
              <div key={subject.name}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">{subject.name}</span>
                  <span className="text-sm font-semibold text-gray-900">{subject.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
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
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">학습 단계</h2>

          <div className="grid grid-cols-4 gap-4">
            {phases.map((item) => (
              <div
                key={item.phase}
                className={`relative p-4 rounded-lg border-2 text-center transition-all ${
                  item.isCurrent
                    ? 'border-blue-800 bg-blue-50'
                    : item.completed
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className={`text-2xl font-bold mb-2 ${
                  item.isCurrent ? 'text-blue-800' : item.completed ? 'text-green-700' : 'text-gray-400'
                }`}>
                  {item.phase}단계
                </div>
                <p className={`text-xs font-medium ${
                  item.isCurrent ? 'text-blue-700' : item.completed ? 'text-green-700' : 'text-gray-500'
                }`}>
                  {item.name}
                </p>
                {item.isCurrent && (
                  <div className="mt-2 text-xs font-bold text-blue-800">진행 중</div>
                )}
                {item.completed && (
                  <div className="mt-2 text-xs font-bold text-green-700">✓ 완료</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Items Mastery */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">항목별 숙달도</h2>

          <div className="space-y-4">
            {[
              { name: '공공조달법 기본', completion: 95 },
              { name: '입찰 및 낙찰', completion: 85 },
              { name: '계약 체결', completion: 72 },
              { name: '계약금 관리', completion: 68 },
              { name: '기성금 청구', completion: 60 },
              { name: '예산 관리', completion: 55 }
            ].map((item) => (
              <div key={item.name} className="flex items-center gap-4">
                <div className="w-40">
                  <p className="text-sm font-medium text-gray-900">{item.name}</p>
                </div>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        item.completion >= 80
                          ? 'bg-green-600'
                          : item.completion >= 60
                          ? 'bg-blue-600'
                          : 'bg-amber-600'
                      }`}
                      style={{ width: `${item.completion}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-12 text-right">
                  <span className="text-sm font-bold text-gray-900">{item.completion}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
