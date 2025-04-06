/**
 * 약관 관련 타입 정의
 */

/**
 * 약관 데이터 타입
 */
export interface Term {
  /** 약관 이름 */
  termsName: string;
  /** 약관 버전 번호 */
  termsVersion: number;
  /** 약관 시작일 (Unix timestamp) */
  startDate: number;
  /** 약관 종료일 (Unix timestamp, 0이면 현재 적용 중) */
  endDate: number;
  /** 약관 내용 (HTML 형식) */
  contents: string;
}

/**
 * API 응답 타입
 */
export interface ApiResponse<T> {
  /** 요청 성공 여부 */
  success: boolean;
  /** 응답 데이터 */
  data?: T;
  /** 에러 메시지 */
  message?: string;
}

/**
 * 약관 API 응답 타입
 */
export type TermsResponse = ApiResponse<Term | Term[]>;
