import { useCollectionDetails } from '@/hooks';
import { Container } from '@/components/common';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import useCollectionNfts from '@/hooks/useCollectionNfts';
import { parseHtml } from '@/utils';
import classes from './Hero.module.css';
import Stats from '../Info/Stats';

function CollectionHero() {
  const scroll = useScrollY();
  const { query, push } = useRouter();

  const { data: collection, isError } = useCollectionDetails(query.collectionId as string);
  const { data: collectionNfts = [] } = useCollectionNfts(query.collectionId as string);

  const duration = 0.7;

  const initialTitle = { fontSize: '4.5rem' };
  const initialHeroHeight = { height: '100vh' };

  if (isError) push('/400');
  if (!collection) return <></>;

  return (
    <section className='relative'>
      <motion.div
        animate={scroll > 0 ? { height: '50vh' } : initialHeroHeight}
        initial={initialHeroHeight}
        transition={{ duration }}
        className={`bg-cover ${classes.bgImage}`}
        style={{ backgroundImage: `url(${collection.image_url})` }}
      >
        <Container className='flex h-full flex-col max-xl:gap-10'>
          <div className={`pt-[200px] ${classes.title}`}>
            <motion.h1
              animate={
                scroll > 0 ? { fontSize: '2.5rem', transformOrigin: [0], y: 130 } : initialTitle
              }
              transition={{ duration }}
              className='mb-8 w-fit text-7xl font-extrabold text-dark-gray max-lg:!text-5xl'
              initial={initialTitle}
            >
              {collection?.name}
            </motion.h1>

            <div
              data-isscrolly={scroll > 0}
              className='max-w-3xl text-3xl text-dark-gray data-[isscrolly=true]:hidden max-lg:!text-2xl'
            >
              {parseHtml(collection?.description || '')}
            </div>
          </div>

          <div
            className={`mt-10 flex data-[isscrolly=false]:mt-36 data-[isscrolly=true]:justify-end max-lg:mx-auto max-lg:mt-10 data-[isscrolly=true]:max-lg:mt-24`}
            data-isscrolly={scroll > 0}
          >
            <motion.div layout className='w-fit' transition={{ duration }}>
              <Stats
                nftsCount={collectionNfts.length}
                publishDate={format(new Date(collection.publish_date || ''), 'PP h:mm')}
                status={collection.status}
                className='max-lg:block'
              />
            </motion.div>
          </div>
        </Container>
      </motion.div>
    </section>
  );
}

export default CollectionHero;

function useScrollY() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scroll;
}
