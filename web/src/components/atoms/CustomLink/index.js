/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
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

  return href ? (
    <Link href={href}>
      <a ref={link} className={`${className} ${disabledStyle}`} tabIndex={tabIndex}>{children}</a>
    </Link>
  ) : (
    <a
      ref={link}
      className={`${className} ${styles.link} ${disabledStyle}`}
      tabIndex={tabIndex}
      onClick={onClick}
    >
      {children}
    </a>
  );
}

export default CustomLink;
