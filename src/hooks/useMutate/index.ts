import { type MutationFunction, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { type AxiosError } from 'axios';

type Options<Res, Payload, Context> = Omit<
  UseMutationOptions<Res, AxiosError, Payload, Context>,
  'mutationFn'
>;

function useMutate<Res = unknown, Payload = any, Context = unknown>(
  mutationFn: MutationFunction<Res, Payload>,
  options?: Options<Res, Payload, Context>,
) {
  return useMutation<Res, AxiosError, Payload, Context>(mutationFn, options);
}

export default useMutate;
