'use client';

import React, { useEffect, useMemo, useState } from 'react';

import { FAQ_TABS, FaqTabId } from '@/entities/faq/model/types';
import { useFaqCategoriesByTab, usePaginatedFaqs } from '@/shared/api/faq/hooks';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Tab } from '@/shared/ui/Tab/Tab';

import styles from './FaqTabs.module.scss';

export const FaqTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FaqTabId>('CONSULT');
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);
  const [searchText, setSearchText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [localFaqs, setLocalFaqs] = useState<any[]>([]);
  const [hasMoreData, setHasMoreData] = useState(true);

  const { data: categoriesByTab, isLoading: isLoadingCategories } =
    useFaqCategoriesByTab(activeTab);

  const categories = useMemo(
    () => (activeTab ? categoriesByTab || [] : []),
    [activeTab, categoriesByTab]
  );

  const { data: faqList, isLoading: isLoadingFaqs } = usePaginatedFaqs(page, 10, {
    tab: activeTab,
    categoryId: activeCategory,
    searchText: searchQuery,
  });

  useEffect(() => {
    if (faqList && faqList.items) {
      if (page === 1) {
        setLocalFaqs(faqList.items);
      } else {
        setLocalFaqs(prev => [...prev, ...faqList.items]);
      }
      setHasMoreData(faqList.items.length === 10);
    }
  }, [faqList, page]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as FaqTabId);
    setActiveCategory(undefined);
    setPage(1);
    setLocalFaqs([]);
    setHasMoreData(true);
  };

  const search = () => {
    setSearchQuery(searchText);
    setPage(1);
    setLocalFaqs([]);
    setHasMoreData(true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    search();
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    console.log('Active Tab:', activeTab);
    console.log('Categories:', categories);
    console.log('Categories length:', categories.length);
    if (categories.length > 0) {
      console.log('First category:', categories[0]);
    }
  }, [activeTab, categories]);

  return (
    <div className={styles.faqTabsContainer}>
      <Tab defaultTab={activeTab} className={styles.tabsContainer} onTabChange={handleTabChange}>
        <Tab.List className={styles.tabList}>
          {Object.entries(FAQ_TABS).map(([_, tab]) => (
            <Tab.Item
              key={tab.id}
              id={tab.id}
              className={styles.tabButton}
              activeClassName={styles.activeTabButton}
            >
              {tab.name}
            </Tab.Item>
          ))}
        </Tab.List>

        <div className={styles.searchContainer}>
          <form className={styles.searchForm} onSubmit={handleSearch}>
            <Input
              placeholder="찾으시는 내용을 입력해 주세요"
              className={styles.searchInput}
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              onClear={() => setSearchText('')}
              onSearch={search}
            />
          </form>
        </div>

        {Object.entries(FAQ_TABS).map(([_, tab]) => (
          <Tab.Panel key={tab.id} id={tab.id} className={styles.tabPanel}>
            <div className={styles.categoryContainer}>
              <Tab
                defaultTab={activeCategory === undefined ? 'all' : activeCategory}
                className={styles.categoryTabs}
                onTabChange={categoryId => {
                  setActiveCategory(categoryId === 'all' ? undefined : categoryId);
                  setPage(1);
                  setLocalFaqs([]);
                  setHasMoreData(true);
                }}
              >
                {isLoadingCategories ? (
                  <div className={styles.loading}>카테고리 로딩 중...</div>
                ) : (
                  <Tab.List className={styles.categoryTabList}>
                    <Tab.Item
                      id="all"
                      className={styles.categoryTab}
                      activeClassName={styles.activeCategoryTab}
                    >
                      전체
                    </Tab.Item>
                    {categories
                      ?.filter(category => !!category && !!category.id && !!category.name)
                      .map(category => (
                        <Tab.Item
                          key={category.id}
                          id={category.id as string}
                          className={styles.categoryTab}
                          activeClassName={styles.activeCategoryTab}
                        >
                          {category.name}
                        </Tab.Item>
                      ))}
                  </Tab.List>
                )}
              </Tab>
            </div>

            <div className={styles.contentArea}>
              {isLoadingFaqs && page === 1 ? (
                <div className={styles.loading}>FAQ 로딩 중...</div>
              ) : !localFaqs || localFaqs.length === 0 ? (
                <div className={styles.noResults}>검색 결과가 없습니다.</div>
              ) : (
                <div className={styles.faqList}>
                  {localFaqs.map(faq => (
                    <div key={faq.id} className={styles.faqItem}>
                      <h3 className={styles.faqQuestion}>{faq.question}</h3>
                      <p className={styles.faqAnswer}>{faq.answer}</p>
                    </div>
                  ))}
                </div>
              )}

              {!isLoadingFaqs && hasMoreData && localFaqs.length > 0 && (
                <div className={styles.loadMoreContainer}>
                  {isLoadingFaqs && page > 1 ? (
                    '로딩 중...'
                  ) : (
                    <Button variant="text" onClick={handleLoadMore}>
                      <span className={styles['plus-icon']} />
                      더보기
                    </Button>
                  )}
                </div>
              )}
            </div>
          </Tab.Panel>
        ))}
      </Tab>
    </div>
  );
};

export default FaqTabs;
