/**
 * @link https://www.i18next.com/overview/typescript
 */
import 'i18next';

import common from '../public/locales/en/common.json';
import home from '../public/locales/en/home.json';
import collection from '../public/locales/en/collection.json';
import nft from '../public/locales/en/nft.json';

interface I18nNamespaces {
  common: typeof common;
  home: typeof home;
  collection: typeof collection;
  nft: typeof nft;
}

declare module 'i18next' {
  // eslint-disable-next-line no-unused-vars
  interface CustomTypeOptions {
    resources: I18nNamespaces;
  }
}

export type Locale = 'es' | 'en';
export type I18Pages = 'common' | 'home' | 'collection' | 'nft';
