import { baseURL } from '@elektra/customComponents';
import { RootState, store } from '@elektra/store';
import { loadNotifications } from '@elektra/store/entities/slices/notification';
import { ActionIcon, Avatar, Center, Menu, Text } from '@mantine/core';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ArrowNarrowRight, Bell } from 'tabler-icons-react';
import { useStylesMenu } from '../header';
import { NotificationResult } from './notificationResult';

const notify = [1, 2, 3, 4, 5, 6, 7];

export const Notification = () => {
  const { classes } = useStylesMenu();
  const notification = useSelector((state: RootState) => state?.entities?.notification?.list);

  useEffect(() => {
    const fetchNotification = async () => await store.dispatch(loadNotifications());
    fetchNotification();
  }, []);
  console.log(notification);
  return (
    // <Only when={notification.length > 0}>
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
        <ActionIcon className="hidden md:block" variant="transparent" size={30}>
          <Avatar radius={'xl'} variant="filled" color="black" size={30}>
            <Bell size={18} strokeWidth={1} />
          </Avatar>
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label className="uppercase font-medium text-base text-white mt-2 ml-2">Notifications</Menu.Label>
        <Menu.Divider />
        {notification?.map((not, index) => (
          <div key={index + not.resourceid}>
            <Menu.Item>
              <NotificationResult
                date={not?.updated_on}
                title={not?.message}
                image={baseURL + '/' + not.image}
              />
            </Menu.Item>
          </div>
        ))}

        <Menu.Item>
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
    // </Only>
  );
};
