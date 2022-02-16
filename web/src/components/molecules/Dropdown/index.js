import React, { useEffect, useRef } from 'react';
import Button from '../../atoms/Button';
import styles from './styles.module.css';

const handlekeyboardNavigation = (root) => {
  root.current.focus();
  root.current.onkeypress = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(root.current);
    const firstChild = root.current.querySelector('div > a');
    firstChild.focus();
    const rootChilds = root.current.querySelectorAll('div > a');
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
  const contentAlign = align === 'right' ? styles.contentRight : null;

  useEffect(() => {
    handlekeyboardNavigation(root);
  }, [root]);

  return (
    <div ref={root} className={styles.dropdown}>
      <Button leftIcon={leftIcon} title={title} onClick={() => {}} />
      <div className={`${styles.content} ${contentAlign}`}>{children}</div>
    </div>
  );
}

export default Dropdown;
