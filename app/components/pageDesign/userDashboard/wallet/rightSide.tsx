import { ItemCard } from '@elektra/components/card';
import {
  RootState,
  loadOrderSelling,
  loadOrderSellingSearch,
  loadPayoutSearch,
  loadPayouts,
  store,
  useAppDispatch,
} from '@elektra/store';
import { Button, Center, Divider, Group, Menu, Paper, ScrollArea, Stack, Text, TextInput } from '@mantine/core';
import _ from 'lodash';
import moment from 'moment';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { CaretDown, CaretUp, Search } from 'tabler-icons-react';

export const WalletRightSide = () => {
  const dispatch = useAppDispatch();
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState<string>('Sort By');
  const handleChange = (name: string) => {
    if (value === name) {
      setValue('Sort By');
      return;
    }
    setValue(name);
  };

  const [toggle, setToogle] = useState<'Sales' | 'Payouts'>('Sales');

  const { sellingCompletedOrders } = useSelector((state: RootState) => state.entities.sellingOrders.list);
  const payouts = useSelector((state: RootState) => state.entities.payouts.list);
  const data = useMemo(
    () =>
      toggle === 'Sales'
        ? sellingCompletedOrders.orders.map((item) => ({
            image: '/images/product.png',
            title: item?.product?.title || '',
            status: 'Sold',
            price: item.highest_offer,
            date: moment(item.created_on).format('DD/MM/YYYY'),
            variants: item.product_variants,
            sale: true,
          }))
        : payouts.map((item) => ({
            image: null,
            title: `${item.user.firstname} ${item?.user?.lastname}`,
            status: '',
            price: item.amount,
            date: moment(item.created_on).format('DD/MM/YYYY'),
            variants: [],
            sale: false,
          })),
    [toggle]
  );

  const handleSearch = _.debounce((search: string) => {
    if (search == '') {
      store.dispatch(loadOrderSelling());
      store.dispatch(loadPayouts());
    }
    toggle === 'Sales' ? dispatch(loadOrderSellingSearch(search)) : dispatch(loadPayoutSearch(value));
  }, 500);

  return (
    <>
      <Paper withBorder radius={20} p={20}>
        <Group position="apart" align="top">
          <Stack align="start" spacing={20}>
            <TextInput
              styles={{ input: { backgroundColor: '#F1F1F1' } }}
              radius={'md'}
              size="xl"
              icon={<Search />}
              placeholder="Search by Id, name"
              onChange={(e) => handleSearch(e.target.value)}
            />
            <Center className="space-x-4">
              {/* <Button
                styles={(theme) => ({
                  root: {
                    borderRadius: 20,
                    width: theme.fn.smallerThan(1150) ? 70 : 90,
                  },
                })}
                className="text-[13px] md:text-base font-medium"
              >
                All
              </Button> */}
              <Button
                onClick={() => setToogle('Sales')}
                className="text-[13px] px-0 md:text-base font-medium text-black"
                bg={toggle !== 'Sales' ? 'rgba(241, 241, 241, 1)' : undefined}
                styles={(theme) => ({
                  root: {
                    borderRadius: 20,
                    color: toggle === 'Sales' ? 'white !important' : undefined,
                    width: 120,
                    '&:not([data-disabled]):hover': {
                      backgroundColor: toggle === 'Sales' ? 'black' : 'rgba(241, 241, 241, 5)',
                    },
                  },
                })}
                rightIcon={
                  // <Avatar size={16} radius={16} variant="filled" color="blue">
                  //   <Number2 size={12} />
                  // </Avatar>
                  <span className="rounded-full bg-[#0091ff] text-xs text-white relative w-5 h-5">
                    <span className="absolute -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2">
                      {Number(sellingCompletedOrders?.orderStats[0].completed_sales)}
                    </span>
                  </span>
                }
              >
                Sales
              </Button>
              <Button
                onClick={() => setToogle('Payouts')}
                className="text-[13px]  px-0 md:text-base font-medium text-black"
                bg={toggle !== 'Payouts' ? 'rgba(241, 241, 241, 1)' : undefined}
                styles={(theme) => ({
                  root: {
                    borderRadius: 20,
                    width: 115,
                    color: toggle === 'Payouts' ? 'white !important' : undefined,
                    '&:not([data-disabled]):hover': {
                      backgroundColor: toggle === 'Payouts' ? 'black' : 'rgba(241, 241, 241, 5)',
                    },
                  },
                })}
              >
                Payouts
              </Button>
            </Center>
            <Text className="text-[10px] md:text-sm font-medium">Following Transactions has been processed</Text>
          </Stack>
          <Menu
            closeOnItemClick={true}
            offset={10}
            opened={opened}
            withinPortal={true}
            radius={0}
            width={110}
            styles={{
              dropdown: {
                border: '1.5px solid black',
                borderRadius: '10px',
              },
              divider: {
                borderTop: '1px solid rgba(101, 101, 101, 1) !important',
                width: '100% !important',
              },
            }}
            position="bottom"
            onChange={setOpened}
          >
            <Menu.Target>
              <Button
                variant="outline"
                className="text-[13px] md:text-base font-normal"
                rightIcon={opened ? <CaretUp size={15} /> : <CaretDown size={15} />}
                styles={{
                  root: {
                    borderRadius: 25,
                  },
                }}
              >
                {value}
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item className="text-base text-black font-normal" onClick={() => handleChange('Newest')}>
                Newest
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item className="text-base font-normal" onClick={() => handleChange('Completed')}>
                Completed
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
        <Divider my={20} />
        <ScrollArea h={290}>
          {data.map((item, index) => (
            <div key={index}>
              <ItemCard
                image={item.image}
                productVariants={item.variants || []}
                title={item.title}
                date={item.date}
                price={item.price}
                sale={item.sale}
                key={index}
                status={item.status}
              />
              {data.length !== index + 1 && <Divider key={index + 1} />}
            </div>
          ))}
        </ScrollArea>
      </Paper>
    </>
  );
};
