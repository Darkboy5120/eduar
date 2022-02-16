import { useState } from 'react';

const useInput = (initialValidation, initialValue, initialOk) => {
  const [value, setValue] = useState(initialValue);
  const [ok, setOk] = useState(initialOk);
  const validation = initialValidation;
  return {
    value, setValue, ok, setOk, validation,
  };
};

export default useInput;
