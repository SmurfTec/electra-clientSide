import { Profile, Purchasing, Reward, Selling, Settings, Wallet, WishList } from '@elektra/components';
import { TabView, isAuthenticated, tabViewData } from '@elektra/customComponents';
import { RootState, useSelector } from '@elektra/store';
import { Title } from '@mantine/core';
import { NextPageContext } from 'next';

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
];
export async function getServerSideProps(context: NextPageContext) {
  const { req } = context;
  const isAuth = await isAuthenticated(req);
  if (!isAuth) {
    return { redirect: { permanent: false, destination: '/auth/login' } };
  }
  return { props: {} };
}

export default function UserDashboard() {
  const profile = useSelector((state: RootState) => state.entities.auth.profile);
  return (
    <div className="my-12">
      <div className="ml-2 md:ml-8 mb-4">
        <Title className="font-bold" color="black" order={4}>
          {`${profile?.firstname} ${profile?.lastname}`}
        </Title>
      </div>
      <div className=" md:mx-8">
        <TabView data={tabViewData} position="left" />
      </div>
    </div>
  );
}
