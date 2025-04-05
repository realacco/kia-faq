import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { Tab } from './Tab';

describe('Tab 컴포넌트', () => {
  it('탭 컴포넌트가 정상적으로 렌더링된다', () => {
    render(
      <Tab>
        <Tab.List>
          <Tab.Item id="tab1">탭 1</Tab.Item>
          <Tab.Item id="tab2">탭 2</Tab.Item>
        </Tab.List>
        <Tab.Panel id="tab1">탭 1 내용</Tab.Panel>
        <Tab.Panel id="tab2">탭 2 내용</Tab.Panel>
      </Tab>
    );

    // 탭 버튼들이 렌더링되는지 확인
    expect(screen.getByText('탭 1')).toBeInTheDocument();
    expect(screen.getByText('탭 2')).toBeInTheDocument();

    // 첫 번째 탭의 내용이 기본으로 보이는지 확인
    expect(screen.getByText('탭 1 내용')).toBeInTheDocument();
    expect(screen.queryByText('탭 2 내용')).not.toBeInTheDocument();
  });

  it('defaultTab 속성이 정상적으로 작동한다', () => {
    render(
      <Tab defaultTab="tab2">
        <Tab.List>
          <Tab.Item id="tab1">탭 1</Tab.Item>
          <Tab.Item id="tab2">탭 2</Tab.Item>
        </Tab.List>
        <Tab.Panel id="tab1">탭 1 내용</Tab.Panel>
        <Tab.Panel id="tab2">탭 2 내용</Tab.Panel>
      </Tab>
    );

    // 두 번째 탭의 내용이 보이는지 확인
    expect(screen.queryByText('탭 1 내용')).not.toBeInTheDocument();
    expect(screen.getByText('탭 2 내용')).toBeInTheDocument();
  });

  // 탭 클릭 테스트
  it('탭을 클릭하면 해당 패널이 보인다', () => {
    render(
      <Tab>
        <Tab.List>
          <Tab.Item id="tab1">탭 1</Tab.Item>
          <Tab.Item id="tab2">탭 2</Tab.Item>
        </Tab.List>
        <Tab.Panel id="tab1">탭 1 내용</Tab.Panel>
        <Tab.Panel id="tab2">탭 2 내용</Tab.Panel>
      </Tab>
    );

    // 첫 번째 탭 내용이 보이는지 확인
    expect(screen.getByText('탭 1 내용')).toBeInTheDocument();

    // 두 번째 탭 클릭
    fireEvent.click(screen.getByText('탭 2'));

    // 두 번째 탭 내용이 보이고 첫 번째 탭 내용이 안 보이는지 확인
    expect(screen.queryByText('탭 1 내용')).not.toBeInTheDocument();
    expect(screen.getByText('탭 2 내용')).toBeInTheDocument();
  });

  // onTabChange 콜백 테스트
  it('탭을 클릭하면 onTabChange 콜백이 호출된다', () => {
    const handleTabChange = jest.fn();

    render(
      <Tab onTabChange={handleTabChange}>
        <Tab.List>
          <Tab.Item id="tab1">탭 1</Tab.Item>
          <Tab.Item id="tab2">탭 2</Tab.Item>
        </Tab.List>
        <Tab.Panel id="tab1">탭 1 내용</Tab.Panel>
        <Tab.Panel id="tab2">탭 2 내용</Tab.Panel>
      </Tab>
    );

    // 두 번째 탭 클릭
    fireEvent.click(screen.getByText('탭 2'));

    // onTabChange가 호출되었는지 확인
    expect(handleTabChange).toHaveBeenCalledTimes(1);
    expect(handleTabChange).toHaveBeenCalledWith('tab2');
  });

  // 중첩된 탭 테스트
  it('중첩된 탭이 독립적으로 작동한다', () => {
    render(
      <Tab defaultTab="outer1">
        <Tab.List>
          <Tab.Item id="outer1">외부 탭 1</Tab.Item>
          <Tab.Item id="outer2">외부 탭 2</Tab.Item>
        </Tab.List>

        <Tab.Panel id="outer1">
          <div>외부 탭 1 내용</div>

          {/* 중첩된 탭 */}
          <Tab defaultTab="inner1">
            <Tab.List>
              <Tab.Item id="inner1">내부 탭 1</Tab.Item>
              <Tab.Item id="inner2">내부 탭 2</Tab.Item>
            </Tab.List>
            <Tab.Panel id="inner1">내부 탭 1 내용</Tab.Panel>
            <Tab.Panel id="inner2">내부 탭 2 내용</Tab.Panel>
          </Tab>
        </Tab.Panel>

        <Tab.Panel id="outer2">외부 탭 2 내용</Tab.Panel>
      </Tab>
    );

    // 외부 탭 1이 선택되어 있고 내용이 보이는지 확인
    expect(screen.getByText('외부 탭 1 내용')).toBeInTheDocument();
    expect(screen.queryByText('외부 탭 2 내용')).not.toBeInTheDocument();

    // 내부 탭에서는 내부 탭 1이 선택되어 있는지 확인
    expect(screen.getByText('내부 탭 1 내용')).toBeInTheDocument();
    expect(screen.queryByText('내부 탭 2 내용')).not.toBeInTheDocument();

    // 내부 탭 2 클릭
    fireEvent.click(screen.getByText('내부 탭 2'));

    // 내부 탭 2 내용이 보이는지 확인
    expect(screen.queryByText('내부 탭 1 내용')).not.toBeInTheDocument();
    expect(screen.getByText('내부 탭 2 내용')).toBeInTheDocument();

    // 외부 탭 내용은 그대로 유지되는지 확인
    expect(screen.getByText('외부 탭 1 내용')).toBeInTheDocument();

    // 외부 탭 2 클릭
    fireEvent.click(screen.getByText('외부 탭 2'));

    // 외부 탭 2 내용이 보이고 외부 탭 1 내용과 내부 탭 내용이 모두 안 보이는지 확인
    expect(screen.queryByText('외부 탭 1 내용')).not.toBeInTheDocument();
    expect(screen.getByText('외부 탭 2 내용')).toBeInTheDocument();
    expect(screen.queryByText('내부 탭 1 내용')).not.toBeInTheDocument();
    expect(screen.queryByText('내부 탭 2 내용')).not.toBeInTheDocument();
  });

  // 탭 헤더의 커스터마이징이 적용되는지 확인
  it('커스텀 클래스명이 적용된다', () => {
    render(
      <Tab className="custom-tab">
        <Tab.List className="custom-tab-list">
          <Tab.Item id="tab1" className="custom-tab-item" activeClassName="active">
            탭 1
          </Tab.Item>
        </Tab.List>
        <Tab.Panel id="tab1" className="custom-panel">
          탭 1 내용
        </Tab.Panel>
      </Tab>
    );

    // 각 요소에 커스텀 클래스가 적용되었는지 확인
    expect(document.querySelector('.custom-tab')).toBeInTheDocument();
    expect(document.querySelector('.custom-tab-list')).toBeInTheDocument();

    const tabButton = screen.getByText('탭 1');
    expect(tabButton).toHaveClass('custom-tab-item');
    expect(tabButton).toHaveClass('active'); // 활성화된 탭이니까 active 클래스도 있어야 함

    expect(document.querySelector('.custom-panel')).toBeInTheDocument();
  });
});
