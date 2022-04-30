import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import useEditPersonalInfo from '../../../assets/hooks/editPersonalInfo';
import FlexContainer from '../../../layouts/FlexContainer';
import CustomText from '../../atoms/CustomText';
import CustomForm from '../CustomForm';
import InputText from '../InputText';
import globalStore, { updateFullname } from '../../../assets/store/reducers/globalStore';
import useEditPassword from '../../../assets/hooks/useEditPassword';
import styles from './styles.module.css';
import request from '../../../assets/controllers/request';
import firebasePipe from '../../../assets/controllers/firebasePipe';

const editPersonalInfo = (userData, alert, firstname, lastname) => {
  request.post('consumer_edit_personal_info', {
    email: userData.email,
    auth: userData.auth,
    firstname,
    lastname,
  }).then((res) => {
    switch (res?.data?.code) {
      case 0:
        globalStore.dispatch(updateFullname({ firstname, lastname }));
        alert.show('Información personal actualizada correctamente', { type: 'success' });
        break;
      case -2:
        alert.show('El nombre y apellidos no cambiaron', { type: 'error' });
        break;
      default:
        alert.show('Ha ocurrido un problema en el servidor', { type: 'error' });
    }
  });
};

function editPassword(form, alert, auth) {
  alert.show('Esta funcionalidad aun no se implementa :(', { type: 'error' });
}

function ProfileSection({ submit, children, title }) {
  return (
    <FlexContainer column className={styles.section}>
      <CustomText className={styles.sectionHeader} h2>{title}</CustomText>
      <CustomForm
        className={styles.formContainer}
        removePadding
        {...submit}
        submitContainerStyle={styles.submitContainer}
      >
        <div className={styles.tripleColumnGrid}>{children}</div>
      </CustomForm>
    </FlexContainer>
  );
}

function EditPassword() {
  const form = useEditPassword();
  const alert = useAlert();
  const { auth } = firebasePipe.init(form.setLoading, alert);
  const submit = {
    label: 'Modificar',
    onClick: () => {
      editPassword(form, alert, auth);
    },
  };

  return (
    <ProfileSection title="Editar contraseña" submit={{ ...form.submit, submit }}>
      <InputText className={styles.input} type="password" {...form.oldPassword} title="Anterior contraseña" />
      <InputText className={styles.input} type="password" {...form.newPassword} title="Nueva contraseña" />
    </ProfileSection>
  );
}

function EditPersonalInfo() {
  const userData = useSelector((state) => state.user);
  const form = useEditPersonalInfo(userData);
  const alert = useAlert();
  const submit = {
    label: 'Modificar',
    onClick: () => {
      editPersonalInfo(userData, alert, form.firstname.value, form.lastname.value);
    },
  };
  const firstname = form.firstname.value;
  const lastname = form.lastname.value;
  useEffect(() => {
    const forceError = firstname === userData.firstname && lastname === userData.lastname;
    form.submit.setForceError(forceError);
  }, [firstname, lastname]);

  return (
    <ProfileSection title="Información personal" submit={{ ...form.submit, submit }}>
      <InputText disabled className={styles.input} value={userData?.email} title="Correo" placeholder="ejemplo@gmail.mx" />
      <InputText className={styles.input} {...form.firstname} title="Nombre(s)" />
      <InputText className={styles.input} {...form.lastname} title="Apellido(s)" />
    </ProfileSection>
  );
}

function ProfileConfiguration({ hidden }) {
  return (
    <FlexContainer column hidden={hidden} className={styles.container}>
      <EditPersonalInfo />
      <EditPassword />
    </FlexContainer>
  );
}

export default ProfileConfiguration;
