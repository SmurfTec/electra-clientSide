import { Autocomplete, AutocompleteProps, SelectItemProps } from '@mantine/core';
import { forwardRef, useRef } from 'react';



type SearchProps<T extends { value: string }> = AutocompleteProps & {
  data: Array<T>;
  itemComp?: React.ReactNode;
};
export function Search<T extends { value: string }>({ data, itemComp, ...rest }: SearchProps<T>) {
  const ref = useRef<HTMLInputElement>(null);
  return <Autocomplete ref={ref} data={data} {...rest} />;
}
export type { SearchProps };
Search.displayName = 'Search';
