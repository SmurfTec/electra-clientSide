import { CSSObject } from '@emotion/react';
import { createStyles, MantineTheme } from '@mantine/core';

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
      lineHeight: theme.lineHeight,
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
      background: `${theme.other.color.secondary} !important`,
      borderColor: theme.other.color.secondary,
    },
  },
  grayButtonRoot: {
    backgroundColor: 'rgba(180, 180, 180, 0.47)',
    color: 'black',
    '&:hover': { backgroundColor: 'rgba(180, 180, 180, 0.47)', color: 'white' },
  },
}));
