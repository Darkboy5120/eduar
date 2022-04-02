import useInput from './useInput';
import inputValidations from '../controllers/inputValidations';
import formHookPipe from '../controllers/formHookPipe';
import useSubmit from './useSubmit';

const useArComment = () => formHookPipe({
  comment: useInput(inputValidations.description),
  submit: useSubmit(),
});

export default useArComment;
