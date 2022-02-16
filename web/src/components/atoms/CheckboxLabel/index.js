/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

function CheckboxLabel({ title, setChecked }) {
  const [value, setValue] = useState(false);

  useEffect(() => {
    setChecked(value);
  }, [value]);

  const onChangeDo = (e) => {
    setValue(e.target.checked);
  };

  return (
    <div className={styles.checkboxLabelContainer} role="button" onClick={() => setValue(!value)}>
      <input className={styles.checkboxLabel} type="checkbox" checked={value} onChange={onChangeDo} />
      <span className={styles.checkboxLabelTitle}>{title}</span>
    </div>
  );
}

export default CheckboxLabel;
