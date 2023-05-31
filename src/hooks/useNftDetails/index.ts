import { getNftDetails } from '@/services/api/nfts';
import { queryKeys } from '@/config';
import useFetch from '../useFetch';

export default function useNftDetails(nftId: string) {
  return useFetch({
    queryFn: getNftDetails.bind(null, nftId),
    queryKey: [...queryKeys.collection_nft_details, nftId],
    depend: !!nftId,
  });
}
