import React from 'react';
import styles from './styles.module.css';

function FlexContainer({
  children, flex, className, column,
}) {
  const flexStyle = flex ? { flex } : null;
  const columnStyle = column ? styles.column : null;

  return (
    <div className={`${styles.container} ${className} ${columnStyle}`} style={flexStyle}>{children}</div>
  );
}

export default FlexContainer;
