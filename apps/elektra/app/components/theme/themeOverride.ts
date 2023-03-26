import { MantineThemeOverride } from '@mantine/core';
enum colorPallete {
 
 
  bodyLight = '#B4B4B4',
  backgroundPrimary = '#111111',
  backgroundSecondary = '#3C82D6',
  productBackground = '#F5F5F5',
  tabs = '#D9D9D9',
  tabTitle = '#656565',
  border = '#e5b53b',
  primary = '#111111',
  secondary = '#3C82D6',
  accent = '#B4B4B4',
  title = 'dark',
  subTitle = '#B4B4B4',
  lightPrimary = 'white',
  lightSecondary = 'skyblue',
  success = 'green',
  danger = 'red',
}


export const createThemeoverride = (): MantineThemeOverride => {
  return {
    colorScheme: 'light',
    fontFamily: 'Manrope',
    primaryColor: 'dark',
    other: {
      color: colorPallete,
      fontSizeBody: '1.8rem',
      lineHeight: '1.5',
      fontfactor: 1,
    },
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
    },
  };
};
