'use client';

import Link from 'next/link';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    // 에러 로깅
    console.error('에러 발생:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gray-50">
      <div className="w-20 h-20 mb-6 text-[#05141f]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <h1 className="text-3xl font-bold mb-4 text-[#05141f]">오류가 발생했습니다</h1>
      <p className="text-lg mb-3 text-gray-800 max-w-md">
        {error.message || '페이지를 표시하는 중에 문제가 발생했습니다.'}
      </p>
      <p className="text-md text-gray-600 mb-8 max-w-md">
        네트워크 문제가 발생했거나 일시적인 서버 오류일 수 있습니다.
      </p>

      <div className="flex flex-col md:flex-row gap-4 mb-10 w-full max-w-md">
        <button
          onClick={reset}
          className="px-6 py-3 bg-[#05141f] text-white rounded hover:bg-[#0a2540] transition-colors w-full md:w-1/2"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
};

export default Error;
