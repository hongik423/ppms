'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, PenTool, Target, BarChart3 } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: '홈', icon: Home },
    { href: '/learn', label: '학습', icon: BookOpen },
    { href: '/questions', label: '문제', icon: PenTool },
    { href: '/mock-exam', label: '모의고사', icon: Target },
    { href: '/analytics', label: '분석', icon: BarChart3 },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 z-40">
      <div className="h-full flex items-center justify-around">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center justify-center w-14 h-16 gap-1 transition-colors ${
                isActive
                  ? 'text-blue-800 dark:text-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
