import useFormField from "../../../assets/hooks/useFormField";
import inputValidations from "../../../assets/controllers/inputValidations";

const useSignInForm = () => {
  const email = useFormField(inputValidations.email);
  const password = useFormField(inputValidations.string);

  const state = {email, password};

  return state;
};

export default useSignInForm;
