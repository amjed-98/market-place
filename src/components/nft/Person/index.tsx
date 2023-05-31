import { Image } from '@/components/common';

type Props = {
  title: string;
  image: string;
  name: string;
};

function Person({ title, image, name }: Props) {
  return (
    <div key={title} className='flex flex-1 items-center'>
      <Image
        width={40}
        height={40}
        src={image}
        className='mr-3 aspect-square rounded-full object-cover'
        alt={title}
        unoptimized
      />
      <div className='text-sm'>
        <p className=' text-middle-gray'>{title}</p>
        <p>{name}</p>
      </div>
    </div>
  );
}

export default Person;
