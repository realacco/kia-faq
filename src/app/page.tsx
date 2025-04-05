'use client';

import { FaqTabs } from '@/widgets/FaqTabs';
import { FaqFooter } from '@/widgets/layout/footer';

import { Providers } from './components/providers';
import styles from './page.module.scss';

import '@/app/styles/globals.scss';
export default function Home() {
  return (
    <Providers>
      <div className={styles.page}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            자주 묻는 질문
            <em>궁금하신 내용을 빠르게 찾아보세요.</em>
          </h1>
          <div className={styles.exampleContainer}>
            <FaqTabs />
          </div>
        </main>
      </div>
      <FaqFooter />
    </Providers>
  );
}
