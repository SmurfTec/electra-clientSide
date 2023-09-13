import { AppShell, Footer, Header } from '@elektra/components';
import { RouterTransition, createThemeoverride, globalStyles } from '@elektra/customComponents';
import { StoreProvider } from '@elektra/store';
import { Global, Loader, MantineProvider, createEmotionCache } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SessionProvider } from "next-auth/react"
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
        <StoreProvider LoadingOverlay={<Loader />}>
          <MantineProvider withGlobalStyles emotionCache={cache} withNormalizeCSS theme={themeOverride}>
            <Global styles={globalStyles} />
            <RouterTransition />
            <Notifications position="bottom-center" />

            {notHeader.includes(router.pathname) ? (
              <Component {...pageProps} />
            ) : (
              <AppShell header={<Header />} footer={<Footer />}>
                <Component {...pageProps} />
              </AppShell>
            )}
          </MantineProvider>
        </StoreProvider>
        </SessionProvider>
      </main>
    </>
  );
}

export default ElektraApp;
