import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import useEditPersonalInfo from '../../../assets/hooks/editPersonalInfo';
import FlexContainer from '../../../layouts/FlexContainer';
import CustomText from '../../atoms/CustomText';
import CustomForm from '../CustomForm';
import InputText from '../InputText';
import globalStore, { updateFullname } from '../../../assets/store/reducers/globalStore';
import useEditPassword from '../../../assets/hooks/useEditPassword';
import styles from './styles.module.css';
import request from '../../../assets/controllers/request';
import firebasePipe from '../../../assets/controllers/firebasePipe';
import UserPhoto from '../../atoms/UserPhoto';

function ProfileAboutMe({ hidden }) {
  return (
    <FlexContainer column hidden={hidden} className={styles.container}>
      <FlexContainer hCentered className={styles.imageContainer}>
        <UserPhoto height={192} width={192} />
      </FlexContainer>
      <div className={styles.infoContainer}>
        <FlexContainer flex={1} column>
          <CustomText h3>Información adicional</CustomText>
          <ul>
            <li>
              <CustomText>Se registró en Eduar el 12 de febrero del 2022 (hace 2 meses)</CustomText>
            </li>
            <li>
              <CustomText>Cumple años el 7 de septiembre</CustomText>
            </li>
          </ul>
          <br />
          <CustomText h3>Actividad de este mes</CustomText>
          <br />
          <CustomText h3>Actividad global</CustomText>
        </FlexContainer>
        <FlexContainer flex={1}>
          <CustomText h3>Aplicaciones súbidas</CustomText>
        </FlexContainer>
      </div>
    </FlexContainer>
  );
}

export default ProfileAboutMe;
