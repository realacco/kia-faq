'use client';

import React, { useEffect, useMemo, useState } from 'react';

import { FAQ_TABS, FaqItem, FaqTabId } from '@/entities/faq/model/types';
import { useFaqCategoriesByTab, usePaginatedFaqs } from '@/shared/api/faq/hooks';
import { Accordion } from '@/shared/ui/Accordion';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Spinner } from '@/shared/ui/Spinner';
import { Tab } from '@/shared/ui/Tab/Tab';

import styles from './FaqTabs.module.scss';

export const FaqTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FaqTabId>('CONSULT');
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);
  const [searchText, setSearchText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [localFaqs, setLocalFaqs] = useState<FaqItem[]>([]);
  const [hasMoreData, setHasMoreData] = useState(true);

  // 검색 요청마다 고유한 식별자를 생성하기 위한 타임스탬프
  const [searchTimestamp, setSearchTimestamp] = useState(Date.now());

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
    _timestamp: searchTimestamp,
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
    setSearchTimestamp(Date.now());
    setPage(1);
    setLocalFaqs([]);
    setHasMoreData(true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    search();
  };

  const handleInputSearch = (value: string) => {
    setSearchText(value);
    setSearchQuery(value);
    setSearchTimestamp(Date.now());
    setPage(1);
    setLocalFaqs([]);
    setHasMoreData(true);
  };

  const handleInputClear = () => {
    setSearchText('');
    setSearchQuery('');
    setSearchTimestamp(Date.now());
    setPage(1);
    setLocalFaqs([]);
    setHasMoreData(true);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

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
              onClear={handleInputClear}
              onSearch={handleInputSearch}
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
                  <div className={styles.loading}>
                    <Spinner size="small" className={styles.loadingSpinner} />
                  </div>
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
                <div className={styles.loading}>
                  <Spinner size="medium" className={styles.loadingSpinner} />
                </div>
              ) : !localFaqs || localFaqs.length === 0 ? (
                <div className={styles.noResults}>검색 결과가 없습니다.</div>
              ) : (
                <Accordion className={styles.faqList}>
                  {localFaqs.map(faq => (
                    <Accordion.Item key={String(faq.id)} id={String(faq.id)}>
                      <Accordion.Header id={String(faq.id)}>
                        <div className={styles.faqHeader}>
                          <div className={styles.categoryWrapper}>
                            <em className={styles.faqCategoryName}>{faq.categoryName}</em>
                            {activeTab === 'USAGE' && (
                              <em className={styles.faqSubCategoryName}>{faq.subCategoryName}</em>
                            )}
                          </div>
                          <div className={styles.faqQuestionContainer}>
                            <div className={styles.faqQuestion}>{faq.question}</div>
                          </div>
                        </div>
                      </Accordion.Header>
                      <Accordion.Content id={String(faq.id)}>
                        <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                      </Accordion.Content>
                    </Accordion.Item>
                  ))}
                </Accordion>
              )}
              {!isLoadingFaqs && hasMoreData && localFaqs.length > 0 && (
                <div className={styles.loadMoreContainer}>
                  <Button variant="text" onClick={handleLoadMore}>
                    <span className={styles['plus-icon']} />
                    더보기
                  </Button>
                </div>
              )}
              {isLoadingFaqs && page > 1 && (
                <div className={styles.loadMoreLoading}>
                  <Spinner size="small" className={styles.loadingSpinner} />
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
