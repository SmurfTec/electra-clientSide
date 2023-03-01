import {
  ButtonProps,
  MantineGradient,
  MantineTheme,
  MantineThemeOverride,
  PasswordInputProps,
  TextInputProps,
  TextProps,
  TitleProps,
  TypographyStylesProviderProps,
} from '@mantine/core';

export const colorPallete = {
  headings: 'dark',
  body: 'dark',

  bodyLight: '#B4B4B4',
  backgroundPrimary: '#111111',
  backgroundSecondary: '#3C82D6',

  gradientFrom: 'white',
  gradientTo: '#9d9e5a',
  border: '#e5b53b',

  primary: '#111111',
  secondary: '#3C82D6',
  accent: '#B4B4B4',

  title: 'dark',
  subTitle: '#B4B4B4',
};

export const createThemeOverride = (theme: MantineTheme): MantineThemeOverride => {
  const fontfactor = 1;

  return {
    colorScheme: 'light',
    primaryColor: 'dark',

    other: {
      colors: colorPallete,
      fontSizeBody: '1.8rem',
      lineHeight: '1.5',
      fontfactor,
    },

    headings: {
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",

      fontWeight: 400,
      sizes: {
        h1: { fontSize: '64px', lineHeight: '69.25px', fontWeight: '700' },
        h2: { fontSize: '48px', lineHeight: 2.0, fontWeight: undefined },
        h3: { fontSize: '36px', lineHeight: 1.5, fontWeight: undefined },
        h4: { fontSize: '24px', lineHeight: 1.5, fontWeight: undefined },
        h5: { fontSize: '16px', lineHeight: 1.5, fontWeight: undefined },
        h6: { fontSize: '12px', lineHeight: 1.5, fontWeight: undefined },
      },
    },
    fontSizes: {
      xs: 9 * fontfactor,
      sm: 13 * fontfactor,
      md: 16 * fontfactor,
      lg: 18 * fontfactor,
      xl: 20 * fontfactor,
    },

    defaultGradient: defaultGradient,
    defaultRadius: '5px',

    components: {
      Title: {
        defaultProps: TitleDefaultProps,
        styles: TitleDefaultStyles,
      },

      TypographyStylesProvider: {
        defaultProps: TypographyDefaultProps,
        styles: TypographyDefaultStyles,
      },

      Text: { defaultProps: TextDefaultProps },
      TextInput: { defaultProps: TextInputDefaultProps },
      PasswordInput: { defaultProps: PasswordInputDefaultProps },
      Checkbox: { styles: CheckboxStyles },
      Button: {
        defaultProps: ButtonDefaultProps,
      },
      Select: {
        defaultProps: {
          size: 'md',
        },
      },
    },
  };
};

const TitleDefaultProps: TitleProps = {
  order: 4,
};

const TitleDefaultStyles = {
  root: {
    color: colorPallete.headings,
  },
};

const TypographyDefaultProps: Partial<TypographyStylesProviderProps> = {
  color: colorPallete.headings,
};

const TypographyDefaultStyles = {
  root: {
    color: colorPallete.headings,
  },
};

const TextDefaultProps: TextProps = {
  color: colorPallete.body,
  size: 'md',
};

const ButtonDefaultProps: ButtonProps = {
  variant: 'filled',
};

const TextInputDefaultProps: TextInputProps = {
  labelProps: {
    style: {
      color: colorPallete.body,
    },
  },
  descriptionProps: {
    style: {
      color: colorPallete.bodyLight,
    },
  },
};

const PasswordInputDefaultProps: PasswordInputProps = {
  labelProps: {
    style: {
      color: colorPallete.body,
    },
  },
  descriptionProps: {
    style: {
      color: colorPallete.body,
    },
  },
};

const CheckboxStyles = {
  label: {
    color: colorPallete.body,
  },
};

const defaultGradient: MantineGradient = {
  from: colorPallete.gradientFrom,
  to: colorPallete.gradientTo,
  deg: 60,
};
