import React, { useEffect, useState } from 'react';
import PageContainer from '../../../layouts/PageContainer';
import LoadingSpinner from '../../atoms/LoadingSpinner';
import CustomText from '../../atoms/CustomText';
import getIsDev from '../../../assets/requests/getIsDev';
import AppFilter from '../../molecules/AppFilter';

function MyFavorite() {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!data) {
      getIsDev(setData);
    }
  }, [data]);

  return (
    <PageContainer>
      {data === undefined ? (
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
