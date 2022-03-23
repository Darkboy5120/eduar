import React from 'react';
import FlexContainer from '../../../layouts/FlexContainer';
import CustomText from '../CustomText';
import InputDropdown from '../InputDropdown';
import request from '../../../assets/controllers/request';
import orderBy from '../../../assets/datasets/orderBy.json';
import orderType from '../../../assets/datasets/orderType.json';
import FilterPagination from '../FilterPagination';
import styles from './styles.module.css';

const getCategories = (setCategories) => {
  request.post('global_getCategories').then((res) => {
    const newData = res?.data?.data;
    newData.splice(0, 0, { pk_id: 0, name: 'Cualquiera' });
    setCategories(res?.data?.data);
  });
};

function AppFilterHeader({
  form, category, apps, page,
}) {
  return (
    <FlexContainer className={styles.container}>
      <FlexContainer flex={1} column className={styles.paginationContainer}>
        <CustomText m text="Páginas" />
        <br />
        <FilterPagination apps={apps} page={page} form={form} />
      </FlexContainer>
      <FlexContainer className={styles.dropdownsContainer}>
        <InputDropdown className={styles.dropdown} title="Categorias" {...form.category} initialValue={category} getData={getCategories} />
        <InputDropdown className={styles.dropdown} title="Ordernar por" {...form.orderBy} initialData={orderBy} />
        <InputDropdown className={styles.dropdown} title="Orden" {...form.orderType} initialData={orderType} />
      </FlexContainer>
    </FlexContainer>
  );
}

export default AppFilterHeader;
