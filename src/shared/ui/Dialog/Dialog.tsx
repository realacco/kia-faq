import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { CloseIcon } from '@/shared/assets/icons';

import styles from './Dialog.module.scss';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = '',
  closeOnOutsideClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  size = 'medium',
}) => {
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Client-side only code
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Handle dialog open/close
  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) return;

    if (isOpen) {
      if (!dialogElement.open) {
        dialogElement.showModal();
      }
    } else {
      if (dialogElement.open) {
        dialogElement.close();
      }
    }
  }, [isOpen]);

  // Handle click outside
  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      const dialogElement = dialogRef.current;
      if (closeOnOutsideClick && dialogElement && e.target === dialogElement) {
        onClose();
      }
    },
    [closeOnOutsideClick, onClose]
  );

  // Handle escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  // Add event listeners
  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) return;

    dialogElement.addEventListener('click', handleOutsideClick);
    dialogElement.addEventListener('keydown', handleKeyDown);

    return () => {
      dialogElement.removeEventListener('click', handleOutsideClick);
      dialogElement.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleOutsideClick, handleKeyDown]);

  // Close button click handler
  const handleCloseClick = () => {
    onClose();
  };

  const dialogContent = (
    <dialog
      ref={dialogRef}
      className={`${styles.dialog} ${styles[size]} ${className}`}
      aria-labelledby={title ? 'dialog-title' : undefined}
    >
      <div className={styles.dialogContent}>
        {(title || showCloseButton) && (
          <div className={styles.dialogHeader}>
            {title && (
              <h2 id="dialog-title" className={styles.dialogTitle}>
                {title}
              </h2>
            )}
            <button
              type="button"
              className={styles.closeButton}
              onClick={handleCloseClick}
              aria-label="Close dialog"
            >
              <CloseIcon />
            </button>
          </div>
        )}
        <div className={styles.dialogBody}>{children}</div>
      </div>
    </dialog>
  );

  // Using portal to render dialog at the document body level
  return mounted ? createPortal(dialogContent, document.body) : null;
};
