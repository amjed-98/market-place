import { useEffect, useState } from 'react';
import { Image } from '@/components/common';
import image1 from '../../../../public/assets/image1.png';
import image2 from '../../../../public/assets/image2.png';
import image3 from '../../../../public/assets/image3.png';

const images = [image1, image2, image3];

function ImagesSlideshow() {
  const activeImageIndex = useAnimateImage();

  return (
    <article className='relative h-[33rem] w-[45%] max-lg:w-full'>
      {images.map((image, i) => (
        <Image
          key={i}
          src={image}
          width={500}
          height={500}
          alt='nft'
          unoptimized
          className={`absolute -top-28 left-0 h-full w-full object-contain transition-opacity duration-[1500ms] ease-out max-lg:top-5 ${
            activeImageIndex === i ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </article>
  );
}

export default ImagesSlideshow;

function useAnimateImage() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex((activeImageIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [activeImageIndex]);

  return activeImageIndex;
}
