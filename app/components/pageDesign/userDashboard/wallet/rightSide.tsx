import { ItemCard, ItemCardProps } from '@elektra/components/card';
import { Avatar, Button, Center, Divider, Group, Menu, Paper, ScrollArea, Stack, Text, TextInput } from '@mantine/core';
import { useState } from 'react';
import { CaretDown, CaretUp, Number2, Search } from 'tabler-icons-react';

const itemCardData: ItemCardProps[] = [
  {
    color: 'black',
    company: 'AT&T',
    image: '/images/product.png',
    space: '128GB',
    title: 'Iphone 14 Pro Max',
    status: 'Sold',
    price: 1000,
    date: '29/10/10',
    sale: true,
  },
  {
    color: 'black',
    company: 'AT&T',
    image: '/images/product.png',
    space: '128GB',
    title: 'Iphone 14 Pro Max',
    status: 'Sold',
    price: 1000,
    date: '29/10/10',
    sale: true,
  },
  {
    color: 'black',
    company: 'AT&T',
    image: '/images/product.png',
    space: '128GB',
    title: 'Iphone 14 Pro Max',
    status: 'Sold',
    price: 1000,
    date: '29/10/10',
    sale: true,
  },
  {
    color: 'black',
    company: 'AT&T',
    image: '/images/product.png',
    space: '128GB',
    title: 'Iphone 14 Pro Max',
    status: 'Sold',
    price: 1000,
    date: '29/10/10',
    sale: true,
  },
  {
    color: 'black',
    company: 'AT&T',
    image: '/images/product.png',
    space: '128GB',
    title: 'Iphone 14 Pro Max',
    status: 'Sold',
    price: 1000,
    date: '29/10/10',
    sale: true,
  },
];

export const WalletRightSide = () => {
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState<string>('Sort By');
  const handleChange = (name: string) => {
    if (value === name) {
      setValue('Sort By');
      return;
    }
    console.log();
    setValue(name);
  };
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
            />
            <Center className="space-x-4">
              <Button
                styles={(theme)=>({
                  root: {
                    borderRadius: 20,
                    width: theme.fn.smallerThan(1150)?70: 90,
                  },
                })}
                className="text-[13px] md:text-base font-medium"
              >
                All
              </Button>
              <Button
                className="text-[13px] px-0 md:text-base font-medium text-black"
                bg={'rgba(241, 241, 241, 1)'}
                styles={(theme)=>({
                  root: {
                    borderRadius: 20,
                    width: theme.fn.smallerThan(1150)?115: 120,
                    '&:not([data-disabled]):hover': {
                      backgroundColor: 'rgba(241, 241, 241, 5)',
                    },
                  },
                })}
                rightIcon={
                  <Avatar size={16} radius={16} variant="filled" color="blue">
                    <Number2 size={12} />
                  </Avatar>
                }
              >
                Sales
              </Button>
              <Button
                className="text-[13px]  px-0 md:text-base font-medium text-black"
                bg={'rgba(241, 241, 241, 1)'}
                styles={(theme)=>({
                  root: {
                    borderRadius: 20,
                    width: theme.fn.smallerThan(1150)?100:115,
                    '&:not([data-disabled]):hover': {
                      backgroundColor: 'rgba(241, 241, 241, 5)',
                    },
                  },
                })}
              >
                Payouts
              </Button>
            </Center>
            <Text className="text-[10px] md:text-sm font-medium">
              Following Transactions has been processed
            </Text>
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
                className='text-[13px] md:text-base font-normal'
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
        {itemCardData.map((item, index) => (
          <div key={index}>
            <ItemCard
              color={item.color}
              company={item.company}
              image={item.image}
              space={item.space}
              title={item.title}
              date={item.date}
              price={item.price}
              sale={item.sale}
              key={index}
              status={item.status}
            />
            {itemCardData.length !== index + 1 && <Divider key={index+1} />}
          </div>
        ))}
        </ScrollArea>
      </Paper>
    </>
  );
};
