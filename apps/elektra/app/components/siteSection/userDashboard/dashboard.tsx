import { TabView, tabViewData, Title } from '@elektra/ui';
import { Profile } from './profile';
import { Reward } from './reward/reward';
import { WishList } from './wishlist';

const tabViewData: tabViewData[] = [
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
    content: <Reward />,
  },
  {
    title: 'Wallet',
    content: 'hahas',
  },
  {
    title: 'Wishlist',
    content: <WishList />,
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
        <Title className="font-bold" color="black" order={4}>
          Huzafa Hanif
        </Title>
      </div>
      <div className="mx-16">
        <TabView data={tabViewData} />
      </div>
    </section>
  );
}
