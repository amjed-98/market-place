import { useCallback, useEffect, useState } from 'react';
import { checkMetaMaskExtension, formatHash } from '@/utils';
import { CryptoApi } from '@/services/api/payment';
import Web3 from 'web3';
import useAlert from '../useAlert';
import useTranslate from '../useTranslate';
import { EthereumMethod } from '../../../@types/api';

type CryptoPaymentRes = {
  success: boolean;
  tx: string;
  message: string;
};

function useMetaMask() {
  const [walletAddress, setWalletAddress] = useState<string>();
  const { showAlert } = useAlert();
  const { t } = useTranslate('common');

  const connectWallet = async (method: EthereumMethod) => {
    if (!checkMetaMaskExtension(window)) return;

    const [address] = await window.ethereum.request({ method, params: [] });
    setWalletAddress(address);
  };

  useEffect(() => {
    if (!checkMetaMaskExtension(window)) return;

    connectWallet('eth_requestAccounts');
    window.ethereum.on('accountsChanged', connectWallet.bind(null, 'eth_accounts'));

    // eslint-disable-next-line consistent-return
    return () => {
      if (!checkMetaMaskExtension(window)) return;
      window.ethereum.removeListener('accountsChanged', connectWallet.bind(null, 'eth_accounts'));
    };
  }, []);

  const sendCryptoPayment = async ({
    amount,
    nftId,
  }: {
    amount: string;
    nftId: string;
  }): Promise<CryptoPaymentRes> => {
    if (!checkMetaMaskExtension(window))
      return {
        success: false,
        tx: '',
        message: 'MetaMask not found',
      };
    const recipientAddress = process.env.NEXT_PUBLIC_LAZZARO_ADDRESS;
    if (!recipientAddress) {
      throw new Error('Lazzaro address not found in environment variables');
    }
    const web3 = new Web3(window.ethereum as any);
    const userAddress = walletAddress as string;
    const transaction = {
      from: userAddress,
      to: recipientAddress,
      value: web3.utils.toWei(amount.toString(), 'ether'),
    };
    const tx = await web3.eth.sendTransaction(transaction);

    const transactionLink = `<a title=${
      tx.transactionHash
    } className='text-dark-black font-bold' href=${
      tx.transactionHash
    } target=_blank rel=noopener noreferrer>
                ${formatHash(tx.transactionHash)}</b>
          </a>`;

    showAlert('info', {
      message: t('success.nft_payment'),
      body: `${t('success.transaction_code').replace('{txHash}', transactionLink)}`,
      duration: 10000,
    });

    const { success, message } = await CryptoApi.createPayment({
      walletAddress: userAddress,
      nftId,
      transactionHash: tx.transactionHash,
    });

    return {
      success,
      tx: tx.transactionHash,
      message,
    };
  };

  return { connectWallet: useCallback(connectWallet, []), walletAddress, sendCryptoPayment };
}

export default useMetaMask;
