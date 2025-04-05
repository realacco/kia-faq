import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Dialog } from '@/shared/ui/Dialog';
import { Select } from '@/shared/ui/Select';

import styles from './FaqFooter.module.scss';

export const FaqFooter: React.FC = () => {
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);

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
          {/* logo section */}

          <div className={styles.linksSection}>
            {/* link section */}
            <div className={styles.linkColumn}>
              <ul className={styles.linkList}>
                <li>
                  <a
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      setIsPrivacyPolicyOpen(true);
                    }}
                  >
                    개인정보 처리방침
                  </a>
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
      <Dialog
        isOpen={isPrivacyPolicyOpen}
        onClose={() => setIsPrivacyPolicyOpen(false)}
        title="개인정보 처리방침"
      >
        <div>
          <p>개인정보 처리방침</p>
          <Select
            options={[
              { value: 'option1', label: '옵션 1' },
              { value: 'option2', label: '옵션 2' },
              { value: 'option3', label: '옵션 3' },
            ]}
            placeholder="선택하세요"
            onChange={selected => console.log('Selected:', selected)}
          />
        </div>
      </Dialog>
    </footer>
  );
};
