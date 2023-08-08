import { ListingDescription, PageTitle, ProductCarousel, UsedProductListing } from '@elektra/components';
import { Only, baseURL } from '@elektra/customComponents';
import { initStore, loadProductData } from '@elektra/store';
import { ProductData } from '@elektra/types';
import { Container, Divider, Grid, Image } from '@mantine/core';
import { NextPageContext } from 'next';
import { useState } from 'react';

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

const usedProductListingData = {
  accessories: ['Charger Cable', 'Original Box', 'Charging Cube'],
  itemConditions: ['Poor', 'Good', 'Fair', 'Great', 'Flawless', 'New'],
  description: [
    'Device has signs of heavy use such as deep scratches, dents, scuffs, or excessive scratching',
    'Fully functional with no operational problems',
    'No chips or cracks in front or back glass',
    'Above 80 percent battery health with no Service alert in Settings',
    'All devices must be free of any lock, carrier blacklist, or financial obligations',
    'Absolutely no Ghost Image',
    'No LCD or display defects (aftermarket, burns, damage or no display)',
  ],
};

export async function getServerSideProps(context: NextPageContext) {
  // id: 1 means homepage data
  const store = initStore();
  const productData = store.dispatch(loadProductData(Number(context.query.id)));
  await Promise.all([productData]);
  return {
    props: {
      productDetail: store.getState().entities.productDetail.list,
    },
  };
}
type ProductListingPageProps = {
  productDetail: ProductData;
};

export default function ProductListingPage({ productDetail }: ProductListingPageProps) {
  const [condition, setCondition] = useState<'new' | 'used'>(productDetail.product.condition);

  return (
    <Container fluid>
      <div className="my-10">
        <PageTitle title="Listing Item" />
      </div>
      <Grid className="my-10">
        <Grid.Col md={6}>
          {condition === 'used' ? (
            <div className="-ml-11 md:w-auto w-screen mt-5">
              {' '}
              <ProductCarousel images={productDetail.product.images} />
            </div>
          ) : (
            <div className="-ml-12 md:w-auto w-screen mt-5">
              {' '}
              <Image alt="product image" src={baseURL + '/' + productDetail?.product?.images[0].filename} />
            </div>
          )}
        </Grid.Col>
        <Grid.Col md={6}>
          <ListingDescription
            productVariants={productDetail?.product?.product_variants}
            condition={condition}
            setCondition={setCondition}
            description={ListingDescriptionData.description}
            highestAsk={Number(productDetail?.product?.highest_offer || 0)}
            lowestAsk={Number(productDetail?.product?.lowest_ask || 0)}
            marketPlaceFee={ListingDescriptionData.marketPlaceFee}
            saleTax={ListingDescriptionData.saleTax}
            shippingFee={ListingDescriptionData.shippingFee}
            averageSalePrice={Number(productDetail?.stats?.stats?.avg_sale_price || 0)}
          />
        </Grid.Col>
        <Only when={condition === 'used'}>
          <Grid.Col span={12}>
            <Divider color={'rgba(0, 0, 0, 0.08)'} my={12} size="sm" />
            <UsedProductListing
              accessories={usedProductListingData.accessories}
              description={usedProductListingData.description}
              itemConditions={usedProductListingData.itemConditions}
            />
          </Grid.Col>
        </Only>
      </Grid>
    </Container>
  );
}