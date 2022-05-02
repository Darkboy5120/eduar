import useInput from './useInput';
import inputValidations from '../controllers/inputValidations';
import formHookPipe from '../controllers/formHookPipe';
import useSubmit from './useSubmit';

const useNewArStep1 = () => formHookPipe({
  name: useInput(inputValidations.description),
  category: useInput(inputValidations.string),
  description: useInput(inputValidations.description),
  github: useInput(inputValidations.url),
  submit: useSubmit(),
});

export default useNewArStep1;
