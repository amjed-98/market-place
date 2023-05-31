import http from '@/services/http';
import type { Collection, CollectionStatus } from '../../../../@types/api';

export default async function getCollections(status?: CollectionStatus) {
  let url = `/collections`;
  if (status) url = `${url}?status=${status}`;

  const { data } = await http.get<Collection[]>(url);
  return data;
}
