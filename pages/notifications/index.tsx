import { NotHeader, Notification } from '@elektra/components';
import { Divider, Text } from '@mantine/core';

export default function Notifications() {
  return (
    <div >
      <NotHeader />
      <Text className="text-black font-bold text-xl ml-5 my-5">Notifications</Text>
      <Notification />
      <Divider my={20}/>
      <Notification />
      <Divider my={20}/>
      <Notification />
      <Divider my={20}/>
      <Notification />
    </div>
  );
}
