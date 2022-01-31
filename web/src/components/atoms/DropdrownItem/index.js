import React from "react";
import './styles.css';

const DropdownItem = ({title, linkTarget, onClick}) => {
  return (
    <div className="dropdownItem" tabIndex="1" onClick={onClick}>
      <a className="title" href={linkTarget}>{title}</a>
    </div>
  );
};

export default DropdownItem;