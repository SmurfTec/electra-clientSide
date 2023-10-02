import { Profile, Purchasing, Reward, Selling, Settings, Wallet, WishList } from '@elektra/components';
import { TabView, isAuthenticated, tabViewData } from '@elektra/customComponents';
import {
  RootState,
  initStore,
  loadOrderPurchasing,
  loadOrderSelling,
  loadPayouts,
  loadUserFavourite,
  loadUserReward,
  rehydrateOrderPurchasing,
  rehydrateOrderSelling,
  rehydratePayouts,
  rehydrateUserFavourite,
  rehydrateUserReward,
  useAppDispatch,
  useSelector,
} from '@elektra/store';
import type { Payouts, PurchasingOrders, SellingOrders, UserFavourite, UserReward } from '@elektra/types';
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
  const userReward = await store.dispatch(loadUserReward());
  const orderPurchasing = store.dispatch(loadOrderPurchasing());
  const orderSelling = store.dispatch(loadOrderSelling());

  const payouts = store.dispatch(loadPayouts())

  await Promise.all([userFavourite, userReward, orderPurchasing,orderSelling]);
  return {
    props: {
      userRewardData: store.getState().entities.userReward.list,
      userFavouriteData: store.getState().entities.userFavourite.list,
      orderPurchasingData: store.getState().entities.purchasingOrders.list,
      orderSellingData: store.getState().entities.sellingOrders.list,
      payouts: store.getState().entities.payouts.list
    },
  };
}

type UserDashBoardPageProps = {
  userRewardData: UserReward[];
  userFavouriteData: UserFavourite;
  orderPurchasingData: PurchasingOrders;
  orderSellingData: SellingOrders;
  payouts: Payouts[]
};

export default function UserDashboard({
  userRewardData,
  userFavouriteData,
  orderPurchasingData,
  orderSellingData,
  payouts
}: UserDashBoardPageProps) {
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
      dispatch(rehydrateOrderPurchasing(orderPurchasingData));
      console.log(orderSellingData,"orderSellingData")
      dispatch(rehydrateOrderSelling(orderSellingData));
      dispatch(rehydratePayouts(payouts))
      }
    return () => {
      unsubscribe = true;
    };
  }, []);
  return (
    <div className="my-12">
      <div className="mb-4 ml-2 md:ml-8">
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
