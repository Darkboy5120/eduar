import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import globals from '../../../assets/datasets/globals';
import ContentContainer from '../../../layouts/ContentContainer';
import FlexContainer from '../../../layouts/FlexContainer';
import CustomText from '../../atoms/CustomText';
import LoadingSpinner from '../../atoms/LoadingSpinner';
import FilterButton from '../FilterButton';
import ArComments from '../ArComments';
import styles from './styles.module.css';

const getActiveClass = (activeTab) => (index) => ({ className: `${styles.tabButton} ${activeTab === index ? styles.activeTab : ''}` });

function LoadAppImages({ images }) {
  return (
    <>
      {images.map((image) => (
        <div className={styles.imageContainer} key={image.filepath}>
          <Image
            className={styles.image}
            layout="fill"
            src={`${globals.server.path}${image.filepath}`}
          />
        </div>
      ))}
    </>
  );
}

function TabContent({ className, children, hidden }) {
  return (
    <FlexContainer className={`${styles.content} ${className}`} column hidden={hidden}>
      {children}
    </FlexContainer>
  );
}

function ArDetailsContent() {
  const appDetails = useSelector((state) => state.appDetails);
  const [activeTab, setActiveTab] = useState(0);
  const isTabActive = getActiveClass(activeTab);
  return (
    <ContentContainer>
      <FlexContainer>
        <FilterButton title="Descripción" onClick={() => setActiveTab(0)} {...isTabActive(0)} />
        <FilterButton title="Imágenes" onClick={() => setActiveTab(1)} {...isTabActive(1)} />
        <FilterButton title="Comentarios" onClick={() => setActiveTab(2)} {...isTabActive(2)} />
      </FlexContainer>
      <FlexContainer>
        <TabContent hidden={activeTab !== 0}>
          <CustomText text={appDetails.description} />
        </TabContent>
        <TabContent className={styles.images} hidden={activeTab !== 1}>
          {appDetails?.images ? <LoadAppImages images={appDetails.images} /> : <LoadingSpinner size="medium" />}
        </TabContent>
        <TabContent hidden={activeTab !== 2}>
          <ArComments appId={appDetails.pk_id} />
        </TabContent>
      </FlexContainer>
    </ContentContainer>
  );
}

export default ArDetailsContent;
