import Link from 'next/link';
import { useLocale, useTranslate } from '@/hooks';
import { NumberFormatter } from '@/utils';
import classes from './Card.module.css';
import Image from '../Image';

type Props = {
  image: string;
  title: string;
  currency: string;
  price: number;
  cryptoPrice: number;
  cryptoCurrency: string;
  link: string;
  isSold: boolean;
};

function NftCard({
  image,
  title,
  currency,
  price,
  link,
  cryptoCurrency,
  cryptoPrice,
  isSold,
}: Props) {
  const { t } = useTranslate('common');
  const { currentLocale } = useLocale();

  const formatter = new NumberFormatter(currentLocale);

  const formattedCryptoPrice = formatter.format(cryptoPrice);
  const formattedFiatPrice = formatter.format(price);

  return (
    <article className='group hover-bordered relative basis-[260px] rounded-lg bg-white shadow-2xl'>
      {isSold && <div className='badge-error badge badge-lg absolute right-4 top-4'>Sold</div>}
      <Image
        src={image}
        className='h-[250px] w-full rounded-lg object-cover'
        unoptimized
        alt={title}
        width={250}
        height={250}
      />
      <div className='p-2'>
        <h1 className={`px-2 py-4 text-base font-semibold text-dark-black ${classes.title}`}>
          {title}
        </h1>

        <div className='flex items-center justify-between px-2 py-4 font-semibold'>
          <span className='text-dark-black'>
            {formattedCryptoPrice} {cryptoCurrency}
          </span>
          <span className='text-dark-black'>
            {formattedFiatPrice} {currency}
          </span>
        </div>
        <div className='hidden items-center px-2 py-4 group-hover:flex'>
          <Link
            href={link}
            className={`my-2 w-full rounded-full border-[1.8px] border-solid border-[transparent] bg-pink px-7 py-2 text-center text-white hover:border-pink hover:bg-[transparent] hover:text-pink`}
          >
            {t('view')}
          </Link>
        </div>
      </div>
    </article>
  );
}

export default NftCard;
