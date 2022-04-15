import React from 'react';
import FlexContainer from '../FlexContainer';
import styles from './styles.module.css';

function ContentContainer({ children, className }) {
  return (
    <FlexContainer className={`${styles.container} ${className}`} column>
      {children}
    </FlexContainer>
  );
}

export default ContentContainer;
