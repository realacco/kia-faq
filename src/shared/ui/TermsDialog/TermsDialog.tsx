import React, { useState } from 'react';

import { Term } from '@/entities/terms/model/terms';
import { useAllTerms, useTermByVersion } from '@/shared/api/terms/useTerms';
import { Select } from '@/shared/ui/Select';

import styles from './TermsDialog.module.scss';

interface TermsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialVersion?: number;
}

interface VersionOption {
  value: string;
  label: string;
}

/**
 * 이용약관 다이얼로그 컴포넌트
 */
export const TermsDialog: React.FC<TermsDialogProps> = ({
  isOpen,
  onClose,
  initialVersion = 5,
}) => {
  const [selectedVersion, setSelectedVersion] = useState<string>(initialVersion.toString());
  const { data: term, isLoading, error } = useTermByVersion(parseInt(selectedVersion, 10));
  const { data: allTerms = [] } = useAllTerms();

  // 약관 버전별 옵션 생성
  const versionOptions: VersionOption[] = allTerms
    .map((term: Term) => {
      const startDate = new Date(term.startDate);
      const endDate = term.endDate ? new Date(term.endDate) : null;

      const startDateStr = startDate
        .toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/\. /g, '.')
        .replace(/\.$/, '');

      const endDateStr = endDate
        ? endDate
            .toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })
            .replace(/\. /g, '.')
            .replace(/\.$/, '')
        : '현재';

      return {
        value: term.termsVersion.toString(),
        label: `${startDateStr} ~ ${endDateStr}`,
      };
    })
    .sort((a: VersionOption, b: VersionOption) => parseInt(b.value, 10) - parseInt(a.value, 10)); // 버전 내림차순 정렬

  const handleVersionChange = (value: string) => {
    setSelectedVersion(value);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.dialog} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{term?.termsName || '이용약관'}</h2>
          <button className={styles.closeButton} onClick={onClose} aria-label="닫기">
            &times;
          </button>
        </div>

        <div className={styles.selectContainer}>
          <Select
            options={versionOptions}
            value={selectedVersion}
            onChange={handleVersionChange}
            placeholder="약관 버전 선택"
            className={styles.versionSelect}
          />
        </div>

        <div className={styles.content}>
          <div>
            <div
              className={styles.termsContent}
              dangerouslySetInnerHTML={{
                __html: term?.contents || '약관 내용이 없습니다.',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsDialog;
