import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import FlexContainer from '../../../layouts/FlexContainer';
import CustomForm from '../CustomForm';
import useArComment from '../../../assets/hooks/useArComment';
import InputText from '../InputText';
import request from '../../../assets/controllers/request';
import globalStore from '../../../assets/store/reducers/globalStore';
import LoadingSpinner from '../../atoms/LoadingSpinner';
import ArComment from '../ArComment';
import styles from './styles.module.css';

const newComment = (appId, comment, alert, form, setComments) => {
  form.submit.setLoading(true);
  const { email, auth } = globalStore.getState().user;
  request.post('consumer_ar_comment', {
    appId,
    comment,
    userEmail: email,
    userAuth: auth,
  }).then((res) => {
    form.submit.setLoading(false);
    switch (res?.data?.code) {
      case 0:
        setComments(null);
        form.comment.setValue('');
        alert.show('Nuevo comentario agregado correctamente', { type: 'success' });
        break;
      default:
        alert.show('Ha ocurrido un problema en el servidor', { type: 'error' });
    }
  });
};

const getComments = (setComments, appId) => {
  request.post('global_get_ar_comments', {
    appId,
  }).then((res) => {
    setComments(res?.data?.data);
  });
};

function LoadComments({ comments }) {
  return (
    <FlexContainer column className={styles.commentsContainer}>
      {comments?.map((comment) => (
        <ArComment key={comment.pk_id} data={comment} text="foo" />
      ))}
    </FlexContainer>
  );
}

function ArComments({ appId }) {
  const isUserSigned = useSelector((state) => state.signed);
  const form = useArComment();
  const alert = useAlert();
  const [comments, setComments] = useState();
  useEffect(() => {
    if (!comments) {
      getComments(setComments, appId);
    }
  }, [comments]);
  const submit = {
    label: 'Enviar',
    onClick: () => {
      newComment(appId, form.comment.value, alert, form, setComments);
    },
  };
  return (
    <FlexContainer column className={styles.container}>
      {isUserSigned ? (
        <CustomForm {...{ ...form.submit, submit }} row removePadding>
          <InputText title="Comentario" {...form.comment} />
        </CustomForm>
      ) : null}
      {comments ? (
        <LoadComments comments={comments} />
      ) : <LoadingSpinner size="medium" />}
    </FlexContainer>
  );
}

export default ArComments;
