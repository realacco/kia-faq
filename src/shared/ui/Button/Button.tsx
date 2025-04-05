import React, { ButtonHTMLAttributes, forwardRef } from 'react';

import styles from './Button.module.scss';

export type ButtonVariant = 'filled' | 'text' | 'outline';
export type ButtonTheme = 'primary' | 'secondary';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 버튼 타입 - filled(기본 배경색), text(배경 없음), outline(테두리만)
   * @default 'filled'
   */
  variant?: ButtonVariant;

  /**
   * 버튼 테마 색상
   * @default 'primary'
   */
  theme?: ButtonTheme;

  /**
   * 버튼 크기
   * @default 'medium'
   */
  size?: ButtonSize;

  /**
   * 버튼이 비활성화되었는지 여부
   */
  disabled?: boolean;

  /**
   * 전체 너비를 차지할지 여부
   */
  fullWidth?: boolean;

  /**
   * 아이콘 버튼일 경우 true
   */
  iconButton?: boolean;

  /**
   * 버튼 내용
   */
  children?: React.ReactNode;

  /**
   * 추가 클래스명
   */
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'filled',
      theme = 'primary',
      size = 'medium',
      disabled = false,
      fullWidth = false,
      iconButton = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const buttonClasses = [
      styles.button,
      styles[`button--variant-${variant}`],
      styles[`button--theme-${theme}`],
      styles[`button--size-${size}`],
      fullWidth ? styles['button--full-width'] : '',
      iconButton ? styles['button--icon-button'] : '',
      disabled ? styles['button--disabled'] : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button ref={ref} className={buttonClasses} disabled={disabled} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
