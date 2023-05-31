import http from '@/services/http';

type Payload = {
  walletAddress: string;
  nftId: string;
  transactionHash: string;
};
type Res = {
  success: boolean;
  message: string;
};

const CryptoApi = {
  async createPayment(payload: Payload) {
    const { data } = await http.post<Res>('/payment/crypto', payload);

    return data;
  },
};

export default CryptoApi;
