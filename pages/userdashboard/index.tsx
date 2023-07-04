import { Profile, Purchasing, Reward, Selling, Settings, Wallet, WishList } from '@elektra/components';
import { TabView, isAuthenticated, tabViewData } from '@elektra/customComponents';
import {
  RootState,
  initStore,
  loadUserFavourite,
  loadUserReward,
  rehydrateUserFavourite,
  rehydrateUserReward,
  useAppDispatch,
  useSelector,
} from '@elektra/store';
import type { UserFavourite, UserReward } from '@elektra/types';
import { Title } from '@mantine/core';
import { NextPageContext } from 'next';
import { useEffect } from 'react';

export async function getServerSideProps({ req }: NextPageContext) {
  const isAuth = await isAuthenticated(req);
  if (!isAuth) {
    return { redirect: { permanent: false, destination: '/auth/login' } };
  }


  const store = initStore();


  const userFavourite = store.dispatch(loadUserFavourite());
  const userReward = store.dispatch(loadUserReward());

  await Promise.all([userFavourite, userReward]);

  return {
    props: {
      userRewardData: store.getState().entities.userReward.list,
      userFavouriteData: store.getState().entities.userFavourite.list,
    },
  };
}

type UserDashBoardPageProps = {
  userRewardData: UserReward[];
  userFavouriteData: UserFavourite;
};

export default function UserDashboard({ userRewardData, userFavouriteData }: UserDashBoardPageProps) {
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
  const profile = useSelector((state: RootState) => state.auth.profile);
  const dispatch = useAppDispatch();
  useEffect(() => {
    let unsubscribe = false;
    if (!unsubscribe) {
      dispatch(rehydrateUserReward(userRewardData));
      dispatch(rehydrateUserFavourite(userFavouriteData));
    }
    return () => {
      unsubscribe = true;
    };
  }, []);
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
