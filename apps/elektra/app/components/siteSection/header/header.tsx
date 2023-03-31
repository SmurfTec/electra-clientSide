import { ActionIcon, Avatar, Group, Menu, Title, createStyles } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { NextLink } from '@mantine/next';
import { Bell, CaretDown, CaretUp, Search, Settings, User } from 'tabler-icons-react';

export const Header = () => {
  const [isMenuOpen, toggle] = useToggle<boolean>([false, true]);
  const { classes } = useStyles();
  return (
    <header>
      <div className="px-12">
        <Group position="apart">
          <Menu classNames={classes} width={150} position="bottom-start" offset={0} keepMounted={false}>
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
              <Menu.Item component={NextLink} href={'/faq'}>FAQs</Menu.Item>
              <Menu.Divider />
              <Menu.Item component={NextLink} href={'/how-it-works'}>How it works</Menu.Item>
              <Menu.Divider />
              <Menu.Item component={NextLink} href={'/contact'}>Help</Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <Title order={3}>Dummay Logo</Title>
          <Group>
            <ActionIcon variant="transparent" size={'sm'}>
              <Avatar radius={'xl'} variant="filled" color="black" size={'sm'}>
                <Search size={15} strokeWidth={1} />
              </Avatar>
            </ActionIcon>
            <ActionIcon variant="transparent" size={'sm'}>
              <Avatar radius={'xl'} variant="filled" color="black" size={'sm'}>
                <Bell size={15} strokeWidth={1} />
              </Avatar>
            </ActionIcon>
            <ActionIcon variant="transparent" size={'sm'}>
              <Avatar radius={'xl'} variant="filled" color="black" size={'sm'}>
                <User size={15} strokeWidth={1} />
              </Avatar>
            </ActionIcon>
          </Group>
        </Group>
      </div>
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
    padding:'unset'
  },
  divider:{
    borderColor:'#B4B4B4',
  }
}));
