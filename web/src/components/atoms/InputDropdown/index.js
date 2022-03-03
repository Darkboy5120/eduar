import React, { useEffect, useState } from 'react';
import CustomText from '../CustomText';
import styles from './styles.module.css';
import LoadingSpinner from '../LoadingSpinner';
import FlexContainer from '../../../layouts/FlexContainer';

function InputDropdown({
  title, label, setOk, setValue, getData,
}) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!data) {
      getData(setData);
    } else {
      setOk(true);
      setValue(data[0].pk_id);
    }
  }, [data]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <FlexContainer className={styles.headerContainer}>
          <CustomText className={styles.title} text={title} />
          {!data ? <LoadingSpinner className={styles.loading} /> : null}
        </FlexContainer>
        <select className={styles.select} onChange={handleChange}>
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
