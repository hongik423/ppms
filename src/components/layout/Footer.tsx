'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 pb-20 lg:pb-0 border-t border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            © {currentYear} PPMS 필승합격. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              이용약관
            </a>
            <a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              개인정보처리방침
            </a>
            <a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              고객지원
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
