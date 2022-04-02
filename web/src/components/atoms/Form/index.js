import React, { useEffect, useRef } from 'react';
import FlexContainer from '../../../layouts/FlexContainer';
import styles from './styles.module.css';

const onSubmit = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

function Form({ children, row, className }) {
  const form = useRef();
  const rowStyle = row ? styles.rowContainer : null;

  useEffect(() => {
    form.current.querySelector('.input');
  }, []);

  return (
    <form onSubmit={onSubmit} ref={form}>
      <FlexContainer column={!row} className={`${styles.formContainer} ${rowStyle} ${className}`}>
        {children}
      </FlexContainer>
    </form>
  );
}

export default Form;
