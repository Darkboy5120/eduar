import React, { useEffect } from 'react';
import SignForm from '../../molecules/SignForm';
import InputText from '../../molecules/InputText';
import useSignUp from '../../../assets/hooks/useSignUp';
import CheckboxLabel from '../../atoms/CheckboxLabel';

function SignUpForm({ footerOnClick }) {
  const form = useSignUp();

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
      form.submit.setLoading(true);
      setTimeout(() => form.submit.setLoading(false), 3000);
    },
  };

  useEffect(() => {
    console.log(
      form.email.ok,
      form.password.ok,
      form.confirmPassword.ok,
      form.firstname.ok,
      form.lastname.ok,
      form.birthdate.ok,
      form.politics.ok,
    );
  }, [form]);

  return (
    <SignForm {...form.submit} title="Llena tus datos" footer={signFooter} submit={signSubmit}>
      <InputText {...form.firstname} title="Nombre(s)" />
      <InputText {...form.lastname} title="Apellido(s)" />
      <InputText {...form.email} title="Correo" placeholder="ejemplo@ucol.mx" />
      <InputText {...form.password} type="password" title="Contraseña" />
      <InputText {...form.confirmPassword} type="password" title="Confirmar contraseña" />
      <InputText {...form.birthdate} type="date" title="Fecha de nacimiento" />
      <CheckboxLabel setChecked={form.politics.setOk} title="Acepto los términos y condiciones" />
    </SignForm>
  );
}

export default SignUpForm;
