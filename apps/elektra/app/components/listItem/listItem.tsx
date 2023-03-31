import { List, ListProps } from '@mantine/core';

type ListItemProps = Omit<ListProps, 'children'> & {
  data: string[];
};

export function ListItem({ data, ...rest }: ListItemProps) {
  return (
    <List {...rest}>
      {data.map((item) => (
        <List.Item className="font-[500]">{item}</List.Item>
      ))}
    </List>
  );
}
