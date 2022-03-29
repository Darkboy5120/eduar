import React from 'react';
import { FaLaughBeam, FaFrown, FaAngry, FaHeart } from 'react-icons/fa';
import FlexContainer from '../../../layouts/FlexContainer';
import CustomText from '../../atoms/CustomText';
import IconNumber from '../../atoms/IconNumber';
import styles from './styles.module.css';

function ArComment({ data }) {
  return (
    <FlexContainer className={styles.container} column>
      <FlexContainer className={styles.headerContainer}>
        <CustomText bold text={`${data.firstname} ${data.lastname}`} />
        <CustomText text={data.registerdate} />
      </FlexContainer>
      <CustomText className={styles.comment} text={data.comment} />
      <FlexContainer>
        <IconNumber icon={<FaLaughBeam />} number="1k" />
        <IconNumber icon={<FaFrown />} number="1k" />
        <IconNumber icon={<FaAngry />} number="1k" />
        <IconNumber icon={<FaHeart />} number="1k" />
      </FlexContainer>
    </FlexContainer>
  );
}

export default ArComment;
