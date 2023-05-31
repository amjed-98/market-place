import { useLocale } from '@/hooks';
import { NumberFormatter } from '@/utils';

type Props = {
  title: string;
  name: string | number;
  currency: string;
};

function Category({ title, name, currency }: Props) {
  const { currentLocale } = useLocale();
  const formatter = new NumberFormatter(currentLocale);

  const price = formatter.format(+name);

  return (
    <div key={title} className='flex-1 rounded-xl px-8 py-10 shadow-xl'>
      <p className='mb-3 text-sm text-middle-gray'>{title}</p>
      <p className='text-lg font-bold tracking-widest'>{`${price}  ${currency}`}</p>
    </div>
  );
}

export default Category;
