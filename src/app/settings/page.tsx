import Link from 'next/link';
import { User, BookOpen, Palette, LogOut } from 'lucide-react';

const SETTINGS_SECTIONS = [
  {
    icon: User,
    title: '프로필 설정',
    description: '닉네임, 이메일 및 개인정보 관리',
    href: '/settings/profile',
    color: 'text-blue-600'
  },
  {
    icon: BookOpen,
    title: '학습 설정',
    description: '시험일정, 학습목표, 알림 설정',
    href: '/settings/study',
    color: 'text-purple-600'
  },
  {
    icon: Palette,
    title: '디스플레이 설정',
    description: '다크모드, 폰트크기 등 UI 설정',
    href: '/settings/display',
    color: 'text-green-600'
  }
];

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">설정</h1>
          <p className="text-gray-600">학습 환경을 개인화하세요</p>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {SETTINGS_SECTIONS.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.href}
                href={section.href}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <Icon className={`w-8 h-8 ${section.color} mb-3`} />
                <h2 className="text-lg font-semibold text-gray-900 mb-1">{section.title}</h2>
                <p className="text-sm text-gray-600">{section.description}</p>
              </Link>
            );
          })}
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-red-900 mb-3">계정 관리</h3>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}
