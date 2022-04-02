import React from 'react';
import styles from './styles.module.css';

function FlexContainer({
  children, flex, className, column, vCentered, hCentered, hidden,
}) {
  const flexStyle = flex ? { flex } : null;
  const columnStyle = column ? styles.column : null;
  const hiddenStyle = hidden ? styles.hidden : null;
  const verticalCenteredStyle = vCentered ? styles.verticalCentered : null;
  const horizontalCenteredStyle = hCentered ? styles.horizontalCentered : null;
  const divStyles = `${styles.container} ${className} ${columnStyle} ${verticalCenteredStyle} ${horizontalCenteredStyle} ${hiddenStyle}`;

  return (
    <div className={`${divStyles}`} style={flexStyle}>{children}</div>
  );
}

export default FlexContainer;
