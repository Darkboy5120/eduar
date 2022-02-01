import React, { useEffect } from 'react';
import SignForm from '../../molecules/SignForm';
import InputText from '../../molecules/InputText';
import useSignInForm from './useSignInForm';

function SignInForm({ footerOnClick }) {
  const form = useSignInForm();
  const signInFooter = {
    label: '¿Aun no tienes cuenta? ',
    trigger: 'aqui',
    onClick: () => {
      footerOnClick();
    },
  };
  const signInSubmit = {
    label: 'Iniciar sesión',
    onClick: () => {
      form.email.set.value(123);
      // console.log(form.email.get.value, form.password.get.value);
    },
  };

  useEffect(() => {
    // console.log(form.email.get.value);
  }, [form]);

  return (
    <SignForm title="Llena tus datos" footer={signInFooter} submit={signInSubmit}>
      <InputText state={form.email} title="Correo" placeholder="ejemplo@gmail.mx" />
      <InputText state={form.password} type="password" title="Contraseña" />
    </SignForm>
  );
}

export default SignInForm;
