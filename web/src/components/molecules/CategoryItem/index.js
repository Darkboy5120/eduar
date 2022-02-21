import React from 'react';
import { FaTag } from 'react-icons/fa';
import CustomLink from '../../atoms/CustomLink';
import styles from './styles.module.css';
import FlexContainer from '../../../layouts/FlexContainer';
import CustomText from '../../atoms/CustomText';

function CategotyItem({ name, id }) {
  return (
    <CustomLink className={styles.container} href={`/?p=searchar&category=${id}`}>
      <FlexContainer className={styles.flexContainer} column>
        <FaTag className={styles.icon} />
        <CustomText text={name} />
      </FlexContainer>
    </CustomLink>
  );
}

export default CategotyItem;
