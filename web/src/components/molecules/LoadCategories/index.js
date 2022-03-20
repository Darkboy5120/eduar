import React, { useState } from 'react';
import CategotyItem from '../CategoryItem';
import request from '../../../assets/controllers/request';
import styles from './styles.module.css';

const getCategories = (setCategories) => {
  request.post('global_getCategories').then((res) => {
    setCategories(res?.data?.data);
  });
};

function LoadCategories() {
  const [categories, setCategories] = useState();

  useState(() => {
    if (!categories) {
      getCategories(setCategories);
    }
  }, [categories]);

  return (
    <div className={styles.container}>
      {categories?.map((category) => (
        <CategotyItem key={category.pk_id} name={category.name} id={category.pk_id} />
      ))}
    </div>
  );
}

export default LoadCategories;
