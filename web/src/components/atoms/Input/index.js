import React from "react";
import './styles.css';

const Input = ({title, type, leftIcon, placeholder}) => {
  const iconLeftStyle = leftIcon ? "inputWithIconLeft" : null;
  const inputTitleStyle = title ? "inputTitleSpace" : null;
  return (
    <div className="inputContainer">
      <span className="inputTitle">{title}</span>
      {leftIcon}
      <input className={`input ${iconLeftStyle} ${inputTitleStyle}`} type={type} placeholder={placeholder} />
    </div>
  );
};

export default Input;