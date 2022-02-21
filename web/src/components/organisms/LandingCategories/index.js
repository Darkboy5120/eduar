import React from 'react';
import FlexContainer from '../../../layouts/FlexContainer';
import styles from './styles.module.css';
import FilterButton from '../../molecules/FilterButton';
import CustomText from '../../atoms/CustomText';
import LoadCategoties from '../../molecules/LoadCategories';

function LandingCategories() {
  return (
    <FlexContainer className={`${styles.container}`} column>
      <FlexContainer className={styles.filterContainer}>
        <FilterButton title="Más descargado" href="/?p=searchar&orderby=0" />
        <FilterButton title="Más descargado" href="/?p=searchar&orderby=1" />
        <FilterButton title="Más favorito" href="/?p=searchar&orderby=2" />
      </FlexContainer>
      <FlexContainer column>
        <br />
        <CustomText h2 text="Categorias AR" centered />
        <CustomText text="Comienza a buscar en tu area de interes" centered />
        <br />
        <br />
        <LoadCategoties />
        <br />
      </FlexContainer>
    </FlexContainer>
  );
}

export default LandingCategories;
