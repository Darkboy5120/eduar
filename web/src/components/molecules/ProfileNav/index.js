import React from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { FaInfoCircle } from 'react-icons/fa';
import FlexContainer from '../../../layouts/FlexContainer';
import CustomText from '../../atoms/CustomText';
import FilterButton from '../FilterButton';
import styles from './styles.module.css';
import HelpIcon from '../../atoms/HelpIcon';

function ProfileNav({ activeTab, setActiveTab }) {
  const { firstname, lastname, email } = useSelector((state) => state.user);
  const fullname = `${firstname} ${lastname}`;
  const defaultUserPhoto = 'https://images.unsplash.com/photo-1533552755457-5b471cb2ab11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80';
  const userPhoto = useSelector((state) => state.user.photo);
  const userPhotoPath = userPhoto ?? defaultUserPhoto;
  const { level } = useSelector((state) => state.profile);
  const getActive = (index) => ({ secondary: index !== activeTab });
  return (
    <FlexContainer className={styles.container} column>
      <FlexContainer className={styles.imageContainer}>
        <Image
          priority
          className={styles.image}
          width={64}
          height={64}
          layout="fixed"
          src={userPhotoPath}
          onClick={() => {
          }}
        />
        <FlexContainer column>
          <CustomText text={fullname} bold />
          <CustomText text={email} />
        </FlexContainer>
      </FlexContainer>
      <FlexContainer className={styles.levelContainer} column>
        <FlexContainer>
          <CustomText text={`Nivel ${level.currentLevel}`} bold />
          <HelpIcon label={level.description} icon={<FaInfoCircle />} />
        </FlexContainer>
        <FlexContainer className={styles.levelBar}>
          <CustomText className={styles.levelBarPoints}>{`${level.currentPoints} / ${level.maxPoints}`}</CustomText>
          <meter min={level.minPoints} max={level.maxPoints} value={level.currentPoints} />
        </FlexContainer>
      </FlexContainer>
      <FlexContainer className={styles.tabsContainer} column>
        <FilterButton title="Sobre mi" onClick={() => setActiveTab(0)} {...getActive(0)} />
        <FilterButton title="Configuración" onClick={() => setActiveTab(1)} {...getActive(1)} />
        <FilterButton title="Verificación" onClick={() => setActiveTab(2)} {...getActive(2)} />
        <FilterButton title="Logros" onClick={() => setActiveTab(3)} {...getActive(3)} />
      </FlexContainer>
    </FlexContainer>
  );
}

export default ProfileNav;
