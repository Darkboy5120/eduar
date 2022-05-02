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
import globals from '../../../assets/datasets/globals';

const prepareData = (data) => {
  data.user.photo = data.user.photo ? `${globals.server.path}${data.user.photo}` : null;
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

const getProfileData = (email, alert) => {
  request.post('consumer_get_profile_data', {
    userEmail: email,
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

function MyProfile({ params }) {
  const [activeTab, setActiveTab] = useState(0);
  const alert = useAlert();
  const profile = useSelector((state) => state.profile);
  const selfProfile = useSelector((state) => state.user.email) === params.user;
  useEffect(() => {
    getProfileData(params.user, alert);
  }, []);

  return (
    <PageContainer>
      {!profile ? (
        <LoadingSpinner size="big" />
      ) : (
        <FlexContainer className={styles.container}>
          <ProfileNav selfProfile={selfProfile} {...{ activeTab, setActiveTab }} />
          <FlexContainer className={styles.dynamicContainer}>
            <ProfileAboutMe hidden={activeTab !== 0} />
            {selfProfile ? (
              <>
                <ProfileConfiguration hidden={activeTab !== 1} />
                <FlexContainer hidden={activeTab !== 2}>
                  <CustomText h2 text="Proximamente" />
                </FlexContainer>
              </>
            ) : null}
            <ProfileAchievements hidden={activeTab !== 3} />
          </FlexContainer>
        </FlexContainer>
      )}
    </PageContainer>
  );
}

export default MyProfile;
