import { Tabs } from '@/components/common';
import { useRouter } from 'next/router';
import useCollectionNfts from '@/hooks/useCollectionNfts';
import { useTranslate } from '@/hooks';
import { getNftsToShow } from '@/utils';
import Description from './Description';
import Works from './Works';

function CollectionTabs() {
  const { query } = useRouter();
  const { t } = useTranslate('collection');
  const { data: collectionNfts = [], isLoading } = useCollectionNfts(query.collectionId as string);

  const nftsToShow = getNftsToShow(collectionNfts);

  return (
    <Tabs defaultActiveTab='description' className='w-full'>
      <Tabs.TabItem title={t('description')} tabKey='description' className='text-dark-gray'>
        <Description />
      </Tabs.TabItem>

      <Tabs.TabItem title={t('works')} tabKey='works' className='text-dark-gray'>
        <Works nftsToShow={nftsToShow} showIf={!isLoading} />.
      </Tabs.TabItem>
    </Tabs>
  );
}

export default CollectionTabs;
