import {
  BiddingSummary,
  BiddingSummaryProps,
  PageTitle,
  ProductDetail,
  ProtectPlan,
  SummaryFooter,
} from '@elektra/components';
import { isAuthenticated } from '@elektra/customComponents';
import { RootState, initStore, useAppDispatch, useSelector } from '@elektra/store';
import { loadProtectionPlan, rehydrateProtectionPlan } from '@elektra/store/entities/slices/protectionPlan';
import { ProtectionPlan } from '@elektra/types';

import { Grid, Radio } from '@mantine/core';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const productDetailData = {
  image: '/images/product.png',
  title: 'Iphone 14 Pro Max',
  space: '128 GB',
  color: 'Black',
  company: 'AT&T',
  condition: 'New',
  expiration: '23/10/2023',
  cardDetails: '3646 **** **** ****',
  address: '16 Street , Town Abc, City, USA , 213434',
  saleDate: '23/10/2023',
};

const protectPlanData = {
  title: '13 Month Protect Plan',
  price: 50.0,
  content: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus venenatis velit at tellus varius porttitor.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus venenatis velit at tellus varius porttitor.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus venenatis velit at tellus varius porttitor.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus venenatis velit at tellus varius porttitor.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus venenatis velit at tellus varius porttitor.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus venenatis velit at tellus varius porttitor.',
  ],
};

const protectPlanData2 = {
  title: '24 Month Protect Plan',
  price: 100.0,
  content: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus venenatis velit at tellus varius porttitor.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus venenatis velit at tellus varius porttitor.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus venenatis velit at tellus varius porttitor.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus venenatis velit at tellus varius porttitor.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus venenatis velit at tellus varius porttitor.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus venenatis velit at tellus varius porttitor.',
  ],
};

const BiddingSummaryData: BiddingSummaryProps = {
  yourOffer: 437,
  marketPlaceFee: 5,
  salesTax: 3,
  shippingFee: 15,
  discount: 0,
  totalPrice: 460,
};

export async function getServerSideProps({ req }: NextPageContext) {
  const isAuth = await isAuthenticated(req);
  if (!isAuth) {
    return { redirect: { permanent: false, destination: '/auth/login' } };
  }
  const store = initStore();
  const { isError, data } = await store.dispatch(loadProtectionPlan());
  if (isError) return { props: { protectionPlanData: [] } };
  return { props: { protectionPlanData: data } };
}

type BuyingSummaryPageProps = {
  protectionPlanData: ProtectionPlan[];
};

export default function BuyingSummary({ protectionPlanData }: BuyingSummaryPageProps) {
  const router = useRouter();
  const isOffer = router.query['type'] === 'offer';
  const [plan, setPlan] = useState<string>('');
  const dispatch = useAppDispatch();
  useEffect(() => {
    let unsubscribe = false;
    if (!unsubscribe) {
      dispatch(rehydrateProtectionPlan(protectionPlanData));
    }
    return () => {
      unsubscribe = true;
    };
  }, []);
  const protectionPlan = useSelector((state: RootState) => state.entities.protectionPlan.list);

  const data = protectionPlan.protectionplans.map((item)=> item.description);
  console.log(data)

  return (
    <Radio.Group mt={50} value={plan} onChange={(value) => setPlan(value)}>
      <PageTitle title={isOffer ? 'Offer Summary' : 'Buying Summary'} />

      <Grid>
        <Grid.Col xs={12} sm={6}>
          <div className="overflow-y-auto h-full">
            <ProductDetail
              image={productDetailData.image}
              title={productDetailData.title}
              space={productDetailData.space}
              color={productDetailData.color}
              company={productDetailData.company}
              condition={productDetailData.condition}
              expiration={productDetailData.expiration}
              cardDetails={productDetailData.cardDetails}
              address={productDetailData.address}
            />
          </div>
        </Grid.Col>
        <Grid.Col xs={12} sm={6}>
          <div className=" relative h-full">
            <BiddingSummary
              yourOffer={BiddingSummaryData.yourOffer}
              discount={BiddingSummaryData.discount}
              itemPrice={BiddingSummaryData.itemPrice}
              marketPlaceFee={BiddingSummaryData.marketPlaceFee}
              salesTax={BiddingSummaryData.salesTax}
              shippingFee={BiddingSummaryData.shippingFee}
              totalPrice={BiddingSummaryData.totalPrice}
              protectionPlan={plan}
            />
          </div>
        </Grid.Col>

        <Grid.Col xs={12} sm={6} onClick={() => setPlan(protectPlanData.title)}>
          <div className="overflow-y-auto h-full cursor-pointer">
            <ProtectPlan
              title={protectPlanData.title}
              content={protectPlanData.content}
              price={protectPlanData.price}
            />
          </div>
        </Grid.Col>
        <Grid.Col xs={12} sm={6} onClick={() => setPlan(protectPlanData2.title)}>
          <div className="cursor-pointer">
            <ProtectPlan
              title={protectPlanData2.title}
              content={protectPlanData2.content}
              price={protectPlanData2.price}
            />
          </div>
        </Grid.Col>
      </Grid>
      <div onClick={() => setPlan('No')} className="cursor-pointer">
        <SummaryFooter />
      </div>
    </Radio.Group>
  );
}
