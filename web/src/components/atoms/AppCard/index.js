/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import {
  FaDownload, FaEllipsisV, FaHeart, FaThumbsUp,
} from 'react-icons/fa';
import FlexContainer from '../../../layouts/FlexContainer';
import CustomText from '../CustomText';
import IconNumber from '../IconNumber';
import Dropdown from '../../molecules/Dropdown';
import DropdownItem from '../../molecules/DropdrownItem';
import styles from './styles.module.css';

const capString = (string, cap) => {
  let result = string;
  if (string.length > cap - 3) {
    result = `${string.slice(0, cap - 3)}...`;
  }
  return result;
};

function AppCard({
  name, version, imagePath, author, stats, appLink,
}) {
  return (
    <FlexContainer column href={appLink} className={styles.container}>
      <Dropdown className={styles.dropdown} align="right" leftIcon={<FaEllipsisV />}>
        <DropdownItem title="Editar" linkTarget="foo" />
        <DropdownItem title="Eliminar" linkTarget="foo" />
      </Dropdown>
      <FlexContainer className={styles.imageContainer}>
        <img className={styles.image} src={imagePath} />
      </FlexContainer>
      <FlexContainer className={styles.contentContainer} column>
        <FlexContainer className={styles.contentHeader}>
          <CustomText text={name} bold />
          <CustomText text={version} />
        </FlexContainer>
        <FlexContainer className={styles.contentFooter}>
          <CustomText>
            Por
            {' '}
            <a href={author.link}>{capString(author.name, 20)}</a>
          </CustomText>
          <FlexContainer>
            <IconNumber icon={<FaHeart />} number={stats.favorites} />
            <IconNumber icon={<FaThumbsUp />} number={stats.popularity} />
            <IconNumber icon={<FaDownload />} number={stats.downloads} />
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>
  );
}

export default AppCard;
