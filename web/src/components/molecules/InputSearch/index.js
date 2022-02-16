import React from 'react';
import styles from './styles.module.css';
import { FaSearch } from 'react-icons/fa';
import Input from '../../atoms/Input';

function InputSearch() {
  const leftIcon = <FaSearch className={styles.inputIcon} />;
  return (
    <Input type="search" leftIcon={leftIcon} />
  );
}

export default InputSearch;
