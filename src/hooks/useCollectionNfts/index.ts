import { getCollectionNfts } from '@/services/api/collections';
import { queryKeys } from '@/config';
import useFetch from '../useFetch';

export default function useCollectionNfts(collectionId: string) {
  return useFetch({
    queryFn: getCollectionNfts.bind(null, collectionId),
    queryKey: [...queryKeys.collection_nfts, collectionId],
    depend: !!collectionId,
  });
}
