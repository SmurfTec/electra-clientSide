import { BiddingSummary, PageTitle, ProductDetail } from '@elektra/components';
import { Drawer, baseURL, isAuthenticated } from '@elektra/customComponents';
import { useTechinalSpecificationDrawer } from '@elektra/hooks';
import {
  RootState,
  initStore,
  loadOrderDetail,
  rehydrateOrderDetail,
  useAppDispatch,
  useSelector,
} from '@elektra/store';
import type { Order } from '@elektra/types';
import { Container, Grid, Text } from '@mantine/core';
import { format } from 'date-fns';
import { NextPageContext } from 'next';
import { useEffect, useState } from 'react';

export async function getServerSideProps({ req, query }: NextPageContext) {
  const isAuth = await isAuthenticated(req);
  if (!isAuth) {
    return { redirect: { permanent: false, destination: '/auth/login' } };
  }
  const store = initStore();
  const orderDetail = store.dispatch(loadOrderDetail(String(query.id)));
  await Promise.all([orderDetail]);

  return {
    props: {
      orderDetail: store.getState().entities.orderDetail.list,
    },
  };
}
type OrderDetailPageProps = {
  orderDetail: Order;
};

export default function OrderDetail({ orderDetail }: OrderDetailPageProps) {
  // const technicalSpecification = useSelector(
  //   (state: RootState) => state.entities.productDetail.list.product.technical_specifications
  // );
  const profile = useSelector((state: RootState) => state.auth.profile);
  const [TechinalSpecificationModal, techinalSpecificationOpened, techinalSpecificationHandler] =
    useTechinalSpecificationDrawer({ techinalSpecificationDrawerData: [] });
  const dispatch = useAppDispatch();
  const [expiration, setExpiration] = useState(new Date());
  useEffect(() => {
    let unsubscribe = false;
    if (!unsubscribe) {
      dispatch(rehydrateOrderDetail(orderDetail));
    }
    return () => {
      unsubscribe = true;
    };
  }, []);

  return (
    <Container mt={50} fluid>
      <PageTitle title="Viewing Details" />
      <Grid m={0}>
        <Grid.Col xs={12} sm={6}>
          <div className="overflow-y-auto h-full">
            <ProductDetail
              setExpiration={setExpiration}
              image={baseURL + '/' + orderDetail?.product?.attachments?.[0]?.filename}
              title={String(orderDetail?.product?.title)}
              productVariants={orderDetail.product_variants || []}
              condition={'Not in Data'}
              expiration={'Not in Data'}
              orderNo={String(orderDetail?.id)}
              protectionPlan={String(orderDetail?.protection_plan?.name ?? '-')}
              status={String(orderDetail?.status)}
              cardDetails={'Not in Data'}
              address={
                profile?.shipping_address_line_1
                  ? `${profile?.shipping_address_line_1}, ${
                      profile?.shipping_adress_line_2 ? profile?.shipping_adress_line_2 + ',' : ''
                    } ${profile?.shipping_city},  ${profile?.shipping_stateorprovince}, ${profile?.shipping_country}, ${
                      profile?.shipping_postalcode
                    }`
                  : '-'
              }
              saleDate={format(new Date(String(orderDetail?.created_on)), 'dd MMM, yyyy')}
              disabled={true}
            />
          </div>
        </Grid.Col>
        <Grid.Col xs={12} sm={6}>
          <div className="h-full relative">
            <BiddingSummary
              expiration={expiration}
              // yourOffer={BiddingSummaryData.yourOffer}
              reciptFee={orderDetail.receipt_fees!}
              itemPrice={orderDetail?.saleprice}
              marketPlaceFee={0}
              salesTax={0}
              shippingFee={0}
              totalPrice={0}
              disabled={true}
            />
          </div>
        </Grid.Col>
        <Grid.Col span={12}>
          <Text
            className="cursor-pointer"
            onClick={techinalSpecificationHandler.open}
            style={{ borderRadius: '10px' }}
            py={10}
            bg={'black'}
            color={'#656565'}
            align="center"
            size="xl"
          >
            View Technical Specifaction For {String(orderDetail?.product?.title)}
          </Text>
        </Grid.Col>
      </Grid>
      <Drawer
        title="Technical Specification"
        children={TechinalSpecificationModal}
        onClose={techinalSpecificationHandler.close}
        open={techinalSpecificationOpened}
      />
    </Container>
  );
}
