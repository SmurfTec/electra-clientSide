import { AppShell, Footer, Header } from '@elektra/components';
import { RouterTransition, createThemeoverride, globalStyles } from '@elektra/customComponents';
import { StoreProvider } from '@elektra/store';
import { Global, MantineProvider, createEmotionCache } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import '../styles/globals.css';

export const cache = createEmotionCache({ key: 'elektra', prepend: true });
function ElektraApp({ Component, pageProps }: AppProps) {
  const themeOverride = createThemeoverride();
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Welcome to Elektra!</title>
      </Head>
      <main>
        <StoreProvider>
          <MantineProvider withGlobalStyles emotionCache={cache} withNormalizeCSS theme={themeOverride}>
            <Global styles={globalStyles} />
            <RouterTransition />
            <Notifications position="bottom-center" />
            {router.pathname === '/auth/login' ||
            router.pathname === '/auth/signup' ||
            router.pathname === '/selling-search' ||
            router.pathname === '/notifications' ? (
              <Component {...pageProps} />
            ) : (
              <AppShell header={<Header />} footer={<Footer />}>
                <Component {...pageProps} />
              </AppShell>
            )}
          </MantineProvider>  
        </StoreProvider>
      </main>
    </>
  );
}

export default ElektraApp;
