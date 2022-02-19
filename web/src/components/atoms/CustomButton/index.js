import React from 'react';
import styles from './styles.module.css';
import LoadingSpinner from '../LoadingSpinner';

function CustomButton({
  title, onClick, leftIcon, type, disabled, loading, className,
}) {
  const loadingIcon = loading ? <LoadingSpinner size="small" /> : null;
  const finalLeftIcon = <div className={`${styles.icon} ${title && leftIcon ? styles.iconSpace : null}`}>{leftIcon}</div>;
  const buttonStyle = `${styles.buttonContainer} ${className ?? ''}`;
  return (
    <button disabled={disabled} type={type ? 'submit' : 'button'} className={buttonStyle} onClick={onClick}>
      {finalLeftIcon}
      {loadingIcon ?? title}
    </button>
  );
}

export default CustomButton;
