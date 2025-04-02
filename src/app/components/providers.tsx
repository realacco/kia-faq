'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren, useState } from 'react';

import { ErrorBoundaryWithGlobalErrorHandler } from '@/app/components/ErrorBoundary';

/**
 * 앱 전체에 필요한 Provider를 제공하는 컴포넌트
 * - React Query Provider
 * - Error Boundary
 */
export const Providers = ({ children }: PropsWithChildren) => {
  // 클라이언트 컴포넌트에서 QueryClient 인스턴스를 생성
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1분
            retry: 1, // 에러 시 1번 재시도
            refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 갱신 비활성화

            throwOnError: (error: any) => {
              // 심각한 에러인 경우에만 에러 바운더리 사용
              // 400 에러는 폼 검증 등 일반적인 에러이므로 바운더리 사용 안함
              const status = error?.response?.status;
              return status === 403 || status === 401 || status === 500 || status >= 503;
            },
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundaryWithGlobalErrorHandler>{children}</ErrorBoundaryWithGlobalErrorHandler>
      {process.env.NODE_ENV !== 'production' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};
