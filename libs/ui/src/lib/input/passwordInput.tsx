import { PasswordInput as PInput, PasswordInputProps } from '@mantine/core';
import React from 'react';

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ children, className, ...rest }, ref) => {
    return <PInput ref={ref} {...rest} />;
  }
);
export type { PasswordInputProps };
PasswordInput.displayName = 'PasswordInput';
