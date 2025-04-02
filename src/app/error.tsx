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
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">오류가 발생했습니다</h1>
      <p className="text-lg mb-3">
        {error.message || '페이지를 표시하는 중에 문제가 발생했습니다.'}
      </p>
      <p className="text-md text-gray-600 mb-6">
        네트워크 문제가 발생했거나 일시적인 서버 오류일 수 있습니다.
      </p>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <button
          onClick={reset}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          다시 시도
        </button>
        <Link href="/" className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
          홈으로 돌아가기
        </Link>
      </div>

      <div className="mt-4 border-t border-gray-200 pt-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">FAQ 바로가기</h2>
        <div className="flex flex-col gap-3">
          <Link
            href="/?tab=CONSULT"
            className="px-4 py-3 bg-green-50 text-green-700 rounded border border-green-200 hover:bg-green-100"
          >
            상담 FAQ 보기 (CONSULT)
          </Link>
          <Link
            href="/?tab=USAGE"
            className="px-4 py-3 bg-blue-50 text-blue-700 rounded border border-blue-200 hover:bg-blue-100"
          >
            이용 FAQ 보기 (USAGE)
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
