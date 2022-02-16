import useInput from './useInput';
import inputValidations from '../controllers/inputValidations';
import formHookPipe from '../controllers/formHookPipe';
import useSubmit from './useSubmit';

const useSignIn = () => formHookPipe({
  email: useInput(inputValidations.email),
  password: useInput(inputValidations.string),
  submit: useSubmit(),
});

export default useSignIn;
