import React from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import FlexContainer from '../../../layouts/FlexContainer';
import CustomLink from '../../atoms/CustomLink';
import CustomText from '../../atoms/CustomText';
import globals from '../../../assets/datasets/globals';
import AppStats from '../../atoms/AppStats';
import styles from './styles.module.css';

function ArCover({ bg, name }) {
  return (
    <FlexContainer className={styles.coverContainer}>
      <Image priority className={styles.cover} layout="fill" alt="cover" src={`${globals.server.path}${bg}`} />
      <div className={styles.titleContainer}>
        <CustomText h1 text={name} />
      </div>
    </FlexContainer>
  );
}

function ArDetailsHeader() {
  const appDetails = useSelector((state) => state.appDetails);
  return (
    <FlexContainer column className={styles.container}>
      <ArCover bg={appDetails.background} name={appDetails.name} />
      <FlexContainer className={styles.bottomContainer}>
        <FlexContainer className={styles.bottomInfo}>
          <span>
            Desarrollador por
            {' '}
            <a href={`?p=myprofile&user=${appDetails.author_id}`}>{`${appDetails.firstname} ${appDetails.lastname}`}</a>
          </span>
          <CustomLink href={appDetails.github}>Github</CustomLink>
          {/* <CustomText text="v2.3" /> */}
        </FlexContainer>
        <AppStats appDetails={appDetails} allowButtons />
      </FlexContainer>
    </FlexContainer>
  );
}

export default ArDetailsHeader;
