import { List, ListProps } from '@mantine/core';

type ListItemProps = Omit<ListProps, 'children'> & {
  data: string[];
};

export function ListItem({ data, ...rest }: ListItemProps) {
  return (
    <List {...rest}>
      {data.map((item) => (
        <List.Item>{item}</List.Item>
      ))}
    </List>
  );
}
