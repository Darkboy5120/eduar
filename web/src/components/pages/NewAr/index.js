import React, { useState, useEffect } from 'react';
import FlexContainer from '../../../layouts/FlexContainer';
import PageContainer from '../../../layouts/PageContainer';
import CustomText from '../../atoms/CustomText';
import ContentContainer from '../../../layouts/ContentContainer';
import FormStepLabel from '../../molecules/FormStepLabel';
import InputText from '../../molecules/InputText';
import CustomForm from '../../molecules/CustomForm';
import useNewArStep1 from '../../../assets/hooks/useNewArStep1';
import request from '../../../assets/controllers/request';
import InputDropdown from '../../atoms/InputDropdown';

const getCategories = (setCategories) => {
  request.post('global_getCategories').then((res) => {
    setCategories(res?.data?.data);
  });
};

function NewAr() {
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);
  const [categoties, setCategories] = useState(null)
  const formStep1 = useNewArStep1();

  useEffect(() => {
    console.log(categoties);
    if (!categoties) {
      getCategories(setCategories);
    }
  }, [categoties]);

  const formStep1Submit = {
    label: 'Siguiente paso',
    onClick: () => {
      console.log(123);
    },
  };

  return (
    <PageContainer>
      <CustomText h1 text="Subir nueva AR" />
      <br />
      <ContentContainer>
        <FlexContainer>
          <FormStepLabel name="Presentación" done={step1} />
          <FormStepLabel name="Imagenes" done={step2} />
        </FlexContainer>
        {!step1 ? (
          <FlexContainer column vCentered>
            <br />
            <CustomText h2 text="Presentación" />
            <CustomForm {...formStep1.submit} submit={formStep1Submit}>
              <InputText {...formStep1.name} title="Nombre" label="Elije un título llamativo para tu aplicación" />
              <InputText {...formStep1.category} title="Categoria" label="De esta forma los usuarios podran encontrar más facil tu aplicación" />
              <InputText {...formStep1.description} title="Descripción" label="Detalla lo que hace y no hace la aplicación de una forma atractiva hacia los demas" />
              <InputText {...formStep1.github} title="Github" label="Tu código fuente puede ayudar mucho a otros desarrolladores menos expertos" />
              <InputDropdown title="Github" data={[{id: '1', name: 'foo1'}, {id: '2', name: 'foo2'}]} />
            </CustomForm>
          </FlexContainer>
        ) : null}
      </ContentContainer>
    </PageContainer>
  );
}

export default NewAr;
