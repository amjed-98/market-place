import { useCollectionDetails, useTranslate } from '@/hooks';
import { useRouter } from 'next/router';
import { parseHtml } from '@/utils';
import Avatar from './Avatar';

function Description() {
  const { t } = useTranslate('common');
  const { query } = useRouter();
  const { data: { description, Artist, Ong } = {} } = useCollectionDetails(
    query.collectionId as string,
  );

  if (!Artist || !Ong) return <></>;
  return (
    <div className='flex w-full flex-wrap gap-14'>
      <div className='mt-10 w-fit flex-[0.5] text-sm leading-6 max-lg:w-full max-lg:flex-auto'>
        {parseHtml(description || '')}
      </div>

      <div className='ml-auto mt-10 flex h-fit  flex-[0.4] flex-col gap-10 max-lg:flex-1'>
        <Avatar
          type={t('artist')}
          name={Artist.name}
          imgUrl={Artist.image_url || '/assets/artist.png'}
          collectionsCount={1}
          nftsCount={3}
          facebook={Artist.facebook || ''}
          linkedin={Artist.linkedin || ''}
          twitter={Artist.twitter || ''}
          instagram={Artist.instagram || ''}
          description={Artist.description || ''}
          walletAddress={Artist.wallet_address || ''}
        />
        <Avatar
          type={t('foundation')}
          name={Ong.name}
          imgUrl={Ong.image_url || '/assets/artist.png'}
          collectionsCount={2}
          nftsCount={10}
          facebook={Ong.facebook || ''}
          linkedin={Ong.linkedin || ''}
          twitter={Ong.twitter || ''}
          instagram={Ong.instagram || ''}
          description={Ong.description || ''}
          walletAddress={Ong.wallet_address || ''}
        />
      </div>
    </div>
  );
}

export default Description;
