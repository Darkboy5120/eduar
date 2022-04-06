import React, { useEffect, useState } from 'react';
import PageContainer from '../../../layouts/PageContainer';
import LoadingSpinner from '../../atoms/LoadingSpinner';
import BecomeDeveloper from '../../organisms/BecomeDeveloper';
import ShowMyAr from '../../organisms/ShowMyAr';
import getIsDev from '../../../assets/requests/getIsDev';

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
      getIsDev(setData);
    }
  }, [data]);

  return (
    <PageContainer>
      {data !== null ? getContent(data, setData) : <LoadingSpinner size="big" centered />}
    </PageContainer>
  );
}

export default MyAr;
