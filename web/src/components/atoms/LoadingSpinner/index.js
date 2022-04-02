import React from 'react';
import { FaSyncAlt } from 'react-icons/fa';
import styles from './styles.module.css';

const getSizeStyle = (size) => {
  let sizeStyle;
  switch (size) {
    case 'medium':
      sizeStyle = styles.medium;
      break;
    case 'big':
      sizeStyle = styles.big;
      break;
    default:
      sizeStyle = styles.small;
  }
  return sizeStyle;
};

function LoadingSpinner({ size, centered, className }) {
  const sizeStyle = getSizeStyle(size);
  const centeredStyle = centered ? styles.centered : '';

  return <FaSyncAlt className={`${styles.loading} ${sizeStyle} ${centeredStyle} ${className}`} />;
}

export default LoadingSpinner;
