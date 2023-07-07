import { BiddingSummary, BiddingSummaryProps, PageTitle, ProductDetail } from '@elektra/components';
import { Drawer, isAuthenticated } from '@elektra/customComponents';
import { useTechinalSpecificationDrawer } from '@elektra/hooks';
import { initStore, loadUserFavourite } from '@elektra/store';
import { Container, Grid, Text, useMantineTheme } from '@mantine/core';
import { NextPageContext } from 'next';

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
  itemPrice: 437,
  marketPlaceFee: 5,
  salesTax: 3,
  shippingFee: 15,
  discount: 0,
  totalPrice: 460,
};

// export async function getServerSideProps({ req }: NextPageContext) {
//   const isAuth = await isAuthenticated(req);
//   if (!isAuth) {
//     return { redirect: { permanent: false, destination: '/auth/login' } };
//   }
//   const store = initStore();
//   const userFavourite = store.dispatch(loadUserFavourite());
//   const userReward = store.dispatch(loadUserReward());
//   const orderPurchasing = store.dispatch(loadOrderPurchasing());
//   const orderSelling = store.dispatch(loadOrderSelling());

//   await Promise.all([userFavourite, userReward, orderPurchasing,orderSelling]);
//   return {
//     props: {
//       userRewardData: store.getState().entities.userReward.list,
//       userFavouriteData: store.getState().entities.userFavourite.list,
//       orderPurchasingData: store.getState().entities.purchasingOrders.list,
//       orderSellingData: store.getState().entities.sellingOrders.list,
//     },
//   };
// }


export default function OrderDetail() {
  const theme = useMantineTheme();
  const [TechinalSpecificationModal, techinalSpecificationOpened, techinalSpecificationHandler] =
  useTechinalSpecificationDrawer();
  return (
    <Container mt={50} fluid>
      <PageTitle title="Viewing Details" />
      <Grid m={0}>
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
              saleDate={productDetailData.saleDate}
              disabled={true}
            />
          </div>
        </Grid.Col>
        <Grid.Col xs={12} sm={6}>
          <div className="h-full relative">
            <BiddingSummary
              // yourOffer={BiddingSummaryData.yourOffer}
              discount={BiddingSummaryData.discount}
              itemPrice={BiddingSummaryData.itemPrice}
              marketPlaceFee={BiddingSummaryData.marketPlaceFee}
              salesTax={BiddingSummaryData.salesTax}
              shippingFee={BiddingSummaryData.shippingFee}
              totalPrice={BiddingSummaryData.totalPrice}
            
              disabled={true}
            />
          </div>
        </Grid.Col>
        <Grid.Col span={12}>
          <Text className='cursor-pointer' onClick={techinalSpecificationHandler.open} style={{ borderRadius: '10px' }} py={10} bg={'black'} color={'#656565'} align="center" size="xl">
            View Technical Specifaction For {productDetailData.title}
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
