import React, {useState} from "react";
import "./styles.css";
import Input from "../../atoms/Input";

const LOG = {
  empty: "El capo esta vacio",
  min: "Es muy corto",
  max: "Es muy largo",
  regex: "El formato es incorrecto",
};

const checkRegex = (value, validation) => {
  let result = validation.not ? value.match(validation.regex) : value.match(validation.regex);
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

const InputText = ({type, placeholder, title, label, state}) => {
  const [error, setError] = useState();
  const isPassword = type === "password" ? true : false;
  type = type ?? "text";
  const onChange = e => {
    state.set.value(e.target.value);
    triggerValidation(e.target.value, state.get.validation, setError, state.set.ok);
  };

  return (
    <div className="inputTextContainer">
      <Input onChange={onChange} title={title} type={type} placeholder={placeholder} />
      <span className="inputTextLabel">{label}</span>
      <span className="inputTextError">{error}</span>
    </div>
  );
};

export default InputText;
