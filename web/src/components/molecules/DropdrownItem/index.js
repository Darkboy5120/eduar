/* eslint-disable jsx-a11y/tabindex-no-positive */
import React from 'react';
import './styles.css';
import CustomLink from '../../atoms/CustomLink';

function DropdownItem({ title, linkTarget, onClick }) {
  const nonLinkStyle = !linkTarget ? 'nonLink' : null;

  return (
    <CustomLink className={`dropdownItem ${nonLinkStyle}`} tabIndex="1" href={linkTarget} onClick={onClick}>
      {title}
    </CustomLink>
  );
}

export default DropdownItem;
