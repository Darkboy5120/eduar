import React from 'react';
import PageContainer from '../../../layouts/PageContainer';
import CustomText from '../../atoms/CustomText';

function Welcome() {
  return (
    <PageContainer>
      <CustomText h1>Bievenid@ a Eduar</CustomText>
      <CustomText>
        La tecnologia AR se esta popularizando ultimamente, ya se han
        comprobado varios beneficios para los estudiantes que necesitan
        comprender temas abstractos, sin embargo, debido a lo prematuro
        que es el tema, no todos los estudiantes estan recibiendo los
        beneficios de estas tecnologias.
      </CustomText>
      <br />
      <CustomText h2>¿Que es Eduar?</CustomText>
      <CustomText>
        Es una plataforma que facilita la accesibilidad a aplicaciones AR
        para movil y al mismo tiempo se pueda incentivar el desarrollo de
        las aplicaciones entre una comunidad de desarrolladores.
      </CustomText>
    </PageContainer>
  );
}

export default Welcome;
