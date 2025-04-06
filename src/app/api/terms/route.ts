import { NextRequest, NextResponse } from 'next/server';

/**
 * 약관 데이터를 가져오는 API 핸들러
 * GET /api/terms - 모든 약관 데이터 반환
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // URL에서 쿼리 파라미터 추출
    const searchParams = request.nextUrl.searchParams;
    const versionParam = searchParams.get('termsVersion');

    // json-server URL 구성
    const jsonServerUrl = new URL('http://localhost:3001/terms');

    if (versionParam) {
      jsonServerUrl.searchParams.append('termsVersion', versionParam);
    }

    // json-server에 요청
    const response = await fetch(jsonServerUrl.toString());

    if (!response.ok) {
      throw new Error(`json-server responded with status: ${response.status}`);
    }

    const data = await response.json();

    // 성공 응답 반환
    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Error fetching terms from json-server:', error);

    // 에러 응답 반환
    return NextResponse.json(
      {
        success: false,
        message: '약관 데이터를 불러오는 중 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}
