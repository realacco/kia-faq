import localFont from 'next/font/local';

import type { Metadata, Viewport } from 'next';
import './globals.css';

const geistSans = localFont({
  src: '../shared/assets/fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: '../shared/assets/fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#000000',
};

export const metadata: Metadata = {
  title: '서비스 도입 FAQ | 기아 비즈(Kia Biz) - 친환경 모빌리티 서비스',
  description:
    '기아 비즈는 기업을 위한 친환경 모빌리티 서비스로 차량부터 전용 App/Web까지 업무차량 토탈 솔루션을 제공합니다.',
  keywords:
    '모빌리티,구독서비스,차량구독,차량관리,업무용차량,법인차,관용차,전기차,FMS,스마트솔루션',
  formatDetection: {
    telephone: false,
  },
  authors: [{ name: 'TESTER' }],
  openGraph: {
    title: '서비스 도입 FAQ | 기아 비즈(Kia Biz) - 친환경 모빌리티 서비스',
    description:
      '기아 비즈 서비스 도입 FAQ를 통해 차량 구독 패키지, 솔루션 구독 패키지 및 하이브리드 패키지 도입 방법을 자세하게 알아보세요',
    url: 'https://kiabiz.kia.com/FAQ',
    siteName: '기아 비즈(Kia Biz)',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: '서비스 도입 FAQ | 기아 비즈(Kia Biz) - 친환경 모빌리티 서비스',
    description:
      '기아 비즈 서비스 도입 FAQ를 통해 차량 구독 패키지, 솔루션 구독 패키지 및 하이브리드 패키지 도입 방법을 자세하게 알아보세요',
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'format-detection': 'telephone=no',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header>{/* 헤더 컴포넌트는 별도로 구현 예정 */}</header>
        <main>{children}</main>
        <footer>{/* 푸터 컴포넌트는 별도로 구현 예정 */}</footer>
      </body>
    </html>
  );
}
