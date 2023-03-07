import { CSSObject } from '@emotion/react';
import { MantineTheme } from '@mantine/core';

export const globalStyles = (theme: MantineTheme): CSSObject => {
  return {
    html: {
      fontSize: '62.5%',
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
