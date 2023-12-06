import { RootState, logout, useAppDispatch, useSelector } from '@elektra/store';
import { ActionIcon, Avatar, Button, Flex, Grid, Indicator, Menu, Text, createStyles } from '@mantine/core';
import { useDisclosure, useToggle } from '@mantine/hooks';
import { NextLink } from '@mantine/next';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { CaretDown, CaretUp, Search as IconSearch, Settings, User } from 'tabler-icons-react';
import { HeaderMenu } from './menuBar';
import { Notification } from './notification';
import { Search } from './search';
import { HeaderTopBar } from './topBar';
import { signOut } from 'next-auth/react';

export const Header = () => {
  const [isMenuOpen, { toggle }] = useDisclosure(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isUserAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [isSearchOpen, toggleSearch] = useToggle<boolean>([false, true]);
  const { classes } = useStylesMenu();
  useEffect(() => {
    router.prefetch('/auth/login');
  }, [router]);
  return (
    <header>
      <HeaderTopBar />
      {isSearchOpen && <Search close={toggleSearch} />}
      <div className="md:px-8 px-4">
        {!isSearchOpen && (
          <Grid align="center" className="">
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
                  <ActionIcon onClick={toggle} size={'xl'} className="space-x-1" variant="transparent">
                    <Settings size={70} color="black" strokeWidth={1} />
                    {isMenuOpen ? (
                      <CaretUp color="black" fill="black" size={20} />
                    ) : (
                      <CaretDown color="black" fill="black" size={20} />
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
            <Grid.Col className="text-center" span={6}>
              <Text component={NextLink} href="/" color="black" className="font-bold">
                Elektra
              </Text>
            </Grid.Col>
            <Grid.Col span={3}>
              <Flex justify={'flex-end'} gap={8}>
                <Button
                  className="rounded-3xl px-4 h-7 hover:bg-black"
                  styles={{
                    root: {
                      '&:not([data-disabled]):hover': {
                        backgroundColor: 'white',
                      },
                    },
                    rightIcon: {
                      marginLeft: 0,
                    },
                  }}
                  variant="outline"
                  component={NextLink}
                  href={`/shop`}
                >
                  Browse
                </Button>
                <Button
                  className="rounded-3xl px-4 h-7 hover:bg-black"
                  styles={{
                    root: {
                      '&:not([data-disabled]):hover': {
                        backgroundColor: 'white',
                      },
                    },
                    rightIcon: {
                      marginLeft: 0,
                    },
                  }}
                  variant="outline"
                  component={NextLink}
                  href={`selling-search`}
                >
                  Sell
                </Button>
                <Button
                  className="rounded-3xl px-4 h-7 hover:bg-black"
                  styles={{
                    root: {
                      '&:not([data-disabled]):hover': {
                        backgroundColor: 'white',
                      },
                    },
                    rightIcon: {
                      marginLeft: 0,
                    },
                  }}
                  variant="outline"
                  component={NextLink}
                  href={`/unavailable-item/request`}
                >
                  Request Product
                </Button>

                <Button
                  className="rounded-3xl px-4 h-7 hover:bg-black"
                  styles={{
                    root: {
                      '&:not([data-disabled]):hover': {
                        backgroundColor: 'white',
                      },
                    },
                    rightIcon: {
                      marginLeft: 0,
                    },
                  }}
                  variant="outline"
                  component={NextLink}
                  href={`/contact`}
                >
                  Help
                </Button>
                <ActionIcon variant="transparent" className="block" size={30} onClick={() => toggleSearch()}>
                  <Avatar radius={'xl'} variant="filled" color="black" size={30}>
                    <IconSearch size={18} strokeWidth={1} />
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
                    <ActionIcon className="hidden md:block" variant="transparent" size={30}>
                      <Indicator color="rgba(60, 130, 214, 1)" offset={3} disabled={!isUserAuthenticated}>
                        <Avatar radius={'xl'} variant="filled" color="black" size={30}>
                          <User size={18} strokeWidth={1} />
                        </Avatar>
                      </Indicator>
                    </ActionIcon>
                  </Menu.Target>
                  {isUserAuthenticated ? (
                    <Menu.Dropdown>
                      <Menu.Item component={NextLink} className="uppercase" href={'/userdashboard?tab=selling'}>
                        Selling
                      </Menu.Item>
                      <Menu.Divider />
                      <Menu.Item component={NextLink} className="uppercase" href={'/userdashboard?tab=purchasing'}>
                        Purchasing
                      </Menu.Item>
                      <Menu.Divider />
                      <Menu.Item component={NextLink} className="uppercase" href={'/userdashboard?tab=wishlist'}>
                        wishlist
                      </Menu.Item>
                      <Menu.Divider />
                      <Menu.Item component={NextLink} className="uppercase" href={'/userdashboard?tab=wallet'}>
                        Wallet
                      </Menu.Item>
                      <Menu.Divider />
                      <Menu.Item component={NextLink} className="uppercase" href={'/userdashboard?tab=settings'}>
                        settings
                      </Menu.Item>
                      <Menu.Divider />
                      <Menu.Item
                        onClick={() => {
                          signOut({ redirect: false });
                          deleteCookie('authentication');
                          deleteCookie('refresh');
                          setTimeout(() => {
                            router.push('/auth/login', undefined, { shallow: true });
                          }, 2000);
                          setTimeout(() => {
                            router.push('/auth/login', undefined, { shallow: true });
                            dispatch(logout());
                          }, 3000);
                        }}
                        className="uppercase"
                      >
                        logout
                      </Menu.Item>
                    </Menu.Dropdown>
                  ) : (
                    <Menu.Dropdown>
                      <Menu.Item component={NextLink} className="uppercase" href={'/auth/login'}>
                        Login
                      </Menu.Item>
                      <Menu.Divider />
                      <Menu.Item component={NextLink} className="uppercase" href={'/auth/signup'}>
                        Signup
                      </Menu.Item>
                    </Menu.Dropdown>
                  )}
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
