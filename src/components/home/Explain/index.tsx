import { useTranslate } from '@/hooks';
import { Container } from '@/components/common';
import { BsWallet2, BsWindowStack, BsBoundingBoxCircles } from '@/components/common/Icons';
import ExplainCard from './ExplainCard';

function Explain() {
  const { t } = useTranslate('home');
  const cards = [
    {
      title: t('explain.cards.collection.title'),
      description: t('explain.cards.collection.description'),
      Icon: BsWindowStack,
    },
    {
      title: t('explain.cards.wallet.title'),
      description: t('explain.cards.wallet.description'),
      Icon: BsWallet2,
    },
    {
      title: t('explain.cards.NFT.title'),
      description: t('explain.cards.NFT.description'),
      Icon: BsBoundingBoxCircles,
    },
  ];
  return (
    <section className='bg-off-white'>
      <Container className='flex flex-col flex-wrap items-center justify-center gap-4 py-10 text-center max-lg:px-0'>
        <header className='flex w-full flex-col items-center justify-center gap-4'>
          <h3 className='bg-gradient-to-r from-pink to-dark-orange bg-clip-text py-2 text-4xl font-bold text-[transparent]'>
            {t('explain.title')}
          </h3>
          <p className='text-lg font-semibold text-dark-gray'>{t('explain.description')}</p>
        </header>

        <main className='flex w-full flex-wrap items-center justify-center gap-8 py-4'>
          {cards.map(({ title, description, Icon }) => (
            <ExplainCard
              key={description}
              title={title}
              description={description}
              Icon={<Icon className='fill-[inherit] text-4xl' />}
            />
          ))}
        </main>
      </Container>
    </section>
  );
}

export default Explain;
