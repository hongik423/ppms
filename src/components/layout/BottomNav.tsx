'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, PenTool, Target, BarChart3 } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: '홈', icon: Home },
    { href: '/learn', label: '학습', icon: BookOpen },
    { href: '/practice', label: '문제', icon: PenTool },
    { href: '/exam', label: '모의고사', icon: Target },
    { href: '/dashboard', label: '분석', icon: BarChart3 },
  ];

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 z-40"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="h-16 flex items-center justify-around">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center justify-center flex-1 h-16 gap-1 transition-colors active:scale-95 ${
                isActive
                  ? 'text-blue-800 dark:text-blue-400'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-colors ${isActive ? 'bg-blue-50 dark:bg-blue-900/40' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-semibold leading-none ${isActive ? 'text-blue-800 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}>
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
