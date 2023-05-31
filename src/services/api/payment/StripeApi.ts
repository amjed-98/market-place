import http from '@/services/http';
import { CustomError } from '@/utils';
import { loadStripe } from '@stripe/stripe-js';

const publishKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY;
if (!publishKey) throw new CustomError('No stripe publish key found, check you .env.local file');

type Action = 'create' | 'confirm';

type Payload<T extends Action> = T extends 'create'
  ? { walletAddress: string; nftId: string }
  : { walletAddress: string; nftId: string; paymentIntentId: string };

type Res<T extends Action> = T extends 'create'
  ? { clientSecret: string }
  : { received: true; mintTx: string; stripeTx: string };

const StripeApi = {
  get instance() {
    return loadStripe(publishKey);
  },

  async createPayment(payload: Payload<'create'>) {
    const {
      data: { clientSecret },
    } = await http.post<Res<'create'>>('/payment/stripe/create', payload);
    return clientSecret;
  },

  async confirmPayment(payload: Payload<'confirm'>) {
    const { data } = await http.post<Res<'confirm'>>('/payment/stripe/confirm', payload);
    return data;
  },
};

export default StripeApi;
