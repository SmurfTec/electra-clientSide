import { AppShell, Header } from '@elektra/components';
import { RouterTransition, createThemeoverride, globalStyles } from '@elektra/customComponents';
import { Global, MantineProvider, createEmotionCache } from '@mantine/core';
import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

export const cache = createEmotionCache({ key: 'elektra', prepend: true });
function ElektraApp({ Component, pageProps }: AppProps) {
  const themeOverride = createThemeoverride();
  return (
    <>
      <Head>
        <title>Welcome to Elektra!</title>
      </Head>
      <main>
        <MantineProvider emotionCache={cache} withGlobalStyles withNormalizeCSS theme={themeOverride}>
          <Global styles={globalStyles} />
          <RouterTransition />
          <AppShell header={<Header />} footer={<div>Hey</div>}>
            <Component {...pageProps} />
          </AppShell>
        </MantineProvider>
      </main>
    </>
  );
}

export default ElektraApp;
