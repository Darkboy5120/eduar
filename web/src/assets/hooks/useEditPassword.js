import useInput from './useInput';
import inputValidations from '../controllers/inputValidations';
import formHookPipe from '../controllers/formHookPipe';
import useSubmit from './useSubmit';

const useEditPassword = () => formHookPipe({
  oldPassword: useInput(inputValidations.string),
  newPassword: useInput(inputValidations.string),
  submit: useSubmit(),
});

export default useEditPassword;
