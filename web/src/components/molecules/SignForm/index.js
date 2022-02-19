import React from 'react';
import styles from './styles.module.css';
import CustomButton from '../../atoms/CustomButton';
import Form from '../../atoms/Form';
import CustomLink from '../../atoms/CustomLink';

function SignForm({
  title, footer, submit, children, ok, loading,
}) {
  return (
    <div className={styles.signFormContainer}>
      <h3 className={styles.signFormTitle}>{title}</h3>
      <Form>
        {children}
        <CustomButton disabled={!ok} loading={loading} type="submit" title={submit.label} onClick={submit.onClick} />
      </Form>
      <div className={styles.signFormFooter}>
        <span>{footer.label}</span>
        <CustomLink tabIndex="0" className={styles.footerTrigger} onClick={footer.onClick}>{footer.trigger}</CustomLink>
      </div>
    </div>
  );
}

export default SignForm;
