import React, { useState } from 'react';
import CategotyItem from '../CategoryItem';
import LoadingSpinner from '../../atoms/LoadingSpinner';
import styles from './styles.module.css';
import getCategories from '../../../assets/requests/getCategories';

function LoadCategories() {
  const [categories, setCategories] = useState();

  useState(() => {
    if (!categories) {
      getCategories(setCategories);
    }
  }, [categories]);

  return (
    <div className={styles.container}>
      {categories ? categories?.map((category) => (
        <CategotyItem key={category.pk_id} name={category.name} id={category.pk_id} />
      )) : <LoadingSpinner size="big" /> }
    </div>
  );
}

export default LoadCategories;
