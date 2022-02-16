import useInput from './useInput';
import inputValidations from '../controllers/inputValidations';
import formHookPipe from '../controllers/formHookPipe';
import useSubmit from './useSubmit';

const useSignUp = () => formHookPipe({
  email: useInput(inputValidations.email),
  password: useInput(inputValidations.string),
  confirmPassword: useInput(inputValidations.string),
  firstname: useInput(inputValidations.string),
  lastname: useInput(inputValidations.string),
  birthdate: useInput(inputValidations.date),
  politics: useInput(),
  submit: useSubmit(),
});

export default useSignUp;
