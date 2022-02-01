import React, { useState } from 'react';
import './styles.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Input from '../../atoms/Input';

const LOG = {
  empty: 'El campo esta vacio',
  min: 'Es muy corto',
  max: 'Es muy largo',
  regex: 'El formato es incorrecto',
};

const checkRegex = (value, validation) => {
  const result = validation.not ? !value.match(validation.regex) : value.match(validation.regex);
  return result;
};

const triggerValidation = (value, validation, setError, setOk) => {
  if (!value) {
    setOk(false);
    setError(LOG.empty);
  } else if (value.length < validation.min) {
    setOk(false);
    setError(LOG.min);
  } else if (value.length > validation.max) {
    setOk(false);
    setError(LOG.max);
  } else if (checkRegex(value, validation)) {
    setOk(false);
    setError(LOG.regex);
  } else {
    setOk(true);
    setError();
  }
};

function InputText({
  type, placeholder, title, label, state,
}) {
  const [error, setError] = useState();
  const isPassword = type === 'password';
  const [password, setPassword] = useState(isPassword);
  const passwordIcon = password ? <FaEye /> : <FaEyeSlash />;
  type = type ?? 'text';
  type = password ? 'password' : 'text';
  const onChange = (e) => {
    // state.set.value(true);
    console.log(e.target.value);
    triggerValidation(e.target.value, state.get.validation, setError, state.set.ok);
  };

  return (
    <div className="inputTextContainer">
      {isPassword ? <button type="button" aria-label="password-visibility" onClick={() => setPassword(!password)} className="inputTextPasswordIcon">{passwordIcon}</button> : null}
      <Input onChange={onChange} title={title} type={type} placeholder={placeholder} />
      <span className="inputTextLabel">{label}</span>
      <span className="inputTextError">{error}</span>
    </div>
  );
}

export default InputText;
