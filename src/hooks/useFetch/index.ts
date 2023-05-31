import { type QueryFunction, type QueryKey, useQuery } from '@tanstack/react-query';
import { type AxiosError } from 'axios';

type Args<T> = {
  queryFn: QueryFunction<T>;
  queryKey: QueryKey;
  depend?: boolean;
};
function useFetch<T>({ queryFn, queryKey, depend = true }: Args<T>) {
  return useQuery<T, AxiosError>({
    queryKey,
    queryFn,
    enabled: depend,
  });
}

export default useFetch;
