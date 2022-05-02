import React from 'react';
import styles from './styles.module.css';
import LoadingSpinner from '../LoadingSpinner';

const getButtonStyle = (className, flex) => `${styles.buttonContainer} ${className ?? ''} ${flex ? styles.flex : null}`;

const getDisabled = (forceError, disabled) => forceError || disabled;

function CustomButton({
  title, onClick, leftIcon, type, disabled, loading, className, flex, forceError,
}) {
  const loadingIcon = loading ? <LoadingSpinner size="small" /> : null;
  const finalLeftIcon = <div className={`${styles.icon} ${title && leftIcon ? styles.iconSpace : null}`}>{leftIcon}</div>;
  const buttonStyle = getButtonStyle(className, flex);
  return (
    <button
      disabled={getDisabled(forceError, disabled)}
      type={type ? 'submit' : 'button'}
      className={buttonStyle}
      onClick={onClick}
    >
      {finalLeftIcon}
      {loadingIcon ?? title}
    </button>
  );
}

export default CustomButton;
