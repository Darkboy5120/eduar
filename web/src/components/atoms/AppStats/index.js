import React, { useEffect } from 'react';
import { FaHeart, FaThumbsUp, FaDownload } from 'react-icons/fa';
import { useAlert } from 'react-alert';
import FlexContainer from '../../../layouts/FlexContainer';
import IconNumber from '../IconNumber';
import request from '../../../assets/controllers/request';
import styles from './styles.module.css';
import useStats from '../../../assets/hooks/useStats';
import globalStore from '../../../assets/store/reducers/globalStore';
import globals from '../../../assets/datasets/globals';

const revertAlready = (already) => (already === 0 ? 1 : 0);

const getSwitchAppParams = (type, stats) => {
  const result = {
    stat: null,
    value: null,
    finalStat: null,
  };
  switch (type) {
    case 'favorites':
      result.stat = '0';
      result.value = revertAlready(stats.alreadyFavorite.value);
      result.finalStat = stats.favorites.value + (result.value === 0 ? -1 : 1);
      break;
    default:
      result.stat = '1';
      result.value = revertAlready(stats.alreadyEndorsement.value);
      result.finalStat = stats.endorsements.value + (result.value === 0 ? -1 : 1);
  }
  return result;
};

const switchAppStat = (type, appDetails, appStats, alert, setStat, setAlreadyStat) => {
  const { stat, value, finalStat } = getSwitchAppParams(type, appStats);
  const user = globalStore.getState()?.user;
  request.post('consumer_switch_ar_stat', {
    appId: appDetails.pk_id,
    userEmail: user.email,
    userAuth: user.auth,
    stat,
    value,
  }).then((res) => {
    switch (res?.data?.code) {
      case 0:
        setStat(finalStat);
        setAlreadyStat(value);
        break;
      default:
        alert.show('Ha ocurrido un problema en el servidor', { type: 'error' });
    }
  });
};

const downloadAr = (appDetails, alert) => {
  const user = globalStore.getState()?.user;
  request.post('consumer_download_ar', {
    appId: appDetails.pk_id,
    userEmail: user.email,
    userAuth: user.auth,
  }).then((res) => {
    switch (res?.data?.code) {
      case 0:
        window.location = `${globals.server.path}${res.data.data.filepath}`;
        alert.show('Se esta comenzando a descargar la ar', { type: 'success' });
        break;
      default:
        alert.show('Ha ocurrido un problema en el servidor', { type: 'error' });
    }
  });
};

function AppStats({ appDetails, allowButtons }) {
  const alert = useAlert();
  const stats = useStats(appDetails);
  useEffect(() => {
    request.setAlert(alert);
  }, []);
  let onClicks = {
    favorites: null,
    popularity: null,
    downloads: null,
  };
  if (allowButtons && globalStore.getState()?.signed) {
    onClicks = {
      favorites: () => switchAppStat('favorites', appDetails, stats, alert, stats.favorites.setValue, stats.alreadyFavorite.setValue),
      popularity: () => switchAppStat('endorsement', appDetails, stats, alert, stats.endorsements.setValue, stats.alreadyEndorsement.setValue),
      downloads: () => downloadAr(appDetails, alert),
    };
  }
  const alreadyFavoriteStyle = stats.alreadyFavorite.value ? styles.alreadyFavorite : null;
  const alreadyEndorsement = stats.alreadyEndorsement.value ? styles.alreadyEndorsement : null;
  return (
    <FlexContainer>
      <IconNumber
        className={alreadyFavoriteStyle}
        icon={<FaHeart />}
        number={stats.favorites.value}
        onClick={onClicks.favorites}
        popup="Favoritos"
      />
      <IconNumber
        className={alreadyEndorsement}
        icon={<FaThumbsUp />}
        number={stats.endorsements.value}
        onClick={onClicks.popularity}
        popup="Popularidad"
      />
      <IconNumber
        icon={<FaDownload />}
        number={appDetails.downloads}
        onClick={onClicks.downloads}
        popup="Descargas"
      />
    </FlexContainer>
  );
}

export default AppStats;
