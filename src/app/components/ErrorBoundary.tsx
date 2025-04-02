'use client';

import Link from 'next/link';
import React, { ReactNode, useEffect } from 'react';

import styles from './ErrorBoundary.module.scss';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('에러 바운더리에서 에러 캐치:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className={styles.errorTitle}>오류가 발생했습니다</h1>
          <p className={styles.errorMessage}>
            {this.state.error?.message || '컴포넌트를 표시하는 중에 문제가 발생했습니다.'}
          </p>
          <p className={styles.errorSubMessage}>
            네트워크 문제가 발생했거나 일시적인 오류일 수 있습니다.
          </p>

          <div className={styles.buttonsContainer}>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className={styles.primaryButton}
            >
              다시 시도
            </button>
          </div>

          <div className={styles.linksSection}>
            <h2 className={styles.linksSectionTitle}>FAQ 바로가기</h2>
            <div className={styles.linksList}>
              <Link href="/?tab=CONSULT" className={styles.consultLink}>
                상담 FAQ 보기 (CONSULT)
              </Link>
              <Link href="/?tab=USAGE" className={styles.usageLink}>
                이용 FAQ 보기 (USAGE)
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * api, 서버 에러 뿐만 아니라 모든 전역 에러를 잡아낼 수 있게 한다.
 */
export function ErrorBoundaryWithGlobalErrorHandler({ children }: { children: ReactNode }) {
  useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      console.error('에러 발생:', event.error);
      // 기본 에러 처리 방지
      event.preventDefault();
    };

    window.addEventListener('error', handleGlobalError);
    return () => window.removeEventListener('error', handleGlobalError);
  }, []);

  return <ErrorBoundary>{children}</ErrorBoundary>;
}

export default ErrorBoundary;
