import { useState } from 'react';
import { type StaticImageData } from 'next/image';
import { BsChevronDown, BsChevronUp } from '@/components/common/Icons';
import { Image } from '@/components/common';

type Props = {
  image: StaticImageData;
  caption: string;
  text: string;
};

function InfoCard({ image, caption, text }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article className='mb-28 w-1/4 min-w-[300px]'>
      <div
        className={`relative mx-auto h-[130px] w-[280px] rounded-xl px-10 ${
          isExpanded ? 'bg-dark-orange' : 'bg-light-gray'
        }`}
      >
        <Image
          src={image}
          unoptimized
          alt='image'
          className={`absolute bottom-0 ${
            isExpanded ? 'left-[5px] w-[270px]' : 'left-[40px] w-[200px]'
          }`}
        />
      </div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className='mx-auto mt-3 flex w-[280px] items-center justify-between rounded-[10px] border-[0.5px] border-solid border-dark-gray p-1 px-4'
      >
        <p className='text-dark-gray'>{caption}</p>
        {isExpanded ? (
          <BsChevronUp className='text-dark-gray' />
        ) : (
          <BsChevronDown className='text-dark-gray' />
        )}
      </button>
      {isExpanded && (
        <p className='text-md mx-auto mt-3 w-[280px] rounded-[10px] border-[0.5px] border-solid border-dark-gray p-3 text-justify text-dark-gray'>
          {text}
        </p>
      )}
    </article>
  );
}

export default InfoCard;
