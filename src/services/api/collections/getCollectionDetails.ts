import http from '@/services/http';
import type { CollectionDetails } from '../../../../@types/api';

export default async function getCollectionDetails(collectionId: string) {
  const { data } = await http.get<{ collection: CollectionDetails }>(
    `/collections/${collectionId}`,
  );
  return data.collection;
}
