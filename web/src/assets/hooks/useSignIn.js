import { useEffect } from 'react';
import useInput from './useInput';
import inputValidations from '../controllers/inputValidations';
import useSubmit from './useSubmit';

const useSignIn = () => {
  const emailInput = useInput(inputValidations.email);
  const passwordInput = useInput(inputValidations.string);
  const submit = useSubmit();

  useEffect(() => {
    const ok = emailInput.ok && passwordInput.ok;
    submit.setOk(ok);
  }, [emailInput, passwordInput]);

  return { emailInput, passwordInput, submit };
};

export default useSignIn;
