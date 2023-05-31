import { Container, Footer, Image, LoadingSpinner, Navbar } from '@/components/common';
import { useNftDetails, useTranslate } from '@/hooks';
import { FaCheckCircle } from '@/components/common/Icons';
import { type GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { polygonscanTransactionsLink } from '@/config';
import { formatHash } from '@/utils';

export default function SuccessfulPayment() {
  const { t } = useTranslate('common');
  const {
    query: { nftId },
  } = useRouter();

  const { data: nft, isLoading, isError } = useNftDetails(nftId as string);

  if (isError) return <div>error</div>;

  const isMinting = !nft?.user_id && !nft?.tx;

  if (isLoading || isMinting)
    return (
      <LoadingSpinner text={t('minting_nft')}>
        <SuccessMessage />
      </LoadingSpinner>
    );

  return (
    <>
      <Navbar />
      <Container className='pb-10 pt-32'>
        <div className='bg-gray-100 my-auto flex flex-col gap-10 bg-white p-6 text-center md:mx-auto'>
          <SuccessMessage />

          <div className='relative mx-auto w-64 rounded-3xl border-[8px] border-solid border-pink'>
            <Image
              src={nft.image_url || ''}
              alt={nft.name}
              width={500}
              height={500}
              className='mx-auto my-6 aspect-square w-full object-cover'
            />
            <FaCheckCircle className='z-1 absolute -bottom-2 left-1/2 mx-auto my-6 -translate-x-1/2 translate-y-3/4 overflow-hidden rounded-full bg-white text-7xl text-pink' />
          </div>

          <div className='flex flex-col gap-6 py-10 text-center'>
            <p className='text-gray-600 my-2 text-2xl font-bold'>{t('success.congratulations')}</p>
            <p className='text-gray-600 my-2 text-2xl font-bold'>{t('success.nft_minted')}</p>

            <a
              href={`${polygonscanTransactionsLink}/${nft.tx}`}
              target='_blank'
              rel='noopener noreferrer'
              className='text-lg font-bold text-middle-gray underline'
            >
              {t('success.transaction_code').replace('{txHash}', formatHash(nft.tx || ''))}
            </a>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'es' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

function SuccessMessage() {
  const { t } = useTranslate('common');
  const {
    query: { paymentMethod },
  } = useRouter();

  return (
    <h3 className='text-gray-900 text-center text-base font-semibold md:text-2xl'>
      {paymentMethod === 'crypto' ? t('success.crypto_payment') : t('success.stripe_payment')}
    </h3>
  );
}
