import { BiddingSummary, PageTitle, ProductDetail, ProtectPlan, SummaryFooter } from '@elektra/components';
import { Modal, Only, baseURL, http, isAuthenticated } from '@elektra/customComponents';
import { useOfferPlaceModal, useStripeModal } from '@elektra/hooks';
import { RootState, initStore, loadFee, useAppDispatch, useSelector } from '@elektra/store';
import { loadProtectionPlan, rehydrateProtectionPlan } from '@elektra/store/entities/slices/protectionPlan';
import { ProductBuyOrderData, protectionPlanProps } from '@elektra/types';

import { Grid, Loader, Radio } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { PaymentMethodResult } from '@stripe/stripe-js';
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

export async function getServerSideProps({ req }: NextPageContext) {
  const isAuth = await isAuthenticated(req);
  if (!isAuth) {
    const sourceUrl = req?.headers?.referer || '/';
    return { redirect: { permanent: false, destination: `/auth/login?source=${encodeURIComponent(sourceUrl)}` } };
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
      dispatch(loadFee(String(productListingById.category_id)));
    }
    return () => {
      unsubscribe = true;
    };
  }, []);
  const router = useRouter();
  const [plan, setPlan] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const protectionPlan = protectionPlanData.protectionplans;
  const productListingById = useSelector((state: RootState) => state.entities.productListingById.list.listing);
  const [orderData, setOrderData] = useState<ProductBuyOrderData>();
  const loading = useSelector((state: RootState) => state.entities.fee.loading);
  const feeData = useSelector((state: RootState) => state.entities.fee.list.fees);

  const [expiration, setExpiration] = useState(new Date());

  const [successPayment, setSuccessPayment] = useState(false);

  const placeOfferSubmit = async (result: PaymentMethodResult) => {
    if (result.error) {
      // Show error in payment form
      setSuccessPayment(false);
      return;
    }
    const res = await http.request({
      url: `/bids`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      data: {
        payment_method_id: result.paymentMethod.id,
        //* random between 800 and 1600
        price: isOfferType ? Number(yourOffer) : Number(productListingById.highest_offer),

        // * random future date
        expiration_date: expiration,
        coupon: coupon || '',
        shipping_address: '{{$randomStreetAddress}}',
        listing: productListingById.id,
      },
    });
    if (res.isError) {
      notifications.show({
        message: res?.errorPayload?.message || 'Failed to process your request',
        autoClose: false,
      });
    }
    const paymentResponse = await res.data;
    if (paymentResponse) {
      setSuccessPayment(true);
      return;
    }
  };

  const stripePaymentMethodHandler = async (result: PaymentMethodResult) => {
    if (result.error) {
      // Show error in payment form
      setSuccessPayment(false);
      return;
    }
    const res = await http.request({
      url: `/products/${productListingById.id}/buy`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      data: {
        payment_method_id: result.paymentMethod.id,
        //* random between 800 and 1600
        price: isOfferType ? Number(yourOffer) : Number(productListingById.highest_offer),

        expiration_date: expiration,
        coupon: coupon || '',
        shipping_address: '{{$randomStreetAddress}}',
        listing: productListingById.id,
      },
    });
    if (res.isError) {
      notifications.show({
        message: res?.errorPayload?.message || 'Failed to process your request',
        autoClose: false,
      });
    }
    const paymentResponse = await res.data;
    if (paymentResponse) {
      setSuccessPayment(true);
      return;
    }
  };

  const isOfferType = router.query.orderType === 'placeOffer';

  const [StripeModal, stripeOpened, stripeHandler] = useStripeModal({
    stripePaymentMethodHandler: isOfferType ? placeOfferSubmit : stripePaymentMethodHandler,
  });
  const [OfferPlaceModal, offerPlaceOpened, offerPlaceHandler] = useOfferPlaceModal({
    address: '',
    cardDetails: '',
    condition: productListingById.condition,
    image: baseURL + '/' + productListingById?.images?.[0]?.filename,
    saleDate: String(orderData?.order.created_on),
    title: productListingById?.product.title,
    productVariant: productListingById?.listing_variants,
    expiration: '',
  });
  const profile = useSelector((state: RootState) => state.auth.profile);
  const coupon = useSelector((state: RootState) => state.entities.coupon.list.coupon);
  const yourOffer = router.query.bidPrice;

  const handleSubmit = async () => {
    stripeHandler.open();
  };

  useEffect(() => {
    if (successPayment) {
      stripeHandler.close();
      offerPlaceHandler.open();
    }
  }, [successPayment]);

  useEffect(() => {
    if (orderData) offerPlaceHandler.open();
  }, [orderData]);

  const getTotalPrice = () => {
    let totalPrice = 0;
    feeData?.map((fee) => {
      totalPrice += Number(fee.fees);
    });
    totalPrice += isOfferType ? Number(yourOffer) : Number(productListingById?.ask);
    return totalPrice;
  };

  return (
    <>
      <Only when={loading}>
        <Loader />
      </Only>
      <Only when={!loading}>
        <Radio.Group mt={50} value={String(plan)} onChange={(value) => setPlan(Number(value))}>
          <PageTitle title={isOfferType ? 'Offer Summary' : 'Buying Summary'} />

          <Grid>
            <Grid.Col xs={12} sm={6}>
              <div className="overflow-y-auto h-full">
                <ProductDetail
                  productVariants={productListingById?.listing_variants}
                  image={baseURL + '/' + productListingById?.images?.[0]?.filename || ''}
                  title={productListingById?.product?.title}
                  condition={productListingById?.condition.toUpperCase()}
                  expiration={productDetailData.expiration}
                  cardDetails={productDetailData.cardDetails}
                  address={productDetailData.address}
                  setExpiration={setExpiration}
                  // status={''}
                  // saleDate={''}
                  // orderNo={''}
                  disabled={false}
                  phone={profile?.mobile_no}
                  // protectionPlan={''}
                />
              </div>
            </Grid.Col>
            <Grid.Col xs={12} sm={6}>
              <div className=" relative h-full">
                <BiddingSummary
                  expiration={expiration}
                  reciptFee={feeData?.map((item) => ({
                    id: item.id,
                    fees: Number(item.fees),
                    title: item.type,
                  }))}
                  itemPrice={Number(productListingById?.ask)}
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
                <Grid.Col
                  key={`protectionPlan-${key}-${item.id}`}
                  xs={12}
                  sm={6}
                  onClick={() => setPlan(Number(item.id))}
                >
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

        <Modal title="Payment Authorization" children={StripeModal} onClose={stripeHandler.close} open={stripeOpened} />
      </Only>
    </>
  );
}
