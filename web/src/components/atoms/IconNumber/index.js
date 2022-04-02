import React from 'react';
import FlexContainer from '../../../layouts/FlexContainer';
import CustomText from '../CustomText';
import styles from './styles.module.css';

function IconNumber({ icon, number }) {
  return (
    <FlexContainer hCentered vCentered className={styles.container}>
      {icon}
      <CustomText className={styles.text}>{number}</CustomText>
    </FlexContainer>
  );
}

export default IconNumber;
