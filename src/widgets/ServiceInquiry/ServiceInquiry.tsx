'use client';

import React from 'react';

import { DownloadIcon, TalkIcon, WriteIcon } from '@/shared/assets/icons';

import { SERVICE_INQUIRY_BUTTONS, SERVICE_INQUIRY_TITLE } from './constants';
import styles from './ServiceInquiry.module.scss';

const iconComponents = {
  DownloadIcon,
  TalkIcon,
  WriteIcon,
};

export const ServiceInquiry: React.FC = () => {
  const handleButtonClick = (button: (typeof SERVICE_INQUIRY_BUTTONS)[0]) => {
    if (button.isModal) {
      alert(button.modalMessage);
    }
  };

  const renderIcon = (iconName: keyof typeof iconComponents) => {
    const IconComponent = iconComponents[iconName];
    return <IconComponent className={styles.icon} />;
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{SERVICE_INQUIRY_TITLE}</h3>
      <div className={styles.buttonContainer}>
        {SERVICE_INQUIRY_BUTTONS.map(button => (
          <a
            key={button.id}
            href={button.url}
            className={styles.button}
            onClick={e => {
              if (button.isModal) {
                e.preventDefault();
                handleButtonClick(button);
              }
            }}
            target={button.isModal ? undefined : '_blank'}
            rel={button.isModal ? undefined : 'noopener noreferrer'}
          >
            {renderIcon(button.iconName as keyof typeof iconComponents)}
            <div className={styles.label}>
              {button.label}
              {button.subText && <span className={styles.subText}>{button.subText}</span>}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ServiceInquiry;
