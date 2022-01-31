import React from "react";
import './styles.css';

const Button = ({title, onClick, leftIcon}) => {
  leftIcon = <div className={`icon ${title && leftIcon ? "iconSpace" : null}`}>{leftIcon}</div>;
  return (
    <button className="buttonContainer" onClick={onClick}>
      {leftIcon}
      {title}
    </button>
  );
};

export default Button;