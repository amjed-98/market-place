import { useTranslate } from '@/hooks';
import Container from '../Container';
import LazzaroLogo from '../LazzaroLogo';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from '../Icons';

const socialMediaLinks = [
  { Icon: FaFacebookF, href: 'https://www.facebook.com/lazzarocommunity' },
  { Icon: FaTwitter, href: 'https://twitter.com/lazzaro_io' },
  {
    Icon: FaLinkedinIn,
    href: 'https://www.linkedin.com/company/lazzarocommunity/?originalSubdomain=es',
  },
  { Icon: FaInstagram, href: 'https://www.instagram.com/lazzaro_io/' },
];
function Footer() {
  const { t } = useTranslate('common');
  const links = [
    { text: t('footer.links.home'), href: '#home' },
    { text: t('footer.links.contact'), href: 'zoho form', target: '_black' },
    { text: t('footer.links.lazzaro'), href: 'https://lazzaro.io', target: '_black' },
  ];
  return (
    <footer className='bg-off-white'>
      <hr className='mx-auto w-10/12 text-light-gray' />
      <Container className='footer justify-between px-[15rem] py-20 max-lg:flex max-lg:flex-col-reverse max-lg:gap-[5rem]'>
        <section className='flex w-full flex-1 flex-col gap-8 max-lg:items-center'>
          <a href={'https://lazzaro.io/'} rel='noopener noreferrer' target='_blank'>
            <LazzaroLogo />
          </a>

          <ul className='grid grid-flow-col gap-8'>
            {links.map((link) => (
              <li key={link.text}>
                <a href={link.href} rel='noopener noreferrer' target={link.target}>
                  {link.text}
                </a>
              </li>
            ))}
          </ul>

          <ul className='grid grid-flow-col gap-4'>
            {socialMediaLinks.map(({ Icon, href }) => (
              <li key={href}>
                <a href={href} rel='noopener noreferrer' target='_blank'>
                  <Icon className='hover:scale-110 hover:fill-pink' />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className='ml-auto flex w-[65%] flex-col gap-5 max-lg:w-full max-lg:items-center max-lg:text-center'>
          <h4 className='text-xl font-semibold text-dark-black'>{t('footer.title')}</h4>
          <p className='text-dark-gray'>{t('footer.subtext')}</p>
          <button className='rounded-3xl bg-pink px-8 py-1.5 font-semibold text-white hover:border-2 hover:bg-transparent hover:text-pink'>
            <a
              href='zoho form'
              target='_black'
              rel='noopener noreferrer'
              className='text-[inherit]'
            >
              {t('footer.contact_btn')}
            </a>
          </button>
        </section>
      </Container>
      <hr className='mx-auto w-10/12 text-light-gray' />

      <section className='px-[14rem] py-5 max-lg:px-0 max-lg:text-center'>
        <p className='text-xs font-extralight text-dark-gray'>
          © {new Date().getFullYear()} Lázzaro, {t('footer.rights_reserved')}
        </p>
      </section>
    </footer>
  );
}

export default Footer;
