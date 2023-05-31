import { Image } from '@/components/common';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from '@/components/common/Icons';
import { polygonscanAddressLink } from '@/config';
import { formatHash, parseHtml } from '@/utils';

type Props = {
  imgUrl: string;
  name: string;
  type: string;
  nftsCount: number;
  collectionsCount: number;
  facebook: string;
  twitter: string;
  linkedin: string;
  instagram: string;
  description: string;
  walletAddress: string;
};

export default function Avatar({
  type,
  imgUrl,
  name,
  nftsCount,
  collectionsCount,
  description,
  facebook,
  instagram,
  linkedin,
  twitter,
  walletAddress,
}: Props) {
  return (
    <div className='group card relative grid w-[27rem] grid-rows-[8rem] overflow-hidden border border-solid border-light-gray bg-white transition-all duration-1000 hover:grid-rows-[25rem] hover:overflow-visible max-lg:w-full'>
      <div className='card-body gap-7 transition-all duration-1000 ease-in-out group-hover:mt-16 group-hover:flex'>
        <div className='flex items-center gap-10 transition-all duration-1000 ease-in-out group-hover:block'>
          <div className='-top-[5.5rem] left-7 transition-all duration-1000 ease-in-out group-hover:absolute group-hover:translate-y-1/2'>
            <Image
              className='h-[5rem] w-[5rem] rounded-2xl object-cover transition-all duration-1000 ease-in-out group-hover:h-auto group-hover:w-[6.5rem]'
              width={100}
              height={100}
              unoptimized
              src={imgUrl}
              alt={type}
            />
          </div>

          <div className='flex flex-col gap-3'>
            <h1 className='text-sm font-black text-dark-black transition-all duration-1000 ease-in-out group-hover:text-2xl'>
              {name}
            </h1>
            <h2 className='card-type text-xs font-semibold text-middle-gray transition-all duration-1000 ease-in-out'>
              {type}
            </h2>
          </div>
        </div>

        <article className='flex flex-col gap-7'>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2 text-xs'>
              <span className='flex gap-1.5 text-middle-gray '>
                NFTs
                <span className='text-dark-black'>{nftsCount}</span>
              </span>
              |
              <span className='flex gap-1.5 text-middle-gray'>
                <span className='text-dark-black'>{collectionsCount}</span>
                Collections
              </span>
            </div>

            <div className='flex gap-2 text-xs text-middle-gray'>
              <span className=''>Address</span>
              <a
                href={`${polygonscanAddressLink}/${walletAddress}`}
                target='_blank'
                rel='noopener noreferrer'
                className='text-dark-black transition-transform hover:scale-105 hover:underline'
              >
                {formatHash(walletAddress)}
              </a>
            </div>
          </div>

          <p className='text-gray text-xs'>{parseHtml(description)}</p>

          <div className='card-actions mt-3 justify-start gap-4'>
            {facebook && (
              <a href={facebook} target='_blank' rel='noopener noreferrer'>
                <FaFacebookF />
              </a>
            )}

            {twitter && (
              <a href={twitter} target='_blank' rel='noopener noreferrer'>
                <FaTwitter />
              </a>
            )}

            {linkedin && (
              <a href={linkedin} target='_blank' rel='noopener noreferrer'>
                <FaLinkedinIn />
              </a>
            )}

            {instagram && (
              <a href={instagram} target='_blank' rel='noopener noreferrer'>
                <FaInstagram />
              </a>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
