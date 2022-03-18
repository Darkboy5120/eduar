import React from 'react';
import FlexContainer from '../../../layouts/FlexContainer';
import AppFilterContent from '../../atoms/AppFilterContent';
import AppFilterHeader from '../../atoms/AppFilterHeader';

function AppFilter() {
  return (
    <FlexContainer column>
      <AppFilterHeader />
      <AppFilterContent />
    </FlexContainer>
  );
}

export default AppFilter;
