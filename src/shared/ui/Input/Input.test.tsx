import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import Input from './Input';

// 아이콘 mocking, 실제 svg 아이콘 import가 안됨..
jest.mock('@/shared/assets/icons', () => ({
  CloseIcon: () => <span data-testid="close-icon">×</span>,
  SearchIcon: () => <span data-testid="search-icon">🔍</span>,
}));

describe('Input Component', () => {
  it('기본 input 렌더링', () => {
    render(<Input placeholder="검색어 입력" />);
    expect(screen.getByPlaceholderText('검색어 입력')).toBeInTheDocument();
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  it('입력값이 있을 때 close 아이콘 표시', () => {
    render(<Input value="test" />);
    expect(screen.getByTestId('close-icon')).toBeInTheDocument();
  });

  it('onSearch 호출 테스트', () => {
    const mockSearch = jest.fn();
    render(<Input value="test" onSearch={mockSearch} />);

    fireEvent.click(screen.getByTestId('search-icon'));
    expect(mockSearch).toHaveBeenCalledWith('test');
  });

  it('onClear 호출 테스트', () => {
    const mockClear = jest.fn();
    render(<Input value="test" onClear={mockClear} />);

    fireEvent.click(screen.getByTestId('close-icon'));
    expect(mockClear).toHaveBeenCalled();
  });

  it('엔터 키로 검색 실행', () => {
    const mockSearch = jest.fn();
    render(<Input onSearch={mockSearch} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(mockSearch).toHaveBeenCalledWith('test');
  });

  it('버튼 표시 옵션 테스트', () => {
    render(<Input value="test" showSearchButton={false} showClearButton={false} />);

    expect(screen.queryByTestId('search-icon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('close-icon')).not.toBeInTheDocument();
  });
});
