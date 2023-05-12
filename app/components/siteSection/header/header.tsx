import { ActionIcon, Avatar, Button, Center, Flex, Group, Menu, Text, createStyles } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { NextLink } from '@mantine/next';
import { ArrowNarrowRight, Bell, CaretDown, CaretUp, Search as IconSearch, Settings, ShoppingCart, User } from 'tabler-icons-react';
import { HeaderMenu } from './menuBar';
import { Notification } from './notification';
import { HeaderTopBar } from './topBar';
import { Search } from './search';

export const Header = () => {
  const [isMenuOpen, toggle] = useToggle<boolean>([false, true]);
  const [isSearchOpen, toggleSearch] = useToggle<boolean>([false, true]);
  const { classes } = useStyles();
  return (
    <header>
      <HeaderTopBar />
        {isSearchOpen && (
          <Search close={toggleSearch} />
        )}
        <div className="md:px-8 px-4">
        {!isSearchOpen && (
          <Group position="apart" className="py-4">
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
            <Text component={NextLink} href="/" color="black" className="font-bold md:ml-10">
              Elektra
            </Text>
            <Flex gap={8}>
              
            <ActionIcon component={NextLink} className='hidden md:block' variant="transparent" size={'sm'} href={'/selling-search'}>
                <Avatar radius={'xl'} variant="filled" color="black" size={'sm'}>
                  <ShoppingCart size={15} strokeWidth={1} />
                </Avatar>
              </ActionIcon>
              
              <ActionIcon variant="transparent" className='block' size={'sm'} onClick={() => toggleSearch()}>
                <Avatar radius={'xl'} variant="filled" color="black" size={'sm'}>
                  <IconSearch size={15} strokeWidth={1} />
                </Avatar>
              </ActionIcon>
              <Menu
                classNames={classes}
                width={450}
                closeOnClickOutside={true}
                position="bottom-end"
                withArrow
                arrowPosition="center"
                offset={5}
                arrowOffset={40}
                keepMounted={false}
              >
                <Menu.Target>
                  <ActionIcon className='hidden md:block' variant="transparent" size={'sm'}>
                    <Avatar radius={'xl'} variant="filled" color="black" size={'sm'}>
                      <Bell size={15} strokeWidth={1} />
                    </Avatar>
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label className="uppercase font-medium text-base text-white mt-2 ml-2">
                    Notifications
                  </Menu.Label>
                  <Menu.Divider />
                  <Menu.Item>
                    <Notification />
                  </Menu.Item>
                  <Menu.Divider mx={20} opacity={0.5} />
                  <Menu.Item>
                    <Notification />
                  </Menu.Item>
                  <Menu.Item>
                    <Center component={NextLink} href="/shop">
                      <Text color="white" mr={8}>
                        View All
                      </Text>
                      <Button
                        className="rounded-3xl px-4 h-7"
                        styles={{
                          root: {
                            borderColor: 'white',
                            '&:not([data-disabled]):hover': {
                              backgroundColor: 'unset',
                            },
                          },
                          rightIcon: {
                            marginLeft: 0,
                          },
                        }}
                        color="white"
                        rightIcon={<ArrowNarrowRight size={30} color="white" strokeWidth={1} />}
                        variant="outline"
                      />
                    </Center>
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>

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
                  <ActionIcon className='hidden md:block' variant="transparent" size={'sm'}>
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
          </Group>
        )}
      </div>
      <HeaderMenu />
    </header>
  );
};

const useStyles = createStyles((theme) => ({
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
