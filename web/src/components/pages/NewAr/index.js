import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import { useRouter } from 'next/router';
import FlexContainer from '../../../layouts/FlexContainer';
import PageContainer from '../../../layouts/PageContainer';
import CustomText from '../../atoms/CustomText';
import ContentContainer from '../../../layouts/ContentContainer';
import FormStepLabel from '../../molecules/FormStepLabel';
import InputText from '../../molecules/InputText';
import CustomForm from '../../molecules/CustomForm';
import useNewArStep1 from '../../../assets/hooks/useNewArStep1';
import useNewArStep2 from '../../../assets/hooks/useNewArStep2';
import request from '../../../assets/controllers/request';
import InputDropdown from '../../atoms/InputDropdown';
import InputImage from '../../molecules/InputImage';
import InputApk from '../../molecules/InputApk';
import globalStore from '../../../assets/store/reducers/globalStore';

const getCategories = (setCategories) => {
  request.post('global_getCategories').then((res) => {
    setCategories(res?.data?.data);
  });
};

const createApp = (form1, form2, alert, router, setStep2) => {
  form2.submit.setLoading(true);
  request.post('developer_createApp', {
    developerId: globalStore.getState().user.email,
    name: form1.name.value,
    description: form1.description.value,
    category: form1.category.value,
    github: form1.github.value,
  }, {
    additional: form2.additional.value,
    thumbnail: form2.thumbnail.value,
    cover: form2.cover.value,
    apk: form2.apk.value,
  }).then((res) => {
    form2.submit.setLoading(false);
    switch (res?.data?.code) {
      case 0:
        setStep2(true);
        alert.show('Aplicación subida correctamente, regresando a Mis AR...', { type: 'success' });
        setTimeout(() => router.push('/?p=myar'), 3000);
        break;
      case -2:
        alert.show('Ya existe una aplicación con ese nombre', { type: 'error' });
        break;
      default:
        alert.show('Ha ocurrido un problema en el servidor', { type: 'error' });
    }
  });
};

function NewAr() {
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);
  const formStep1 = useNewArStep1();
  const alert = useAlert();
  const formStep2 = useNewArStep2();
  const router = useRouter();

  const formStep1Submit = {
    label: 'Siguiente paso',
    onClick: () => {
      setStep1(true);
    },
  };
  const formStep2Submit = {
    label: 'Terminar',
    onClick: () => {
      createApp(formStep1, formStep2, alert, router, setStep2);
    },
  };
  const formStep2Back = {
    label: 'Paso anterior',
    onClick: () => {
      setStep1(false);
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
        <FlexContainer hidden={step1} column vCentered>
          <br />
          <CustomText h2 text="Presentación" />
          <CustomForm {...formStep1.submit} submit={formStep1Submit}>
            <InputText {...formStep1.name} title="Nombre" label="Elije un título llamativo para tu aplicación" />
            <InputDropdown title="Categoria" {...formStep1.category} getData={getCategories} label="De esta forma los usuarios podran encontrar más facil tu aplicación" />
            <InputText {...formStep1.description} title="Descripción" label="Detalla lo que hace y no hace la aplicación de una forma atractiva hacia los demas" />
            <InputText {...formStep1.github} title="Github" label="Tu código fuente puede ayudar mucho a otros desarrolladores menos expertos" />
          </CustomForm>
        </FlexContainer>
        <FlexContainer hidden={!step1} column vCentered>
          <br />
          <CustomText h2 text="Imágenes" />
          <CustomForm {...formStep2.submit} submit={formStep2Submit} back={formStep2Back}>
            <InputImage title="Otras imágenes" {...formStep2.additional} label="Estas son las imágenes adicionales que se mostraran en la página de tu aplicación." />
            <InputImage title="Miniatura" {...formStep2.thumbnail} label="Esta imágen saldra en los resultados de búsquedad, procura que sea llamativa." />
            <InputImage title="Portada" {...formStep2.cover} label="Esta imágen se mostrara en la página de la aplicación AR, deberia ser una imágen grande." />
            <InputApk title="Aplicación" {...formStep2.apk} />
          </CustomForm>
        </FlexContainer>
      </ContentContainer>
    </PageContainer>
  );
}

export default NewAr;
