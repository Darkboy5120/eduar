import React from 'react';
import { FaHeart, FaThumbsUp, FaDownload } from 'react-icons/fa';
import FlexContainer from '../../../layouts/FlexContainer';
import IconNumber from '../IconNumber';

function AppStats({ appDetails, allowButtons }) {
  let onClicks = {
    favorites: null,
    popularity: null,
    downloads: null,
  };
  if (allowButtons) {
    onClicks = {
      favorites: () => console.log(1),
      popularity: () => console.log(2),
      downloads: () => console.log(3),
    };
  }
  return (
    <FlexContainer>
      <IconNumber icon={<FaHeart />} number={appDetails.favorites} onClick={onClicks.favorites} />
      <IconNumber icon={<FaThumbsUp />} number={appDetails.popularity} onClick={onClicks.popularity} />
      <IconNumber icon={<FaDownload />} number={appDetails.downloads} onClick={onClicks.downloads} />
    </FlexContainer>
  );
}

export default AppStats;
