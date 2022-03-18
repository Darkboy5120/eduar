/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { FaDownload, FaHeart, FaThumbsUp } from 'react-icons/fa';
import FlexContainer from '../../../layouts/FlexContainer';
import CustomText from '../CustomText';
import IconNumber from '../IconNumber';
import CustomLink from '../CustomLink';
import styles from './styles.module.css';

const capString = (string, cap) => {
  let result = string;
  if (string.length > cap - 3) {
    result = `${string.slice(0, cap - 3)}...`;
  }
  return result;
};

function AppCard() {
  return (
    <CustomLink href="sakjsbdajsdb" className={styles.container}>
      <FlexContainer className={styles.imageContainer}>
        <img className={styles.image} src="https://images.unsplash.com/photo-1597074753149-53c386367bdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
      </FlexContainer>
      <FlexContainer className={styles.contentContainer} column>
        <FlexContainer className={styles.contentHeader}>
          <CustomText text="app name" bold />
          <CustomText text="V2.3" />
        </FlexContainer>
        <FlexContainer className={styles.contentFooter}>
          <CustomText>
            Por
            {' '}
            <a href="asdads">{capString('Hilario Maldonado', 20)}</a>
          </CustomText>
          <FlexContainer>
            <IconNumber icon={<FaHeart />} number="3" />
            <IconNumber icon={<FaThumbsUp />} number="0" />
            <IconNumber icon={<FaDownload />} number="0" />
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    </CustomLink>
  );
}

export default AppCard;
