import React, { useEffect, useState } from 'react';
import PageContainer from '../../../layouts/PageContainer';
import FlexContainer from '../../../layouts/FlexContainer';
import CustomText from '../../atoms/CustomText';
import ProfileNav from '../../molecules/ProfileNav';
import styles from './styles.module.css';

function MyProfile() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <PageContainer>
      <FlexContainer className={styles.container}>
        <ProfileNav {...{ activeTab, setActiveTab }} />
        <FlexContainer className={styles.dynamicContainer}>
          <FlexContainer hidden={activeTab !== 0}>
            <CustomText text="foo0" />
          </FlexContainer>
          <FlexContainer hidden={activeTab !== 1}>
            <CustomText text="foo1" />
          </FlexContainer>
          <FlexContainer hidden={activeTab !== 2}>
            <CustomText text="foo2" />
          </FlexContainer>
          <FlexContainer hidden={activeTab !== 3}>
            <CustomText text="foo3" />
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    </PageContainer>
  );
}

export default MyProfile;
