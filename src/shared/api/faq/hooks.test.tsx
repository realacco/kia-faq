import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { ReactNode } from 'react';

import { FaqTabId } from '@/entities/faq/model/types';
import * as api from '@/shared/api/faq/api';
import { useFaqCategoriesByTab, usePaginatedFaqs } from '@/shared/api/faq/hooks';

// API 모킹
jest.mock('@/shared/api/faq/api');
const mockedApi = api as jest.Mocked<typeof api>;

// 테스트 데이터
const mockFaqList = {
  items: [
    {
      id: 1,
      question: '질문 1',
      answer: '답변 1',
      viewCount: 10,
      categoryId: 'PRODUCT',
      tabId: 'CONSULT' as FaqTabId,
      categoryName: '제품 문의',
      subCategoryName: '일반 제품',
    },
    {
      id: 2,
      question: '질문 2',
      answer: '답변 2',
      viewCount: 5,
      categoryId: 'PRODUCT',
      tabId: 'CONSULT' as FaqTabId,
      categoryName: '제품 문의',
      subCategoryName: '특별 제품',
    },
  ],
  pageInfo: {
    currentPage: 1,
    totalPages: 1,
    totalCount: 2,
    perPage: 10,
    prevPage: 0,
    nextPage: 0,
  },
};

const mockCategories = [
  { id: 'PRODUCT', name: '제품 문의', tabId: 'CONSULT' as FaqTabId },
  { id: 'COUNSELING', name: '상담 문의', tabId: 'CONSULT' as FaqTabId },
  { id: 'CONTRACT', name: '계약 문의', tabId: 'CONSULT' as FaqTabId },
];

// 테스트 컴포넌트
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('FAQ API 훅 테스트', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('usePaginatedFaqs', () => {
    test('페이지네이션 파라미터로 FAQ 목록을 가져온다', async () => {
      // API 응답 모킹
      mockedApi.fetchFaqs.mockResolvedValue(mockFaqList);

      // 훅 렌더링
      const { result } = renderHook(() => usePaginatedFaqs(1, 10), {
        wrapper: createWrapper(),
      });

      // 초기 상태는 로딩 중
      expect(result.current.isLoading).toBe(true);

      // 데이터 로딩 완료 대기
      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      // API 호출 검증
      expect(mockedApi.fetchFaqs).toHaveBeenCalledWith({
        _page: 1,
        _limit: 10,
      });

      // 결과 데이터 검증
      expect(result.current.data).toEqual(mockFaqList);
    });

    test('탭과 카테고리 필터로 FAQ 목록을 가져온다', async () => {
      // API 응답 모킹
      mockedApi.fetchFaqs.mockResolvedValue({
        ...mockFaqList,
        items: [mockFaqList.items[0]], // 필터된 결과
        pageInfo: { ...mockFaqList.pageInfo, totalCount: 1 },
      });

      // 훅 렌더링 (탭과 카테고리 필터 적용)
      const { result } = renderHook(
        () => usePaginatedFaqs(1, 10, { tab: 'CONSULT', categoryId: 'PRODUCT' }),
        { wrapper: createWrapper() }
      );

      // 데이터 로딩 완료 대기
      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      // API 호출 검증
      expect(mockedApi.fetchFaqs).toHaveBeenCalledWith({
        _page: 1,
        _limit: 10,
        tab: 'CONSULT',
        categoryId: 'PRODUCT',
      });

      // 결과 데이터 검증
      expect(result.current.data?.items.length).toBe(1);
      expect(result.current.data?.pageInfo.totalCount).toBe(1);
    });

    test('검색어로 FAQ 목록을 가져온다', async () => {
      // API 응답 모킹
      mockedApi.fetchFaqs.mockResolvedValue({
        ...mockFaqList,
        items: [mockFaqList.items[0]], // 검색 결과
        pageInfo: { ...mockFaqList.pageInfo, totalCount: 1 },
      });

      // 훅 렌더링 (검색어 적용)
      const { result } = renderHook(() => usePaginatedFaqs(1, 10, { searchText: '질문 1' }), {
        wrapper: createWrapper(),
      });

      // 데이터 로딩 완료 대기
      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      // API 호출 검증
      expect(mockedApi.fetchFaqs).toHaveBeenCalledWith({
        _page: 1,
        _limit: 10,
        searchText: '질문 1',
      });

      // 검색 결과 검증
      expect(result.current.data?.items.length).toBe(1);
      expect(result.current.data?.items[0].question).toContain('질문 1');
    });
  });

  describe('useFaqCategoriesByTab', () => {
    test('특정 탭의 카테고리 목록을 가져온다', async () => {
      // API 응답 모킹
      mockedApi.fetchCategoriesByTab.mockResolvedValue(mockCategories);

      // 훅 렌더링
      const { result } = renderHook(() => useFaqCategoriesByTab('CONSULT'), {
        wrapper: createWrapper(),
      });

      // 데이터 로딩 완료 대기
      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      // API 호출 검증
      expect(mockedApi.fetchCategoriesByTab).toHaveBeenCalledWith('CONSULT');

      // 결과 데이터 검증
      expect(result.current.data).toEqual(mockCategories);
      expect(result.current.data?.length).toBe(3);
      expect(result.current.data?.[0].tabId).toBe('CONSULT');
    });

    test('탭이 없으면 빈 배열을 반환한다', async () => {
      // 훅 렌더링 (탭 없이)
      const { result } = renderHook(() => useFaqCategoriesByTab(undefined), {
        wrapper: createWrapper(),
      });

      // API가 호출되지 않음을 검증
      expect(mockedApi.fetchCategoriesByTab).not.toHaveBeenCalled();

      // 데이터가 비어있는지 확인
      expect(result.current.data).toBeUndefined();
    });
  });
});
