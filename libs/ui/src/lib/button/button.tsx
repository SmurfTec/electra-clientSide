/* eslint-disable react/prop-types */
import {
  Button as MButton,
  ButtonProps as MButtonProps,
  createPolymorphicComponent,
} from '@mantine/core';

import Group from './buttonGroup';
import { forwardRef } from 'react';

export type ButtonType = React.ElementType &
  typeof ButtonComponent & {
    Group: typeof Group;
  };

export type ButtonProps = MButtonProps &
  React.HtmlHTMLAttributes<HTMLButtonElement> & {
    label: React.ReactNode;
  };

export const ButtonComponent = createPolymorphicComponent<
  'button',
  ButtonProps
>(
  forwardRef<HTMLButtonElement, ButtonProps>(({ label, ...rest }, ref) => {
    return (
      <MButton ref={ref} {...rest}>
        {label}
      </MButton>
    );
  })
);



export const Button = ButtonComponent as ButtonType;
Button.Group = Group;

Button.displayName = 'Button';
Button.defaultProps = {};

//export { ButtonGroupProps };

export default Button;
