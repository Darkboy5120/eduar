import React from "react";
import './styles.css';
import Button from "../../atoms/Button";

const SignForm = ({title, footer, submit, children}) => {
  return (
    <div className="signFormContainer">
      <h3>{title}</h3>
      {children}
      <Button title={submit.label} onClick={submit.onClick} />
      <div className="footer">
        <span>{footer.label}</span>
        <a tabIndex="0" className="footerTrigger" onClick={footer.onClick}>{footer.trigger}</a>
      </div>
    </div>
  );
};

export default SignForm;
