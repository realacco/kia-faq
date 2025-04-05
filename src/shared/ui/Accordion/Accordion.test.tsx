import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { Accordion } from './Accordion';
import '@testing-library/jest-dom';

// ArrowDown 아이콘 모킹
jest.mock('@/shared/assets/icons', () => ({
  ArrowDownIcon: () => <div data-testid="arrow-icon" />,
}));

describe('Accordion', () => {
  const renderAccordion = () => {
    render(
      <Accordion>
        <Accordion.Item id="item1">
          <Accordion.Header id="item1">Header 1</Accordion.Header>
          <Accordion.Content id="item1">Content 1</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item id="item2">
          <Accordion.Header id="item2">Header 2</Accordion.Header>
          <Accordion.Content id="item2">Content 2</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    );
  };

  test('아코디언이 헤더와 콘텐츠로 렌더링된다', () => {
    renderAccordion();

    // 헤더가 표시되는지 확인
    expect(screen.getByText('Header 1')).toBeInTheDocument();
    expect(screen.getByText('Header 2')).toBeInTheDocument();

    // 콘텐츠가 숨겨져 있는지 확인
    const content1 = screen.getByText('Content 1');
    const content2 = screen.getByText('Content 2');

    expect(content1.closest('[aria-hidden="true"]')).toBeInTheDocument();
    expect(content2.closest('[aria-hidden="true"]')).toBeInTheDocument();
  });

  test('헤더를 클릭하면 콘텐츠가 확장된다', async () => {
    renderAccordion();

    // 첫 번째 헤더 클릭
    fireEvent.click(screen.getByText('Header 1'));

    // 첫 번째 콘텐츠가 표시되는지 확인
    await waitFor(() => {
      const content1 = screen.getByText('Content 1');
      expect(content1.closest('[aria-hidden="false"]')).toBeInTheDocument();
    });

    // 두 번째 콘텐츠는 여전히 숨겨져 있는지 확인
    const content2 = screen.getByText('Content 2');
    expect(content2.closest('[aria-hidden="true"]')).toBeInTheDocument();
  });

  test('확장된 헤더를 다시 클릭하면 콘텐츠가折り畳まれる다', async () => {
    renderAccordion();

    // 첫 번째 헤더 클릭하여 확장
    fireEvent.click(screen.getByText('Header 1'));

    // 확장된 것을 확인
    await waitFor(() => {
      const content1 = screen.getByText('Content 1');
      expect(content1.closest('[aria-hidden="false"]')).toBeInTheDocument();
    });

    // 다시 클릭하여 축소
    fireEvent.click(screen.getByText('Header 1'));

    // 축소된 것을 확인
    await waitFor(() => {
      const content1 = screen.getByText('Content 1');
      expect(content1.closest('[aria-hidden="true"]')).toBeInTheDocument();
    });
  });

  test('새로운 헤더를 클릭하면 이전에 열린 항목이 닫힌다', async () => {
    renderAccordion();

    // 첫 번째 헤더 클릭
    fireEvent.click(screen.getByText('Header 1'));

    // 첫 번째 콘텐츠가 표시되는지 확인
    await waitFor(() => {
      const content1 = screen.getByText('Content 1');
      expect(content1.closest('[aria-hidden="false"]')).toBeInTheDocument();
    });

    // 두 번째 헤더 클릭
    fireEvent.click(screen.getByText('Header 2'));

    // 첫 번째 콘텐츠가 닫히고 두 번째 콘텐츠가 열리는지 확인
    await waitFor(() => {
      const content1 = screen.getByText('Content 1');
      expect(content1.closest('[aria-hidden="true"]')).toBeInTheDocument();

      const content2 = screen.getByText('Content 2');
      expect(content2.closest('[aria-hidden="false"]')).toBeInTheDocument();
    });
  });

  test('활성 클래스가 올바르게 적용된다', async () => {
    renderAccordion();

    // 화살표 아이콘 확인
    const arrowIcons = screen.getAllByTestId('arrow-icon');

    // 첫 번째 헤더 클릭
    fireEvent.click(screen.getByText('Header 1'));

    // 적절한 클래스가 적용되었는지 확인 (이 부분은 DOM 클래스를 체크하는 방식이라 정확한 클래스명 확인 필요)
    await waitFor(() => {
      const header1 = screen.getByText('Header 1').closest('button');
      expect(header1).toHaveClass('activeHeader');

      // 아이콘 회전 클래스 확인 (className을 직접 확인하기는 어려우므로 컴포넌트 로직 테스트로 대체)
      const content1 = screen.getByText('Content 1').closest('.content');
      expect(content1).toHaveClass('active');
    });
  });

  test('아코디언 외부에서 헤더/콘텐츠 사용 시 에러 발생', () => {
    // 오류 콘솔 메시지 억제
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<Accordion.Header id="standalone">Standalone Header</Accordion.Header>);
    }).toThrow('Header must be used within Accordion');

    expect(() => {
      render(<Accordion.Content id="standalone">Standalone Content</Accordion.Content>);
    }).toThrow('Content must be used within Accordion');

    consoleError.mockRestore();
  });

  test('커스텀 클래스명이 올바르게 적용된다', () => {
    render(
      <Accordion className="custom-class">
        <Accordion.Item id="item1">
          <Accordion.Header id="item1">Header 1</Accordion.Header>
          <Accordion.Content id="item1">Content 1</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    );

    const accordionElement = screen.getByText('Header 1').closest('div.accordion');
    expect(accordionElement).toHaveClass('custom-class');
  });

  test('하나의 아이템만 펼칠 수 있다.', async () => {
    renderAccordion();

    // 첫 번째 헤더 클릭
    fireEvent.click(screen.getByText('Header 1'));

    // 첫 번째 아이템이 확장되었는지 확인
    await waitFor(() => {
      const content1 = screen.getByText('Content 1');
      expect(content1.closest('[aria-hidden="false"]')).toBeInTheDocument();
    });

    // 두 번째 헤더 클릭
    fireEvent.click(screen.getByText('Header 2'));

    // 첫 번째 아이템이 접히고 두 번째 아이템만 확장되었는지 확인
    await waitFor(() => {
      const content1 = screen.getByText('Content 1');
      const content2 = screen.getByText('Content 2');

      expect(content1.closest('[aria-hidden="true"]')).toBeInTheDocument();
      expect(content2.closest('[aria-hidden="false"]')).toBeInTheDocument();
    });

    // 세 번째 아이템 추가 및 테스트
    render(
      <Accordion>
        <Accordion.Item id="item1">
          <Accordion.Header id="item1">Header 1</Accordion.Header>
          <Accordion.Content id="item1">Content 1</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item id="item2">
          <Accordion.Header id="item2">Header 2</Accordion.Header>
          <Accordion.Content id="item2">Content 2</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item id="item3">
          <Accordion.Header id="item3">Header 3</Accordion.Header>
          <Accordion.Content id="item3">Content 3</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    );

    // 첫 번째 헤더 클릭
    fireEvent.click(screen.getAllByText('Header 1')[1]);

    // 첫 번째 아이템만 확장되었는지 확인
    await waitFor(() => {
      const contents1 = screen.getAllByText('Content 1');
      const contents2 = screen.getAllByText('Content 2');
      const content3 = screen.getByText('Content 3');

      expect(contents1[1].closest('[aria-hidden="false"]')).toBeInTheDocument();
      expect(contents2[1].closest('[aria-hidden="true"]')).toBeInTheDocument();
      expect(content3.closest('[aria-hidden="true"]')).toBeInTheDocument();
    });

    // 세 번째 헤더 클릭
    fireEvent.click(screen.getByText('Header 3'));

    // 세 번째 아이템만 확장되었는지 확인
    await waitFor(() => {
      const contents1 = screen.getAllByText('Content 1');
      const contents2 = screen.getAllByText('Content 2');
      const content3 = screen.getByText('Content 3');

      expect(contents1[1].closest('[aria-hidden="true"]')).toBeInTheDocument();
      expect(contents2[1].closest('[aria-hidden="true"]')).toBeInTheDocument();
      expect(content3.closest('[aria-hidden="false"]')).toBeInTheDocument();
    });
  });
});
