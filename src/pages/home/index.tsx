import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Footer, Navbar } from '@/components/common';
import { HomeHero as Hero, Explain, Collections, Info, Subscribe } from '@/components/home';
import { prefetchQuery } from '@/utils';
import { getCollections } from '@/services/api/collections';
import { queryKeys } from '@/config';

export default function Home() {
  return (
    <>
      <Head>
        <title>Nft boutique home page</title>
        <meta name='description' content='nft boutique' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <Hero />
      <Explain />
      <Collections />
      <Info />
      <Subscribe />
      <Footer />
    </>
  );
}

export async function getStaticProps({ locale = 'es' }) {
  const dehydratedState = await prefetchQuery(
    getCollections.bind(null, undefined),
    queryKeys.collections,
  );

  return {
    props: {
      ...(await serverSideTranslations(locale, ['home', 'common'])),
      dehydratedState,
    },
  };
}
