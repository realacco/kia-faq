import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import TermsDialog from '@/entities/terms/ui/TermsDialog';

import styles from './FaqFooter.module.scss';

export const FaqFooter: React.FC = () => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          {/* logo section */}
          <div className={styles.logoSection}>
            <Image
              src="/logo-kia.svg"
              alt="KIA Logo"
              width={80}
              height={40}
              className={styles.logo}
            />
            <p className={styles.copyright}> 2023 KIA CORP. All Rights Reserved.</p>
          </div>

          <div className={styles.contentSection}>
            {/* policy links */}
            <div className={styles.policyLinks}>
              <ul className={styles.linkList}>
                <li>
                  <a
                    href="https://privacy.kia.com/overview/full-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    개인정보 처리방침
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      setIsTermsOpen(true);
                    }}
                  >
                    이용 약관
                  </a>
                </li>
              </ul>
            </div>

            {/* business info */}
            <div className={styles.businessInfoWrapper}>
              <ul className={`${styles.linkList} ${styles.businessInfo}`}>
                <li>서울특별시 서초구 헌릉로 12 기아㈜</li>
                <li>대표: 송호성, 최준영</li>
                <li>사업자등록번호: 119-81-02316</li>
                <li>통신판매번호: 2006-07935</li>
                <li>고객센터: 1833-4964</li>
                <li>
                  제휴문의:{' '}
                  <a href="mailto:kiabiz@kia.com" className={styles.emailLink}>
                    kiabiz@kia.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 이용약관 다이얼로그 */}
      <TermsDialog
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        initialVersion={5} // 최신 버전(5)을 기본값으로 설정
      />
    </footer>
  );
};
