'use client';

import { FaqManager } from '@/examples/FaqExamples';

import { Providers } from './components/providers';
import styles from './page.module.css';
import '@/app/styles/globals.scss';

export default function Home() {
  return (
    <Providers>
      <div className={styles.page}>
        <main className={styles.main}>
          <h1>KIA FAQ</h1>

          <div className={styles.exampleContainer}>
            <FaqManager />
          </div>
        </main>
      </div>
    </Providers>
  );
}
