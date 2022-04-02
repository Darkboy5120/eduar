import React from 'react';
import { useAlert } from 'react-alert';
import CustomForm from '../../molecules/CustomForm';
import InputText from '../../molecules/InputText';
import useSignUp from '../../../assets/hooks/useSignUp';
import CheckboxLabel from '../../atoms/CheckboxLabel';
import firebasePipe from '../../../assets/controllers/firebasePipe';
import Modal from '../../atoms/Modal';

function SignUpForm({
  footerOnClick, dismiss, title, size, visible, setVisible,
}) {
  const form = useSignUp();
  const alert = useAlert();
  const fbPipe = firebasePipe.init(form.submit.setLoading, alert);

  const signFooter = {
    label: '¿Aun no tienes cuenta? inicia sesión ',
    trigger: 'aqui',
    onClick: () => {
      footerOnClick();
    },
  };
  const signSubmit = {
    label: 'Crear cuenta',
    onClick: () => {
      form.submit.setLoading(true);
      fbPipe.signUp(
        form.email.value,
        form.password.value,
        form.firstname.value,
        form.lastname.value,
        form.birthdate.value,
        dismiss,
      );
    },
  };

  return (
    <Modal {...{
      title, size, visible, setVisible,
    }}
    >
      <CustomForm {...form.submit} title="Llena tus datos" footer={signFooter} submit={signSubmit}>
        <InputText {...form.firstname} title="Nombre(s)" />
        <InputText {...form.lastname} title="Apellido(s)" />
        <InputText {...form.email} title="Correo" placeholder="ejemplo@ucol.mx" />
        <InputText {...form.password} type="password" title="Contraseña" />
        <InputText {...form.confirmPassword} type="password" title="Confirmar contraseña" />
        <InputText {...form.birthdate} type="date" title="Fecha de nacimiento" />
        <CheckboxLabel setChecked={form.politics.setOk} title="Acepto los términos y condiciones" />
      </CustomForm>
    </Modal>
  );
}

export default SignUpForm;
