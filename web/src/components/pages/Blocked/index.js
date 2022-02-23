import React from 'react';
import PageContainer from '../../../layouts/PageContainer';
import CustomText from '../../atoms/CustomText';

function Blocked() {
  return (
    <PageContainer>
      <CustomText h1 text="Oops!!, acceso bloqueado :(" />
      <CustomText text="Intenta iniciar sesión para acceder a la página." />
    </PageContainer>
  );
}

export default Blocked;
