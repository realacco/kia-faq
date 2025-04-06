import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import TermsDialog from '@/entities/terms/ui/TermsDialog';

import { BUSINESS_INFO, COPYRIGHT, POLICY_LINKS, TERMS_DEFAULT_VERSION } from './constants';
import styles from './FaqFooter.module.scss';

export const FaqFooter: React.FC = () => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const handleTermsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsTermsOpen(true);
  };

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
            <p className={styles.copyright}>{COPYRIGHT}</p>
          </div>

          <div className={styles.contentSection}>
            {/* policy links */}
            <div className={styles.policyLinks}>
              <ul className={styles.linkList}>
                {POLICY_LINKS.map(link => (
                  <li key={link.id}>
                    {link.isDialog ? (
                      <a href={link.url} onClick={handleTermsClick}>
                        {link.name}
                      </a>
                    ) : (
                      <a
                        href={link.url}
                        target={link.isExternal ? '_blank' : undefined}
                        rel={link.isExternal ? 'noopener noreferrer' : undefined}
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* business info */}
            <div className={styles.businessInfoWrapper}>
              <ul className={`${styles.linkList} ${styles.businessInfo}`}>
                {BUSINESS_INFO.map(item => (
                  <li key={item.id}>
                    {item.text}
                    {item.link && (
                      <>
                        {' '}
                        <a
                          href={item.link.url}
                          className={item.link.className ? styles[item.link.className] : undefined}
                        >
                          {item.link.text}
                        </a>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 이용약관 다이얼로그 */}
      <TermsDialog
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        initialVersion={TERMS_DEFAULT_VERSION}
      />
    </footer>
  );
};
