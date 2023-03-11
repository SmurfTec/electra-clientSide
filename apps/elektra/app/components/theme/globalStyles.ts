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

export const useStylesforInput = createStyles((theme) => ({
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
}));