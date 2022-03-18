import useInput from './useInput';
import inputValidations from '../controllers/inputValidations';
import formHookPipe from '../controllers/formHookPipe';
import useSubmit from './useSubmit';

const useAppFilter = () => formHookPipe({
  category: useInput(inputValidations.string),
  orderBy: useInput(inputValidations.string),
  orderType: useInput(inputValidations.string),
  submit: useSubmit(),
});

export default useAppFilter;
