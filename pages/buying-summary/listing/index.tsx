import { BiddingSummary, PageTitle, ProductDetail, ProtectPlan, SummaryFooter } from '@elektra/components';
import { Modal, Only, baseURL, http, isAuthenticated } from '@elektra/customComponents';
import { useOfferPlaceModal } from '@elektra/hooks';
import { RootState, initStore, loadFee, resetCoupon, useAppDispatch, useSelector } from '@elektra/store';
import { loadProtectionPlan, rehydrateProtectionPlan } from '@elektra/store/entities/slices/protectionPlan';
import { ProductBuyOrderData, protectionPlanProps } from '@elektra/types';

import { Grid, Loader, Radio } from '@mantine/core';
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

const BiddingSummaryData = {
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
  useEffect(() => {
    let unsubscribe = false;
    if (!unsubscribe) {
      dispatch(rehydrateProtectionPlan(protectionPlanData));
      dispatch(loadFee(String(productListingById?.listing?.category_id)));
    }
    return () => {
      unsubscribe = true;
    };
  }, []);
  const router = useRouter();
  const isOffer = router.query['type'] === 'offer';
  const [plan, setPlan] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const productListingById = useSelector((state: RootState) => state.entities.productListingById.list);

  const [orderData, setOrderData] = useState<ProductBuyOrderData>();
  const feeData = useSelector((state: RootState) => state.entities.fee.list.fees);
  const loading = useSelector((state: RootState) => state.entities.fee.loading);
  const [OfferPlaceModal, offerPlaceOpened, offerPlaceHandler] = useOfferPlaceModal({
    address: '',
    cardDetails: '',
    condition: productListingById?.listing.condition,
    image: baseURL + '/' + productListingById?.listing?.images[0].filename,
    saleDate: String(orderData?.order.created_on),
    title: productListingById?.listing.product.title,
    productVariant: productListingById.listing.listing_variants,
    expiration: '',
  });

  const protectionPlan = protectionPlanData.protectionplans;

  const handleSubmit = async () => {
    if (typeof plan === 'number') {
      const { data, isError } = await http.request({
        url: `/listings/${productListingById.listing.id}/buy`,
        method: 'POST',
        data: {
          protection_plan: plan === 0 ? null : plan,
          coupon: '',
        },
      });

      if (!isError) {
        setOrderData(data);
      }

      dispatch(resetCoupon());
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

  useEffect(() => {
    if (orderData) offerPlaceHandler.open();
  }, [orderData]);

  const getTotalPrice = () => {
    let totalPrice = 0;
    feeData.map((fee) => {
      totalPrice += Number(fee.fees);
    });
    totalPrice += Number(productListingById?.listing?.highest_offer);
    return totalPrice;
  };

  return (
    <>
      <Only when={loading}>
        <Loader />
      </Only>
      <Only when={!loading}>
        <Radio.Group mt={50} value={String(plan)} onChange={(value) => setPlan(Number(value))}>
          <PageTitle title={isOffer ? 'Offer Summary' : 'Buying Summary'} />

          <Grid>
            <Grid.Col xs={12} sm={6}>
              <div className="overflow-y-auto h-full">
                <ProductDetail
                  productVariants={productListingById?.listing?.listing_variants}
                  image={baseURL + '/' + productListingById?.listing?.images[0]?.filename || ''}
                  title={productListingById?.listing.product.title}
                  condition={productListingById?.listing?.condition.toUpperCase()}
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
                  reciptFee={feeData.map((item) => ({
                    id: item.id,
                    fees: Number(item.fees),
                    title: item.type,
                  }))}
                  itemPrice={0}
                  marketPlaceFee={0}
                  salesTax={0}
                  shippingFee={0}
                  totalPrice={getTotalPrice()}
                  protectionPlan={String(plan)}
                  onClick={handleSubmit}
                />
              </div>
            </Grid.Col>
            {protectionPlan.map((item, key) => {
              return (
                <Grid.Col key={key + item.created_on} xs={12} sm={6} onClick={() => setPlan(Number(item.id))}>
                  <div className="overflow-y-auto h-full cursor-pointer">
                    <ProtectPlan
                      id={String(item.id)}
                      title={item.name}
                      content={item.description}
                      price={item.amount}
                    />
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
      </Only>
    </>
  );
}
