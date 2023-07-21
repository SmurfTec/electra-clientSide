import {
  BiddingSummary,
  BiddingSummaryProps,
  PageTitle,
  ProductDetail,
  ProtectPlan,
  SummaryFooter,
} from '@elektra/components';
import { Modal, baseURL, http, isAuthenticated } from '@elektra/customComponents';
import { useOfferPlaceModal } from '@elektra/hooks';
import { RootState, initStore, useAppDispatch, useSelector } from '@elektra/store';
import { loadProtectionPlan, rehydrateProtectionPlan } from '@elektra/store/entities/slices/protectionPlan';
import { protectionPlanProps } from '@elektra/types';

import { Grid, Radio } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AlertTriangle } from 'tabler-icons-react';

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
  protectionPlanData: protectionPlanProps;
};

export default function BuyingSummary({ protectionPlanData }: BuyingSummaryPageProps) {
  const router = useRouter();
  const isOffer = router.query['type'] === 'offer';
  const [plan, setPlan] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const [OfferPlaceModal, offerPlaceOpened, offerPlaceHandler] = useOfferPlaceModal();
  useEffect(() => {
    let unsubscribe = false;
    if (!unsubscribe) {
      dispatch(rehydrateProtectionPlan(protectionPlanData));
    }
    return () => {
      unsubscribe = true;
    };
  }, []);
  const protectionPlan = protectionPlanData.protectionplans;
  const productDetail = useSelector((state: RootState) => state.entities.productDetail.list);
  const profile = useSelector((state: RootState) => state.auth.profile);

  const handleSubmit = async () => {
    if (!!plan) {
      const { data, isError } = await http.request({
        url: `/products/${productDetail.product.id}/buy`,
        method: 'POST',
        data: {
          protection_plan: plan,
          coupon: '',
        },
      });

      if (!isError) {
        offerPlaceHandler.open();
      }
    } else {
      notifications.show({
        withCloseButton: false,
        styles: {
          icon: {
            backgroundColor: 'unset',
          },
        },
        message: 'Select atleast one option for proceeding',
        icon: <AlertTriangle color="red" />,
      });
    }
  };

  return (
    <Radio.Group mt={50} value={String(plan)} onChange={(value) => setPlan(Number(value))}>
      <PageTitle title={isOffer ? 'Offer Summary' : 'Buying Summary'} />

      <Grid>
        <Grid.Col xs={12} sm={6}>
          <div className="overflow-y-auto h-full">
            <ProductDetail
              productVariants={productDetail.product.product_variants}
              image={baseURL + '/' + productDetail?.product?.images[0]?.filename || ''}
              title={productDetail.product.title}
             
              condition={productDetail.product.condition.toUpperCase()}
              expiration={productDetailData.expiration}
              cardDetails={productDetailData.cardDetails}
              address={productDetailData.address}
              // status={''}
              // saleDate={''}
              // orderNo={''}
              disabled={false}
              // protectionPlan={''}
            />
          </div>
        </Grid.Col>
        <Grid.Col xs={12} sm={6}>
          <div className=" relative h-full">
            <BiddingSummary
              yourOffer={Number(productDetail.product.highest_offer)}
              discount={0}
              itemPrice={0}
              marketPlaceFee={0}
              salesTax={0}
              shippingFee={0}
              totalPrice={Number(productDetail.product.highest_offer)}
              protectionPlan={String(plan)}
              onClick={handleSubmit}
            />
          </div>
        </Grid.Col>
        {protectionPlan.map((item, key) => {
          return (
            <Grid.Col key={key + item.created_on} xs={12} sm={6} onClick={() => setPlan(Number(item.id))}>
              <div className="overflow-y-auto h-full cursor-pointer">
                <ProtectPlan id={String(item.id)} title={item.name} content={item.description} price={item.amount} />
              </div>
            </Grid.Col>
          );
        })}
      </Grid>
      <div onClick={() => setPlan(0)} className="cursor-pointer">
        <SummaryFooter />
      </div>

      <Modal
        title={'Product Purchased'}
        children={OfferPlaceModal}
        onClose={offerPlaceHandler.close}
        open={offerPlaceOpened}
      />
    </Radio.Group>
  );
}
