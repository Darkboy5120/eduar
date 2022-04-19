import React from 'react';
import CustomLink from '../../atoms/CustomLink';
import styles from './styles.module.css';

function FilterButton({
  title, href, className, icon, disabled, invisible, onClick, secondary,
}) {
  const invisibleStyle = invisible ? styles.invisible : null;
  const backgroundColor = secondary ? styles.bgSecondary : styles.bgPrimary;
  const defaultTabIndex = onClick ? 0 : undefined;
  return (
    <CustomLink onClick={onClick} tabIndex={defaultTabIndex} disabled={disabled} href={href} className={`${invisibleStyle} ${backgroundColor} ${styles.container} ${className}`}>
      {icon}
      {title}
    </CustomLink>
  );
}

export default FilterButton;
