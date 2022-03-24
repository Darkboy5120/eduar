import React from 'react';
import CustomLink from '../../atoms/CustomLink';
import styles from './styles.module.css';

function FilterButton({
  title, href, className, icon, disabled, invisible, onClick,
}) {
  const invisibleStyle = invisible ? styles.invisible : null;
  return (
    <CustomLink onClick={onClick} disabled={disabled} href={href} className={`${invisibleStyle} ${styles.container} ${className}`}>
      {icon}
      {title}
    </CustomLink>
  );
}

export default FilterButton;
