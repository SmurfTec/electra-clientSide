import { Burger, Container, Flex, HoverCard, Menu, Text, clsx, createStyles } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { LaptopMenu } from './laptopMenu';

const useStyles = createStyles((theme) => ({
  burger: {
    [theme.fn.largerThan(809)]: {
      display: 'none',
    },
  },

  flex: {
    [theme.fn.smallerThan(810)]: {
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
    paddingRight: 40,
    paddingLeft: 40,
    fontSize: 22,
    height: 72,
    textAlign:'center',
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

export const HeaderMenu = () => {
  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <>
      <Flex
        mih={50}
        bg="rgba(217, 217, 217, 0.35)"
        className={clsx('xl:space-x-20 lg:space-x-14 space-x-3', classes.flex)}
        justify="center"
        align="center"
        direction="row"
        wrap="nowrap"
      >
        <HoverCard
          shadow={undefined}
          radius={0}
          withinPortal
          styles={{
            dropdown: {
               width: '100% !important',
               backgroundColor:'#e8e8e8 !important',
               opacity:1,
            },
          }}
        >
          <HoverCard.Target>
            <Text className="uppercase text-base cursor-pointer">Laptops</Text>
          </HoverCard.Target>
          <HoverCard.Dropdown mt={5} bg="rgba(217, 217, 217, 0.35)">
            <LaptopMenu/>
          </HoverCard.Dropdown>
          <Text className="uppercase text-base cursor-pointer">Phones</Text>
          <Text className="uppercase text-base cursor-pointer">Accessories</Text>
          <Text className="uppercase text-base cursor-pointer">GPUs</Text>
          <Text className="uppercase text-base cursor-pointer">Motherboards</Text>
          <Text className="uppercase text-base cursor-pointer">CPUs</Text>
          <Text className="uppercase text-base cursor-pointer">Cameras</Text>
          <Text className="uppercase text-base cursor-pointer">Consoles</Text>
          <Text className="uppercase text-base cursor-pointer">Brands</Text>
        </HoverCard>
      </Flex>
      <div className="text-center" style={{ backgroundColor: 'rgba(217, 217, 217, 0.35)' }}>
        <Menu
          opened={opened}
          closeOnItemClick={true}
          defaultOpened={false}
          keepMounted={false}
          radius={0}
          classNames={classes}
          width="100%"
          position="bottom-end"
          offset={0}
        >
          <Menu.Target>
            <Burger opened={opened} onClick={toggle} className={classes.burger} />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item>Laptops</Menu.Item>
            <Menu.Divider />
            <Menu.Item component="a" href="/pasa-for-distributor">
              Phones
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item component="a" href="/games">
              Accessories
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item component="a" href="/how-it-works">
              GPUs
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item component="a" href="/about">
              Motherboards
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item component="a" href="/contact">
              CPUs
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item component="a" href="/about">
              Cameras
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item component="a" href="/about">
              Consoles
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item component="a" href="/about">
              Brands
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </>
  );
};
