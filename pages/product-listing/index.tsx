import { ListingDescription, PageTitle, ProductCarousel, UsedProductListing } from '@elektra/components';
import { Only } from '@elektra/customComponents';
import { Container, Divider, Grid, Image } from '@mantine/core';
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

export default function ProductListingPage() {
  const [condition, setCondition] = useState<string>('New');
  return (
    <Container fluid>
      <div className="my-10">
        <PageTitle title="Listing Item" />
      </div>
      <Grid className="my-10">
        <Grid.Col xs={6}>
          <div className='ml-10'>
        {/* <ProductCarousel /> */}
        </div>
        </Grid.Col>
        <Grid.Col xs={6}>
          <ListingDescription
            carrier={ListingDescriptionData.carrier}
            carrierData={ListingDescriptionData.carrierData}
            color={ListingDescriptionData.color}
            condition={condition}
            setCondition={setCondition}
            description={ListingDescriptionData.description}
            discount={ListingDescriptionData.discount}
            highestAsk={ListingDescriptionData.highestAsk}
            lowestAsk={ListingDescriptionData.lowestAsk}
            marketPlaceFee={ListingDescriptionData.marketPlaceFee}
            saleTax={ListingDescriptionData.saleTax}
            shippingFee={ListingDescriptionData.shippingFee}
            storage={ListingDescriptionData.storage}
            averageSalePrice={ListingDescriptionData.averageSalePrice}
            colorData={ListingDescriptionData.colorData}
            storageData={ListingDescriptionData.storageData}
          />
        </Grid.Col>
        <Only when={condition === 'Used'}>
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
