import { NextRequest, NextResponse } from 'next/server';

import { getPageInfo } from './utils';

const API_BASE_URL = 'http://localhost:3001';

/**
 * FAQ 목록을 가져오는 API 핸들러
 * request: _page, _limit, tabId, categoryId, q
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const url = new URL('/faq', API_BASE_URL);
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
    const headerInformation = Object.fromEntries(response.headers.entries());
    const data = await response.json();
    return NextResponse.json({
      data,
      pageInfo: getPageInfo(headerInformation, searchParams),
    });
  } catch (error) {
    console.error('FAQ 데이터 가져오기 오류:', error);
    return NextResponse.json(
      { error: 'FAQ 데이터를 가져오는 중 예상치 못한 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}
