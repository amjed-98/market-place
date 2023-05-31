import { useRouter } from 'next/router';
import { useCallback } from 'react';
import type { Locale } from '../../../@types/i18next';

const useLocale = () => {
  const router = useRouter();
  const { pathname, query, asPath, locale = 'es' } = router;

  const toggleLocale = (newLocale?: Locale) => {
    const toggledLocale = locale === 'es' ? 'en' : 'es';
    router.push({ pathname, query }, asPath, { locale: newLocale || toggledLocale });
  };

  return {
    toggleLocale: useCallback(toggleLocale, [asPath, locale, pathname, query]),
    currentLocale: locale as Locale,
  };
};

export default useLocale;
