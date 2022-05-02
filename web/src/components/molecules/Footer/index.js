import React from 'react';
import Image from 'next/image';
import CustomText from '../../atoms/CustomText';
import FlexContainer from '../../../layouts/FlexContainer';
import logo from '../../../../public/favicon.png';
import CustomLink from '../../atoms/CustomLink';
import udc from '../../../../public/udc.png';
import styles from './styles.module.css';

function DevTab() {
  return (
    <FlexContainer column>
      <CustomText h4 text="Desarrollador" />
      <CustomLink href="https://www.linkedin.com/in/hilari%C3%B3n-maldonado-gonz%C3%A1lez-a908a312b/">Linkedin</CustomLink>
      <CustomLink href="https://github.com/Darkboy5120">Github</CustomLink>
      <CustomLink href="https://api.whatsapp.com/send?phone=5213141637234">Whatsapp</CustomLink>
    </FlexContainer>
  );
}

function AboutTab() {
  return (
    <FlexContainer column>
      <CustomText h4 text="Sobre Eduar" />
      <CustomLink href="?p=welcome">¿Que es Eduar?</CustomLink>
      <CustomLink href="?p=welcome">Objetivos</CustomLink>
      <CustomLink href="?p=welcome">Para maestros</CustomLink>
      <CustomLink href="?p=welcome">Guía para desarrolladores</CustomLink>
    </FlexContainer>
  );
}

function UdcTab() {
  return (
    <FlexContainer column>
      <CustomText h4 text="UDC" />
      <CustomLink href="https://www.ucol.mx/">Página web</CustomLink>
    </FlexContainer>
  );
}

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.tabsContainer}>
        <FlexContainer column className={styles.logoContainer}>
          <FlexContainer>
            <Image priority src={logo} layout="fixed" className={styles.footerLogo} width={160} height={160} />
            <Image src={udc} layout="fixed" className={styles.footerLogo} width={64} height={64} />
          </FlexContainer>
          <CustomText h3 text={'"Aprendizaje para la nueva realidad"'} />
        </FlexContainer>
        <DevTab />
        <AboutTab />
        <UdcTab />
        <FlexContainer column>
          <CustomText h4 text="Más Información" />
          <CustomLink href="?p=welcome">foo</CustomLink>
          <CustomLink href="?p=welcome">foo</CustomLink>
          <CustomLink href="?p=welcome">foo</CustomLink>
        </FlexContainer>
      </div>
      <div className={styles.copyright}>
        <CustomText bold text="Copyright © 2022 HGMG" />
      </div>
    </div>
  );
}

export default Footer;
