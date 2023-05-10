import { Divider, Group, Paper } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Stats } from './stats';

export const ProductStats = () => {
  const phone = useMediaQuery('(max-width: 600px)');
  return (
    <div>
      <Paper radius={0} withBorder p={30}>
        <Group position="apart" spacing={10}>
          <Stats difference={4} label="Current Listings" value={25} />
          <Divider orientation={phone ? 'horizontal' : 'vertical'} className={phone ? "w-full" :undefined} size={3} />
          <Stats difference={4} label="Total Sold" value={24} />
          <Divider orientation={phone ? 'horizontal' : 'vertical'} className={phone ? "w-full" :undefined} size={3} />
          <Stats difference={-4} label="Average Sale Price" price={234} />
          <Divider orientation={phone ? 'horizontal' : 'vertical'} className={phone ? "w-full" :undefined} size={3} />
          <Stats difference={4} label="Total Amount From Sales" price={50000} />
        </Group>
      </Paper>
    </div>
  );
};
