import { useQuery } from '@tanstack/react-query';

import { Term } from '@/entities/terms/model/terms';
import { fetchTerms } from '@/shared/api/terms/termsApi';

/**
 * 모든 약관 목록을 가져오는 React Query 훅
 */
export const useAllTerms = () => {
  return useQuery({
    queryKey: ['terms'],
    queryFn: async () => {
      const response = await fetchTerms();
      if (response.success && Array.isArray(response.data)) {
        return response.data as Term[];
      }
      return [];
    },
    staleTime: Infinity, // 데이터가 항상 최신 상태로 간주되도록 설정
    gcTime: 24 * 60 * 60 * 1000,
  });
};

/**
 * 특정 버전의 약관을 가져오는 훅
 * 모든 약관을 한 번에 가져와서 클라이언트에서 필터링합니다.
 * @param version 약관 버전 번호
 */
export const useTermByVersion = (version: number) => {
  const { data: allTerms = [], isLoading, error } = useAllTerms();

  // 클라이언트 사이드에서 필터링
  const termData = allTerms.find((term: Term) => term.termsVersion === version);

  return {
    data: termData,
    isLoading,
    error,
  };
};
