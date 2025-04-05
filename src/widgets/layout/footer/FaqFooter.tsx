import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import styles from './FaqFooter.module.scss';

export const FaqFooter: React.FC = () => {
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
            <p className={styles.copyright}>© 2023 KIA CORP. All Rights Reserved.</p>
          </div>
          {/* logo section */}

          <div className={styles.linksSection}>
            {/* link section */}
            <div className={styles.linkColumn}>
              <ul className={styles.linkList}>
                <li>
                  <Link href="/privacy">개인정보처리방침</Link>
                </li>
                <li>
                  <Link href="/cookies">이용 약관</Link>
                </li>
              </ul>
            </div>

            {/* business info */}
            <div className={styles.linkColumn}>
              <ul className={styles.linkList}>
                <li>서울특별시 서초구 헌릉로 12 기아㈜</li>
                <li>대표: 송호성, 최준영</li>
                <li>사업자등록번호: 119-81-02316</li>
                <li>통신판매번호: 2006-07935</li>
                <li>고객센터: 1833-4964</li>
                <li>제휴문의: kiabiz@kia.com</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
