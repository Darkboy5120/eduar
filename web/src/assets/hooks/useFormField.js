import { useState } from "react";

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
      value: value => setState({...state, value: value}),
      ok: ok => setState({...state, ok: ok}),
    },
    get: state,
  };

  return customState;
};

export default useFormField;
