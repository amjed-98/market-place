import { useTranslate } from '@/hooks';
import { Container } from '@/components/common';
import ImagesSlideshow from './ImagesSlideshow';

import classes from './hero.module.css';

function HomeHero() {
  const { t } = useTranslate('home');

  return (
    <section id='hero' className='relative overflow-y-hidden'>
      <video className='absolute left-0 right-0 top-[-100px] z-0 w-full' autoPlay muted loop>
        <source src='/bg-animation.webm' type='video/webm' />
        <source src='/bg-animation.mp4' type='video/mp4' />
        <source src='/bg-animation.ogg' type='video/ogg' />
      </video>

      <Container className='relative z-0 flex w-full flex-1 items-start justify-between px-[4rem] pt-48 max-lg:flex-col'>
        <article className='flex flex-1 flex-col items-start gap-6'>
          <h1 className='bg-gradient-to-r from-pink to-dark-orange bg-clip-text text-8xl font-extrabold text-[transparent] max-sm:text-4xl'>
            {t('hero.body.title')}
          </h1>

          <p className='text-5xl font-medium text-dark-gray max-sm:text-3xl'>
            {t('hero.body.subtext.first')}
          </p>

          <p className='text-xl font-medium max-sm:text-base'>{t('hero.body.subtext.second')}</p>

          <div>
            <button
              className={`rounded-3xl bg-gradient-to-r from-pink to-purple  py-4 text-xs font-semibold text-white ${classes.hero_btn}`}
            >
              <a
                href='#collections'
                className='bg-gradient-to-r from-pink to-purple bg-clip-text px-10 py-4'
              >
                {t('hero.body.discover_button')}
              </a>
            </button>
          </div>
        </article>

        <ImagesSlideshow />
      </Container>
    </section>
  );
}

export default HomeHero;
