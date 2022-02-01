import React, {useEffect} from "react";
import SignForm from "../../molecules/SignForm";
import InputText from "../../molecules/InputText";
import useSignInForm from "./useSignInForm";

const SignInForm = ({footerOnClick}) => {
  const signInFooter = {
    label: "¿Aun no tienes cuenta? ",
    trigger: "aqui",
    onClick: () => {
      footerOnClick();
    },
  };
  const signInSubmit = {
    label: "Iniciar sesión",
    onClick: () => console.log("signed in"),
  };
  const form = useSignInForm();

  useEffect(() => {
    // console.log(form);
    console.log(form.email.get.value);
  }, [form]);

  return (
    <SignForm title="Llena tus datos" footer={signInFooter} submit={signInSubmit}>
      <InputText state={form.email} title="Correo" placeholder="ejemplo@gmail.mx" />
      <InputText state={form.password} type="password" title="Contraseña" />
    </SignForm>
  );
};

export default SignInForm;
