import { NextRequest, NextResponse } from 'next/server';

import { FaqCategory } from '@/entities/faq/model/types';

const API_BASE_URL = 'http://localhost:3001';

/**
 * 카테고리 목록을 가져오는 API 핸들러
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const url = new URL('/categories', API_BASE_URL);

    // 존재하는 query parameter 조건 모두 전달
    searchParams.forEach((value, key) => {
      url.searchParams.append(key, value);
    });

    const response = await fetch(url.toString());

    if (!response.ok) {
      return NextResponse.json(
        { error: `API 요청 실패: ${response.statusText || `상태 코드 ${response.status}`}` },
        { status: response.status }
      );
    }

    const data: FaqCategory[] = await response.json();
    return NextResponse.json(['전체', ...data]);
  } catch (error) {
    // 네트워크 오류 등 예상치 못한 에러
    console.error('카테고리 데이터 가져오기 오류:', error);
    return NextResponse.json(
      { error: '카테고리 데이터를 가져오는 중 예상치 못한 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}
