import type { ReactElement } from 'react';

type Props = {
  title: string;
  description: string;
  Icon: ReactElement;
};

function ExplainCard({ title, description, Icon }: Props) {
  return (
    <div className='flex h-56 flex-1 cursor-pointer flex-col items-center justify-evenly rounded-xl border border-solid from-pink to-dark-orange fill-pink px-10 text-[black] transition-all hover:bg-gradient-to-r hover:fill-white hover:text-off-white hover:shadow-2xl hover:drop-shadow-2xl max-lg:flex-auto'>
      {Icon}
      <h4 className='font-black'>{title}</h4>
      <p className='text-center text-sm font-extralight'>{description}</p>
    </div>
  );
}

export default ExplainCard;
