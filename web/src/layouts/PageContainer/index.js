import React from 'react';
import Footer from '../../components/molecules/Footer';
import styles from './styles.module.css';

function PageContainer({ children }) {
  return (
    <div>
      <div className={styles.container}>
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default PageContainer;
