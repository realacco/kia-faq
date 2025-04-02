'use client';

import { useState } from 'react';

import { FaqManager } from '@/examples/FaqExamples';
import FaqSearchExample from '@/examples/FaqSearchExample';

import { Providers } from './components/providers';
import styles from './page.module.css';

export default function Home() {
  const [activeExample, setActiveExample] = useState<'search' | 'manager'>('search');

  return (
    <Providers>
      <div className={styles.page}>
        <main className={styles.main}>
          <h1>KIA FAQ 검색 예제</h1>

          <div className={styles.tabs}>
            <button
              className={activeExample === 'search' ? styles.active : ''}
              onClick={() => setActiveExample('search')}
            >
              검색 예제
            </button>
            <button
              className={activeExample === 'manager' ? styles.active : ''}
              onClick={() => setActiveExample('manager')}
            >
              관리자 예제
            </button>
          </div>

          <div className={styles.exampleContainer}>
            {activeExample === 'search' ? <FaqSearchExample /> : <FaqManager />}
          </div>
        </main>
      </div>
    </Providers>
  );
}
