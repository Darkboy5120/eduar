import React, { useEffect } from 'react';
import { useAlert } from 'react-alert';
import request from '../../../assets/controllers/request';
import AppCard from '../AppCard';
import globalStore from '../../../assets/store/reducers/globalStore';
import LoadingSpinner from '../LoadingSpinner';
import CustomText from '../CustomText';
import globals from '../../../assets/datasets/globals';
import styles from './styles.module.css';

const getApps = (setApps, alert, form, devMode, page) => {
  setApps(null);
  request.post('global_get_ar_all', {
    devMode: devMode ? '1' : '0',
    email: globalStore.getState()?.user?.email,
    category: form.category.value,
    orderBy: form.orderBy.value,
    orderType: form.orderType.value,
    page: page ?? '0',
  }).then((res) => {
    switch (res?.data?.code) {
      case 0:
        setApps(res.data.data);
        break;
      default:
        alert.show('Ha ocurrido un problema en el servidor', { type: 'error' });
    }
  });
};

function DrawApps({ data, setApps }) {
  return data.aplications.length > 0 ? (
    data?.aplications?.map((app) => (
      <AppCard
        setApps={setApps}
        key={app.pk_id}
        id={app.pk_id}
        name={app.name}
        version="V2.3"
        author={{ name: `${app.firstname} ${app.lastname}`, link: 'asdasdasd' }}
        appLink="asdasdasd"
        stats={{ favorites: app.favorites, popularity: app.endorsements, downloads: app.downloads }}
        imagePath={`${globals.server.path}${app.thumbnail}`}
      />
    ))
  ) : <CustomText text="No se encontraron aplicaciones" />;
}

function AppFilterContent({
  devMode, form, apps, setApps, page,
}) {
  const alert = useAlert();
  useEffect(() => {
    if (form.submit.ok && !apps) {
      getApps(setApps, alert, form, devMode, page);
    }
  }, [form.submit.ok, form.category.value, form.orderBy.value, form.orderType.value, apps]);
  return (
    <div className={styles.container}>
      {apps ? <DrawApps data={apps} setApps={setApps} /> : <LoadingSpinner size="big" />}
    </div>
  );
}

export default AppFilterContent;
