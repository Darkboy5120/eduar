import React from 'react';
import SignForm from '../../molecules/SignForm';
import InputText from '../../molecules/InputText';
import useSignIn from '../../../assets/hooks/useSignIn';
import request from '../../../assets/controllers/request';
import firebasePipe from '../../../assets/controllers/firebasePipe';
import { useAlert } from 'react-alert';

function SignInForm({ footerOnClick }) {
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
      fbPipe.signIn(form.email.value, form.password.value, user => {
        console.log('signed in');
      });
      // request.post('signIn', {}).then((res) => {
      //   console.log(res);
      //   form.submit.setLoading(false);
      // });
    },
  };

  return (
    <SignForm {...form.submit} title="Llena tus datos" footer={signFooter} submit={signSubmit}>
      <InputText {...form.email} title="Correo" placeholder="ejemplo@gmail.mx" />
      <InputText {...form.password} type="password" title="Contraseña" />
    </SignForm>
  );
}

export default SignInForm;
