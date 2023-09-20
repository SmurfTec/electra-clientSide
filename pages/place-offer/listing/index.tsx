import { PageTitle, PlaceOfferComponent } from '@elektra/components';
import { baseURL } from '@elektra/customComponents';
import { RootState } from '@elektra/store';
import { Container, Grid, Image } from '@mantine/core';
import { useRouter } from 'next/router';
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

  // const [condition, setCondition] = useState<string>('New');

  const productListingById = useSelector((state: RootState) => state.entities.productListingById.list.listing);

  const router = useRouter();
  // const condition = "new";
  return (
    <Container fluid>
      <div className="my-10">
        <PageTitle title="Placing Offer" />
      </div>
      <Grid className="my-10">
        <Grid.Col md={6}>
          <Image alt="product image" src={baseURL + '/' + productListingById?.images[0]?.filename || ''} />
        </Grid.Col>
        <Grid.Col md={6}>
          <PlaceOfferComponent
          isListing={true}
            productVariants={productListingById.listing_variants}
            condition={productListingById.condition}
            description={ListingDescriptionData.description}
            highestAsk={Number(productListingById.highest_offer)}
            lowestAsk={Number(productListingById.lowest_offer)}
            marketPlaceFee={0}
            saleTax={0}
            shippingFee={0}
            averageSalePrice={0}
          />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
