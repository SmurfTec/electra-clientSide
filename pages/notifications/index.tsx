import { FooterMenu, NotHeader, NotificationResult } from '@elektra/components';
import { baseURL } from '@elektra/customComponents';
import { RootState } from '@elektra/store';
import { Text } from '@mantine/core';
import { useSelector } from 'react-redux';

export default function Notifications() {
  const notification = useSelector((state: RootState) => state.entities.notification.list);
  return (
    <div>
      <NotHeader />
      <Text className="text-black font-bold text-xl ml-5 my-5">Notifications</Text>
      {notification?.map((not, index) => (
        <div key={index + not.resourceid}>
          <NotificationResult date={not?.updated_on} title={not?.message} image={baseURL + '/' + not.image} />
        </div>
      ))}
      <FooterMenu />
    </div>
  );
}
