import type { ReactNode } from 'react';
import { AiOutlineLoading3Quarters } from '../Icons';

type Props = { children?: ReactNode; showIf?: boolean; text?: string };

export default function LoadingSpinner({ showIf = true, text = '', children }: Props) {
  if (!showIf) return <></>;
  return (
    <div className='fixed z-[999] flex h-[100vh] w-full flex-col items-center justify-evenly gap-10 bg-white bg-opacity-60'>
      {children}

      <div className='flex flex-col items-center justify-center gap-16 text-center'>
        <AiOutlineLoading3Quarters className='animate-spin text-9xl text-pink' />
        <p className='mr-4 text-3xl font-bold text-middle-gray'>{text}</p>
      </div>
    </div>
  );
}
