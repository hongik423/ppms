'use client';

import Link from 'next/link';
import { ArrowRight, BarChart3, Clock, Trophy, BookOpen } from 'lucide-react';
import subjectsData from '@/data/rawdata/subjects.json';

const subjects = subjectsData.subjects;

export default function ExamHub() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">모의고사</h1>
          <p className="text-gray-600">공공조달관리사 자격시험에 대비하세요 (필기: 80문항 2시간)</p>
        </div>

        {/* Exam Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">필기 문항수</p>
                <p className="text-3xl font-bold text-gray-900">80문항</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-800" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">시험 시간</p>
                <p className="text-3xl font-bold text-gray-900">2시간</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-lg">
                <Clock className="w-6 h-6 text-amber-700" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">합격 기준</p>
                <p className="text-3xl font-bold text-gray-900">60점</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Trophy className="w-6 h-6 text-green-700" />
              </div>
            </div>
          </div>
        </div>

        {/* Main CTA - 필기 모의고사 */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-900 rounded-xl text-white p-8 mb-6">
          <h2 className="text-2xl font-bold mb-2">필기 실전 모의고사</h2>
          <p className="text-blue-100 mb-6">80문항 120분 - 실제 시험과 동일한 형식으로 연습하세요</p>
          <Link
            href="/exam/mock/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-800 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            필기시험 시작
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Study Mode CTA - 학습 모드 */}
        <div className="bg-gradient-to-r from-violet-600 to-violet-700 rounded-xl text-white p-8 mb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">문제 학습 모드 (거꾸로 학습)</h2>
              <p className="text-violet-100 mb-2">문제 → 정답 확인 → 1·2·3권 교재 연계 심층 해설</p>
              <p className="text-violet-200 text-sm mb-6">
                1권(제1과목) · 2권(제2과목) · 3권(제3과목) 교재 페이지 번호 연계 · 원리 이해 중심 학습 · 985문제 고도화 해설
              </p>
              <Link
                href="/exam/study"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-violet-700 rounded-lg font-semibold hover:bg-violet-50 transition-colors"
              >
                학습 모드 시작
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Practical Exam CTA - 실기 */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl text-white p-8 mb-12">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-orange-500 rounded text-xs font-bold">NEW</span>
                <h2 className="text-2xl font-bold">실기 예상문제 (제4과목)</h2>
              </div>
              <p className="text-orange-100 mb-2">공공조달 관리실무 서답형 · 사례분석형 197문제</p>
              <p className="text-orange-200 text-sm mb-6">
                1권 교재 연계 고도화 해설 · 거꾸로 학습법(Reverse Learning) 적용
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link
                  href="/exam/practical"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-orange-700 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
                >
                  실기 학습 시작
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <div className="flex items-center gap-4 text-orange-200 text-sm">
                  <span>✍️ 서답형 100문제</span>
                  <span>📋 사례분석형 97문제</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subject Mini Tests */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-gray-900 mb-4">과목별 미니테스트</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {subjects.filter(s => s.id !== 'S4').map((subject) => {
              const colors: Record<string, { icon: string; bg: string; text: string }> = {
                S1: { icon: '📋', bg: 'bg-violet-50 border-violet-200', text: 'text-violet-800' },
                S2: { icon: '📊', bg: 'bg-blue-50 border-blue-200', text: 'text-blue-800' },
                S3: { icon: '📝', bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-800' },
              };
              const color = colors[subject.id] || colors.S1;
              return (
                <Link
                  key={subject.id}
                  href="/practice/quick"
                  className={`${color.bg} rounded-lg border p-6 hover:shadow-md transition-all`}
                >
                  <div className="text-3xl mb-3">{color.icon}</div>
                  <h4 className="font-semibold text-gray-900 mb-1 text-sm">{subject.name}</h4>
                  <p className="text-sm text-gray-600 mb-4">{subject.questionCount}문항</p>
                  <span className={`text-sm ${color.text} font-medium`}>
                    테스트 시작 →
                  </span>
                </Link>
              );
            })}
            <Link
              href="/exam/practical"
              className="bg-orange-50 border border-orange-200 rounded-lg p-6 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-3">✍️</div>
              <h4 className="font-semibold text-gray-900 mb-1 text-sm">4과목: 실기</h4>
              <p className="text-sm text-gray-600 mb-1">서답형 · 사례분석형</p>
              <p className="text-xs text-orange-600 font-medium mb-3">197문제 수록</p>
              <span className="text-sm text-orange-800 font-medium">
                실기 학습 시작 →
              </span>
            </Link>
          </div>
        </div>

        {/* Exam Structure Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-blue-800" />
            <h3 className="text-xl font-bold text-gray-900">시험 구조</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left font-bold text-gray-900">구분</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-900">과목명</th>
                  <th className="px-4 py-3 text-center font-bold text-gray-900">문항수</th>
                  <th className="px-4 py-3 text-center font-bold text-gray-900">비중</th>
                </tr>
              </thead>
              <tbody>
                {subjects.filter(s => s.id !== 'S4').map((subject) => (
                  <tr key={subject.id} className="border-b border-gray-100">
                    <td className="px-4 py-3 font-semibold text-gray-900">필기 {subject.order}과목</td>
                    <td className="px-4 py-3 text-gray-700">{subject.name.replace(/\d과목: /, '')}</td>
                    <td className="px-4 py-3 text-center font-bold text-blue-600">{subject.questionCount}문항</td>
                    <td className="px-4 py-3 text-center text-gray-600">{subject.weightPercent}%</td>
                  </tr>
                ))}
                <tr className="border-b border-gray-100 bg-orange-50">
                  <td className="px-4 py-3 font-semibold text-gray-900">실기</td>
                  <td className="px-4 py-3 text-gray-700">공공조달 관리실무</td>
                  <td className="px-4 py-3 text-center font-bold text-orange-600">필답형</td>
                  <td className="px-4 py-3 text-center text-gray-600">2시간 30분</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
