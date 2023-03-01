import {
  createPolymorphicComponent,
  MantineColor,
  ThemeIcon as MThemeIcon,
  ThemeIconProps as MThemeIconProps,
  useMantineTheme,
} from '@mantine/core';
import { ComponentRef, forwardRef } from 'react';

export interface ThemeIconProps extends MThemeIconProps {
  iconComponent: React.ElementType;
  iconProps?: React.ComponentProps<React.ElementType>;
  fromColor?: MantineColor;
  toColor?: MantineColor;
  degree?: number;
}

const ThemeIconWithRef = forwardRef<ComponentRef<'div'>, ThemeIconProps>(
  ({ iconComponent, iconProps, size, fromColor, toColor, degree, ...rest }, ref) => {
    const Component = iconComponent || 'div';
    const theme = useMantineTheme();
    let iconSize;
    if (typeof size === 'number') {
      iconSize = size - 10 > 0 ? size - 10 : size;
    } else {
      iconSize = theme.spacing[size as keyof typeof theme.spacing];
    }

    const iProps = { size: iconSize };

    return (
      <MThemeIcon
        gradient={{
          from: fromColor || theme.defaultGradient.from,
          to: toColor || theme.defaultGradient.to,
          deg: degree || theme.defaultGradient.deg,
        }}
        radius={typeof size === 'number' ? size : 'xl'}
        ref={ref}
        size={size}
        variant="filled"
        {...rest}
      >
        <Component {...iProps} {...iconProps} />
      </MThemeIcon>
    );
  }
);

ThemeIconWithRef.defaultProps = {
  m: 'xs',
};

export const ThemeIcon = createPolymorphicComponent<'div', Omit<ThemeIconProps, 'children'>>(ThemeIconWithRef);

export default ThemeIcon;
