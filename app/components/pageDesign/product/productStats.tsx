import { Divider, Group, Paper } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { Stats } from './stats';
import { useSelector } from 'react-redux';
import { RootState } from '@elektra/store';



export const ProductStats = () => {
  const phone = useMediaQuery('(max-width: 600px)');
  const router = useRouter();
  // const isNew = router.query['condition'] === 'new';
  const isNew = false
  const productStats = useSelector((state: RootState) => state.entities.productDetail.list.stats.stats)

  const statDataNew = [
    {
      label: 'Current Listings',
      difference: 0,
      value: '25',
    },
    {
      label: 'Total Sold',
      difference: 0,
      value: productStats.no_of_sales,
    },
    {
      label: 'Average Sale Price',
      difference: 0,
      price: productStats.avg_sale_price.toFixed(),
    },
    {
      label: 'Total Amount From Sales',
      difference: 0,
      price: "NID",
    },
  ];
  
  const statDataUsed = [
    {
      label: '12 month trade range',
      difference: 0,
      price: 'NID',
    },
    {
      label: 'Price Premium',
      difference: 0,
      price: String(productStats.price_premium),
    },
    {
      label: 'Average Sale Price',
      difference: 0,
      price: String(productStats.avg_sale_price.toFixed()),
    },
    {
      label: 'No of Sales',
      difference: 0,
      value: productStats.no_of_sales,
    },
  ];
  
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
