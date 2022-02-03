import React from 'react';
import SignForm from '../../molecules/SignForm';
import InputText from '../../molecules/InputText';
import useSignUp from '../../../assets/hooks/useSignUp';
import CheckboxLabel from '../../atoms/CheckboxLabel';

function SignUpForm({ footerOnClick }) {
  const {
    emailInput,
    passwordInput,
    confirmPasswordInput,
    firstnameInput,
    lastnameInput,
    submit,
    setPolitics,
    birthdateInput,
  } = useSignUp();

  const signFooter = {
    label: '¿Aun no tienes cuenta? inicia sesión ',
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
      <InputText {...firstnameInput} title="Nombre(s)" />
      <InputText {...lastnameInput} title="Apellido(s)" />
      <InputText {...emailInput} title="Correo" placeholder="ejemplo@ucol.mx" />
      <InputText {...passwordInput} type="password" title="Contraseña" />
      <InputText {...confirmPasswordInput} type="password" title="Confirmar contraseña" />
      <InputText {...birthdateInput} type="date" title="Fecha de nacimiento" />
      <CheckboxLabel setChecked={setPolitics} title="Acepto los términos y condiciones" />
    </SignForm>
  );
}

export default SignUpForm;
