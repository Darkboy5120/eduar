import React from 'react';
import {
  FaDownload, FaHeart, FaThumbsUp,
} from 'react-icons/fa';
import IconNumber from '../IconNumber';
import FlexContainer from '../../../layouts/FlexContainer';
import CustomLink from '../CustomLink';
import styles from './styles.module.css';
import AppStats from '../AppStats';

function ResultItem({ data }) {
  const fullname = `${data.firstname} ${data.lastname}`;
  const arPage = `/?p=seear&appId=${data.pk_id}`;
  return (
    <FlexContainer column className={styles.container}>
      <CustomLink className={styles.title} href={arPage}>{data.name}</CustomLink>
      <FlexContainer className={styles.bottomContainer}>
        <CustomLink className={styles.author} href={arPage}>{fullname}</CustomLink>
        <AppStats appDetails={data} />
      </FlexContainer>
    </FlexContainer>
  );
}

export default ResultItem;
