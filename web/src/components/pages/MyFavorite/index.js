import React, { useEffect, useState } from 'react';
import PageContainer from '../../../layouts/PageContainer';
import request from '../../../assets/controllers/request';
import globalStore from '../../../assets/store/reducers/globalStore';
import LoadingSpinner from '../../atoms/LoadingSpinner';
import CustomText from '../../atoms/CustomText';
import CustomButton from '../../atoms/CustomButton';
import AppFilter from '../../molecules/AppFilter';

const getData = (setData) => {
  request.post('global_isDev', {
    id: globalStore.getState().user.email,
  }).then((res) => {
    setData(res?.data?.code);
  });
};

function MyFavorite() {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!data) {
      getData(setData);
    }
  }, [data]);

  return (
    <PageContainer>
      {!data ? (
        <LoadingSpinner size="big" centered />
      ) : (
        <>
          <CustomText h1 text="Estas son tus Ar favoritas" />
          <br />
          <AppFilter onlyFavorites />
        </>
      )}
    </PageContainer>
  );
}

export default MyFavorite;
