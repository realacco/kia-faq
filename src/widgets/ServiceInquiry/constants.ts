/**
 * ServiceInquiry 컴포넌트에서 사용되는 상수들
 */

/**
 * 서비스 문의 섹션 제목
 */
export const SERVICE_INQUIRY_TITLE = '서비스 문의';

/**
 * 서비스 문의 버튼 정보
 */
export const SERVICE_INQUIRY_BUTTONS = [
  {
    id: 'download',
    label: '서비스 제안서 다운로드',
    iconName: 'DownloadIcon',
    url: '#',
    isModal: true,
    modalMessage: 'FAQ만 구현되어 있습니다.',
  },
  {
    id: 'write',
    label: '상담문의 등록하기',
    iconName: 'WriteIcon',
    url: '#',
    isModal: true,
    modalMessage: 'FAQ만 구현되어 있습니다.',
  },
  {
    id: 'kakao',
    label: '카톡으로 문의하기',
    iconName: 'TalkIcon',
    url: 'https://pf.kakao.com/_xfLxjdb',
    isModal: false,
    subText: 'ID : 기아 비즈',
  },
];
