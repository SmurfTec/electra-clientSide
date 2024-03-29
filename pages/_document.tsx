import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import { createStylesServer, ServerStyles } from '@mantine/next';
import { cache } from './_app';
const stylesServer = createStylesServer();
export default class _Document extends Document {
  static getInitialProps = async (ctx: DocumentContext) => {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: [initialProps.styles, <ServerStyles html={initialProps.html} server={stylesServer} key="elektra-styles" />],
    };
  };

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href="/images/coins.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
