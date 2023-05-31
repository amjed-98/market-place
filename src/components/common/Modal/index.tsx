import { RxCross1 } from '@/components/common/Icons';
import type { ReactNode } from 'react';
import classes from './Modal.module.css';

type Props = {
  controlId: string;
  title: string;
  childrenContainerStyles?: string;
  children: ReactNode;
};

function BuyModal({ controlId, title, childrenContainerStyles = '', children }: Props) {
  return (
    <>
      <input type='checkbox' id={controlId} className='modal-toggle' />
      <label htmlFor={controlId} className='modal !z-[998] cursor-pointer'>
        <label className='modal-box relative overflow-hidden bg-white' htmlFor=''>
          <div className='flex items-center justify-between'>
            <h3 className='text-lg font-bold'>{title}</h3>
            <label htmlFor='buy-nft-modal' className='cursor-pointer'>
              <RxCross1 className=' text-2xl' />
            </label>
          </div>

          <hr className={`my-[15px] ml-[-25px] text-light-gray ${classes.hr}`} />
          <div className={childrenContainerStyles}>{children}</div>
        </label>
      </label>
    </>
  );
}

export default BuyModal;
