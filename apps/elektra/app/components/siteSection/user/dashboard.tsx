import { TabView, tabViewData, Title, useTheme } from '@elektra/ui';
import { Profile } from './profile';

const tabViewData:tabViewData[] = [
  {
    title: 'Profile',
    content: <Profile />,
  },
  {
    title: 'Selling',
    content: 'hey',
  },
  {
    title: 'Purchasing',
    content: 'hey',
  },
  {
    title: 'Rewards',
    content: 'hey',
  },
  {
    title: 'Wallet',
    content: 'hey',
  },
  {
    title: 'Wishlist',
    content: 'hey',
  },
  {
    title: 'Settings',
    content: 'hey',
  },
  {
    title: 'Logout',
    content: 'hey',
  },
];

export function UserDashboard() {
  return (
    <section>
      <div className="ml-16 mb-4">
        <Title className="font-bold" color='black' order={4}>
          Huzafa Hanif
        </Title>
      </div>
      <div className="mx-16">
        <TabView data={tabViewData} />
      </div>
    </section>
  );
}
