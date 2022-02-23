import React from 'react';
import LoadingSpinner from '../../atoms/LoadingSpinner';
import PageContainer from '../../../layouts/PageContainer';

function Loading() {
  return (
    <PageContainer>
      <LoadingSpinner size="big" centered />
    </PageContainer>
  );
}

export default Loading;
