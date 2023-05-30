import { Divider, Group, Paper } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { Stats } from './stats';

const statDataNew = [
  {
    label: 'Current Listings',
    difference: 4,
    value: '25',
  },
  {
    label: 'Total Sold',
    difference: 4,
    value: '24',
  },
  {
    label: 'Average Sale Price',
    difference: -4,
    price: '234',
  },
  {
    label: 'Total Amount From Sales',
    difference: 4,
    price: '50000',
  },
];

const statDataUsed = [
  {
    label: '12 month trade range',
    difference: 4,
    price: '234-250',
  },
  {
    label: 'Price Premium',
    difference: 4,
    price: '234',
  },
  {
    label: 'Average Sale Price',
    difference: -4,
    price: '234',
  },
  {
    label: 'No of Sales',
    difference: 4,
    value: '2400',
  },
];

export const ProductStats = () => {
  const phone = useMediaQuery('(max-width: 600px)');
  const router = useRouter();
  const isNew = router.query['condition'] === 'new';

  const statData = isNew ? statDataNew : statDataUsed;
  return (
    <div>
      <Paper radius={0} withBorder py={10} >
        <Group position="apart" px={phone ? 0 : 60}>
          {statData.map((item, key) => (
            <span key={key} className="md:flex md:space-x-4 text-center md:text-left min-w-[100%] md:min-w-max md:max-w-[20%]">
              <Stats difference={item.difference} label={item.label} value={item.value} price={item.price} />
              {statData.length !== key + 1 && (
                <Divider
                  orientation={phone ? 'horizontal' : 'vertical'}
                  className={phone ? 'w-full' : undefined}
                  size={1}
                />
              )}
            </span>
          ))}
          {/* <Stats difference={4} label="Current Listings" value={25} />
          <Divider orientation={phone ? 'horizontal' : 'vertical'} className={phone ? "w-full" :undefined} size={3} />
          <Stats difference={4} label="Total Sold" value={24} />
          <Divider orientation={phone ? 'horizontal' : 'vertical'} className={phone ? "w-full" :undefined} size={3} />
          <Stats difference={-4} label="Average Sale Price" price={234} />
          <Divider orientation={phone ? 'horizontal' : 'vertical'} className={phone ? "w-full" :undefined} size={3} />
          <Stats difference={4} label="Total Amount From Sales" price={50000} /> */}
        </Group>
      </Paper>
    </div>
  );
};
