export interface FaqItem {
  id: number;
  categoryName: string;
  subCategoryName: string;
  question: string;
  answer: string;
  viewCount?: number;
}

export interface FaqCategory {
  id: string;
  name: string;
  tabId?: FaqTabId; // 카테고리가 속한 탭 ID
}

export interface FaqTab {
  id: 'CONSULT' | 'USAGE';
  name: string;
  categories: string[];
}

export interface PageInfo {
  totalCount: number;
  currentPage: number;
  perPage: number;
  prevPage: number;
  nextPage: number;
}

export interface FaqList {
  pageInfo: PageInfo;
  items: FaqItem[];
}

export type FaqCategories = FaqCategory[];

export const FAQ_TABS = {
  CONSULT: {
    id: 'CONSULT',
    name: '도입문의',
  },
  USAGE: {
    id: 'USAGE',
    name: '이용안내',
  },
} as const;

export type FaqTabId = keyof typeof FAQ_TABS;
