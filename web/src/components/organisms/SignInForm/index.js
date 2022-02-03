import React from 'react';
import SignForm from '../../molecules/SignForm';
import InputText from '../../molecules/InputText';
import useSignIn from '../../../assets/hooks/useSignIn';

function SignInForm({ footerOnClick }) {
  const { emailInput, passwordInput, submit } = useSignIn();

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
      submit.setLoading(true);
      console.log(emailInput.value, passwordInput.value);
      setTimeout(() => submit.setLoading(false), 3000);
    },
  };

  return (
    <SignForm {...submit} title="Llena tus datos" footer={signFooter} submit={signSubmit}>
      <InputText {...emailInput} title="Correo" placeholder="ejemplo@gmail.mx" />
      <InputText {...passwordInput} type="password" title="Contraseña" />
    </SignForm>
  );
}

export default SignInForm;
