import React from 'react';
import styles from './styles.module.css';
import CustomButton from '../../atoms/CustomButton';
import Form from '../../atoms/Form';
import CustomLink from '../../atoms/CustomLink';
import FlexContainer from '../../../layouts/FlexContainer';

function CustomForm({
  title, footer, submit, children, ok, loading, back,
}) {
  return (
    <div className={styles.signFormContainer}>
      {title ? <h3 className={styles.signFormTitle}>{title}</h3> : null}
      <Form>
        {children}
        <FlexContainer column={!back}>
          {back
            // eslint-disable-next-line max-len
            ? <CustomButton title={back.label} className={styles.backButton} onClick={back.onClick} />
            : null}
          <CustomButton disabled={!ok} loading={loading} type="submit" title={submit.label} onClick={submit.onClick} />
        </FlexContainer>
      </Form>
      {footer ? (
        <div className={styles.signFormFooter}>
          <span>{footer.label}</span>
          <CustomLink tabIndex="0" className={styles.footerTrigger} onClick={footer.onClick}>{footer.trigger}</CustomLink>
        </div>
      ) : null}
    </div>
  );
}

export default CustomForm;
