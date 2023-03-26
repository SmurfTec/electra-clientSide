import { Only } from '@elektra/ui';
import { Grid, SegmentedControl } from '@mantine/core';
import { useState } from 'react';
import { SimpleStatCardProps, SimpleStateCard } from '../../../card';

const SimpleStatCardData: SimpleStatCardProps[] = [
  {
    title: 'Total Value',
    value: 3000,
    type: '$',
  },
  {
    title: 'Pending Orders',
    value: 5,
    type: 'N/A',
  },
];

export function Purchasing() {
  const [value, setValue] = useState('B');
  return (
    <div>
      <SegmentedControl
        styles={{
          control: {
            border: 'none !important',
          },
        }}
        size="md"
        className="w-1/3"
        value={value}
        onChange={setValue}
        data={[
          { label: 'Active', value: 'B' },
          { label: 'Pending', value: 'S' },
          { label: 'Completed', value: 'C' },
        ]}
      />
      <div className='my-4'>
        <Grid>
          {SimpleStatCardData.map((item, key) => (
            <Grid.Col key={key} span={2}>
              <SimpleStateCard key={key} title={item.title} value={item.value} type={item.type} />
            </Grid.Col>
          ))}
        </Grid>
      </div>
      <Only when={value === 'B'}>Buying</Only>
      <Only when={value === 'S'}>Selling</Only>
      <Only when={value === 'C'}>Completed</Only>
    </div>
  );
}
