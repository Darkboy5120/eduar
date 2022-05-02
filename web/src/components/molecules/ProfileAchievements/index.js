import React from 'react';
import { useSelector } from 'react-redux';
import FlexContainer from '../../../layouts/FlexContainer';
import CustomText from '../../atoms/CustomText';
import styles from './styles.module.css';

function AchievementsCard({ data }) {
  return (
    <FlexContainer column className={styles.card}>
      <CustomText h4 text={data.title} />
      <div className={styles.cardFooter}>
        <CustomText text={data.description} />
        <meter min="0" max={data.goal_count} value={data.progress.current_count} />
        <CustomText className={styles.points} text={`${data.pointsgain} puntos`} />
      </div>
    </FlexContainer>
  );
}

function ProfileAchievements({ hidden }) {
  const achievements = useSelector((state) => state.profile.achievements);
  const hiddenStyle = hidden ? styles.hiddenStyle : null;
  return (
    <div className={`${styles.container} ${hiddenStyle}`}>
      {achievements?.map((item) => <AchievementsCard key={item.pk_id} data={item} />)}
    </div>
  );
}

export default ProfileAchievements;
