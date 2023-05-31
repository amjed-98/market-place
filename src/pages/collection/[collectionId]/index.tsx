import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Footer, Navbar } from '@/components/common';
import { CollectionHero, CollectionInfo } from '@/components/collection';
import { getCollections } from '@/services/api/collections';
import { useRouter } from 'next/router';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { Locale } from '../../../../@types/i18next';

export default function CollectionPage() {
  const router = useRouter();
  if (router.isFallback) return '...loading';

  return (
    <>
      <Head>
        <title>Nft boutique home page</title>
        <meta name='description' content='nft boutique' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='relative h-[100vh] bg-cover bg-top'>
        <Navbar />
        <CollectionHero />
        <CollectionInfo />
        <Footer />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'es' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['collection', 'common'])),
  },
});

type Params = { collectionId: string };
type Path = { params: Params; locale: Locale };

export const getStaticPaths: GetStaticPaths<Params> = async ({ locales = [] }) => {
  const collections = await getCollections();

  const paths = locales.reduce<Path[]>((acc, locale) => {
    collections.map(({ id: collectionId }) => {
      acc.push({ params: { collectionId }, locale } as Path);
      return acc;
    });

    return acc;
  }, []);

  return { paths, fallback: true };
};
