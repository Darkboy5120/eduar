import React, { useState } from 'react';
import FlexContainer from '../../../layouts/FlexContainer';
import AppFilterContent from '../../atoms/AppFilterContent';
import AppFilterHeader from '../../atoms/AppFilterHeader';
import useAppFilter from '../../../assets/hooks/useAppFlter';

function AppFilter({ devMode, category, page = 0 }) {
  const form = useAppFilter();
  const [apps, setApps] = useState();
  return (
    <FlexContainer column>
      <AppFilterHeader
        {...{
          apps, setApps, category, page,
        }}
        form={form}
      />
      <AppFilterContent
        {...{
          apps, setApps, devMode, page,
        }}
        form={form}
      />
    </FlexContainer>
  );
}

export default AppFilter;
