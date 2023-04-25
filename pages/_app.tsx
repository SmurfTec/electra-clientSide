import { RouterTransition, createThemeoverride, globalStyles } from '@elektra/customComponents';
import '../styles/globals.css';
import { Container, createEmotionCache, Global, MantineProvider } from '@mantine/core';
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
        <MantineProvider withGlobalStyles withNormalizeCSS theme={themeOverride}>
          <Global styles={globalStyles} />
          <RouterTransition />
          {/* <Container size="lg"> */}
          <Component {...pageProps} />
          {/* </Container> */}
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
