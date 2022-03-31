import React from 'react';
import { FaHeart, FaThumbsUp, FaDownload } from 'react-icons/fa';
import FlexContainer from '../../../layouts/FlexContainer';
import IconNumber from '../IconNumber';

function AppStats({ appDetails }) {
  return (
    <FlexContainer>
      <IconNumber icon={<FaHeart />} number={appDetails.favorites} />
      <IconNumber icon={<FaThumbsUp />} number={appDetails.endorsements} />
      <IconNumber icon={<FaDownload />} number={appDetails.downloads} />
    </FlexContainer>
  );
}

export default AppStats;
