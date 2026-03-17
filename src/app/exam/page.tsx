import Link from 'next/link';
import { ArrowRight, BarChart3, Clock, Trophy } from 'lucide-react';
import { generateExamHistory } from '@/lib/mockData';

export default function ExamHub() {
  const examHistory = generateExamHistory();
  const totalExams = examHistory.length;
  const bestScore = Math.max(...examHistory.map(e => e.score));
  const avgScore = Math.round(examHistory.reduce((sum, e) => sum + e.score, 0) / examHistory.length);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">모의고사</h1>
          <p className="text-gray-600">공공조달관리사 자격시험에 대비하세요</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">총 응시 횟수</p>
                <p className="text-3xl font-bold text-gray-900">{totalExams}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-800" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">최고 점수</p>
                <p className="text-3xl font-bold text-gray-900">{bestScore}</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-lg">
                <Trophy className="w-6 h-6 text-amber-700" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">평균 점수</p>
                <p className="text-3xl font-bold text-gray-900">{avgScore}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Clock className="w-6 h-6 text-green-700" />
              </div>
            </div>
          </div>
        </div>

        {/* Main CTA */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-900 rounded-xl text-white p-8 mb-12">
          <h2 className="text-2xl font-bold mb-2">실전 모의고사</h2>
          <p className="text-blue-100 mb-6">80문항 120분 - 실제 시험과 동일한 형식</p>
          <Link
            href="/exam/mock/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-800 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            시험 시작
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Mini Tests */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-gray-900 mb-4">과목별 미니테스트</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { subject: '공공조달', icon: '📋', color: 'blue' },
              { subject: '계약관리', icon: '📝', color: 'purple' },
              { subject: '재정관리', icon: '💰', color: 'green' }
            ].map((item) => (
              <Link
                key={item.subject}
                href={`#`}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:border-gray-300 hover:shadow-md transition-all"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h4 className="font-semibold text-gray-900 mb-2">{item.subject}</h4>
                <p className="text-sm text-gray-600 mb-4">각 과목별 30문항</p>
                <button className="text-sm text-blue-800 font-medium hover:underline">
                  테스트 시작 →
                </button>
              </Link>
            ))}
          </div>
        </div>

        {/* History */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">모의고사 이력</h3>
          </div>

          <div className="divide-y divide-gray-200">
            {examHistory.map((exam) => (
              <div key={exam.examId} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {exam.date.toLocaleDateString('ko-KR')}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      소요시간: {Math.floor(exam.timeSpent / 60)}분
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${exam.score >= 60 ? 'text-blue-600' : 'text-red-600'}`}>
                      {exam.score}점
                    </p>
                    <p className="text-xs text-gray-600">
                      {exam.score >= 60 ? '합격' : '불합격'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
