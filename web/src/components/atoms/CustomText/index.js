import React from 'react';
import styles from './styles.module.css';

const getTextStyle = (className, centered, bold) => `${className} ${centered ? styles.centered : ''} ${bold ? styles.bold : ''}`;

function CustomText({
  children, text, h1, h2, h3, span, centered, className, bold,
}) {
  text = children ?? text;
  const textStyle = getTextStyle(className, centered, bold);

  if (h1) {
    return <h1 className={textStyle}>{text}</h1>;
  } if (h2) {
    return <h2 className={textStyle}>{text}</h2>;
  } if (h3) {
    return <h3 className={textStyle}>{text}</h3>;
  } if (span) {
    return <span className={textStyle}>{text}</span>;
  }
  return <p className={textStyle}>{text}</p>;
}

export default CustomText;
