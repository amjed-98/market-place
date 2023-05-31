import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useMetaMask, useTranslate } from '@/hooks';
import { FaWallet } from '@/components/common/Icons';
import LazzaroLogo from '../LazzaroLogo';

import classes from './navbar.module.css';

function Navbar() {
  const { t } = useTranslate('common');
  const dynamicBgColor = useDynamicBgColor();
  const { connectWallet, walletAddress } = useMetaMask();

  return (
    <header>
      <nav
        className={`fixed z-50 flex h-20 w-full items-center justify-between bg-opacity-50 px-[6rem] py-5 transition-colors duration-500 max-lg:h-16 max-sm:flex-col max-sm:justify-between max-sm:gap-8 max-sm:px-3 ${dynamicBgColor}`}
      >
        <div className='flex w-1/3  items-center justify-between max-sm:w-full'>
          <Link href={'/#home'}>
            <LazzaroLogo />
          </Link>

          <ul className='flex items-center justify-between gap-12 max-sm:gap-4'>
            <li className='relative after:absolute after:bottom-[-8px] after:left-1/2 after:h-[3px] after:w-[50%] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-md after:bg-gradient-to-r after:from-pink after:to-dark-orange'>
              <Link href={'/home'} className='font-semibold'>
                Charity drops
              </Link>
            </li>

            <li>
              <a
                href='https://lazzaro.io/en/'
                target='_blank'
                rel='noopener noreferrer'
                className='font-semibold text-middle-gray'
              >
                Lázzaro
              </a>
            </li>
          </ul>
        </div>

        <button
          onClick={connectWallet.bind(null, 'eth_requestAccounts')}
          className={`flex items-center gap-2 rounded-3xl bg-gradient-to-r from-pink to-dark-orange fill-white  px-7 py-3 text-xs font-semibold text-white hover:fill-pink ${classes.connect_wallet_btn}`}
        >
          <FaWallet className='fill-[inherit]' />

          <span className='bg-gradient-to-r from-pink to-dark-orange bg-clip-text'>
            {walletAddress ? t('header.connected') : t('header.connect_wallet')}
          </span>
        </button>
      </nav>
    </header>
  );
}

export default Navbar;

function useDynamicBgColor() {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dynamicBgColor = scroll ? 'bg-light-gray' : 'transparent';

  return dynamicBgColor;
}
