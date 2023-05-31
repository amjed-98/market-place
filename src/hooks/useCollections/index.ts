import { getCollections } from '@/services/api/collections';
import { queryKeys } from '@/config';
import useFetch from '../useFetch';
import type { CollectionStatus } from '../../../@types/api';

export default function useCollections(status?: CollectionStatus) {
  return useFetch({ queryFn: getCollections.bind(null, status), queryKey: queryKeys.collections });
}
