type Props = {
  name: string;
  value: string;
};

function Detail({ name, value = '' }: Props) {
  return (
    <div key={name} className='flex'>
      <p className='w-[120px] text-middle-gray'>{name}</p>
      <p>{value}</p>
    </div>
  );
}

export default Detail;
