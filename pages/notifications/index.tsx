import { FooterMenu, NotHeader, Notification, NotificationResult } from '@elektra/components';
import { Divider, Text } from '@mantine/core';

export default function Notifications() {
  return (
    <div >
      <NotHeader />
      <Text className="text-black font-bold text-xl ml-5 my-5">Notifications</Text>
      <NotificationResult />
      <Divider my={20}/>
      <NotificationResult />
      <Divider my={20}/>
      <NotificationResult />
      <Divider my={20}/>
      <NotificationResult />
      <FooterMenu />
    </div>
  );
}
