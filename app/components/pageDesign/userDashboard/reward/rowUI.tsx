import { Avatar, Group, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { CellContext } from '@tanstack/react-table';

export function SimpleRow<UserRewardDataTable>(props: CellContext<UserRewardDataTable, unknown>) {
  const { row, cell } = props;
  const mediumdScreen = useMediaQuery('(min-width: 1150px)', true);
  switch (props.cell.column.id) {
    case 'coins':
      return (
        <Group spacing={10}>
          <Avatar src="images/coin.png" size={mediumdScreen?'sm':'xs'} radius="lg"  />
          <Text fz="md"  className='text-[10px] md:text-base font-medium text-black'>
            {cell.getValue() as string}
          </Text>
        </Group>
      );
      case 'amount':
      return (
          <Text className='text-[10px] md:text-base font-medium text-black'>
            ${cell.getValue() as string}
          </Text>
       
      );
    default:
      return <Text color="inherit" className='text-[10px] md:text-base font-medium'>{cell.getValue() as string}</Text>;
  }
}
