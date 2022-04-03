import React from 'react';
import FlexContainer from '../../../layouts/FlexContainer';
import CustomText from '../CustomText';
import CustomButton from '../CustomButton';
import styles from './styles.module.css';

function IconNumber({
  icon, number, onClick, className,
}) {
  return onClick ? (
    <CustomButton title={`${number}`} leftIcon={icon} className={`${styles.container} ${className}`} onClick={onClick} />
  ) : (
    <FlexContainer hCentered vCentered className={`${styles.container} ${className}`}>
      {icon}
      <CustomText className={styles.text}>{number}</CustomText>
    </FlexContainer>
  );
}

export default IconNumber;
