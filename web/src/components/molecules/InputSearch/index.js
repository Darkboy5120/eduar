import React from 'react';
import './styles.css';
import { FaSearch } from 'react-icons/fa';
import Input from '../../atoms/Input';

function InputSearch() {
  const leftIcon = <FaSearch className="inputIcon" />;
  return (
    <Input type="search" leftIcon={leftIcon} />
  );
}

export default InputSearch;
