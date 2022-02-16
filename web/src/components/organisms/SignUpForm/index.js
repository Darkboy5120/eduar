import React from 'react';
import { useAlert } from 'react-alert';
import SignForm from '../../molecules/SignForm';
import InputText from '../../molecules/InputText';
import useSignUp from '../../../assets/hooks/useSignUp';
import CheckboxLabel from '../../atoms/CheckboxLabel';
import firebasePipe from '../../../assets/controllers/firebasePipe';

function SignUpForm({ footerOnClick }) {
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
      fbPipe.signUp(form.email.value, form.password.value, (user) => {
        console.log(user);
      });
    },
  };

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
