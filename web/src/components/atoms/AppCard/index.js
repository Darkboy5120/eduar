/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import {
  FaDownload, FaEllipsisV, FaHeart, FaThumbsUp,
} from 'react-icons/fa';
import { useAlert } from 'react-alert';
import FlexContainer from '../../../layouts/FlexContainer';
import CustomText from '../CustomText';
import IconNumber from '../IconNumber';
import Dropdown from '../../molecules/Dropdown';
import DropdownItem from '../../molecules/DropdrownItem';
import FlexButton from '../../molecules/FlexButton';
import Modal from '../Modal';
import request from '../../../assets/controllers/request';
import styles from './styles.module.css';
import globalStore from '../../../assets/store/reducers/globalStore';

const capString = (string, cap) => {
  let result = string;
  if (string.length > cap - 3) {
    result = `${string.slice(0, cap - 3)}...`;
  }
  return result;
};

const removeApp = (setRemoveAppModal, id, setLoading, alert, setApps) => {
  setLoading(true);
  request.post('developer_remove_ar', {
    appId: id,
    developerEmail: globalStore.getState().user.email,
    developerAuth: globalStore.getState().user.auth,
  }).then((res) => {
    setLoading(false);
    setRemoveAppModal(false);
    switch (res?.data?.code) {
      case 0:
        alert.show('Aplicación eliminada correctamente', { type: 'success' });
        setApps(null);
        break;
      default:
        alert.show('Ha ocurrido un problema en el servidor', { type: 'error' });
    }
  });
};

function AppCard({
  name, version, imagePath, author, stats, appLink, id, setApps,
}) {
  const [removeAppModal, setRemoveAppModal] = useState();
  const [loading, setLoading] = useState(false);
  const alert = useAlert();

  return (
    <FlexContainer column href={appLink} className={styles.container}>
      <Modal title="¿Estas seguro de eliminar esta aplicación?" visible={removeAppModal} setVisible={setRemoveAppModal}>
        <FlexButton
          title="Si, eliminala"
          loading={loading}
          onClick={() => {
            removeApp(setRemoveAppModal, id, setLoading, alert, setApps);
          }}
        />
        <FlexButton title="Cancelar" onClick={() => setRemoveAppModal(false)} />
      </Modal>
      <Dropdown className={styles.dropdown} align="right" leftIcon={<FaEllipsisV />}>
        <DropdownItem title="Editar" linkTarget="foo" />
        <DropdownItem title="Eliminar" onClick={() => setRemoveAppModal(true)} />
      </Dropdown>
      <FlexContainer className={styles.imageContainer}>
        <img className={styles.image} src={imagePath} />
      </FlexContainer>
      <FlexContainer className={styles.contentContainer} column>
        <FlexContainer className={styles.contentHeader}>
          <CustomText text={name} bold />
          <CustomText text={version} />
        </FlexContainer>
        <FlexContainer className={styles.contentFooter}>
          <CustomText>
            Por
            {' '}
            <a href={author.link}>{capString(author.name, 20)}</a>
          </CustomText>
          <FlexContainer>
            <IconNumber icon={<FaHeart />} number={stats.favorites} />
            <IconNumber icon={<FaThumbsUp />} number={stats.popularity} />
            <IconNumber icon={<FaDownload />} number={stats.downloads} />
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>
  );
}

export default AppCard;
