import React from 'react';
import { useAlert } from 'react-alert';
import CustomForm from '../../molecules/CustomForm';
import InputText from '../../molecules/InputText';
import useSignIn from '../../../assets/hooks/useSignIn';
import firebasePipe from '../../../assets/controllers/firebasePipe';
import Modal from '../../atoms/Modal';

function SignInForm({
  footerOnClick, dismiss, title, size, visible, setVisible,
}) {
  const form = useSignIn();
  const alert = useAlert();
  const fbPipe = firebasePipe.init(form.submit.setLoading, alert);

  const signFooter = {
    label: '¿Aun no tienes cuenta? registrate ',
    trigger: 'aqui',
    onClick: () => {
      footerOnClick();
    },
  };
  const signSubmit = {
    label: 'Iniciar sesión',
    onClick: () => {
      fbPipe.signIn(form.email.value, form.password.value, dismiss);
    },
  };

  return (
    <Modal {...{
      title, size, visible, setVisible,
    }}
    >
      <CustomForm {...form.submit} title="Llena tus datos" footer={signFooter} submit={signSubmit}>
        <InputText {...form.email} title="Correo" placeholder="ejemplo@gmail.mx" />
        <InputText {...form.password} type="password" title="Contraseña" />
      </CustomForm>
    </Modal>
  );
}

export default SignInForm;
