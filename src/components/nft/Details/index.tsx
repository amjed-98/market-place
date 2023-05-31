import { useState } from 'react';
import { Container, LoadingSpinner, Image } from '@/components/common';
import { useTranslate, useNftDetails, useMetaMask, useAlert, useCollectionDetails } from '@/hooks';
import { RxCrossCircled, IoIosExpand } from '@/components/common/Icons';
import { useRouter } from 'next/router';
import format from 'date-fns/format';
import isAfter from 'date-fns/isAfter';
import { polygonscanAddressLink } from '@/config';
import { isChrome } from '@/utils';
import Person from '../Person';
import Category from '../Category';
import Detail from '../Detail';
import classes from '../NFTDetails.module.css';
import type { Nft } from '../../../../@types/api';

type Props = {
  nftsLeft: string;
  nftsToShow: { title: string; availableNfts: Nft[]; nfts: Nft[] }[];
};

function Details({ nftsToShow, nftsLeft }: Props) {
  const [expanded, setExpanded] = useState(false);
  const { query } = useRouter();
  const { data } = useNftDetails(query.nftId as string);
  const nftName = data?.name || '';
  const currentGroup = nftsToShow.find((n) => n.title === nftName);
  const availableNft = currentGroup?.availableNfts[0] || currentGroup?.nfts[0];
  const { data: nft, isError, isLoading } = useNftDetails(availableNft?.id as string);

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <div>NFT not found</div>;

  return (
    <>
      {expanded && (
        <div
          className={`fixed flex h-[100vh] w-[100vw] items-center justify-center overflow-auto bg-dark-black bg-opacity-25 ${
            expanded ? 'z-[99999] block' : 'z-[-1]'
          }`}
          onClick={() => setExpanded(false)}
        >
          <Image src={nft.image_url || ''} width={500} height={500} alt='NFT original size' />
        </div>
      )}

      <Container>
        <div className='grid grid-cols-2 gap-y-20 py-20 max-lg:grid-cols-1'>
          <NftImage imgUrl={nft.image_url || ''} setExpanded={setExpanded} />
          <NftInfo nft={nft} nftsLeft={nftsLeft} />
          <NftDescription {...nft} />
        </div>
      </Container>
    </>
  );
}

function NftDescription({ description, height, size, width, Collection }: Nft) {
  const { data: { contract_address: contractAddress } = {} } = useCollectionDetails(Collection.id);
  const { t } = useTranslate(['nft', 'common']);

  return (
    <div className='w-full max-w-[600px]'>
      <h1 className='mb-5 text-lg font-bold'>{t('nft:nft_details.description.title')}</h1>
      <p className='text-middle-gray'>{description}</p>

      <h1 className='mb-5 mt-16 text-lg font-light uppercase'>
        {t('nft:nft_details.details.title')}
      </h1>
      <div className={classes.grid}>
        <Detail name='Dimensions' value={`${width} x ${height}`} />
        <Detail name='Size' value={size} />
        <Detail name='Blockchain' value='Polygon' />
        <Detail name='Token' value='ERC-721' />
        <a
          href={`${polygonscanAddressLink}/${contractAddress}`}
          target='_blank'
          rel='noopener noreferrer'
          className='underline'
        >
          {t('nft:nft_details.details.view_link')}
        </a>
      </div>

      <h1 className='mb-5 mt-16 text-lg font-light uppercase'>
        {t('nft:nft_details.legal_info.title')}
      </h1>
      <p id='destination' className='flex items-center'>
        <RxCrossCircled className='mr-2 text-2xl' />
        <span className='text-sm text-middle-gray'>{t('nft:nft_details.legal_info.text')}</span>
      </p>
    </div>
  );
}

function NftImage({ imgUrl, setExpanded }: { imgUrl: string; setExpanded: any }) {
  return (
    <div className='w-full pt-[150px]'>
      <div className='group relative flex-1 cursor-pointer rounded-lg'>
        <span
          onClick={() => setExpanded(true)}
          className='absolute right-4 top-4 rounded-full bg-white p-2 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100'
        >
          <IoIosExpand className='text-2xl text-pink' />
        </span>
        <Image
          width={500}
          height={500}
          unoptimized
          src={imgUrl}
          className='aspect-square w-full rounded-lg object-cover'
          alt='NFT'
          onClick={() => setExpanded(true)}
        />
      </div>
    </div>
  );
}

function NftInfo({ nft, nftsLeft }: { nft: Nft; nftsLeft: string }) {
  const { data: { publish_date: publishDate, status } = {}, isLoading } = useCollectionDetails(
    nft.Collection.id,
  );

  const { walletAddress } = useMetaMask();
  const { showAlert } = useAlert();
  const { t } = useTranslate(['nft', 'common']);

  const isCollectionPublished = isAfter(new Date(), new Date(publishDate || ''));
  const isCollectionActive = status === 'active';
  const isNftSold = !!(nft.user_id && nft.tx);

  return (
    <div className='sticky top-60 ml-auto flex h-fit w-3/4 flex-col justify-center max-lg:static max-lg:w-full'>
      <div className='flex items-center'>
        <Image
          unoptimized
          src={nft.image_url || ''}
          width={40}
          height={40}
          className='aspect-square rounded-lg object-cover'
          alt='NFT'
        />
        <span className='ml-3'>{nft.Collection.name}</span>
      </div>
      <div className='my-12 flex'>
        <h1 className='text-2xl font-bold'>{nft.name}</h1>
        <span className='text-md ml-1 mt-3 inline-block text-dark-gray'>{nftsLeft}</span>
      </div>

      <div className='flex gap-10'>
        <Person
          title={t('common:artist')}
          name={nft.Collection.Artist.name}
          image={nft.Collection.Artist.image_url || ''}
        />
        <Person
          title={t('common:foundation')}
          name={nft.Collection.Ong.name}
          image={nft.Collection.Ong.image_url || ''}
        />
      </div>

      <div className='mr-auto mt-12 flex w-full items-center gap-6'>
        <Category title='Crypto price' name={nft.cryptoPrice} currency={nft.cryptoCurrency} />
        <Category title='Fiat price' name={nft.price || '0'} currency={nft.currency || ''} />
      </div>
      <hr className='my-4 w-full text-light-gray' />
      {!isLoading && isCollectionActive && isCollectionPublished && !isNftSold && (
        <label
          htmlFor={`${walletAddress ? 'buy-nft-modal' : ''}`}
          className={`btn flex w-full items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-pink to-dark-orange fill-white px-7 py-3 text-xs font-semibold capitalize  text-white hover:fill-pink ${
            classes.buy_button
          } ${walletAddress ? '' : 'cursor-not-allowed opacity-50'}`}
          onClick={() => {
            if (walletAddress) return;
            if (!isChrome()) {
              showAlert('error', {
                message: t('buy_modal.chrome_error'),
              });
              return;
            }
            showAlert('error', {
              message: t('buy_modal.metamask_error'),
            });
          }}
        >
          <span className='bg-gradient-to-r from-pink to-dark-orange bg-clip-text'>
            {t('nft:nft_details.buy_button')}
          </span>
        </label>
      )}

      {!isLoading && !isCollectionPublished && (
        <div className='text-center'>
          {t('nft_details.collection_available')}{' '}
          <span className='font-bold'>{format(new Date(publishDate || 0), 'PP')}</span>
        </div>
      )}

      {!isLoading && !isCollectionActive && (
        <div className='text-center font-bold text-pink'>{t('nft_details.collection_active')} </div>
      )}

      {!isLoading && isCollectionActive && isCollectionPublished && isNftSold && (
        <div className='text-center font-bold text-pink'>{t('nft_details.nft_sold')} </div>
      )}
    </div>
  );
}

export default Details;
