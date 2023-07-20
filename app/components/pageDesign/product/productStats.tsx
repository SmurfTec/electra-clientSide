import { RootState } from '@elektra/store';
import { Divider, Group, Paper } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useSelector } from 'react-redux';
import { Stats } from './stats';

type ProductStatsProps = {
  condition: 'new' | 'used';
};

export const ProductStats = ({ condition }: ProductStatsProps) => {
  const phone = useMediaQuery('(max-width: 600px)');

  const productStats = useSelector((state: RootState) => state.entities.productDetail?.list?.stats?.stats) || {};
  const listingStats = useSelector((state: RootState) => state.entities.productListingById.list.listing_stats);

  const statDataUsed = [
    {
      label: 'Current Listings',
      difference: Number(listingStats?.total_listings_percentage).toFixed(),
      price: listingStats?.total_listings,
      type: 'value',
    },
    {
      label: 'Total Sold',
      difference: Number(listingStats?.total_sold_percentage).toFixed() || 0,
      price: listingStats?.total_sold,
      type: 'value',
    },
    {
      label: 'Average Sale Price',
      difference: (
        Number(listingStats?.total_amount_sold_percentage) / Number(listingStats.total_sold_percentage)
      ).toFixed(),
      price: (Number(listingStats?.total_amount_sold) / listingStats?.total_sold).toFixed(),
      type: 'price',
    },
    {
      label: 'Total Amount From Sales',
      difference: Number(listingStats?.total_amount_sold_percentage).toFixed(),
      price: listingStats?.total_amount_sold,
      type: 'price',
    },
  ];

  const statDataNew = [
    {
      label: '12 month trade range',
      difference: 0,
      price: `${productStats?.trade_range[0]?.max_saleprice} - $${productStats.trade_range[0].max_saleprice}`,
      type: 'price',
    },
    {
      label: 'Price Premium',
      difference: productStats?.price_premium_percentage?.toFixed(),
      price: String(productStats?.price_premium),
      type: 'price',
    },
    {
      label: 'Average Sale Price',
      difference: productStats?.average_saleprice_percentage?.toFixed(),
      price: String(productStats?.avg_sale_price?.toFixed() || 404),
      type: 'price',
    },
    {
      label: 'No of Sales',
      difference: productStats.no_of_sales_percentage?.toFixed(),
      price: productStats?.no_of_sales,
      type: 'value',
    },
  ];

  const statData = condition === 'new' ? statDataNew : statDataUsed;
  return (
    <div>
      <Paper radius={0} withBorder py={10}>
        <Group position="apart" px={phone ? 0 : 60}>
          {statData.map((item, key) => (
            <span
              key={key}
              className="md:flex md:space-x-4 text-center md:text-left min-w-[100%] md:min-w-max md:max-w-[20%]"
            >
              <Stats
                difference={item.difference}
                label={item.label}
                price={String(item.price)}
                type={item.type as 'price' | 'value'}
              />
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
