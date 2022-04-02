import useInput from './useInput';
import formHookPipe from '../controllers/formHookPipe';
import useSubmit from './useSubmit';

const useNewArStep2 = () => formHookPipe({
  additional: useInput(),
  thumbnail: useInput(),
  cover: useInput(),
  apk: useInput(),
  submit: useSubmit(),
});

export default useNewArStep2;
