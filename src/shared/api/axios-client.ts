import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

// Next.js API 라우트를 사용하도록 변경
const API_URL = '/api';

// 테스트를 위한 인위적인 지연 시간
const ARTIFICIAL_DELAY = 1000;

export const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - 인위적인 지연 추가
axiosClient.interceptors.request.use(
  async config => {
    // 모든 요청에 인위적인 지연 추가
    await new Promise(resolve => setTimeout(resolve, ARTIFICIAL_DELAY));
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // API 에러 처리 개선
    const status = error.response?.status;
    const data = error.response?.data as any;

    // 에러 메시지 추출 및 로깅
    const errorMessage = data?.error || error.message;

    switch (status) {
      case 400:
        console.error('잘못된 요청:', errorMessage);
        break;
      case 401:
        console.error('인증 오류:', errorMessage);
        break;
      case 403:
        console.error('접근 금지:', errorMessage);
        break;
      case 404:
        console.error('리소스를 찾을 수 없음:', errorMessage);
        break;
      case 500:
        console.error('서버 오류:', errorMessage);
        break;
      default:
        console.error(`API 오류 (${status || '알 수 없음'})`, errorMessage);
    }

    return Promise.reject({
      ...error,
    });
  }
);
