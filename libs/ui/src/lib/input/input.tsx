import { TextInput, TextInputProps, createStyles } from '@mantine/core';
import React from 'react';

export interface InputProps extends TextInputProps {
  width?: number | string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ value, type, width, ...rest }, ref) => {
  const { classes } = useStyles({ width });
  return <TextInput classNames={classes} value={value} type={type} size={'sm'} ref={ref} {...rest} />;
});

export default Input;

const useStyles = createStyles((theme, { width }: Partial<InputProps>) => ({
  wrapper: {
    width,
  },
}));
