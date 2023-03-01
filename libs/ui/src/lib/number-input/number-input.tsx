import { createStyles, NumberInput as MNumberInput, NumberInputProps as MNumberInputProps } from '@mantine/core';

/* eslint-disable-next-line */
export interface NumberInputProps extends MNumberInputProps {
  width?: number | string;
}

export function NumberInput({ width, ...rest }: NumberInputProps) {
  const { classes } = useStyles({ width });
  return <MNumberInput classNames={{ input: classes.input }} {...rest} />;
}

export default NumberInput;

const useStyles = createStyles((theme, { width }: Partial<NumberInputProps>) => ({
  input: {
    width: width || '100%',
  },
}));
