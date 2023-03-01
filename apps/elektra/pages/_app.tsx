import { ThemeProvider } from '@elektra/ui';
import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

function ElektraApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to Elektra!</title>
      </Head>
      <main>
        <ThemeProvider>
          {/* <AppShell header={<div>Hey</div>}>
            <Component {...pageProps} />
          </AppShell> */}
          <Component {...pageProps} />
        </ThemeProvider>
      </main>
    </>
  );
}

export default ElektraApp;
