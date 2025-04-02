/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

import { FAQ_TABS, FaqTabId } from '@/entities/faq/model/types';
import { useFaqCategoriesByTab, usePaginatedFaqs } from '@/shared/api/faq/hooks';

/**
 * 통합 FAQ 관리 컴포넌트 예제
 */
export const FaqManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FaqTabId>('CONSULT');
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);
  const [searchText, setSearchText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  // 카테고리 목록 조회 (탭별)
  const { data: categoriesByTab } = useFaqCategoriesByTab(activeTab);
  const categories = activeTab ? categoriesByTab : [];

  // FAQ 목록 조회
  const { data: faqList, isLoading } = usePaginatedFaqs(page, 10, {
    tab: activeTab,
    categoryId: activeCategory,
    searchText: searchQuery,
  });

  // 현재 표시할 데이터
  const displayData = faqList;

  // 검색 처리
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchText);
    setPage(1);
  };

  // 검색 취소
  const handleCancelSearch = () => {
    setSearchText('');
    setSearchQuery('');
    setPage(1);
  };

  return (
    <div className="faq-manager">
      <h1>FAQ 관리자</h1>

      {/* 탭 선택 */}
      <div className="tab-selector">
        <h2>탭 선택</h2>
        {Object.entries(FAQ_TABS).map(([_, tab]) => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? 'active' : ''}
            onClick={() => {
              setActiveTab(tab.id);
              setActiveCategory(undefined);
              setPage(1);
            }}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* 카테고리 선택 */}
      <div className="category-selector">
        <h2>카테고리 선택</h2>
        <button
          className={activeCategory === undefined ? 'active' : ''}
          onClick={() => setActiveCategory(undefined)}
        >
          전체
        </button>
        {categories?.map((category: any) => (
          <button
            key={category.id}
            className={activeCategory === category.id ? 'active' : ''}
            onClick={() => setActiveCategory(category.id as string)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* 검색 */}
      <div className="search-section">
        <h2>검색</h2>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            placeholder="검색어를 입력하세요"
          />
          <button type="submit">검색</button>
          {searchText && <button onClick={handleCancelSearch}>검색 취소</button>}
        </form>
      </div>

      {/* FAQ 목록 */}
      <div className="faq-list">
        {isLoading ? (
          <p>로딩 중...</p>
        ) : !displayData || !displayData.items ? (
          <p>결과가 없습니다.</p>
        ) : (
          <ul>
            {displayData.items.map(faq => (
              <li key={faq.id} className="faq-item">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
                <div className="faq-meta">
                  <span>카테고리: {faq.categoryName || faq.subCategoryName}</span>
                  <span>조회수: {faq.viewCount || 0}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 페이지네이션 */}
      <div className="pagination">
        <button onClick={() => setPage(prev => Math.max(1, prev - 1))} disabled={page === 1}>
          이전 페이지
        </button>
        <span>페이지 {page}</span>
        <button
          onClick={() => setPage(prev => prev + 1)}
          disabled={!displayData || displayData.items.length < 10}
        >
          다음 페이지
        </button>
      </div>
    </div>
  );
};

export default FaqManager;
