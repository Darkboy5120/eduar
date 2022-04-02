import React from 'react';
import { FaCheck } from 'react-icons/fa';
import FlexContainer from '../../../layouts/FlexContainer';
import CustomText from '../../atoms/CustomText';
import styles from './styles.module.css';

function FormStepLabel({ name, done }) {
  const undoneContainerStyle = done ? '' : styles.undoneContainer;
  const undoneIconStyle = done ? '' : styles.undoneIcon;
  return (
    <FlexContainer className={`${styles.container} ${undoneContainerStyle}`}>
      <CustomText text={name} className={`${styles.label}`} />
      <FaCheck className={undoneIconStyle} />
    </FlexContainer>
  );
}

export default FormStepLabel;
