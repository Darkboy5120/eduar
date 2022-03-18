import React from 'react';
import CustomLink from '../../atoms/CustomLink';
import styles from './styles.module.css';

function FilterButton({
  title, href, className, icon,
}) {
  return (
    <CustomLink href={href} className={`${styles.container} ${className}`}>
      {icon}
      {title}
    </CustomLink>
  );
}

export default FilterButton;
