import React from 'react';

import styles from './Spinner.module.scss';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'medium', className = '' }) => {
  const sizeClass = styles[`spinner-${size}`] || '';
  const combinedClassName = `${styles.spinner} ${sizeClass} ${className}`.trim();

  return (
    <div className={combinedClassName} aria-label="로딩 중" role="status">
      <div className={styles['spinner-inner']}></div>
    </div>
  );
};

export default Spinner;
