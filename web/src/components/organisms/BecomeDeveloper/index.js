import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import Modal from '../../atoms/Modal';
import FlexButton from '../../molecules/FlexButton';
import CustomText from '../../atoms/CustomText';
import CustomButton from '../../atoms/CustomButton';
import request from '../../../assets/controllers/request';
import globalStore from '../../../assets/store/reducers/globalStore';

const becomeDev = (setBecomeDevModal, setData, setLoading, alert) => {
  setLoading(true);
  request.post('global_becomeDev', {
    id: globalStore.getState().user.email,
  }).then((res) => {
    setLoading(false);
    setBecomeDevModal(false);
    switch (res?.data?.code) {
      case 0:
        setData(null);
        break;
      default:
        alert.show('Ha ocurrido un problema en el servidor', { type: 'error' });
    }
  });
};

function BecomeDeveloper({ setData }) {
  const [becomeDevModal, setBecomeDevModal] = useState();
  const [loading, setLoading] = useState(false);
  const alert = useAlert();

  return (
    <>
      <Modal title="¿Quieres activar el modo desarrollador?" visible={becomeDevModal} setVisible={setBecomeDevModal}>
        <FlexButton
          title="Si, activalo"
          loading={loading}
          onClick={() => {
            becomeDev(setBecomeDevModal, setData, setLoading, alert);
          }}
        />
        <FlexButton title="Cancelar" onClick={() => setBecomeDevModal(false)} />
      </Modal>
      <CustomText h1 text="Aun no has activado el modo desarrollador" />
      <CustomText text="Solo los desarrolladores pueden subir aplicaciónes" />
      <br />
      <CustomButton title="Activar modo desarrollador" onClick={() => setBecomeDevModal(true)} />
    </>
  );
}

export default BecomeDeveloper;
