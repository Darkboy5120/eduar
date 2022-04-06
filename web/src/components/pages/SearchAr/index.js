import React from 'react';
import PageContainer from '../../../layouts/PageContainer';
import AppFilter from '../../molecules/AppFilter';

function SearchAr({ params }) {
  return (
    <PageContainer>
      <AppFilter category={params.category} page={params.page} orderBy={params.orderby} />
    </PageContainer>
  );
}

export default SearchAr;
