import { CheckboxProps, Checkbox as MCheckbox } from '@mantine/core';

export const Checkbox = ({ size, radius, ...rest }: CheckboxProps) => {
  return <MCheckbox radius={radius} size={size || 'sm'} {...rest} />;
};

Checkbox.displayName = 'Checkbox';

export type { CheckboxProps };
export default Checkbox;
