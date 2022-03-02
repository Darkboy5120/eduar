import React from 'react';
import CustomText from '../CustomText';
import styles from './styles.module.css';

function InputDropdown({ title, data }) {
  return (
    <div className={styles.container}>
      <CustomText className={styles.title} text={title} />
      <select className={styles.select}>
        {data?.map((item) => (
          <option value={item.id}>{item.name}</option>
        ))}
      </select>
    </div>
  );
}

export default InputDropdown;
