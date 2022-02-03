import React, { useEffect, useRef } from 'react';
import Button from '../../atoms/Button';
import './styles.css';

const handlekeyboardNavigation = (root) => {
  root.current.focus();
  root.current.onkeypress = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const firstChild = root.current.querySelector('.dropdownItem');
    firstChild.focus();
    const rootChilds = root.current.querySelectorAll('.dropdownItem');
    rootChilds.forEach((el) => {
      el.onkeyup = (elEvent) => {
        elEvent.preventDefault();
        elEvent.stopPropagation();
        if (elEvent.which === 27) {
          root.current.querySelector('button').focus();
        }
      };
    });
  };
};

function Dropdown({
  children, title, leftIcon, align,
}) {
  const root = useRef();
  align = align ?? 'left';
  const contentAlign = align === 'right' ? 'contentRight' : null;

  useEffect(() => {
    handlekeyboardNavigation(root);
  }, [root]);

  return (
    <div ref={root} className="dropdown">
      <Button leftIcon={leftIcon} title={title} onClick={() => {}} />
      <div className={`content ${contentAlign}`}>{children}</div>
    </div>
  );
}

export default Dropdown;
