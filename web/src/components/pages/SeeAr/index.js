import React, { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useSelector } from 'react-redux';
import PageContainer from '../../../layouts/PageContainer';
import ArDetailsHeader from '../../molecules/ArDetailsHeader';
import ArDetailsContent from '../../molecules/ArDetailsContent';
import Loading from '../Loading';
import request from '../../../assets/controllers/request';
import globalStore, { setAppDetails, clearAppDetails } from '../../../assets/store/reducers/globalStore';

const getAppDetails = (appId, alert) => {
  globalStore.dispatch(clearAppDetails());
  request.post('global_get_ar_details', {
    appId,
    email: globalStore.getState()?.user?.email,
  }).then((res) => {
    switch (res?.data?.code) {
      case 0:
        globalStore.dispatch(setAppDetails(res.data.data));
        break;
      default:
        alert.show('Ha ocurrido un problema en el servidor', { type: 'error' });
    }
  });
};

function SeeAr({ params }) {
  const appDetails = useSelector((state) => state.appDetails);
  const alert = useAlert();
  useEffect(() => {
    getAppDetails(params.appId, alert);
  }, []);
  return (
    <PageContainer>
      {appDetails ? (
        <>
          <ArDetailsHeader />
          <ArDetailsContent />
        </>
      ) : <Loading />}
    </PageContainer>
  );
}

export default SeeAr;
