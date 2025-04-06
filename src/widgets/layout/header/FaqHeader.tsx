import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

import { Button } from '@/shared/ui/Button';

import styles from './FaqHeader.module.scss';

const DESKTOP_BREAKPOINT = 1024;

export const FaqHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // ResizeObserver를 위한 ref
  const headerRef = useRef<HTMLElement>(null);

  // 컴포넌트 마운트 시 클라이언트 사이드 렌더링 표시
  useEffect(() => {
    setIsMounted(true);
    setWindowWidth(window.innerWidth);
  }, []);

  // 스크롤 시 헤더 스타일 변경을 위한 이벤트 리스너
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // ResizeObserver를 사용한 화면 크기 변경 감지
  useEffect(() => {
    // ResizeObserver 생성
    const resizeObserver = new ResizeObserver(() => {
      // viewport 크기를 직접 가져옴
      if (typeof window !== 'undefined') {
        setWindowWidth(window.innerWidth);
      }
    });

    // body 요소를 관찰하여 viewport 크기 변경 감지
    if (typeof document !== 'undefined') {
      resizeObserver.observe(document.body);
    }

    // 컴포넌트 언마운트 시 ResizeObserver 해제
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // 창 크기가 변경될 때 메뉴 상태 관리
  useEffect(() => {
    // 모바일/태블릿 -> 데스크톱으로 변경 시 메뉴 닫기
    if (windowWidth >= DESKTOP_BREAKPOINT && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [windowWidth, isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 현재 모바일 또는 태블릿 화면인지 확인
  const isMobileOrTablet = windowWidth < DESKTOP_BREAKPOINT;

  return (
    <header ref={headerRef} className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <Link
          href="/"
          className={styles.logo}
          onClick={() => alert('FAQ만 구현되어 있습니다.')}
          aria-label="홈으로 이동합니다."
        >
          <Image
            src="/logo-kia-02.svg"
            className={styles.logo}
            alt="Kia BIZ"
            width={140}
            height={80}
          />
        </Link>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ''}`}>
          <ul>
            <li>
              <Link
                href="/"
                onClick={() => alert('FAQ만 구현되어 있습니다.')}
                aria-label="서비스 소개 페이지로 이동합니다."
              >
                서비스 소개
              </Link>
            </li>
            <li>
              <Link href="/" aria-label="자주 묻는 질문 페이지로 이동합니다.">
                자주 묻는 질문
              </Link>
            </li>
            <li>
              <Link
                href="/"
                onClick={() => alert('FAQ만 구현되어 있습니다.')}
                aria-label="새소식 페이지로 이동합니다."
              >
                새소식
              </Link>
            </li>
            <li>
              <Link
                href="/"
                onClick={() => alert('FAQ만 구현되어 있습니다.')}
                aria-label="상담문의 페이지로 이동합니다."
              >
                상담문의
              </Link>
            </li>
          </ul>
        </nav>

        {/* 모바일 및 태블릿 사이즈에서의 토글 - 클라이언트 사이드에서만 렌더링 */}
        <div className={styles.util}>
          {isMounted && isMobileOrTablet && (
            <Button
              type="button"
              variant="text"
              className={`${styles.navToggle} ${isMenuOpen ? styles.open : ''}`}
              onClick={toggleMenu}
              aria-label="메뉴 열기/닫기"
            >
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
              <span className={styles.text}>메뉴 열기/닫기</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
