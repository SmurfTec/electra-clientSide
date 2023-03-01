import { CSSObject } from '@emotion/react';
import { MantineTheme } from '@mantine/core';

//Global styles
export function defGlobalStyles(theme: MantineTheme): CSSObject {
  const fontfactor = theme.other.fontfactor || 1;

  return {
    html: {
      fontSize: `${62.5 * fontfactor}%`,
      scrollBehavior: 'smooth',
    },

    '*, *::before, *::after': {
      boxSizing: 'border-box',
    },

    body: {
      ...theme.fn.fontStyles(),
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors['dark'][7] : theme.white,
      color: theme.colorScheme === 'dark' ? theme.colors['dark'][0] : theme.black,
      lineHeight: theme.lineHeight,
      fontSize: theme.other.fontSizeBody,
    },
  };
}
