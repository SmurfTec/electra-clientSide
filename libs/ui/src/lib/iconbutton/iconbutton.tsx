import { ActionIcon, ActionIconProps, createPolymorphicComponent, MantineNumberSize } from '@mantine/core';
import React, { ReactNode } from 'react';
import { Icon, IconProps } from 'tabler-icons-react';

import { withTooltip } from '../HOC';
import { useTheme } from '../theme/useTheme';

interface IconButtonProps extends ActionIconProps {
  icon: Icon;
  iconProps?: IconProps;
  id?: string;
  size?: MantineNumberSize;
  tooltip?: ReactNode;
}

export const IconButtonComponent = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon: Icon, iconProps, size, ...rest }, ref) => {
    const iconSize = typeof size === 'number' ? size * 0.6 : '60%';
    const iconRadius = typeof size === 'number' ? size : 'xl';

    const theme = useTheme();

    return (
      <ActionIcon radius={iconRadius} ref={ref} size={size} color={theme.primaryColor} {...rest}>
        <Icon size={iconSize} {...iconProps} />
      </ActionIcon>
    );
  }
);

IconButtonComponent.displayName = 'IconButton';
IconButtonComponent.defaultProps = {
  size: 'xl',
};

export const IconButtonNoTooltip = createPolymorphicComponent<'button', IconButtonProps>(IconButtonComponent);

export const IconButton = withTooltip(IconButtonNoTooltip as React.ComponentType<IconButtonProps>);

export default IconButton;
