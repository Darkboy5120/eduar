import React from 'react';
import styles from './styles.module.css';

function Input({
  title, type, leftIcon, placeholder, onChange, reference, value, disabled,
}) {
  const iconLeftStyle = leftIcon ? styles.inputWithIconLeft : null;
  const inputTitleStyle = title ? styles.inputTitleSpace : null;
  return (
    <div className={styles.inputContainer}>
      <span className={styles.inputTitle}>{title}</span>
      {leftIcon}
      <input disabled={disabled} onChange={onChange} value={value} ref={reference} className={`${styles.input} ${iconLeftStyle} ${inputTitleStyle}`} type={type} placeholder={placeholder} />
    </div>
  );
}

export default Input;
