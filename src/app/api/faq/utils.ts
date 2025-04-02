import { PageInfo } from '@/entities/faq/model/types';

export function getPageInfo(headers: Record<string, string>, params: URLSearchParams): PageInfo {
  const totalCount = parseInt(headers['x-total-count'] || '0', 10);
  const currentPage = parseInt(params.get('_page') || '1', 10);
  const perPage = parseInt(params.get('_limit') || '10', 10);
  const totalPages = Math.ceil(totalCount / perPage);

  return {
    totalCount,
    currentPage,
    perPage,
    prevPage: currentPage > 1 ? currentPage - 1 : 1,
    nextPage: currentPage < totalPages ? currentPage + 1 : currentPage,
  };
}
