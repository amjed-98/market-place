import { queryKeys } from '@/config';
import { QueryClient, QueryFunction, dehydrate } from '@tanstack/react-query';
import type { ValueOf } from '../../@types/utils';

export default async function prefetchQuery(
  queryFn: QueryFunction,
  queryKey: ValueOf<typeof queryKeys>,
) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(queryKey, queryFn);

  return dehydrate(queryClient);
}
