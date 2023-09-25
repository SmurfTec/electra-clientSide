import { BuyOfferComponent, PageTitle } from '@elektra/components';
import { baseURL, isAuthenticated } from '@elektra/customComponents';
import { RootState } from '@elektra/store';
import { Variant } from '@elektra/types';
import { Container, Grid, Image } from '@mantine/core';
import { NextPageContext } from 'next';
import { useSelector } from 'react-redux';

export async function getServerSideProps({ req }: NextPageContext) {
  const isAuth = await isAuthenticated(req);
  if (!isAuth) {
    return { redirect: { permanent: false, destination: '/auth/login' } };
  }
  return { props: isAuth };
}

type BuyOfferProps = {
  isAuth: boolean;
};

export default function PlaceOffer({ isAuth }: BuyOfferProps) {
  const ListingDescriptionData = {
    carrier: 'AT&T',
    color: 'Blue',
    description: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Lorem ipsum dolor sit amet,',
      'Mauris id lacus gravida erat rutrum facilisis.',
      'Sed et quam pretium, laoreet metus sed,',
    ],
    storage: '128 GB',

    carrierData: ['AT&T', 'Verizon', 'T-mobile', 'Factory Unlocked'],
    colorData: ['Blue', 'Black', 'White'],
    storageData: ['128 GB', '256 GB', '512 GB'],
    marketPlaceFee: 5,
    saleTax: 3,
    shippingFee: 15,
    discount: 0,
    //NEW CASE
    lowestAsk: 169,
    highestAsk: 179,

    //USED CASE
    averageSalePrice: 200,
  };

  const productDetail = useSelector((state: RootState) => state.entities.productDetail.list);

  return (
    <Container fluid>
      <div className="my-10">
        <PageTitle title="Buying Product" />
      </div>
      <Grid className="my-10">
        <Grid.Col md={6} className="text-left">
          <Image alt="product image" src={baseURL + '/' + productDetail?.product?.images[0]?.filename || ''} />
        </Grid.Col>
        <Grid.Col md={6}>
          <BuyOfferComponent
            productVariants={productDetail?.product.product_variants as Variant[]}
            condition={'new'}
            description={ListingDescriptionData.description}
            highestAsk={productDetail.product.highest_offer}
            lowestAsk={productDetail.product.lowest_ask}
            marketPlaceFee={0}
            saleTax={0}
            shippingFee={0}
            averageSalePrice={productDetail?.stats?.stats?.avg_sale_price}
          />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
