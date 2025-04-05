import React, { createContext, useContext, useState } from 'react';

import { ArrowDownIcon } from '@/shared/assets/icons';

import styles from './Accordion.module.scss';

interface AccordionContextProps {
  activeId: string | null;
  prevActiveId: string | null;
  toggleItem: (id: string) => void;
}

const AccordionContext = createContext<AccordionContextProps | undefined>(undefined);

interface AccordionComposition {
  Item: React.FC<AccordionItemProps>;
  Header: React.FC<AccordionHeaderProps>;
  Content: React.FC<AccordionContentProps>;
}

interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}

interface AccordionItemProps {
  id: string;
  children: React.ReactNode;
}

interface AccordionHeaderProps {
  children: React.ReactNode;
  id: string;
}

interface AccordionContentProps {
  children: React.ReactNode;
  id: string;
}

export const Accordion: React.FC<AccordionProps> & AccordionComposition = ({
  children,
  className = '',
}) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [prevActiveId, setPrevActiveId] = useState<string | null>(null);

  const toggleItem = async (id: string) => {
    if (activeId === id) {
      setActiveId(null);
      await new Promise(resolve => setTimeout(resolve, 300));
    } else {
      if (activeId) {
        setActiveId(null);
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      setActiveId(id);
    }
  };

  return (
    <AccordionContext.Provider value={{ activeId, prevActiveId, toggleItem }}>
      <div className={`${styles.accordion} ${className}`}>{children}</div>
    </AccordionContext.Provider>
  );
};

const Item: React.FC<AccordionItemProps> = ({ id, children }) => {
  return <div className={styles.item}>{children}</div>;
};

const Header: React.FC<AccordionHeaderProps> = ({ children, id }) => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('Header must be used within Accordion');

  const { activeId, toggleItem } = context;

  return (
    <button
      className={`${styles.header} ${activeId === id ? styles.activeHeader : ''}`}
      onClick={() => toggleItem(id)}
      aria-expanded={activeId === id}
      aria-controls={`accordion-content-${id}`}
    >
      <span className={styles.title}>{children}</span>
      <ArrowDownIcon className={`${styles.icon} ${activeId === id ? styles.rotated : ''}`} />
    </button>
  );
};

const Content: React.FC<AccordionContentProps> = ({ children, id }) => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('Content must be used within Accordion');

  const { activeId, prevActiveId } = context;
  const isActive = activeId === id;
  const isClosing = prevActiveId === id && activeId !== id;

  return (
    <div
      id={`accordion-content-${id}`}
      className={`${styles.content} ${isActive ? styles.active : ''} ${isClosing ? styles.closing : ''}`}
      aria-hidden={!isActive}
    >
      <div className={styles.contentInner}>{children}</div>
    </div>
  );
};

Accordion.Item = Item;
Accordion.Header = Header;
Accordion.Content = Content;
