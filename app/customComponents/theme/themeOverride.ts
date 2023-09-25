import { MantineThemeOverride } from '@mantine/core';

export const createThemeoverride = (): MantineThemeOverride => {
  return {
    colorScheme: 'light',
    fontFamily: 'Manrope',
    primaryColor: 'dark',
    headings: {
      fontFamily: 'Manrope',
      fontWeight: 400,
      sizes: {
        h1: { fontSize: '64px', lineHeight: '69.25px', fontWeight: '700' },
        h2: { fontSize: '48px', lineHeight: 1, fontWeight: undefined },
        h3: { fontSize: '36px', lineHeight: 1.5, fontWeight: undefined },
        h4: { fontSize: '24px', lineHeight: 1.5, fontWeight: undefined },
        h5: { fontSize: '16px', lineHeight: 1.5, fontWeight: undefined },
        h6: { fontSize: '12px', lineHeight: 1.5, fontWeight: undefined },
      },
    },
    fontSizes: {
      xs: '9px',
      sm: '13px',
      md: '16px',
      lg: '18px',
      xl: '20px',
    },
    components: {
      Button: {
        styles: {
          root: {
            padding: '0px 25px',
            borderRadius: 'unset',
          },
        },
      },
      Text: {
        defaultProps: {
          color: '#656565',
        },
      },
      Title: {
        defaultProps: {
          color: 'black',
        },
      },
      Container: {
        defaultProps: {
          sizes: {
            xs: 540,
            sm: 720,
            md: 960,
            lg: 1540,
            xl: 1320,
          },
        },
      },
      Grid: {
        defaultProps: {
          m: 0,
        },
      },
      Image: {
        defaultProps: {
          withPlaceholder: true,
        },
      },
    },
  };
};
