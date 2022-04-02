import React, { useEffect, useState } from 'react';
import CustomText from '../CustomText';
import styles from './styles.module.css';
import LoadingSpinner from '../LoadingSpinner';
import FlexContainer from '../../../layouts/FlexContainer';

function InputDropdown(props) {
  const {
    title, label, setOk, setValue, getData, initialData, className, initialValue, value,
  } = props;
  const [data, setData] = useState(initialData ?? null);

  useEffect(() => {
    if (setOk && setValue) {
      if (!data && getData) {
        getData(setData);
      } else {
        setOk(true);
        setValue(initialValue ?? data[0].pk_id);
      }
    }
  }, [data]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.wrapper}>
        <FlexContainer className={styles.headerContainer}>
          <CustomText className={styles.title} text={title} />
          {!data ? <LoadingSpinner className={styles.loading} /> : null}
        </FlexContainer>
        <select className={styles.select} onChange={handleChange} value={value}>
          {data?.map((item) => (
            <option value={item.pk_id} key={item.pk_id}>{item.name}</option>
          ))}
        </select>
      </div>
      <CustomText text={label} />
    </div>
  );
}

export default InputDropdown;
