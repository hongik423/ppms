'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Trophy, Home, BookOpen, PenTool, Target, Edit3, BarChart3, Settings, User, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Calculate D-Day
  const targetDate = new Date('2026-10-03');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);
  const dDay = Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  const navLinks = [
    { href: '/', label: '홈', icon: Home },
    { href: '/learn', label: '학습', icon: BookOpen },
    { href: '/questions', label: '문제', icon: PenTool },
    { href: '/mock-exam', label: '모의고사', icon: Target },
    { href: '/practical', label: '실기', icon: Edit3 },
    { href: '/analytics', label: '분석', icon: BarChart3 },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-slate-800 shadow-sm z-50">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-blue-800 dark:text-blue-400" />
            <span className="font-bold text-lg text-slate-900 dark:text-white">PPMS 필승합격</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-800 text-white'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right section: D-Day + User Menu */}
        <div className="flex items-center gap-4">
          {/* D-Day Badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-800 to-blue-600 rounded-full">
            <span className="text-white text-sm font-semibold">D-{dDay}</span>
          </div>

          {/* User Avatar Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <ChevronDown className="w-4 h-4 text-slate-700 dark:text-slate-300 hidden sm:block" />
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-700 rounded-lg shadow-lg border border-slate-200 dark:border-slate-600 z-50">
                <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-600">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">김수업</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">user@example.com</p>
                </div>
                <div className="p-2">
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg transition-colors">
                    <Settings className="w-4 h-4" />
                    설정
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg transition-colors">
                    로그아웃
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
