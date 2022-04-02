import useInput from './useInput';
import inputValidations from '../controllers/inputValidations';
import formHookPipe from '../controllers/formHookPipe';
import useSubmit from './useSubmit';

const useNewArStep1 = () => formHookPipe({
  name: useInput(inputValidations.string),
  category: useInput(inputValidations.string),
  description: useInput(inputValidations.description),
  github: useInput(inputValidations.string),
  submit: useSubmit(),
});

export default useNewArStep1;
