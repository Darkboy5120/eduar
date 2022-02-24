import React, { useEffect, useState } from 'react';
import PageContainer from '../../../layouts/PageContainer';
import CustomText from '../../atoms/CustomText';
import CustomButton from '../../atoms/CustomButton';
import Modal from '../../atoms/Modal';
import FlexButton from '../../molecules/FlexButton';
import request from '../../../assets/controllers/request';
import globalStore from '../../../assets/store/reducers/globalStore';
import LoadingSpinner from '../../atoms/LoadingSpinner';
import BecomeDeveloper from '../../organisms/BecomeDeveloper';
import ShowMyAr from '../../organisms/ShowMyAr';

const getData = (setData) => {
  request.post('global_isDev', {
    id: globalStore.getState().user.email,
  }).then((res) => {
    setData(res?.data?.code);
  });
};

const getContent = (code, setData) => {
  if (code === 0) {
    return <BecomeDeveloper setData={setData} />;
  }
  return <ShowMyAr type={code} />;
};

function MyAr() {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!data) {
      getData(setData);
    }
  }, [data]);

  return (
    <PageContainer>
      {data !== null ? getContent(data, setData) : <LoadingSpinner size="big" centered />}
    </PageContainer>
  );
}

export default MyAr;
