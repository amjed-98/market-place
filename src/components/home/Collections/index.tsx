import { useTranslate } from '@/hooks';
import { Container } from '@/components/common';
import useCollections from '@/hooks/useCollections';
import CollectionsCard from './CollectionsCard';

import classes from './CollectionsCard.module.css';

function Collections() {
  const { t } = useTranslate('home');
  const { data: collections = [] } = useCollections();

  return (
    <section className='bg-off-white py-20' id='collections'>
      <Container className='flex flex-col flex-wrap items-center justify-center gap-4 py-10 text-center max-lg:px-0'>
        <header className='mb-3 w-full gap-4 text-left'>
          <h3 className='w-fit bg-gradient-to-r from-pink to-dark-orange bg-clip-text text-4xl font-bold text-[transparent]'>
            {t('collections.title')}
          </h3>
          <p className={`mt-4 text-lg font-semibold text-dark-gray`}>
            {t('collections.description')}
          </p>
        </header>

        <main className={`w-full justify-center gap-16 py-4 ${classes.grid}`}>
          {collections.map(({ id, image_url: image, description, name }) => (
            <CollectionsCard
              key={id}
              id={id}
              title={name}
              description={description || ''}
              image={image || ''}
            />
          ))}
        </main>
      </Container>
    </section>
  );
}

export default Collections;
