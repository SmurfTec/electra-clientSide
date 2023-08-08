import { PageTitle, PlaceOfferComponent, ProductCarousel } from '@elektra/components';
import { Only } from '@elektra/customComponents';
import { Container, Grid, Image } from '@mantine/core';
import { useRouter } from 'next/router';

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

  // const [condition, setCondition] = useState<string>('New');
  const router = useRouter();
  const condition = router.query['condition'] === 'new' ? 'new' : 'used';
  return (
    <Container fluid>
      <div className="my-10">
        <PageTitle title="Placing Offer" />
      </div>
      <Grid className="my-10">
        <Grid.Col md={6}>
          <Only when={condition !== 'new'}>
            <div className="-ml-11 md:ml-0 md:w-auto w-screen mt-5 ">
              <ProductCarousel images={[]} />
            </div>
          </Only>
          <Only when={condition === 'new'}>
            <Image alt="product image" src="/images/productImage.png" />
          </Only>
        </Grid.Col>
        <Grid.Col md={6}>
          <PlaceOfferComponent
            productVariants={[]}
            condition={condition}
            description={ListingDescriptionData.description}
            highestAsk={ListingDescriptionData.highestAsk}
            lowestAsk={ListingDescriptionData.lowestAsk}
            marketPlaceFee={ListingDescriptionData.marketPlaceFee}
            saleTax={ListingDescriptionData.saleTax}
            shippingFee={ListingDescriptionData.shippingFee}
            averageSalePrice={ListingDescriptionData.averageSalePrice}
          />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
