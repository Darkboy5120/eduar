import React from 'react';
import Image from 'next/image';
import FlexContainer from '../../../layouts/FlexContainer';
import CustomText from '../../atoms/CustomText';
import FilterButton from '../FilterButton';
import styles from './styles.module.css';

function ProfileNav({ activeTab, setActiveTab }) {
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
          src="https://images.unsplash.com/photo-1533552755457-5b471cb2ab11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          onClick={() => {
          }}
        />
        <CustomText text="Hilario" bold />
      </FlexContainer>
      <FlexContainer className={styles.levelContainer} column>
        <CustomText text="Nivel 3" bold />
        <meter min="0" max="1000" value="500" />
      </FlexContainer>
      <FlexContainer className={styles.tabsContainer} column>
        <FilterButton title="Configuración" onClick={() => setActiveTab(0)} {...getActive(0)} />
        <FilterButton title="Perfil" onClick={() => setActiveTab(1)} {...getActive(1)} />
        <FilterButton title="Verificación" onClick={() => setActiveTab(2)} {...getActive(2)} />
        <FilterButton title="Logros" onClick={() => setActiveTab(3)} {...getActive(3)} />
      </FlexContainer>
    </FlexContainer>
  );
}

export default ProfileNav;
