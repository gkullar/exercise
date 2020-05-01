import { MouseEvent, useState } from 'react';
import styles from './tabs.module.css';

interface TabProps {
  label: string;
  children: JSX.Element;
}

interface TabLabelProps {
  label: string;
  isActive: boolean;
  setActiveTabIndex: any;
}

interface TabGroupProps {
  children: JSX.Element[];
}

export const TabLabel = ({
  label,
  isActive,
  setActiveTabIndex
}: TabLabelProps) => {
  const onClickEvent = (event: MouseEvent) => {
    event.preventDefault();
    setActiveTabIndex();
  };

  return (
    <div className={`${styles.tab} ${isActive ? styles.active : ''}`}>
      <a href="/" onClick={onClickEvent}>
        {label}
      </a>
    </div>
  );
};

export const TabGroup = ({ children }: TabGroupProps) => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  const labels: JSX.Element[] = [];

  children.map((tab, index) => {
    const tabIndex = Number(tab.key);

    labels.push(
      <TabLabel
        key={index}
        label={tab.props.label}
        isActive={tabIndex === activeTabIndex}
        setActiveTabIndex={() => setActiveTabIndex(tabIndex)}
      />
    );
  });

  return (
    <div className={styles.group}>
      <div className={styles.header}>{labels}</div>
      <div className={styles.body}>
        {children.find((tab) => Number(tab.key) === activeTabIndex)}
      </div>
    </div>
  );
};

export const Tab = ({ children }: TabProps) => children;
