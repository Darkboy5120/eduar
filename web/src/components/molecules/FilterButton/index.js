import React from 'react';
import CustomLink from '../../atoms/CustomLink';
import styles from './styles.module.css';

function FilterButton({
  title, href, className, icon, disabled, invisible, onClick, secondary,
}) {
  const invisibleStyle = invisible ? styles.invisible : null;
  const backgroundColor = secondary ? styles.bgSecondary : styles.bgPrimary;
  return (
    <CustomLink onClick={onClick} disabled={disabled} href={href} className={`${invisibleStyle} ${backgroundColor} ${styles.container} ${className}`}>
      {icon}
      {title}
    </CustomLink>
  );
}

export default FilterButton;
