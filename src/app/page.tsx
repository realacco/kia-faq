'use client';

import { AppDownload } from '@/widgets/AppDownload';
import { FaqTabs } from '@/widgets/FaqTabs';
import { FaqFooter } from '@/widgets/layout/footer';
import { FaqHeader } from '@/widgets/layout/header';
import { ProcessGuide } from '@/widgets/ProcessGuide';
import { ServiceInquiry } from '@/widgets/ServiceInquiry';

import { Providers } from './components/providers';
import styles from './page.module.scss';

import '@/app/styles/globals.scss';
export default function Home() {
  return (
    <Providers>
      <FaqHeader />
      <div className={styles.page}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            자주 묻는 질문
            <em>궁금하신 내용을 빠르게 찾아보세요.</em>
          </h1>

          <FaqTabs />
          <ServiceInquiry />
          <ProcessGuide />
          <AppDownload />
        </main>
      </div>
      <FaqFooter />
    </Providers>
  );
}
