import React, { useEffect, useRef } from 'react';
import styles from './styles.module.css';

function CustomLink({
  onClick, tabIndex, children, href, className, disabled,
}) {
  const link = useRef();
  const disabledStyle = disabled ? styles.disabled : null;
  if (disabled) {
    href = undefined;
  }

  useEffect(() => {
    link.current.onkeypress = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.which === 13) {
        onClick();
      }
    };
  }, [link, onClick]);

  return (
    <a ref={link} className={`${className} ${disabledStyle}`} tabIndex={tabIndex} href={href} onClick={onClick}>
      {children}
    </a>
  );
}

export default CustomLink;
