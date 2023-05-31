import { getCollectionDetails } from '@/services/api/collections';
import { queryKeys } from '@/config';
import useFetch from '../useFetch';

export default function useCollectionDetails(collectionId: string) {
  return useFetch({
    queryFn: getCollectionDetails.bind(null, collectionId),
    queryKey: [...queryKeys.collection_details, collectionId],
    depend: !!collectionId,
  });
}
