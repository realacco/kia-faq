/**
 * Footer 컴포넌트에서 사용되는 상수들
 */

/**
 * 저작권 정보
 */
export const COPYRIGHT = '2023 KIA CORP. All Rights Reserved.';

/**
 * 정책 링크 정보
 */
export const POLICY_LINKS = [
  {
    id: 'privacy',
    name: '개인정보 처리방침',
    url: 'https://privacy.kia.com/overview/full-policy',
    isExternal: true,
  },
  {
    id: 'terms',
    name: '이용 약관',
    url: '#',
    isExternal: false,
    isDialog: true,
  },
];

/**
 * 비즈니스 정보
 */
export const BUSINESS_INFO = [
  {
    id: 'address',
    text: '서울특별시 서초구 헌릉로 12 기아㈜',
  },
  {
    id: 'ceo',
    text: '대표: 송호성, 최준영',
  },
  {
    id: 'business-number',
    text: '사업자등록번호: 119-81-02316',
  },
  {
    id: 'sales-number',
    text: '통신판매번호: 2006-07935',
  },
  {
    id: 'customer-service',
    text: '고객센터: 1833-4964',
  },
  {
    id: 'partnership',
    text: '제휴문의:',
    link: {
      text: 'kiabiz@kia.com',
      url: 'mailto:kiabiz@kia.com',
      className: 'emailLink',
    },
  },
];

/**
 * 약관 버전 정보
 */
export const TERMS_DEFAULT_VERSION = 5; // 최신 버전(5)을 기본값으로 설정
