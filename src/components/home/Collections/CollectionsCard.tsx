import { Image } from '@/components/common';
import { useTranslate } from '@/hooks';
import { handleBrokenImage, parseHtml } from '@/utils';
import Link from 'next/link';

type Props = {
  title: string;
  description: string;
  id: string;
  image: string;
  className?: string;
};

function CollectionsCard({ id, title, description, image }: Props) {
  const { t } = useTranslate('common');
  return (
    <article className='relative rounded-3xl shadow-lg'>
      <div className={`h-[580px] overflow-hidden rounded-3xl`}>
        <Image
          src={image}
          alt={title}
          unoptimized
          onError={handleBrokenImage}
          width={500}
          height={500}
          className={`h-full w-full rounded-3xl object-cover transition duration-300 ease-out hover:scale-125`}
        />
      </div>
      <div className={`absolute bottom-0 h-[271px] w-full`}>
        <div className='w-full bg-gradient-to-t from-white to-transparent pb-2 pt-10'>
          <h3 className={`text-2xl font-bold text-dark-black`}>{title}</h3>
        </div>
        <div className='h-[191px] rounded-b-2xl bg-white  pb-8 pt-5'>
          <div className='mx-auto mb-4 mt-4 line-clamp-3 h-20 w-60 overflow-ellipsis py-1 text-dark-gray'>
            {parseHtml(description)}
          </div>
          <Link
            href={`/collection/${id}`}
            className={`my-2 rounded-full border-[1.8px] border-solid border-[transparent] bg-pink px-7 py-2 text-white hover:border-pink hover:bg-[transparent] hover:text-pink`}
          >
            {t('view')}
          </Link>
        </div>
      </div>
    </article>
  );
}

export default CollectionsCard;
