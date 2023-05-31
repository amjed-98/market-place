import http from '@/services/http';
import type { Nft } from '../../../../@types/api';

export default async function getCollectionNfts(collectionId: string) {
  const {
    data: { nfts },
  } = await http.get<{ nfts: Nft[] }>(`/collections/${collectionId}/nfts`);
  return nfts;
}
