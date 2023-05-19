import { ActionIcon, Avatar, Center, Menu, Text } from '@mantine/core';
import { useState } from 'react';
import { ArrowNarrowRight, Bell } from 'tabler-icons-react';
import { useStylesMenu } from '../header';
import { NotificationResult } from './notificationResult';

const notify = [1, 2, 3, 4, 5, 6, 7];

export const Notification = () => {
  const { classes } = useStylesMenu();
  const [data, setData] = useState(3);
  return (
    <Menu
      classNames={classes}
      width={450}
      closeOnClickOutside={true}
      position="bottom-end"
      withArrow
      arrowPosition="center"
      offset={5}
      closeOnItemClick={false}
      arrowOffset={40}
      keepMounted={false}
    >
      <Menu.Target>
        <ActionIcon className="hidden md:block" variant="transparent" size={'sm'}>
          <Avatar radius={'xl'} variant="filled" color="black" size={'sm'}>
            <Bell size={15} strokeWidth={1} />
          </Avatar>
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label className="uppercase font-medium text-base text-white mt-2 ml-2">Notifications</Menu.Label>
        <Menu.Divider />
        {notify.slice(0, data).map((not, index) => (
          <div key={index}>
            <Menu.Item>
              <NotificationResult />
            </Menu.Item>
            {notify.slice(0, data).length !== index + 1 && <Menu.Divider mx={20} opacity={0.5} key={index + 1} />}
          </div>
        ))}

        <Menu.Item onClick={() => setData((prev) => prev + 1)}>
          <Center inline>
            <Text color="white" mr={8}>
              View All
            </Text>
            <Avatar
              radius={'lg'}
              variant="outline"
              color="white"
              size={'sm'}
              styles={{
                root: {
                  width: 60,
                  border: '1px solid white',
                },
              }}
            >
              <ArrowNarrowRight size={30} color="white" strokeWidth={1} />
            </Avatar>
          </Center>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
