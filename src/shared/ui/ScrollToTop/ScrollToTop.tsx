import React, { useEffect, useRef, useState } from 'react';

import { ArrowUpIcon } from '@/shared/assets/icons';

import styles from './ScrollToTop.module.scss';

interface ScrollToTopProps {
  scrollContainerRef?: React.RefObject<HTMLDivElement>;
}

export const ScrollToTop: React.FC<ScrollToTopProps> = ({ scrollContainerRef }) => {
  const [isVisible, setIsVisible] = useState(false);
  const bodyRef = useRef<HTMLElement | null>(null);

  const handleScroll = () => {
    if (bodyRef.current) {
      const scrollTop = bodyRef.current.scrollTop || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 10);
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      bodyRef.current = document.body;

      if (bodyRef.current) {
        bodyRef.current.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
      }
    }

    return () => {
      if (bodyRef.current) {
        bodyRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scrollToTop = () => {
    if (scrollContainerRef?.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else if (bodyRef.current) {
      bodyRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <button
      type="button"
      className={`${styles.scrollToTop} ${isVisible ? styles.visible : ''}`}
      onClick={scrollToTop}
      aria-label="페이지 상단으로 이동"
    >
      <ArrowUpIcon />
    </button>
  );
};
