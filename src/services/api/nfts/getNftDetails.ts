import http from '@/services/http';
import type { Nft } from '../../../../@types/api';

export default async function getNftDetails(nftId: string) {
  const url = `/nfts/${nftId}`;

  const {
    data: { nft },
  } = await http.get<{ nft: Nft }>(url);
  return nft;
}
