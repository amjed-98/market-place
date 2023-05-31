import { LoadingSpinner, Modal } from '@/components/common';
import { useAlert, useMetaMask, useMutate, useTranslate, useNftDetails } from '@/hooks';
import Works from '@/components/collection/Info/CollectionTabs/Works';
import { StripeApi } from '@/services/api/payment';
import { useRouter } from 'next/router';
import { CustomError, getNftsToShow, shuffleArray } from '@/utils';
import useCollectionNfts from '@/hooks/useCollectionNfts';
import Details from './Details';
import classes from './NFTDetails.module.css';

function NFTDetails() {
  const { t } = useTranslate(['nft', 'common']);
  const { query, push } = useRouter();
  const nftId = query.nftId as string;
  const { data: nft } = useNftDetails(nftId);
  const { walletAddress, sendCryptoPayment } = useMetaMask();
  const { showAlert } = useAlert();
  const { data: collectionNfts = [], isLoading: isCollectionNftsLoading } = useCollectionNfts(
    query.collectionId as string,
  );

  const { mutate: payWithStripe, isLoading: isStripeLoading } = useMutate(StripeApi.createPayment, {
    onError(err) {
      showAlert('error', {
        message: err instanceof CustomError ? err.message : t('common:errors.generic'),
      });
    },

    onMutate() {
      if (!walletAddress) throw new CustomError(t('common:errors.no_wallet'));
    },

    onSuccess(clientSecret) {
      showAlert('info', { message: t('common:redirect_checkout') });
      push(`/payment/stripe/${clientSecret}?nftId=${nftId}`);
    },
  });

  const { mutate: payWithCrypto, isLoading: isCryptoLoading } = useMutate(sendCryptoPayment, {
    onError(err) {
      showAlert('error', {
        message: err instanceof CustomError ? err.message : t('common:errors.generic'),
      });
    },

    onMutate() {
      if (!walletAddress) throw new CustomError(t('common:errors.no_wallet'));
      if (!nft?.cryptoPrice) throw new CustomError(t('common:errors.generic'));
    },

    onSuccess({ success, message }) {
      if (!success) {
        showAlert('error', { message });
        return;
      }
      push(`/checkout/success?nftId=${nftId}&paymentMethod=crypto`);
    },
  });

  const nftsToShow = getNftsToShow(collectionNfts);
  const otherNfts = shuffleArray(nftsToShow.filter((n) => n.title !== nft?.name)).slice(0, 4);
  const currentNft = nftsToShow.find((i) => i.title === nft?.name);
  const nftsLeft = `${currentNft?.availableNfts.length}/${currentNft?.nfts.length} ${t(
    'nft:nft_details.nfts_left',
  )}`;

  return (
    <section className='bg-off-white pb-8 text-dark-black'>
      <LoadingSpinner showIf={isStripeLoading || isCryptoLoading} />
      <Modal
        controlId='buy-nft-modal'
        title={t('buy_modal.title')}
        childrenContainerStyles='flex items-center flex-col mt-8'
      >
        <div className='flex w-full flex-col items-center justify-center gap-5 py-5'>
          <button
            onClick={() => payWithCrypto({ amount: `${nft?.cryptoPrice}`, nftId })}
            className={`btn mb-4 flex w-full max-w-[400px] items-center justify-center gap-2 rounded-3xl bg-pink px-7 py-3 text-xs font-semibold capitalize text-white hover:fill-pink ${classes.buy_button}`}
          >
            <span className='bg-gradient-to-r from-pink to-pink bg-clip-text'>
              {t('buy_modal.crypto')}
            </span>
          </button>
          <button
            onClick={() => payWithStripe({ nftId, walletAddress: walletAddress as string })}
            className={`btn flex w-full max-w-[400px] items-center justify-center gap-2 rounded-3xl bg-pink px-7 py-3 text-xs font-semibold capitalize text-white hover:fill-pink ${classes.buy_button}`}
          >
            <span className='bg-gradient-to-r from-pink to-pink bg-clip-text'>
              {t('buy_modal.fiat')}
            </span>
          </button>
        </div>
      </Modal>
      <Details nftsToShow={nftsToShow} nftsLeft={nftsLeft} />
      <hr className='mx-auto w-10/12 text-light-gray' />
      <div className='flex h-[50rem] flex-col gap-10 pt-20 max-lg:h-[70rem]'>
        <h2 className='bg-gradient-to-r from-pink to-dark-orange bg-clip-text text-center text-3xl font-extrabold text-[transparent] max-sm:text-2xl'>
          {t('other_nfts.title')}
        </h2>

        <Works nftsToShow={otherNfts} showIf={!isCollectionNftsLoading} />
      </div>
    </section>
  );
}

export default NFTDetails;
