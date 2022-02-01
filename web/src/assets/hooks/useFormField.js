import { useState } from 'react';

const useFormField = (validation) => {
  const defaultValue = {
    value: null,
    ok: null,
    validation: validation ?? {
      regex: null,
      min: null,
      max: null,
      not: null,
    },
  };
  const [state, setState] = useState(defaultValue);
  const customState = {
    set: {
      ok: (newOk) => setState({ ...state, ok: newOk }),
      value: (newValue) => setState({ ...state, value: newValue }),
    },
    get: state,
  };

  return customState;
};

export default useFormField;
