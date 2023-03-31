import { createStyles, CSSObject, MantineTheme } from '@mantine/core';

export const globalStyles = (theme: MantineTheme): CSSObject => {
  return {
    html: {
      scrollBehavior: 'smooth',
    },
    '*, *::before, *::after': {
      boxSizing: 'border-box',
    },
    body: {
      ...theme.fn.fontStyles(),
      backgroundColor: theme.white,
      color: theme.black,
      lineHeight: '1.5',
      fontSize: '1.8rem',
    },
  };
};

export const useStylesforGlobal = createStyles((theme) => ({
  input: {
    borderRadius: 'unset',
    border: '1px solid black',
    height: '52px',
    width: '320px',
  },
  innerInput: {
    height: '52px',
    width: '320px',
  },
  leftIcon: {
    marginLeft: 10,
    textAlign: 'center',
  },
  root: {
    padding: '0px 35px',
    height: '28px',
    width: '65px',
    borderRadius: '30px',
    '&:hover': {
      color: 'white !important',
      background: '#3C82D6 !important',
      borderColor: '#3C82D6',
    },
  },
  grayButtonRoot: {
    backgroundColor: 'rgba(180, 180, 180, 0.47)',
    color: 'black',
    '&:hover': {
      backgroundColor: 'rgba(180, 180, 180, 0.47)',
      color: 'white',
    },
  },
}));
