import React from 'react';
import './styles.css';
import { FaSyncAlt } from 'react-icons/fa';

function Button({
  title, onClick, leftIcon, type, disabled, loading,
}) {
  const loadingIcon = loading ? <FaSyncAlt className="buttonIconLoading" /> : null;
  const finalLeftIcon = <div className={`icon ${title && leftIcon ? 'iconSpace' : null}`}>{leftIcon}</div>;
  return (
    <button disabled={disabled} type={type ? 'submit' : 'button'} className="buttonContainer" onClick={onClick}>
      {finalLeftIcon}
      {loadingIcon ?? title}
    </button>
  );
}

export default Button;
