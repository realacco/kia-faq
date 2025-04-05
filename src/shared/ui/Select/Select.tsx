import React, { useEffect, useId, useRef, useState } from 'react';

import { ArrowDownIcon } from '@/shared/assets/icons';

import styles from './Select.module.scss';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  label?: string;
  error?: string;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  placeholder,
  disabled = false,
  required = false,
  name,
  id,
  label,
  error,
  className = '',
  size = 'medium',
}) => {
  const uniqueId = useId();
  const selectId = id || `select-${uniqueId}`;
  const [isFocused, setIsFocused] = useState(false);
  const selectRef = useRef<HTMLSelectElement>(null);

  // 내부 상태가 필요한 경우만 사용 (비제어 컴포넌트)
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue || '');

  // 외부 value가 변경되면 내부 상태 업데이트
  useEffect(() => {
    if (isControlled && value !== undefined) {
      setInternalValue(value);
    }
  }, [isControlled, value]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;

    if (!isControlled) {
      setInternalValue(newValue);
    }

    if (onChange) {
      onChange(newValue);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  // 선택된 옵션의 label을 얻기 위한 함수
  const getSelectedLabel = () => {
    const currentValue = isControlled ? value : internalValue;
    const selectedOption = options.find(option => option.value === currentValue);
    return selectedOption ? selectedOption.label : placeholder || '';
  };

  return (
    <div
      className={`
        ${styles.selectContainer} 
        ${styles[size]} 
        ${disabled ? styles.disabled : ''} 
        ${error ? styles.error : ''} 
        ${isFocused ? styles.focused : ''} 
        ${className}
      `}
    >
      {label && (
        <label htmlFor={selectId} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <div className={styles.selectWrapper}>
        <select
          ref={selectRef}
          id={selectId}
          name={name}
          value={isControlled ? value : internalValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          className={styles.select}
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : undefined}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}

          {options.map(option => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>

        <div className={styles.arrow}>
          <ArrowDownIcon />
        </div>
      </div>

      {error && (
        <div id={`${selectId}-error`} className={styles.errorMessage}>
          {error}
        </div>
      )}
    </div>
  );
};
