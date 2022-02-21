import React, { useState } from 'react';
import PageContainer from '../../../layouts/PageContainer';
import CustomText from '../../atoms/CustomText';
import CustomButton from '../../atoms/CustomButton';
import Modal from '../../atoms/Modal';
import FlexButton from '../../molecules/FlexButton';
import LoadingSpinner from '../../atoms/LoadingSpinner';

function MyAr() {
  const [enableDevModal, setEnableDevModal] = useState();

  return (
    <PageContainer>
      <Modal title="¿Quieres activar el modo desarrollador?" visible={enableDevModal} setVisible={setEnableDevModal}>
        <FlexButton
          title="Si, activalo"
          onClick={() => {
            setEnableDevModal(false);
          }}
        />
        <FlexButton title="Cancelar" onClick={() => setEnableDevModal(false)} />
      </Modal>
      {/* <LoadingSpinner size="medium" centered /> */}
      <CustomText h1 text="Aun no has activado el modo desarrollador" />
      <CustomText text="Solo los desarrolladores pueden subir aplicaciónes" />
      <br />
      <CustomButton title="Activar modo desarrollador" onClick={() => setEnableDevModal(true)} />
    </PageContainer>
  );
}

export default MyAr;
