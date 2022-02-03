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

const getEqualValidation = (value, validation) => {
  const ok = value === validation.equal;
  return [ok, !ok ? validation.error : null];
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
  } else if (validation.equal) {
    const [ok, error] = getEqualValidation(value, validation);
    setOk(ok);
    setError(error);
  } else if (checkRegex(value, validation)) {
    setOk(false);
    setError(LOG.regex);
  } else {
    setOk(true);
    setError();
  }
};

function InputText({
  type, placeholder, title, label, onChange, setOk, validation,
}) {
  const [error, setError] = useState();
  const isPassword = type === 'password';
  const [password, setPassword] = useState(isPassword);
  const passwordIcon = password ? <FaEye /> : <FaEyeSlash />;
  type = type ?? 'text';
  type = password ? 'password' : type;
  const onChangeDo = (e) => {
    onChange(e);
    triggerValidation(e.target.value, validation, setError, setOk);
  };

  return (
    <div className="inputTextContainer">
      <div className="inputTextBox">
        <Input onChange={onChangeDo} title={title} type={type} placeholder={placeholder} />
        {isPassword ? <button type="button" aria-label="password-visibility" onClick={() => setPassword(!password)} className="inputTextPasswordIcon">{passwordIcon}</button> : null}
      </div>
      <span className="inputTextLabel">{label}</span>
      <span className="inputTextError">{error}</span>
    </div>
  );
}

export default InputText;
