import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import PageContainer from '../../../layouts/PageContainer';
import FlexContainer from '../../../layouts/FlexContainer';
import CustomText from '../../atoms/CustomText';
import ProfileNav from '../../molecules/ProfileNav';
import styles from './styles.module.css';
import ProfileAchievements from '../../molecules/ProfileAchievements';
import LoadingSpinner from '../../atoms/LoadingSpinner';
import globalStore, { setProfile } from '../../../assets/store/reducers/globalStore';
import request from '../../../assets/controllers/request';
import ProfileAboutMe from '../../molecules/ProfileAboutMe';
import ProfileConfiguration from '../../molecules/ProfileConfiguration';

const prepareData = (data) => {
  const level = {
    currentPoints: 0,
    currentLevel: 0,
    minPoints: 0,
  };
  data.achievements.forEach((achievement) => {
    if (achievement.goal_count === achievement.progress.current_count) {
      level.currentPoints += achievement.pointsgain;
    }
  });
  // eslint-disable-next-line no-restricted-syntax
  for (const lvl of data.levels) {
    if (!level.maxPoints) {
      level.maxPoints = lvl.minpoints;
    }
    if (level.currentPoints >= lvl.minpoints && level.currentPoints < lvl.maxpoints) {
      level.currentLevel = lvl.pk_level;
      level.maxPoints = lvl.maxpoints;
      level.minPoints = lvl.minpoints;
      level.description = lvl.description;
      break;
    }
  }
  return { ...data, level };
};

const getProfileData = (alert) => {
  const { auth, email } = globalStore.getState().user;
  request.post('consumer_get_profile_data', {
    userEmail: email,
    userAuth: auth,
  }).then((res) => {
    switch (res?.data?.code) {
      case 0:
        globalStore.dispatch(setProfile(prepareData(res.data.data)));
        break;
      default:
        alert.show('Ha ocurrido un problema en el servidor', { type: 'error' });
    }
  });
};

function MyProfile() {
  const [activeTab, setActiveTab] = useState(0);
  const alert = useAlert();
  const profile = useSelector((state) => state.profile);
  useEffect(() => {
    getProfileData(alert);
  }, []);

  return (
    <PageContainer>
      {!profile ? (
        <LoadingSpinner size="big" />
      ) : (
        <FlexContainer className={styles.container}>
          <ProfileNav {...{ activeTab, setActiveTab }} />
          <FlexContainer className={styles.dynamicContainer}>
            <ProfileAboutMe hidden={activeTab !== 0} />
            <ProfileConfiguration hidden={activeTab !== 1} />
            <FlexContainer hidden={activeTab !== 2}>
              <CustomText h2 text="Proximamente" />
            </FlexContainer>
            <ProfileAchievements hidden={activeTab !== 3} />
          </FlexContainer>
        </FlexContainer>
      )}
    </PageContainer>
  );
}

export default MyProfile;
