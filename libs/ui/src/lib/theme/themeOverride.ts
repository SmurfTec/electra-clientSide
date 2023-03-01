import {
  ButtonProps,
  DefaultMantineColor,
  MantineGradient,
  MantineTheme,
  MantineThemeOverride,
  PasswordInputProps,
  TextareaProps,
  TextInputProps,
  TextProps,
  TitleProps,
  Tuple,
  TypographyStylesProviderProps,
} from '@mantine/core';

// this color pallette is available through theme.other.color ... choose colorname from intellisence
enum colorPallete {
  headings = 'dark',
  body = 'dark',
  bodyLight = '#B4B4B4',
  backgroundPrimary = '#111111',
  backgroundSecondary = '#3C82D6',
  productBackground = '#F5F5F5',
  gradientFrom = 'white',
  gradientTo = '#9d9e5a',
  border = '#e5b53b',
  primary = '#111111',
  secondary = '#3C82D6',
  accent = '#B4B4B4',
  title = 'dark',
  subTitle = '#B4B4B4',
  lightPrimary = "white",
  lightSecondary = 'skyblue',
  success = 'green',
  danger = 'red',
}

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<DefaultMantineColor, Tuple<string, 20>>;
  }

  export interface MantineThemeOther {
    color: typeof colorPallete;
    fontSizeBody?: string;
    lineHeight?: string;
    fontfactor?: number;
  }
}

export const createThemeOverride = (theme: MantineTheme): MantineThemeOverride => {
  const fontfactor = 1;

  const upTheme: MantineTheme = {
    ...theme,
    other: {
      color: colorPallete,
    },
  };

  const themeOverride: MantineThemeOverride = {
    colorScheme: 'light',
    primaryColor: 'dark',

    other: {
      color: colorPallete,
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
        h2: { fontSize: '48px', lineHeight: 1, fontWeight: undefined },
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

    defaultGradient: defaultGradient(upTheme),
    defaultRadius: '5px',

    components: {
      Title: {
        defaultProps: TitleDefaultProps,
        styles: TitleDefaultStyles(upTheme),
      },

      TypographyStylesProvider: {
        defaultProps: TypographyDefaultProps(upTheme),
        styles: TypographyDefaultStyles(upTheme),
      },

      Text: {
        defaultProps: TextDefaultProps(upTheme),
      },
      TextInput: { defaultProps: TextInputDefaultProps(upTheme) },
      PasswordInput: { defaultProps: PasswordInputDefaultProps(upTheme) },
      Checkbox: { styles: CheckboxStyles(upTheme) },
      Textarea: { defaultProps: TextAreaDefaultProps(upTheme) },
      Button: {
        defaultProps: ButtonDefaultProps,
      },

      Select: {
        defaultProps: SelectDefaultProps(upTheme),
      },
      MultiSelect: {
        defaultProps: MultiSelectDefaultProps(upTheme),
      },
    },
  };

  return themeOverride;
};

const TitleDefaultProps: TitleProps = {
  order: 4,
};

const TitleDefaultStyles = (theme: MantineTheme): TitleProps['styles'] => ({
  root: {
    color: theme.other.color.headings,
  },
});

const TypographyDefaultProps = (theme: MantineTheme): Partial<TypographyStylesProviderProps> => ({
  color: theme.other.color.title,
});

const TypographyDefaultStyles = (theme: MantineTheme): TypographyStylesProviderProps['styles'] => ({
  root: {
    color: theme.other.color.title,
  },
});

const TextDefaultProps = (theme: MantineTheme): Partial<TextProps> => ({
  color: theme.other.color.title,
  size: 'md',
});

const ButtonDefaultProps: ButtonProps = {
  variant: 'filled',
};
const TextInputDefaultProps = (theme: MantineTheme): TextInputProps => ({
  labelProps: {
    style: {
      color: theme.other.color.title,
    },
  },
  descriptionProps: {
    style: {
      color: theme.other.color.bodyLight,
    },
  },
});

const PasswordInputDefaultProps = (theme: MantineTheme): PasswordInputProps => ({
  labelProps: {
    style: {
      color: theme.other.color.title,
    },
  },
  descriptionProps: {
    style: {
      color: theme.other.color.title,
    },
  },
});

const TextAreaDefaultProps = (theme: MantineTheme): TextareaProps => ({
  labelProps: {
    style: {
      color: theme.other.color.title,
    },
  },
  descriptionProps: {
    style: {
      color: theme.other.color.bodyLight,
    },
  },
});

const CheckboxStyles = (theme: MantineTheme) => ({
  label: {
    color: theme.other.color.title,
  },
});

const SelectDefaultProps = (theme: MantineTheme): TextInputProps => ({
  labelProps: {
    style: {
      color: theme.other.color.title,
    },
  },
  descriptionProps: {
    style: {
      color: theme.other.color.bodyLight,
    },
  },
});

const MultiSelectDefaultProps = (theme: MantineTheme): TextInputProps => ({
  labelProps: {
    style: {
      color: theme.other.color.title,
    },
  },

  descriptionProps: {
    style: {
      color: theme.other.color.bodyLight,
    },
  },
});

const defaultGradient = (theme: MantineTheme): MantineGradient => ({
  from: theme.other.color.title,
  to: theme.other.color.bodyLight,
  deg: 60,
});
