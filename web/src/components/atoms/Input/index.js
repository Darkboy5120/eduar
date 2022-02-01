import React from 'react';
import './styles.css';

function Input({
  title, type, leftIcon, placeholder, onChange,
}) {
  const iconLeftStyle = leftIcon ? 'inputWithIconLeft' : null;
  const inputTitleStyle = title ? 'inputTitleSpace' : null;
  return (
    <div className="inputContainer">
      <span className="inputTitle">{title}</span>
      {leftIcon}
      <input onChange={onChange} className={`input ${iconLeftStyle} ${inputTitleStyle}`} type={type} placeholder={placeholder} />
    </div>
  );
}

export default Input;
