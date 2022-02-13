import React from 'react';
import SignForm from '../../molecules/SignForm';
import InputText from '../../molecules/InputText';
import useSignIn from '../../../assets/hooks/useSignIn';
import request from '../../../assets/controllers/request';

function SignInForm({ footerOnClick }) {
  const form = useSignIn();

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
      form.submit.setLoading(true);
      request.post('get_users').then((r) => {
        console.log(r);
        form.submit.setLoading(false);
      });
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
