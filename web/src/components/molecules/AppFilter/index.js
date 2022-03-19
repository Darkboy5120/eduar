import React from 'react';
import FlexContainer from '../../../layouts/FlexContainer';
import AppFilterContent from '../../atoms/AppFilterContent';
import AppFilterHeader from '../../atoms/AppFilterHeader';
import useAppFilter from '../../../assets/hooks/useAppFlter';

function AppFilter() {
  const form = useAppFilter();
  return (
    <FlexContainer column>
      <AppFilterHeader form={form} />
      <AppFilterContent form={form} />
    </FlexContainer>
  );
}

export default AppFilter;
