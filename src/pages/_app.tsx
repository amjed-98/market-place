import { appWithTranslation } from 'next-i18next';
import ReactQueryProvider from '@/ReactQueryProvider';
import { Alert } from '@/components/common';
import type { AppProps } from 'next/app';

import '@/styles/globals.css';
import '@total-typescript/ts-reset';

type AppPropsWithDehydratedState = AppProps<{ dehydratedState: unknown }>;

function App({ Component, pageProps }: AppPropsWithDehydratedState) {
  return (
    <>
      <Alert />
      <ReactQueryProvider dehydratedState={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </ReactQueryProvider>
    </>
  );
}

export default appWithTranslation(App);
