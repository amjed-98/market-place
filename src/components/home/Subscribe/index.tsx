import { Container, Image } from '@/components/common';
import { useTranslate } from '@/hooks';
import { useState } from 'react';
import image1 from '../../../../public/assets/Collections/one.jpg';
import image2 from '../../../../public/assets/Collections/two.jpg';
import image3 from '../../../../public/assets/Collections/three.jpg';

const images = [
  { key: 1, src: image3, className: 'rotate-[20deg] -top-16' },
  { key: 2, src: image1, className: 'rotate-[10deg] -top-7 -right-2' },
  { key: 3, src: image2 },
];

function Subscribe() {
  const { t } = useTranslate('home');
  const [isSubscribed, setIsSubscribed] = useState(false);

  return (
    <section className='mx-[6rem] bg-off-white bg-[url("https://i.imgur.com/QYww8Hp.png")] bg-contain bg-center bg-no-repeat py-20 max-lg:mx-0 max-lg:w-full max-lg:px-0'>
      <Container className='flex h-full w-full flex-row-reverse flex-wrap items-baseline px-[6rem] py-10 text-center'>
        <div className='relative -top-40 right-24 ml-auto flex w-1/2 justify-end max-lg:hidden'>
          {images.map((img) => (
            <Image
              key={img.key}
              src={img.src}
              width={300}
              alt='nft-image'
              className={`absolute h-[300px] origin-bottom-left rounded-md border-4 border-solid border-white object-cover ${img.className}`}
            />
          ))}
        </div>

        <div className='flex flex-1 flex-col items-start justify-center gap-12 text-white'>
          <h3 className='text-4xl font-bold'>{t('subscribe.title')}</h3>

          <p className='text-xl font-bold'>{t('subscribe.description')}</p>

          <div className='form-control w-full'>
            <label className='input-group relative'>
              <input
                type='text'
                placeholder='info@site.com'
                className='input-bordered input w-full bg-off-white text-dark-black'
                style={{ borderRadius: '30px' }}
              />
              <button
                disabled={isSubscribed}
                onClick={() => setIsSubscribed(true)}
                className='absolute right-2 top-1/2 h-3/4 -translate-y-1/2 bg-pink px-5 text-white disabled:cursor-not-allowed disabled:bg-dark-gray disabled:opacity-50'
                style={{ borderRadius: '30px' }}
              >
                {isSubscribed
                  ? t('subscribe.input.button.subscribed')
                  : t('subscribe.input.button.subscribe')}
              </button>
            </label>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Subscribe;
