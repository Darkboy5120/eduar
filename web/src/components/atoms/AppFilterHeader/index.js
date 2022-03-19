import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import FlexContainer from '../../../layouts/FlexContainer';
import CustomText from '../CustomText';
import InputDropdown from '../InputDropdown';
import request from '../../../assets/controllers/request';
import orderBy from '../../../assets/datasets/orderBy.json';
import orderType from '../../../assets/datasets/orderType.json';
import FilterButton from '../../molecules/FilterButton';
import styles from './styles.module.css';

const getCategories = (setCategories) => {
  request.post('global_getCategories').then((res) => {
    setCategories(res?.data?.data);
  });
};

function AppFilterHeader({ form }) {
  return (
    <FlexContainer className={styles.container}>
      <FlexContainer flex={1} column className={styles.paginationContainer}>
        <CustomText m text="Páginas" />
        <br />
        <FlexContainer>
          <FilterButton className={styles.filterButton} icon={<FaArrowLeft />} href="/?p=searchar&orderby=0" />
          <FilterButton className={styles.filterButton} title="1" href="/?p=searchar&orderby=0" />
          <FilterButton className={styles.filterButton} title="2" href="/?p=searchar&orderby=0" />
          <FilterButton className={styles.filterButton} title="3" href="/?p=searchar&orderby=0" />
          <FilterButton className={styles.filterButton} title="4" href="/?p=searchar&orderby=0" />
          <FilterButton className={styles.filterButton} title="5" href="/?p=searchar&orderby=0" />
          <FilterButton className={styles.filterButton} icon={<FaArrowRight />} href="/?p=searchar&orderby=0" />
        </FlexContainer>
      </FlexContainer>
      <FlexContainer className={styles.dropdownsContainer}>
        <InputDropdown className={styles.dropdown} title="Categorias" {...form.category} getData={getCategories} />
        <InputDropdown className={styles.dropdown} title="Ordernar por" {...form.orderBy} initialData={orderBy} />
        <InputDropdown className={styles.dropdown} title="Orden" {...form.orderType} initialData={orderType} />
      </FlexContainer>
    </FlexContainer>
  );
}

export default AppFilterHeader;
