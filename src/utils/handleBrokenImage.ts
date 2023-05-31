import { type SyntheticEvent } from 'react';

const handleBrokenImage = (e: SyntheticEvent<HTMLImageElement>) => {
  const fallBackImage = './assets/img/fallback-img.png';
  const imageElement = e.target as HTMLImageElement;

  imageElement.src = fallBackImage;
};

export default handleBrokenImage;
