import { Elements } from '@stripe/react-stripe-js';
import { StripeCheckoutForm } from '@/components/payment';
import type { GetServerSideProps } from 'next';
import { StripeApi } from '@/services/api/payment';
import { type PaymentIntent } from '@stripe/stripe-js';
import { useAlert, useMetaMask, useMutate, useTranslate } from '@/hooks';
import { CustomError } from '@/utils';
import { LoadingSpinner } from '@/components/common';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

type Props = { clientSecret: string; nftId: string };

export default function StripeContainer({ clientSecret, nftId }: Props) {
  const { t } = useTranslate('common');
  const { walletAddress } = useMetaMask();
  const { showAlert } = useAlert();
  const router = useRouter();
  const successUrl =
    typeof window !== 'undefined'
      ? `${window.origin}/payment/success?nftId=${nftId}&paymentMethod=stripe`
      : '';

  const { mutate, isLoading } = useMutate(StripeApi.confirmPayment, {
    onMutate(payload) {
      if (!payload.walletAddress) throw new CustomError(t('errors.no_wallet'));
    },
    onError(err) {
      showAlert('error', {
        message: err instanceof CustomError ? err.message : t('errors.generic'),
      });
    },
    onSuccess() {
      router.push(successUrl);
    },
  });

  const handleOnSuccess = async (paymentIntent: PaymentIntent) => {
    if (!walletAddress) return;

    mutate({
      paymentIntentId: paymentIntent.id,
      nftId,
      walletAddress,
    });
  };

  return (
    <div>
      <LoadingSpinner showIf={isLoading} />
      <Elements stripe={StripeApi.instance} options={{ clientSecret }}>
        <StripeCheckoutForm onSuccess={handleOnSuccess} />
      </Elements>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ query, locale = 'es' }) => {
  if (typeof query.clientSecret !== 'string' || typeof query.nftId !== 'string')
    return { notFound: true };

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      clientSecret: query.clientSecret,
      nftId: query.nftId,
    },
  };
};
