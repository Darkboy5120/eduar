import React from 'react';
import './styles.css';
import Button from '../../atoms/Button';
import Form from '../../atoms/Form';
import CustomLink from '../../atoms/CustomLink';

function SignForm({
  title, footer, submit, children, ok, loading,
}) {
  return (
    <div className="signFormContainer">
      <h3 className="signFormTitle">{title}</h3>
      <Form>
        {children}
        <Button disabled={!ok} loading={loading} type="submit" title={submit.label} onClick={submit.onClick} />
      </Form>
      <div className="signFormFooter">
        <span>{footer.label}</span>
        <CustomLink tabIndex="0" className="footerTrigger" onClick={footer.onClick}>{footer.trigger}</CustomLink>
      </div>
    </div>
  );
}

export default SignForm;
