import { useQuery } from '@tanstack/react-query';

import { FaqTabId } from '@/entities/faq/model/types';

import { FaqQueryParams, fetchCategoriesByTab, fetchFaqs } from './api';

// 쿼리 키 상수
export const FAQ_QUERY_KEYS = {
  all: ['faqs'] as const,
  lists: () => [...FAQ_QUERY_KEYS.all, 'list'] as const,
  list: (params: FaqQueryParams) => [...FAQ_QUERY_KEYS.lists(), params] as const,
  details: () => [...FAQ_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: number) => [...FAQ_QUERY_KEYS.details(), id] as const,
  categories: ['faq-categories'] as const,
  categoriesByTab: (tabId: FaqTabId) => [...FAQ_QUERY_KEYS.categories, tabId] as const,
  tabs: ['faq-tabs'] as const,
};

/**
 * FAQ 목록을 가져오는 훅
 * @param params - 필터링 및 페이지네이션 파라미터
 */
export const useFaqs = (params?: FaqQueryParams) => {
  return useQuery({
    queryKey: FAQ_QUERY_KEYS.list(params || {}),
    queryFn: () => fetchFaqs(params),
  });
};

/**
 * 특정 탭의 FAQ 목록을 가져오는 훅
 * @param tab - 탭 ID
 * @param params - 추가 쿼리 파라미터
 */
export const useFaqsByTab = (tab: FaqTabId, params?: Omit<FaqQueryParams, 'tab'>) => {
  return useFaqs({ ...params, tab });
};

/**
 * 페이지네이션된 FAQ 목록을 가져오는 훅
 * @param page - 페이지 번호 (1부터 시작)
 * @param limit - 페이지당 항목 수
 * @param params - 추가 쿼리 파라미터
 */
export const usePaginatedFaqs = (
  page: number = 1,
  limit: number = 10,
  params?: Omit<FaqQueryParams, '_page' | '_limit'>
) => {
  return useFaqs({
    ...params,
    _page: page,
    _limit: limit,
  });
};

/**
 * 특정 탭의 FAQ 카테고리 목록을 가져오는 훅
 * @param tabId 탭 ID
 */
export const useFaqCategoriesByTab = (tabId?: FaqTabId) => {
  return useQuery({
    queryKey: FAQ_QUERY_KEYS.categoriesByTab(tabId || 'CONSULT'),
    queryFn: () => (tabId ? fetchCategoriesByTab(tabId) : []),
    enabled: !!tabId, // tabId가 있을 때만 쿼리 실행
  });
};
