import React from "react";
import './styles.css';
import {FaSearch} from 'react-icons/fa';

const InputSearch = () => {
  return (
    <div className="inputSearchContainer">
      <FaSearch className="icon" />
      <input className="input" type="search" />
    </div>
  );
};

export default InputSearch;