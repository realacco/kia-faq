import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export interface TabContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

// Tab 컨텍스트 훅
// 선택된 tab을 관리한다.
const useTabContext = (): TabContextType => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTabContext must be used within a Tab component');
  }
  return context;
};

export interface TabProps {
  children: ReactNode;
  defaultTab?: string;
  className?: string;
  onTabChange?: (tabId: string) => void;
}

export interface TabListProps {
  children: ReactNode;
  className?: string;
}

export interface TabItemProps {
  id: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  onClick?: () => void;
}

export interface TabPanelProps {
  id: string;
  children: ReactNode;
  className?: string;
}

// Tab의 header list 컴포넌트
const List: React.FC<TabListProps> = ({ children, className }) => {
  return (
    <div className={className} role="tablist">
      {children}
    </div>
  );
};

// Tab의 header contents 영역 컴포넌트트
const Item: React.FC<TabItemProps> = ({ id, children, className, activeClassName, onClick }) => {
  const { activeTab, setActiveTab } = useTabContext();
  const isActive = activeTab === id;

  const handleClick = () => {
    setActiveTab(id);
    // 외부 클릭 핸들러가 있으면 호출
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      role="tab"
      aria-selected={isActive}
      id={`tab-${id}`}
      className={`${className} ${isActive ? activeClassName : ''}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

// Tab의 Contents
const Panel: React.FC<TabPanelProps> = ({ id, children, className }) => {
  const { activeTab } = useTabContext();
  const isActive = activeTab === id;

  if (!isActive) return null;

  return (
    <div role="tabpanel" aria-labelledby={`tab-${id}`} id={`panel-${id}`} className={className}>
      {children}
    </div>
  );
};

// 첫 번째 탭 아이템의 id를 찾는 함수
const findFirstTabId = (children: ReactNode): string | undefined => {
  // children을 재귀적으로 순회하며 Tab.Item 찾기
  const findTabItemId = (nodes: ReactNode): string | undefined => {
    return React.Children.toArray(nodes).reduce<string | undefined>((found, child) => {
      if (found) return found;

      // React 요소인지 확인
      if (React.isValidElement(child)) {
        // Tab.Item인지 확인
        if (child.type === Item && child.props && typeof child.props.id === 'string') {
          return child.props.id;
        }

        // Tab.List인지 확인하고 그 자식들 탐색
        if (child.type === List && child.props && child.props.children) {
          return findTabItemId(child.props.children);
        }

        // 다른 컴포넌트지만 자식이 있는 경우 (예: div 안에 Tab.Item)
        if (child.props && child.props.children) {
          return findTabItemId(child.props.children);
        }
      }
      return undefined;
    }, undefined);
  };

  return findTabItemId(children);
};

// Tab 컴포넌트
export const Tab: React.FC<TabProps> & {
  List: React.FC<TabListProps>;
  Item: React.FC<TabItemProps>;
  Panel: React.FC<TabPanelProps>;
} = ({ children, defaultTab = '', className, onTabChange }) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab);

  // defaultTab이 없을 경우 첫 번째 Tab.Item의 default로 사용한다.
  useEffect(() => {
    if (!defaultTab) {
      const firstTabId = findFirstTabId(children);
      if (firstTabId) {
        setActiveTab(firstTabId);
      }
    }
  }, [children, defaultTab]);

  // tab change handler0
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);

    // 외부 핸들러 호출
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab: handleTabChange }}>
      <div className={className}>{children}</div>
    </TabContext.Provider>
  );
};

// 합성 컴포넌트 구성
Tab.List = List;
Tab.Item = Item;
Tab.Panel = Panel;
