import { useTranslate } from '@/hooks';
import { GoPrimitiveDot } from '@/components/common/Icons';
import { type CollectionStatus } from '../../../../@types/api';

type Props = {
  publishDate: string;
  nftsCount: number;
  status: CollectionStatus;
  className?: string;
};
function Stats({ publishDate, nftsCount, status, className = '' }: Props) {
  const { t } = useTranslate(['collection', 'common']);

  const statCards = [
    { title: t('collection:dashboard.one.title'), value: publishDate },
    {
      title: t('collection:dashboard.two.title'),
      value: `${nftsCount} ${nftsCount > 1 ? 'NFTs' : 'NFT'}`,
    },
    {
      title: t('collection:dashboard.three.title'),
      value: status === 'active' ? t('active') : t('disabled'),
    },
  ];

  return (
    <div
      className={`stats stats-vertical bg-off-white p-2 shadow-xl lg:stats-horizontal ${className}`}
    >
      {statCards.map((stat) => (
        <div className='stat text-dark-gray' key={stat.title}>
          <div className='stat-title mb-2 text-justify text-dark-gray'>{stat.title}</div>
          <div className='stat-desc flex items-center gap-0.5 font-medium text-dark-gray'>
            {stat.value}
            {stat.value === t('active') && <GoPrimitiveDot className='fill-success' />}
            {stat.value === t('disabled') && <GoPrimitiveDot className='fill-error' />}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Stats;
