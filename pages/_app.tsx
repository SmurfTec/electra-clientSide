import { AppShell, Footer, Header } from '@elektra/components';
import { RouterTransition, StaticApiCalls, createThemeoverride, globalStyles } from '@elektra/customComponents';
import { StoreProvider } from '@elektra/store';
import { Global, Loader, MantineProvider, createEmotionCache } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import '../styles/globals.css';

export const cache = createEmotionCache({ key: 'elektra', prepend: true });

function ElektraApp({ Component, pageProps }: AppProps) {
  const themeOverride = createThemeoverride();
  const router = useRouter();
  const notHeader = ['/auth/login', '/auth/signup', '/selling-search', '/notifications'];
  return (
    <>
      <Head>
        <title>Welcome to Elektra!</title>
      </Head>
      <main>
        <SessionProvider session={pageProps.session}>
          <StoreProvider>
            <MantineProvider withGlobalStyles emotionCache={cache} withNormalizeCSS theme={themeOverride}>
              <Global styles={globalStyles} />
              <RouterTransition />
              <Notifications position="bottom-center" />

              {notHeader.includes(router.pathname) ? (
                <Component {...pageProps} />
              ) : (
                <StaticApiCalls>
                  <AppShell header={<Header />} footer={<Footer />}>
                    <Component {...pageProps} />
                  </AppShell>
                </StaticApiCalls>
              )}
            </MantineProvider>
          </StoreProvider>
        </SessionProvider>
      </main>
    </>
  );
}

export default ElektraApp;
