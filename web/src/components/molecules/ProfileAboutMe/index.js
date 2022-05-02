import React from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import FlexContainer from '../../../layouts/FlexContainer';
import CustomText from '../../atoms/CustomText';
import styles from './styles.module.css';
import UserPhoto from '../../atoms/UserPhoto';
import LoadingSpinner from '../../atoms/LoadingSpinner';
import CustomLink from '../../atoms/CustomLink';
import globals from '../../../assets/datasets/globals';

function AplicationsGrid({ aplications }) {
  return aplications.length > 0 ? (
    <div className={styles.aplicationsGrid}>
      {aplications.map((app) => (
        <CustomLink key={app.pk_id} className={styles.appGridItem} href={`?p=seear&appId=${app.pk_id}`}>
          <Image layout="fill" objectFit="cover" src={`${globals.server.path}${app.pk_filepath}`} />
        </CustomLink>
      ))}
    </div>
  ) : <CustomText>Este usuario no tiene aplicaciones</CustomText>;
}

function ProfileAboutMe({ hidden }) {
  const { aplications, activity } = useSelector((state) => state.profile);
  const commentsLength = activity.filter((inter) => inter.fk_interaction_type === 'comment').length;
  const favLength = activity.filter((inter) => inter.fk_interaction_type === 'favorite').length;
  const likesLength = activity.filter((inter) => inter.fk_interaction_type === 'endorsement').length;
  const userPhoto = useSelector((state) => state.profile.user.photo);
  return !aplications && activity ? <LoadingSpinner size="medium" /> : (
    <FlexContainer column hidden={hidden} className={styles.container}>
      <FlexContainer hCentered className={styles.imageContainer}>
        <UserPhoto height={192} width={192} path={userPhoto} />
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
          <ul>
            <li><CustomText>{`${commentsLength} comentarios`}</CustomText></li>
            <li><CustomText>{`${favLength} favoritos`}</CustomText></li>
            <li><CustomText>{`${likesLength} me gusta`}</CustomText></li>
          </ul>
        </FlexContainer>
        <FlexContainer flex={1} column>
          <CustomText h3>Aplicaciones súbidas</CustomText>
          <AplicationsGrid aplications={aplications} />
        </FlexContainer>
      </div>
    </FlexContainer>
  );
}

export default ProfileAboutMe;
