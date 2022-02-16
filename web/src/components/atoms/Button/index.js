import React from 'react';
import styles from './styles.module.css';
import { FaSyncAlt } from 'react-icons/fa';

function Button({
  title, onClick, leftIcon, type, disabled, loading,
}) {
  const loadingIcon = loading ? <FaSyncAlt className={styles.buttonIconLoading} /> : null;
  const finalLeftIcon = <div className={`${styles.icon} ${title && leftIcon ? styles.iconSpace : null}`}>{leftIcon}</div>;
  return (
    <button disabled={disabled} type={type ? 'submit' : 'button'} className={styles.buttonContainer} onClick={onClick}>
      {finalLeftIcon}
      {loadingIcon ?? title}
    </button>
  );
}

export default Button;
