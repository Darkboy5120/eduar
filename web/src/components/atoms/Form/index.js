import React, {useEffect, useRef} from "react";
import "./styles.css";

const onSubmit = e => {
  e.preventDefault();
  e.stopPropagation();
};

const Form = ({children}) => {
  const form = useRef();

  useEffect(() => {
    form.current.querySelector(".input");
  }, []);

  return (
    <form onSubmit={onSubmit} ref={form} className="formContainer">{children}</form>
  );
};

export default Form;
