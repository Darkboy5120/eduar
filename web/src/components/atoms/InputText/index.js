import React from "react";
import "./styles.css";
import Input from "../Input";

const InputText = ({type, placeholder, title, label}) => {
  const isPassword = type === "password" ? true : false;
  type = type ?? "text";
  return (
    <div className="inputTextContainer">
      <Input title={title} type={type} placeholder={placeholder} />
      <span className="inputTextLabel">{label}</span>
    </div>
  );
};

export default InputText;
