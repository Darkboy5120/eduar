import React, { useState } from 'react';
import FlexContainer from '../../../layouts/FlexContainer';
import AppFilterContent from '../../atoms/AppFilterContent';
import AppFilterHeader from '../../atoms/AppFilterHeader';
import useAppFilter from '../../../assets/hooks/useAppFlter';

function AppFilter({ category, page = 0 }) {
  const form = useAppFilter();
  const [apps, setApps] = useState();
  const [refresh, setRefresh] = useState(false);
  const mainProps = {
    apps, setApps, category, page, refresh, setRefresh,
  };
  return (
    <FlexContainer column>
      <AppFilterHeader
        {...mainProps}
        form={form}
      />
      <AppFilterContent
        {...mainProps}
        form={form}
      />
    </FlexContainer>
  );
}

export default AppFilter;
