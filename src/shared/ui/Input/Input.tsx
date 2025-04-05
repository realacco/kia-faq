import React, { forwardRef, InputHTMLAttributes, useRef, useState } from 'react';

import { CloseIcon, SearchIcon } from '@/shared/assets/icons';

import styles from './Input.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * 검색 버튼 클릭 핸들러
   */
  onSearch?: (value: string) => void;
  /**
   * 입력값 초기화 핸들러
   */
  onClear?: () => void;
  /**
   * 검색 버튼 표시 여부
   * @default true
   */
  showSearchButton?: boolean;
  /**
   * 클리어 버튼 표시 여부
   * @default true
   */
  showClearButton?: boolean;
}

export const Input = forwardRef<HTMLDivElement, InputProps>(
  (
    {
      value,
      onSearch,
      onClear,
      showSearchButton = true,
      showClearButton = true,
      onChange,
      className,
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState(value || '');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      onChange?.(e);
    };

    const handleClear = () => {
      setInputValue('');
      onClear?.();
      inputRef.current?.focus();
    };

    const handleSearch = () => {
      onSearch?.(inputValue.toString());
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    };

    return (
      <div className={`${styles.inputContainer} ${className}`} ref={ref}>
        <input
          {...props}
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={styles.input}
        />
        {showClearButton && inputValue && (
          <button type="button" onClick={handleClear} className={styles.clearButton}>
            <CloseIcon />
          </button>
        )}
        {showSearchButton && (
          <button type="button" onClick={handleSearch} className={styles.searchButton}>
            <SearchIcon />
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
