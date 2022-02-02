import { useState } from 'react';

const useInput = (initialValidation, initialValue, initialOk) => {
  const [value, setValue] = useState(initialValue);
  const [ok, setOk] = useState(initialOk);
  const onChange = (e) => setValue(e.target.value);
  const validation = initialValidation;
  return {
    value, ok, setOk, validation, onChange,
  };
};

export default useInput;
