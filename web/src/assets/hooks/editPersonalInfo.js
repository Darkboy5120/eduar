import useInput from './useInput';
import inputValidations from '../controllers/inputValidations';
import formHookPipe from '../controllers/formHookPipe';
import useSubmit from './useSubmit';

const useEditPersonalInfo = (initialData) => formHookPipe({
  firstname: useInput(inputValidations.string, initialData.firstname, true),
  lastname: useInput(inputValidations.string, initialData.lastname, true),
  submit: useSubmit(),
});

export default useEditPersonalInfo;
