/**
 * 약관 관련 API 함수
 */
import { TermsResponse } from '@/entities/terms/model/terms';

const API_BASE_URL = '/api';

/**
 * 약관 데이터를 가져오는 API 함수
 * @param version 특정 버전의 약관을 가져올 경우 버전 번호
 * @returns API 응답 (약관 데이터 또는 에러 메시지)
 */
export const fetchTerms = async (version?: number): Promise<TermsResponse> => {
  try {
    // json-server 형식의 URL 구성
    const url =
      version !== undefined
        ? `${API_BASE_URL}/terms?termsVersion=${version}`
        : `${API_BASE_URL}/terms`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();

    // Next.js API 응답 형식으로 변환
    if (process.env.NODE_ENV === 'production') {
      return {
        success: true,
        data: data,
      };
    }

    return data;
  } catch (error) {
    console.error('Error fetching terms:', error);
    return {
      success: false,
      message: '약관 데이터를 불러오는 중 오류가 발생했습니다.',
    };
  }
};
