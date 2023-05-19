import { ActionIcon, Avatar, Button, Center, Flex, Grid, Group, Menu, Text, createStyles } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { NextLink } from '@mantine/next';
import { ArrowNarrowRight, Bell, CaretDown, CaretUp, Search as IconSearch, Settings, User } from 'tabler-icons-react';
import { HeaderMenu } from './menuBar';
import { Notification } from './notification';
import { Search } from './search';
import { HeaderTopBar } from './topBar';

export const Header = () => {
  const [isMenuOpen, toggle] = useToggle<boolean>([false, true]);
  const [isSearchOpen, toggleSearch] = useToggle<boolean>([false, true]);
  const { classes } = useStylesMenu();
  return (
    <header>
      <HeaderTopBar />
      {isSearchOpen && <Search close={toggleSearch} />}
      <div className="md:px-8 px-4">
        {!isSearchOpen && (
          <Grid align='center' className="">
            <Grid.Col span={3}>
            <Menu
              onClose={toggle}
              classNames={classes}
              width={150}
              position="bottom-start"
              offset={0}
              keepMounted={false}
            >
              <Menu.Target>
                <ActionIcon onClick={() => toggle()} size={'xl'} className="space-x-1" variant="transparent">
                  <Settings size={35} color="black" strokeWidth={1} />
                  {isMenuOpen ? (
                    <CaretUp color="black" fill="black" size={10} />
                  ) : (
                    <CaretDown color="black" fill="black" size={10} />
                  )}
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item component={NextLink} href={'/faq'}>
                  FAQs
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item component={NextLink} href={'/how-it-works'}>
                  How it works
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item component={NextLink} href={'/contact'}>
                  Help
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
            </Grid.Col>
            <Grid.Col className='text-center' span={6}>
            <Text component={NextLink} href="/" color="black" className="font-bold">
              Elektra
            </Text>
            </Grid.Col>
            <Grid.Col span={3}>
            <Flex justify={"flex-end"} gap={8}>
              {/* <ActionIcon component={NextLink} className='hidden md:block' variant="transparent" size={'sm'} href={'/selling-search'}>
                <Avatar radius={'xl'} variant="filled" color="black" size={'sm'}>
                  <ShoppingCart size={15} strokeWidth={1} />
                </Avatar>
              </ActionIcon> */}
              <Button component={NextLink} className="hidden md:block" size={'xs'} href={'/selling-search'}>
                Sell Now
              </Button>

              <ActionIcon variant="transparent" className="block" size={'sm'} onClick={() => toggleSearch()}>
                <Avatar radius={'xl'} variant="filled" color="black" size={'sm'}>
                  <IconSearch size={15} strokeWidth={1} />
                </Avatar>
              </ActionIcon>
             <Notification />
              <Menu
                classNames={classes}
                width={100}
                closeOnClickOutside={true}
                position="bottom-end"
                withArrow
                arrowPosition="center"
                offset={5}
                keepMounted={false}
              >
                <Menu.Target>
                  <ActionIcon className="hidden md:block" variant="transparent" size={'sm'}>
                    <Avatar radius={'xl'} variant="filled" color="black" size={'sm'}>
                      <User size={15} strokeWidth={1} />
                    </Avatar>
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item component={NextLink} className="uppercase" href={'/auth/login'}>
                    Login
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item component={NextLink} className="uppercase" href={'/auth/signup'}>
                    Signup
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Flex>
            </Grid.Col>
          </Grid>
        )}
      </div>
      <HeaderMenu />
    </header>
  );
};

export const useStylesMenu = createStyles((theme) => ({
  item: {
    textAlign: 'center',
    color: 'white',
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
    borderColor: '#B4B4B4',
  },
  arrow: {
    border: 'unset',
  },
}));
