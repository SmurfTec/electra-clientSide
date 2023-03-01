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
  headings: '#ab700a',
  body: '#5c5577',

  bodyLight: '#918ca4',
  backgroundPrimary: '#f8f9fa',
  backgroundSecondary: '#fff',

  gradientFrom: 'white',
  gradientTo: '#9d9e5a',
  border: '#e5b53b',

  primary: '#9d9e5a',
  secondary: '#c0c253',
  accent: '#eff0bb',

  title: '#ab710a',
  subTitle: '#656565',
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
        h1: { fontSize: '3.4rem', lineHeight: 2.5, fontWeight: undefined },
        h2: { fontSize: '2.6rem', lineHeight: 2.0, fontWeight: undefined },
        h3: { fontSize: '2.2rem', lineHeight: 1.5, fontWeight: undefined },
        h4: { fontSize: '1.8rem', lineHeight: 1.5, fontWeight: undefined },
        h5: { fontSize: '1.6rem', lineHeight: 1.5, fontWeight: undefined },
        h6: { fontSize: '1.4rem', lineHeight: 1.5, fontWeight: undefined },
      },
    },
    fontSizes: {
      xs: 12 * fontfactor, // 0.75rem
      sm: 14 * fontfactor, // 0.875rem
      md: 16 * fontfactor, // 1rem
      lg: 18 * fontfactor, // 1.125rem
      xl: 20 * fontfactor, // 1.25rem
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
  order: 1,
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
