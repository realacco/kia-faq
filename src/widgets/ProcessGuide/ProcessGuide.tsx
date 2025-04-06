'use client';

import React from 'react';

import {
  ArrowRightIcon,
  Process02Icon,
  Process03Icon,
  Process04Icon,
  ProcessIcon,
} from '@/shared/assets/icons';

import styles from './ProcessGuide.module.scss';

export const ProcessGuide: React.FC = () => {
  return (
    <section className={styles.processGuide}>
      <h3 className={styles.title}>이용 프로세스 안내</h3>
      <div className={styles.processContainer}>
        <ul className={styles.processList}>
          <li className={styles.processItem}>
            <div className={styles.iconWrapper}>
              <ProcessIcon className={styles.icon} />
            </div>
            <div className={styles.content}>
              <strong className={styles.stepTitle}>1. 문의 등록</strong>
              <p className={styles.description}>
                상담 문의를 등록해 주시면, 담당자가 맞춤형 상담을 제공합니다.
              </p>
            </div>
          </li>
          <div className={styles.arrowWrapper}>
            <ArrowRightIcon className={styles.arrow} />
          </div>
          <li className={styles.processItem}>
            <div className={styles.iconWrapper}>
              <Process02Icon className={styles.icon} />
            </div>
            <div className={styles.content}>
              <strong className={styles.stepTitle}>2. 관리자 설정</strong>
              <p className={styles.description}>
                관리자 Web 접속 후 결제방식 및 회사정보를 설정합니다.
              </p>
            </div>
          </li>
          <div className={styles.arrowWrapper}>
            <ArrowRightIcon className={styles.arrow} />
          </div>
          <li className={styles.processItem}>
            <div className={styles.iconWrapper}>
              <Process03Icon className={styles.icon} />
            </div>
            <div className={styles.content}>
              <strong className={styles.stepTitle}>3. 임직원 가입</strong>
              <p className={styles.description}>
                이용자 App에서 회원가입 후 소속 회사 인증을 진행합니다.
              </p>
            </div>
          </li>
          <div className={styles.arrowWrapper}>
            <ArrowRightIcon className={styles.arrow} />
          </div>
          <li className={styles.processItem}>
            <div className={styles.iconWrapper}>
              <Process04Icon className={styles.icon} />
            </div>
            <div className={styles.content}>
              <strong className={styles.stepTitle}>4. 서비스 이용</strong>
              <p className={styles.description}>
                이용자 App에서 차량 예약을 하고 K존에서 바로 이용하세요!
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ProcessGuide;
