import { Divider, Flex, Group, Paper } from '@mantine/core';
import { Stats } from './stats';

export const ProductStats = () => {
  return (
    <div>
      <Paper radius={0} withBorder p={30}>
        <Group position='apart' spacing={10}>
        <Stats difference={4} label="Current Listings" value={25} />
        <Divider orientation='vertical' my={15}/>
        <Stats difference={4} label="Total Sold" value={24} />
        <Divider orientation='vertical' my={15}/>
        <Stats difference={-4} label="Average Sale Price" price={234} />
        <Divider orientation='vertical' my={15}/>
        <Stats difference={4} label="Total Amount From Sales" price={50000} />
        </Group>
      </Paper>
    </div>
  );
};
