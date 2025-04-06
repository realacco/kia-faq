'use client';

import Image from 'next/image';
import React from 'react';

import styles from './AppDownload.module.scss';

export const AppDownload: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>기아 비즈 App 지금 만나보세요!</h2>
      <div className={styles.buttonContainer}>
        <a
          href="https://play.google.com/store/apps/details?id=kor.mop.user.app"
          target="_blank"
          rel="noreferrer"
          className={styles.downloadButton}
        >
          <Image
            src="/google_play.svg"
            alt="Google Play"
            width={24}
            height={24}
            className={styles.icon}
          />
          <span className={styles.label}>Google Play</span>
        </a>
        <a
          href="https://apps.apple.com/kr/app/%EC%9C%84%EB%B8%94-%EB%B9%84%EC%A6%88/id1598065794"
          target="_blank"
          rel="noreferrer"
          className={styles.downloadButton}
        >
          <Image src="/apple.svg" alt="Apple" width={24} height={24} className={styles.icon} />
          <span className={styles.label}>App Store</span>
        </a>
      </div>
    </div>
  );
};

export default AppDownload;
