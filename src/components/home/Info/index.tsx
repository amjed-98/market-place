import { useTranslate } from '@/hooks';
import { Container } from '@/components/common';
import InfoCard from './InfoCard';
import imageOne from '../../../../public/assets/info/one.png';
import imageTwo from '../../../../public/assets/info/two.png';
import imageThree from '../../../../public/assets/info/three.png';
import imageFour from '../../../../public/assets/info/four.png';
import imageFive from '../../../../public/assets/info/five.png';

function Info() {
  const { t } = useTranslate('home');

  const infoList = [
    {
      image: imageOne,
      caption: t('info.cards.one.caption'),
      text: t('info.cards.one.text'),
    },
    {
      image: imageTwo,
      caption: t('info.cards.two.caption'),
      text: t('info.cards.two.text'),
    },
    {
      image: imageThree,
      caption: t('info.cards.three.caption'),
      text: t('info.cards.three.text'),
    },
    {
      image: imageFour,
      caption: t('info.cards.four.caption'),
      text: t('info.cards.four.text'),
    },
    {
      image: imageFive,
      caption: t('info.cards.five.caption'),
      text: t('info.cards.five.text'),
    },
    {
      image: imageOne,
      caption: t('info.cards.six.caption'),
      text: t('info.cards.six.text'),
    },
  ];

  return (
    <section className='bg-off-white'>
      <Container className='flex flex-col flex-wrap items-center justify-center gap-4 px-20 py-10 text-center max-lg:px-0'>
        <header className='mb-32 flex w-full flex-col items-center justify-center gap-4'>
          <h3 className='bg-gradient-to-r from-pink to-dark-orange bg-clip-text text-4xl font-bold text-[transparent]'>
            {t('info.title')}
          </h3>
          <p className='text-lg font-semibold text-dark-gray'>{t('info.description')}</p>
        </header>

        <main className='flex w-full flex-wrap justify-center gap-8'>
          {infoList.map(({ image, caption, text }) => (
            <InfoCard key={caption} image={image} caption={caption} text={text} />
          ))}
        </main>
      </Container>
    </section>
  );
}

export default Info;
