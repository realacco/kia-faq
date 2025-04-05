// src/components/ui/Select/Select.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import '@testing-library/jest-dom';
import { Select } from './Select';

jest.mock('@/shared/assets/icons', () => ({
  ArrowDownIcon: () => <div data-testid="arrow-down-icon" />,
}));

describe('Select Component', () => {
  const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3', disabled: true },
  ];

  const mockOnChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Select 컴포넌트 렌더링 테스트트', () => {
    render(<Select options={mockOptions} />);

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();

    const options = screen.getAllByRole('option');
    expect(options.length).toBe(mockOptions.length);
    expect(options[0]).toHaveValue('option1');
    expect(options[1]).toHaveValue('option2');
    expect(options[2]).toHaveValue('option3');
  });

  it('onChange 핸들러 호출출', () => {
    render(<Select options={mockOptions} onChange={mockOnChange} />);

    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'option2' } });

    expect(mockOnChange).toHaveBeenCalledWith('option2');
  });

  it('disable 상태 테스트트', () => {
    render(<Select options={mockOptions} disabled />);

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeDisabled();
  });

  it('renders arrow icon', () => {
    render(<Select options={mockOptions} />);

    const arrowIcon = screen.getByTestId('arrow-down-icon');
    expect(arrowIcon).toBeInTheDocument();
  });
});
