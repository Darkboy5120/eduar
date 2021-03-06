import React from 'react';
import FlexContainer from '../../../layouts/FlexContainer';
import styles from './styles.module.css';
import FilterButton from '../../molecules/FilterButton';
import CustomText from '../../atoms/CustomText';
import LoadCategories from '../../molecules/LoadCategories';
import ContentContainer from '../../../layouts/ContentContainer';

function LandingCategories() {
  return (
    <ContentContainer>
      <FlexContainer className={styles.filterContainer}>
        <FilterButton title="Más descargado" href="/?p=searchar&orderby=0" />
        <FilterButton title="Más populares" href="/?p=searchar&orderby=1" />
        <FilterButton title="Más favorito" href="/?p=searchar&orderby=2" />
      </FlexContainer>
      <FlexContainer column>
        <br />
        <CustomText h2 text="Categorías AR" centered />
        <CustomText text="Comienza a buscar en tu area de interes" centered />
        <br />
        <br />
        <LoadCategories />
        <br />
      </FlexContainer>
    </ContentContainer>
  );
}

export default LandingCategories;
