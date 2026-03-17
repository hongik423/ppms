import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import BottomNav from '@/components/layout/BottomNav';
import Footer from '@/components/layout/Footer';
import '@/styles/globals.css';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'PPMS 필승합격',
  description: '공공조달관리사 시험 합격을 위한 종합 학습 플랫폼',
  keywords: ['공공조달관리사', '시험', '학습', '모의고사', '문제풀이'],
  authors: [{ name: 'PPMS Team' }],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#1e40af" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${notoSansKr.variable} font-sans bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white transition-colors`}>
        {/* Header */}
        <Header />

        {/* Sidebar + Main Content */}
        <div className="flex pt-16">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <main className="flex-1 lg:ml-64">
            <div className="min-h-[calc(100vh-4rem)] pb-20 lg:pb-12">
              {children}
            </div>
            <Footer />
          </main>
        </div>

        {/* Bottom Navigation */}
        <BottomNav />
      </body>
    </html>
  );
}
