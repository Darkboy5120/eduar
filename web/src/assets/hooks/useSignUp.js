import { useEffect, useState } from 'react';
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
  const birthdateInput = useInput(inputValidations.date);
  const [politics, setPolitics] = useState(false);
  const submit = useSubmit();

  useEffect(() => {
    const ok = emailInput.ok && passwordInput.ok && confirmPasswordInput.ok
      && firstnameInput.ok && lastnameInput.ok && politics && birthdateInput.ok;
    submit.setOk(ok);
  }, [emailInput,
    passwordInput, confirmPasswordInput, firstnameInput, lastnameInput, birthdateInput]);

  return {
    emailInput,
    passwordInput,
    confirmPasswordInput,
    firstnameInput,
    lastnameInput,
    submit,
    setPolitics,
    birthdateInput,
  };
};

export default useSignUp;
