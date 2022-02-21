import React from 'react';
import CustomLink from '../../atoms/CustomLink';
import styles from './styles.module.css';

function FilterButton({ title, href }) {
  return (
    <CustomLink href={href} className={styles.container}>{title}</CustomLink>
  );
}

export default FilterButton;
