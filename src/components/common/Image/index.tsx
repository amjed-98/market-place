import React from 'react';
import NextImage, { ImageProps } from 'next/image';
import { handleBrokenImage } from '@/utils';

export default function Image(props: ImageProps) {
  return (
    <NextImage
      {...props}
      onError={handleBrokenImage}
      src={props.src || '/assets/fallback-img.png'}
    />
  );
}
