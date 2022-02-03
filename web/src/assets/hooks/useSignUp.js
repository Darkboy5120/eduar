import { useEffect } from 'react';
import useInput from './useInput';
import inputValidations from '../controllers/inputValidations';
import useSubmit from './useSubmit';

const useSignUp = () => {
  const emailInput = useInput(inputValidations.email);
  const passwordInput = useInput(inputValidations.string);
  const confirmPasswordInput = useInput({
    ...inputValidations.confirmPassword,
    equal: passwordInput.value,
    error: 'Las contraseñas no coinciden',
  });
  const firstnameInput = useInput(inputValidations.string);
  const lastnameInput = useInput(inputValidations.string);
  const submit = useSubmit();

  useEffect(() => {
    const ok = emailInput.ok && passwordInput.ok && confirmPasswordInput.ok
      && firstnameInput.ok && lastnameInput.ok;
    submit.setOk(ok);
  }, [emailInput, passwordInput, confirmPasswordInput, firstnameInput, lastnameInput]);

  return {
    emailInput, passwordInput, confirmPasswordInput, firstnameInput, lastnameInput, submit,
  };
};

export default useSignUp;
