import { useState, useEffect } from 'react';
import useFormField from '../../../assets/hooks/useFormField';
import inputValidations from '../../../assets/controllers/inputValidations';

const useSignInForm = () => {
  const email = useFormField(inputValidations.email);
  const password = useFormField(inputValidations.string);
  // eslint-disable-next-line no-unused-vars
  const [ok, setOk] = useState(false);
  const state = { email, password };

  useEffect(() => {
    console.log(email.get.value);
  }, [email]);

  return state;
};

export default useSignInForm;
