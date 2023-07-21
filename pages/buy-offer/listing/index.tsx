import { BuyOfferComponent, PageTitle, ProductCarousel } from '@elektra/components';
import { RootState } from '@elektra/store';
import { Variant } from '@elektra/types';
import { Container, Grid } from '@mantine/core';
import { useSelector } from 'react-redux';

export default function PlaceOffer() {
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

  const productListingById = useSelector((state: RootState) => state.entities.productListingById.list);
  return (
    <Container fluid>
      <div className="my-10">
        <PageTitle title="Buying Product" />
      </div>
      <Grid className="my-10">
        <Grid.Col md={6} className="text-left">
          <div className="md:w-auto w-screen mt-5 ">
            <ProductCarousel images={productListingById?.listing?.images ?? []} />
          </div>
        </Grid.Col>
        <Grid.Col md={6}>
          <BuyOfferComponent
            productVariants={productListingById?.listing.listing_variants as Variant[]}
            condition={'used'}
            description={ListingDescriptionData.description}
            discount={ListingDescriptionData.discount}
            highestAsk={productListingById?.listing?.highest_offer}
            lowestAsk={productListingById?.listing?.lowest_offer}
            marketPlaceFee={ListingDescriptionData.marketPlaceFee}
            saleTax={ListingDescriptionData.saleTax}
            shippingFee={ListingDescriptionData.shippingFee}
            averageSalePrice={Number(productListingById.listing.saleprice)}
          />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
