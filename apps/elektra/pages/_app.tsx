import '../styles/globals.css';

import { createThemeoverride, globalStyles, RouterTransition } from '@elektra/components';
import { createEmotionCache, Global, MantineProvider } from '@mantine/core';
import { AppProps } from 'next/app';
import Head from 'next/head';

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
          <Component {...pageProps} />
        </MantineProvider>
        {/* <ThemeProvider>
          <AppShell header={<div>Hey</div>}>
            <Component {...pageProps} />
          </AppShell>
        </ThemeProvider> */}
      </main>
    </>
  );
}

export default ElektraApp;
