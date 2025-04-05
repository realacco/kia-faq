import { render, screen } from '@testing-library/react';
import React from 'react';

import Button from './Button';

describe('Button Component', () => {
  it('기본 버튼 렌더링', () => {
    render(<Button>클릭</Button>);
    expect(screen.getByRole('button', { name: '클릭' })).toBeInTheDocument();
  });

  it('disabled 상태 테스트', () => {
    render(<Button disabled>비활성 버튼</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('variant에 따른 클래스 적용 테스트', () => {
    const { rerender } = render(<Button variant="filled">버튼</Button>);
    expect(screen.getByRole('button')).toHaveClass('button--variant-filled');

    rerender(<Button variant="outline">버튼</Button>);
    expect(screen.getByRole('button')).toHaveClass('button--variant-outline');
  });
});
