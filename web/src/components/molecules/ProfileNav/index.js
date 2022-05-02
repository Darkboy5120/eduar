import React from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { FaInfoCircle } from 'react-icons/fa';
import FlexContainer from '../../../layouts/FlexContainer';
import CustomText from '../../atoms/CustomText';
import FilterButton from '../FilterButton';
import styles from './styles.module.css';
import HelpIcon from '../../atoms/HelpIcon';
import UserPhoto from '../../atoms/UserPhoto';

function ProfileNav({ selfProfile, activeTab, setActiveTab }) {
  const { firstname, lastname, email } = useSelector((state) => state.profile.user);
  const fullname = `${firstname} ${lastname}`;
  const { level, user } = useSelector((state) => state.profile);
  const getActive = (index) => ({ secondary: index !== activeTab });
  return (
    <FlexContainer className={styles.container} column>
      <FlexContainer className={styles.imageContainer}>
        <UserPhoto height={64} width={64} path={user.photo} />
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
        {selfProfile ? (
          <>
            <FilterButton title="Configuración" onClick={() => setActiveTab(1)} {...getActive(1)} />
            <FilterButton title="Verificación" onClick={() => setActiveTab(2)} {...getActive(2)} />
          </>
        ) : null}
        <FilterButton title="Logros" onClick={() => setActiveTab(3)} {...getActive(3)} />
      </FlexContainer>
    </FlexContainer>
  );
}

export default ProfileNav;
