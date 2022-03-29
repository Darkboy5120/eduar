import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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
        <img className={styles.image} alt="" key={image.filepath} src={`${globals.server.path}${image.filepath}`} />
      ))}
    </>
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
        <FlexContainer className={styles.content} column hidden={activeTab !== 0}>
          <CustomText text={appDetails.description} />
        </FlexContainer>
        <FlexContainer className={`${styles.images} ${styles.content}`} column hidden={activeTab !== 1}>
          {appDetails?.images ? <LoadAppImages images={appDetails.images} /> : <LoadingSpinner size="medium" />}
        </FlexContainer>
        <FlexContainer className={styles.content} column hidden={activeTab !== 2}>
          <ArComments appId={appDetails.pk_id} />
        </FlexContainer>
      </FlexContainer>
    </ContentContainer>
  );
}

export default ArDetailsContent;
