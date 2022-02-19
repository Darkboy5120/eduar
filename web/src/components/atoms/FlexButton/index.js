import React from 'react';
import styles from './styles.module.css';
import CustomButton from '../CustomButton';

function FlexButton({
  title, onClick, leftIcon, type, disabled, loading,
}) {
  const className = styles.container;
  return (
    <CustomButton {...{
      title, onClick, leftIcon, type, disabled, loading, className,
    }}
    />
  );
}

export default FlexButton;
