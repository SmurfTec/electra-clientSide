import { Grid } from '@mantine/core';
import { SimpleStatCardProps, SimpleStateCard } from '../../../card';

type StateCardProps = {
  data: Array<SimpleStatCardProps>;
  className?: string;
};

export const StateCard = ({ data,className }: StateCardProps) => {
  return (
    <Grid className={className}>
      {data.map((item, key) => (
        <Grid.Col key={key} span={2}>
          <SimpleStateCard key={key} title={item.title} value={item.value} type={item.type} />
        </Grid.Col>
      ))}
    </Grid>
  );
};
