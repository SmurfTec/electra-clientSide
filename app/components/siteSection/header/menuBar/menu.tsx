import { HoverCard, Only } from '@elektra/customComponents';
import { RootState, useSelector } from '@elektra/store';
import { ActionIcon, Avatar, Burger, Flex, Group, Menu, Text, clsx, createStyles } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NextLink } from '@mantine/next';
import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'tabler-icons-react';
import { LaptopMenu } from './menuContent';

const useStyles = createStyles((theme) => ({
  burger: {
    [theme.fn.largerThan(840)]: {
      display: 'none',
    },
  },
  menuTarget: {
    paddingTop: 'unset',
    paddingBottom: 'unset',
    [theme.fn.smallerThan(841)]: {
      paddingTop: '0.75rem',
      paddingBottom: '0.75rem',
    },
  },
  flex: {
    [theme.fn.smallerThan(841)]: {
      display: 'none',
    },
  },
  group: {
    display: 'block',
    [theme.fn.smallerThan(841)]: {
      display: 'none',
    },
  },
  button: {
    fontSize: '16px',
    fontWeight: 'bold',
    [theme.fn.smallerThan(810)]: {
      display: 'none',
    },
  },
  item: {
    paddingRight: 20,
    paddingLeft: 20,
    fontSize: 22,
    height: 72,
    textAlign: 'center',
    color: 'white',
    border: 'unset',
    '&[data-hovered]': {
      backgroundColor: 'unset',
    },
  },
  dropdown: {
    backgroundColor: 'black',
    border: 'unset',
    padding: 'unset',
  },
  divider: {
    borderColor: '#E4E4E4',
  },
}));

// const menuData = [
//   {
//     title: 'Laptops',
//     content: <LaptopMenu />,
//   },
//   {
//     title: 'Phones',
//     content: <PhoneMenu />,
//   },
//   {
//     title: 'Accessories',
//     content: <LaptopMenu />,
//   },
//   {
//     title: 'GPUs',
//     content: <PhoneMenu />,
//   },
//   {
//     title: 'Motherboards',
//     content: <LaptopMenu />,
//   },
//   {
//     title: 'CPUs',
//     content: <PhoneMenu />,
//   },
//   {
//     title: 'Cameras',
//     content: <LaptopMenu />,
//   },
//   {
//     title: 'Consoles',
//     content: <PhoneMenu />,
//   },
//   {
//     title: 'Brands',
//     content: <LaptopMenu />,
//   },
// ];

export const HeaderMenu = () => {
  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const [menuState, setMenuState] = useState<{
    category: string;
    brands: { title: string; image: string; id: number }[];
  }>();
  const handleItem = (category: string, brands: { title: string; image: string; id: number }[]) => {
    setMenuState({ category: category, brands: brands });
    toggle();
  };

  const categories = useSelector((state: RootState) => state.entities.genericCategory.list.categories);

  return (
    <>
      <Group mih={50} bg="rgba(217, 217, 217, 0.35)" className={classes.group}>
        <Flex className="pt-3 justify-center space-x-5 lg:space-x-12">
          {categories?.map((item, index) => (
            <HoverCard
              key={index}
              target={
                <Text
                  component={NextLink}
                  href={`/shop?category=${item.id}`}
                  className="uppercase inline-block text-base cursor-pointer"
                >
                  {item.name}
                </Text>
              }
            >
              <LaptopMenu brands={item.brands} />
            </HoverCard>
          ))}
        </Flex>
      </Group>
      <div style={{ backgroundColor: 'rgba(217, 217, 217, 0.35)' }}>
        <Menu
          opened={opened}
          keepMounted={false}
          radius={0}
          classNames={classes}
          width="100%"
          position="bottom-end"
          offset={5}
        >
          <Flex align={'center'} className={classes.menuTarget}>
            <Menu.Target>
              <Burger mx={10} opened={opened} onClick={toggle} className={classes.burger} />
            </Menu.Target>
            <Text size={17} className={clsx('text-black font-bold', classes.burger)}>
              Categories
            </Text>
          </Flex>
          <Menu.Dropdown>
            {categories?.map((item, index) => (
              <div key={index}>
                <Menu.Item onClick={() => handleItem(item.name, item.brands)}>
                  <Group position="apart">
                    <Text className="text-white">{item.name}</Text>
                    <Avatar
                      variant="outline"
                      size={'sm'}
                      styles={{
                        root: {
                          border: '2px solid white',
                        },
                      }}
                      radius={20}
                    >
                      <ArrowRight color="white" />
                    </Avatar>
                  </Group>
                </Menu.Item>
                {categories.length !== index + 1 && <Menu.Divider key={index} />}
              </div>
            ))}
          </Menu.Dropdown>
        </Menu>
      </div>
      <Only when={menuState != undefined}>
        <Flex gap={5} bg={'black'} className="py-1" align={'center'}>
          <ActionIcon size={50} onClick={() => setMenuState(undefined)}>
            <ArrowLeft fill="white" color="white" className="ml-1" />
          </ActionIcon>
          <Text size={18} className="font-medium text-white">
            {menuState?.category}
          </Text>
        </Flex>
        <div style={{ backgroundColor: 'rgba(217, 217, 217, 0.35)' }}>
          <LaptopMenu brands={menuState?.brands} />
        </div>
      </Only>
    </>
  );
};
