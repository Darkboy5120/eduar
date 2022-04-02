import React from 'react';
import PageContainer from '../../../layouts/PageContainer';
import CustomText from '../../atoms/CustomText';
import LandingCategories from '../../organisms/LandingCategories';

function Home() {
  return (
    <PageContainer>
      <CustomText h1 text="Bienvenido a Eduar" />
      <CustomText text="Tenemos muchas AR que pueden brindarte grandes beneficios en tus clases" />
      <br />
      <LandingCategories />
    </PageContainer>
  );
}

export default Home;
