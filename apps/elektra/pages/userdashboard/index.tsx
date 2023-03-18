import { Profile, Reward, Settings, WishList } from "@elektra/components";
import { TabView, tabViewData } from "@elektra/ui";
import { Title } from "@mantine/core";

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
      content: <Settings />,
    },
    {
      title: 'Logout',
      content: 'hey',
    },
  ];

export default function UserDashboard() {
    return (
        <div className="my-20">
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