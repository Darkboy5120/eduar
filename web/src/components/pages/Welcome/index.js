import React from 'react';
import PageContainer from '../../../layouts/PageContainer';
import CustomText from '../../atoms/CustomText';

function Objetives() {
  return (
    <>
      <CustomText h2>Objetivos</CustomText>
      <CustomText>
        Se tiene como metas dar accesibilidad a las aplicaciones AR, asi
        como promover un buen flujo de desarrollo de aplicaciones AR, y
        por lo tanto facilitar el desarrollo de aplicaciones AR. Tambien
        se busca motivar a los desarrolladores a crear y seguir creando
        aplicaciones AR y brindarles a los estudiantes y profesores la
        confianza para descargar aplicaciones de los desarrolladores.
        Tambien se desea crear una comunidad que pueda autosustentar el
        ciclo. Finalmente se busca concientizar a los profesores de los
        riesgos de usar AR sin las correctas metodologias
      </CustomText>
    </>
  );
}

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
      <br />
      <Objetives />
    </PageContainer>
  );
}

export default Welcome;
