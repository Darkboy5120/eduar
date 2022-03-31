import React from 'react';
import { FaDownload, FaHeart, FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import FlexContainer from '../../../layouts/FlexContainer';
import CustomLink from '../../atoms/CustomLink';
import CustomText from '../../atoms/CustomText';
import IconNumber from '../../atoms/IconNumber';
import globals from '../../../assets/datasets/globals';
import styles from './styles.module.css';

function ArCover({ bg, name }) {
  return (
    <FlexContainer className={styles.coverContainer}>
      <img className={styles.cover} alt="" src={`${globals.server.path}${bg}`} />
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
            <a href="foo">{`${appDetails.firstname} ${appDetails.lastname}`}</a>
          </span>
          <CustomLink href={appDetails.github}>Github</CustomLink>
          <CustomText text="v2.3" />
        </FlexContainer>
        <FlexContainer>
          <IconNumber icon={<FaHeart />} number={appDetails.favorites} />
          <IconNumber icon={<FaThumbsUp />} number={appDetails.endorsements} />
          <IconNumber icon={<FaDownload />} number={appDetails.downloads} />
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>
  );
}

export default ArDetailsHeader;
