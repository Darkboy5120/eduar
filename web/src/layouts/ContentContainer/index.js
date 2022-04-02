import React from 'react';
import FlexContainer from '../FlexContainer';
import styles from './styles.module.css';

function ContentContainer({ children }) {
  return (
    <FlexContainer className={`${styles.container}`} column>
      {children}
    </FlexContainer>
  );
}

export default ContentContainer;
