import React, { useEffect, useRef } from 'react';
import styles from './styles.module.css';

const onSubmit = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

function Form({ children }) {
  const form = useRef();

  useEffect(() => {
    form.current.querySelector('.input');
  }, []);

  return (
    <form onSubmit={onSubmit} ref={form} className={styles.formContainer}>{children}</form>
  );
}

export default Form;
