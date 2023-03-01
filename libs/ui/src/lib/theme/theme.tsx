import { createEmotionCache, Global, MantineProvider, useMantineTheme } from '@mantine/core';
import { defGlobalStyles } from './defGlobalStyles';
import { createThemeOverride } from './themeOverride';

export interface ThemeProps {
  children: React.ReactElement;
}

export function ThemeProvider({ children }: ThemeProps) {
  const theme = useMantineTheme();
  const themeOverride = createThemeOverride(theme);
  const myCache = createEmotionCache({ key: 'stock-ui', prepend: true });
  return (
    <MantineProvider emotionCache={myCache} theme={themeOverride} withGlobalStyles withNormalizeCSS>
      <Global styles={defGlobalStyles} />
      {children}
    </MantineProvider>
  );
}

export default ThemeProvider;
