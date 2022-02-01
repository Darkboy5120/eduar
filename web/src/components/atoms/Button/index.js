import React from 'react';
import './styles.css';

function Button({ title, onClick, leftIcon }) {
  const finalLeftIcon = <div className={`icon ${title && leftIcon ? 'iconSpace' : null}`}>{leftIcon}</div>;
  return (
    <button type="button" className="buttonContainer" onClick={onClick}>
      {finalLeftIcon}
      {title}
    </button>
  );
}

export default Button;
