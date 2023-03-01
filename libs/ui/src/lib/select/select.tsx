import { Select as MantineSelect, SelectItem, SelectProps } from '@mantine/core';

export function Select({ width, ...rest }: SelectProps) {
  return <MantineSelect style={{ width }} searchable {...rest} />;
}

export type { SelectProps, SelectItem };

export default Select;
