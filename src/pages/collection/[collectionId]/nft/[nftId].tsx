import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Footer, Navbar } from '@/components/common';
import { NFTDetails } from '@/components';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { getCollectionNfts, getCollections } from '@/services/api/collections';
import type { Locale } from '../../../../../@types/i18next';

export default function NftDetails() {
  return (
    <>
      <Head>
        <title>Nft boutique home page</title>
        <meta name='description' content='nft boutique' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <NFTDetails />
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'es' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['nft', 'common'])),
  },
});

type Params = { nftId: string };
type Path = { params: Params; locale: Locale };

export const getStaticPaths: GetStaticPaths<Params> = async ({ locales = [] }) => {
  const collections = await getCollections();
  const paths: Path[] = [];

  await Promise.all(
    locales.map((locale) =>
      collections.forEach(async ({ id: collectionId }) => {
        const nfts = await getCollectionNfts(collectionId);
        nfts.forEach(({ id: nftId }) =>
          paths.push({ params: { nftId, collectionId }, locale } as Path),
        );
      }),
    ),
  );

  return { paths, fallback: true };
};
