import { Container } from '@/components/common';
import Tabs from './CollectionTabs';

function Info() {
  return (
    <section className='bg-off-white pt-14 max-lg:pt-80'>
      <Container className='text-dark-gray'>
        <Tabs />
      </Container>
    </section>
  );
}

export default Info;
