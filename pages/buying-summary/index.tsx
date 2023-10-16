import { BiddingSummary, PageTitle, ProductDetail, ProtectPlan, SummaryFooter } from '@elektra/components';
import { Modal, Only, baseURL, http, isAuthenticated } from '@elektra/customComponents';
import { useOfferPlaceModal, useStripeModal } from '@elektra/hooks';
import { RootState, initStore, loadFee, resetCoupon, useAppDispatch, useSelector } from '@elektra/store';
import { loadProtectionPlan, rehydrateProtectionPlan } from '@elektra/store/entities/slices/protectionPlan';
import { ProductBuyOrderData, protectionPlanProps } from '@elektra/types';

import { Grid, Loader, Radio } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { PaymentMethodResult } from '@stripe/stripe-js';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useShippingChangeModal } from '@elektra/hooks';
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
      dispatch(loadFee(String(productDetail?.product?.category?.id)));
    }
    return () => {
      unsubscribe = true;
    };
  }, []);
  const router = useRouter();
  const [plan, setPlan] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  
  const coupon = useSelector((state: RootState) => state.entities.coupon.list.coupon);
  const protectionPlan = protectionPlanData.protectionplans;
  const productDetail = useSelector((state: RootState) => state.entities.productDetail.list);
  const [orderData, setOrderData] = useState<ProductBuyOrderData>();
  const loading = useSelector((state: RootState) => state.entities.fee.loading);
  const feeData = useSelector((state: RootState) => state.entities.fee.list.fees);
  const [ShippingChangeModal, shippingOpened, shippingHandler] = useShippingChangeModal();
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
        price: isOfferType ? Number(yourOffer) : Number(productDetail?.product?.highest_offer),

        // * random future date
        expiration_date: expiration,
        coupon: coupon || '',
        shipping_address: '{{$randomStreetAddress}}',
        product: productDetail.product.id,
      },
    });
    if (res.isError) {
      notifications.show({
        message: res?.errorPayload?.message || 'Failed to process your request',
        autoClose: false,
      });

      if (res?.errorPayload?.message === 'Coupon Already Used') {
        dispatch(resetCoupon());
      }
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
      url: `/products/${productDetail.product.id}/buy`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      
      data: {
        payment_method_id: result.paymentMethod.id,
        //* random between 800 and 1600
        price: isOfferType ? Number(yourOffer) : Number(productDetail?.product?.highest_offer),

        expiration_date: expiration,
        coupon: coupon || '',
        shipping_address: '{{$randomStreetAddress}}',
        product: productDetail.product.id,
      },
    });
    if (res.isError) {
      notifications.show({
        message: res?.errorPayload?.message || 'Failed to proccess your request',
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
    condition: productDetail?.product.condition,
    image: baseURL + '/' + productDetail?.product?.images?.[0].filename,
    saleDate: String(orderData?.order.created_on),
    title: productDetail?.product.title,
    productVariant: productDetail?.product?.product_variants,
    expiration: '',
  });
  const profile = useSelector((state: RootState) => state.auth.profile);
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
    totalPrice += isOfferType ? Number(yourOffer) : Number(productDetail?.product?.lowest_ask);
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
              <div className="h-full overflow-y-auto">
                <ProductDetail
                  productVariants={productDetail.product.product_variants}
                  image={baseURL + '/' + productDetail?.product?.images?.[0]?.filename || ''}
                  title={productDetail.product.title}
                  condition={productDetail.product.condition.toUpperCase()}
                  expiration={productDetailData.expiration}
                  cardDetails={productDetailData.cardDetails} 
                  address={profile?.shipping_address_line_1 || ""}
                  setExpiration={setExpiration} 
                  // status={''}
                  // saleDate={''}
                  // orderNo={''}f
                  disabled={false}
                  // protectionPlan={''}
                />
              </div>
            </Grid.Col>
            <Grid.Col xs={12} sm={6}>
              <div className="relative h-full ">
                <BiddingSummary
                  expiration={expiration}
                  reciptFee={feeData?.map((item) => ({
                    id: item.id,
                    fees: Number(item.fees),
                    title: item.type,
                  }))}
                  itemPrice={Number(productDetail.product.lowest_ask)}
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
                  <div className="h-full overflow-y-auto cursor-pointer">
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
            title={isOfferType ? 'Offer Placed' : 'Product Purchased'}
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
