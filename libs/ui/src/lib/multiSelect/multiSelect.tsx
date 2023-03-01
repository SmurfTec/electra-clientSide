import { MultiSelect as MantineMultiSelect, SelectItem, MultiSelectProps } from '@mantine/core';

export function MultiSelect({ ...rest }: MultiSelectProps) {
    return <MantineMultiSelect searchable {...rest} />;
}
export type { MultiSelectProps, SelectItem };
export default MultiSelect;

