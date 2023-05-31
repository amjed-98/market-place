import { NftCard } from '@/components/common';
import { useRouter } from 'next/router';
import { Nft } from '../../../../../@types/api';

type Props = {
  nftsToShow: { title: string; availableNfts: Nft[]; nfts: Nft[] }[];
  showIf?: boolean;
};

function Works({ nftsToShow, showIf = true }: Props) {
  const router = useRouter();
  const { query } = router;

  if (!showIf) return <></>;

  if (nftsToShow.length < 1) {
    return (
      <div className='flex w-full flex-wrap items-start justify-center gap-16 pt-10'>
        <div className='text-center'>No other NFTs found</div>
      </div>
    );
  }

  return (
    <div className='flex w-full flex-wrap items-start justify-center gap-16 pt-10'>
      {nftsToShow.map(({ title, nfts }) => {
        if (nfts.length > 0) {
          const { id, currency, image_url: imageUrl, price, cryptoPrice, cryptoCurrency } = nfts[0];
          const allSold = nfts.every((n) => n.user_id && n.tx);

          return (
            <NftCard
              key={id}
              image={imageUrl || ''}
              currency={currency || ''}
              price={+(price || 0)}
              title={title}
              link={`/collection/${query.collectionId}/nft/${id}`}
              cryptoPrice={cryptoPrice}
              cryptoCurrency={cryptoCurrency}
              isSold={allSold}
            />
          );
        }

        return <></>;
      })}
    </div>
  );
}

export default Works;
