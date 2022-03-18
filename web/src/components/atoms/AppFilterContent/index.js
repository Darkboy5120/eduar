import React from 'react';
import AppCard from '../AppCard';
import styles from './styles.module.css';

function AppFilterContent() {
  return (
    <div className={styles.container}>
      <AppCard />
      <AppCard />
      <AppCard />
      <AppCard />
      <AppCard />
    </div>
  );
}

export default AppFilterContent;
