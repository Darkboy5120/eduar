import React from "react";
import './styles.css';
import Button from "../../atoms/Button";
import Form from "../../atoms/Form";

const SignForm = ({title, footer, submit, children}) => {
  return (
    <div className="signFormContainer">
      <h3 className="signFormTitle">{title}</h3>
      <Form>
        {children}
        <Button title={submit.label} onClick={submit.onClick} />
      </Form>
      <div className="signFormFooter">
        <span>{footer.label}</span>
        <a tabIndex="0" className="footerTrigger" onClick={footer.onClick}>{footer.trigger}</a>
      </div>
    </div>
  );
};

export default SignForm;
