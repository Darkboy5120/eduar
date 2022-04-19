import React from 'react';
import FlexContainer from '../../../layouts/FlexContainer';
import styles from './styles.module.css';

function HelpIcon({ icon, label }) {
  return (
    <FlexContainer className={styles.container}>
      {icon}
      <div className={styles.popup}>{label}</div>
    </FlexContainer>
  );
}

export default HelpIcon;
