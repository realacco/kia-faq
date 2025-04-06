'use client';

import React from 'react';

import { DownloadIcon, TalkIcon, WriteIcon } from '@/shared/assets/icons';

import styles from './ServiceInquiry.module.scss';

export const ServiceInquiry: React.FC = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>서비스 문의</h3>
      <div className={styles.buttonContainer}>
        <a href="#" className={styles.button} onClick={() => alert('FAQ만 구현되어 있습니다.')}>
          <DownloadIcon className={styles.icon} />
          <span className={styles.label}>서비스 제안서 다운로드</span>
        </a>
        <a href="#" className={styles.button} onClick={() => alert('FAQ만 구현되어 있습니다.')}>
          <WriteIcon className={styles.icon} />
          <span className={styles.label}>상담문의 등록하기</span>
        </a>
        <a href="https://pf.kakao.com/_xfLxjdb" className={styles.button}>
          <TalkIcon className={styles.icon} />
          <div className={styles.label}>
            카톡으로 문의하기
            <span className={styles.subText}>ID : 기아 비즈</span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default ServiceInquiry;
