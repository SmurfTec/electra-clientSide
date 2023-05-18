import { HoverCard, Only } from '@elektra/customComponents';
import { ActionIcon, Avatar, Burger, Container, Flex, Group, Menu, Text, clsx, createStyles } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ReactNode, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'tabler-icons-react';
import { LaptopMenu, PhoneMenu } from './menuContent';

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

const menuData = [
  {
    title: 'Laptops',
    content: <LaptopMenu />,
  },
  {
    title: 'Phones',
    content: <PhoneMenu />,
  },
  {
    title: 'Accessories',
    content: <LaptopMenu />,
  },
  {
    title: 'GPUs',
    content: <PhoneMenu />,
  },
  {
    title: 'Motherboards',
    content: <LaptopMenu />,
  },
  {
    title: 'CPUs',
    content: <PhoneMenu />,
  },
  {
    title: 'Cameras',
    content: <LaptopMenu />,
  },
  {
    title: 'Consoles',
    content: <PhoneMenu />,
  },
  {
    title: 'Brands',
    content: <LaptopMenu />,
  },
];

export const HeaderMenu = () => {
  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const [menuState, setMenuState] = useState<{ title: string; content: ReactNode }>();
  const handleItem = (item: { title: string; content: ReactNode }) => {
    setMenuState(item);
    toggle();
  };
  return (
    <>
      <Group
        mih={50}
        bg="rgba(217, 217, 217, 0.35)"
      >
        <Container size={1400} 
        className={clsx('md:space-x-14 xl:space-x-20   ', classes.flex)}>
          {menuData.map((item, index) => (
            <HoverCard key={index} target={<Text className="uppercase inline-block text-base cursor-pointer">{item.title}</Text>}>
              {item.content}
            </HoverCard>
          ))}
        </Container>
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
          <Flex align={'center'} className="py-3 md:py-0">
            <Menu.Target>
              <Burger mx={10} opened={opened} onClick={toggle} className={classes.burger} />
            </Menu.Target>
            <Text size={17} className="text-black font-bold md:hidden">
              Categories
            </Text>
          </Flex>
          <Menu.Dropdown>
            {menuData.map((item, index) => (
              <div key={index}>
                <Menu.Item onClick={() => handleItem(item)}>
                  <Group position="apart">
                    <Text className="text-white">{item.title}</Text>
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
                {menuData.length !== index + 1 && <Menu.Divider key={index} />}
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
            {menuState?.title}
          </Text>
        </Flex>
        <div style={{ backgroundColor: 'rgba(217, 217, 217, 0.35)' }}>{menuState?.content}</div>
      </Only>
    </>
  );
};
