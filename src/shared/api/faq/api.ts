import { FaqCategories, FaqItem, FaqList, FaqTabId, PageInfo } from '@/entities/faq/model/types';

import { axiosClient } from '../axios-client';

/**
 * 특정 탭의 카테고리 목록 조회
 * @param tabId 탭 ID
 * @returns 해당 탭의 카테고리 목록 Promise
 */
export const fetchCategoriesByTab = async (tabId: FaqTabId): Promise<FaqCategories> => {
  const response = await axiosClient.get<FaqCategories>(`/categories?tabId=${tabId}`);
  return response.data;
};

/**
 * FAQ 쿼리 파라미터 인터페이스
 */
export interface FaqQueryParams {
  tab?: FaqTabId;
  categoryId?: string;
  _page?: number;
  _limit?: number;
  searchText?: string;
  [key: string]: string | number | boolean | undefined;
}

/**
 * FAQ 목록 조회
 * @param params - FAQ 조회 쿼리 파라미터
 * @returns 페이지네이션된 FAQ 목록
 */
export const fetchFaqs = async (params?: FaqQueryParams): Promise<FaqList> => {
  const { tab, categoryId, _page, _limit, searchText, ...restParams } = params || {};

  // 쿼리 파라미터 구성
  const queryParams: Record<string, string | number | boolean | undefined> = {
    _page,
    _limit,
    ...restParams,
  };

  // 탭과 카테고리 필터링
  if (tab) {
    queryParams.tabId = tab;
  }
  if (categoryId) {
    queryParams.categoryId = categoryId;
  }

  // 검색어가 있는 경우 json-server의 q 파라미터 사용
  if (searchText && searchText.trim().length > 0) {
    queryParams.q = searchText;
  }

  const response = (await axiosClient.get<FaqItem[]>('/faq', {
    params: queryParams,
  })) as unknown as { data: { pageInfo: PageInfo; data: FaqItem[] } };

  return {
    pageInfo: response.data.pageInfo,
    items: response.data.data,
  };
};

/**
 * 특정 FAQ의 조회수 증가
 * @param id - FAQ ID
 */
const incrementFaqViewCount = async (id: number): Promise<void> => {
  try {
    // 현재 FAQ 항목을 가져오기
    const response = await axiosClient.get<FaqItem>(`/faq/${id}`);
    const faqItem = response.data;

    // viewCount 증가
    const updatedViewCount = (faqItem.viewCount || 0) + 1;

    // PATCH 요청으로 viewCount만 업데이트
    await axiosClient.patch(`/faq/${id}`, { viewCount: updatedViewCount });
  } catch (error) {
    console.error('조회수 증가 실패:', error);
  }
};
