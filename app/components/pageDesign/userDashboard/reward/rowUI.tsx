import { Avatar, Group, Text } from '@mantine/core';
import { CellContext } from '@tanstack/react-table';

export function SimpleRow<T extends { id: string }>(props: CellContext<T, unknown>) {
  const { row, cell } = props;

  switch (props.cell.column.id) {
    case 'redeemedPoints':
      return (
        <Group spacing={10}>
          <Avatar src="images/coin.png" size={'sm'} radius="lg"  />
          <Text fz="md"  className='font-medium'>
            {cell.getValue() as string}
          </Text>
        </Group>
      );
    default:
      return <Text color="inherit" className='font-medium'>{cell.getValue() as string}</Text>;
  }
}
