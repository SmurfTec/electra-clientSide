import { Profile, Purchasing, Reward, Selling, Settings, Wallet, WishList } from '@elektra/components';
import { TabView, tabViewData } from '@elektra/customComponents';
import { Title } from '@mantine/core';

const tabViewData: tabViewData[] = [
  {
    title: 'Profile',
    content: <Profile />,
  },
  {
    title: 'Selling',
    content: <Selling />,
  },
  {
    title: 'Purchasing',
    content: <Purchasing />,
  },
  {
    title: 'Rewards',
    content: <Reward />,
  },
  {
    title: 'Wallet',
    content: <Wallet />,
  },
  {
    title: 'Wishlist',
    content: <WishList />,
  },
  {
    title: 'Settings',
    content: <Settings />,
  },
  {
    title: 'Logout',
    content: 'hey',
  },
];

export default function UserDashboard() {
  return (
    <div className="my-12">
      <div className="ml-8 mb-4">
        <Title className="font-bold" color="black" order={4}>
          Huzafa Hanif
        </Title>
      </div>
      <div className="mx-8">
        <TabView data={tabViewData} />
      </div>
    </div>
  );
}
