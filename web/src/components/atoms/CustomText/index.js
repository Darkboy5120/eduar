import React from 'react';
import styles from './styles.module.css';

const getTextStyle = (className, centered, bold) => `${className} ${centered ? styles.centered : ''} ${bold ? styles.bold : ''}`;

const getFinalElement = (textStyle, text, h1, h2, h3, span) => {
  let result = <p className={textStyle}>{text}</p>;
  if (h1) {
    result = <h1 className={textStyle}>{text}</h1>;
  } if (h2) {
    result = <h2 className={textStyle}>{text}</h2>;
  } if (h3) {
    result = <h3 className={textStyle}>{text}</h3>;
  } if (span) {
    result = <span className={textStyle}>{text}</span>;
  }
  return result;
};

function CustomText({
  children, text, h1, h2, h3, span, centered, className, bold,
}) {
  text = children ?? text;
  const textStyle = getTextStyle(className, centered, bold);

  return getFinalElement(textStyle, text, h1, h2, h3, span);
}

export default CustomText;
