import { ListingDescription } from '@elektra/components';
import { Container, Grid } from '@mantine/core';
import { PageTitle } from 'apps/elektra/app/components/AppTitle';
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

export default function ProductListingPage() {
  const [condition, setCondition] = useState<string>('New');
  return (
    <Container fluid>
      <div className='my-10'>
        <PageTitle  title="Listing Item" />
      </div>
      <Grid className="my-20">
        <Grid.Col span={6}></Grid.Col>
        <Grid.Col span={6}>
          <ListingDescription
            carrier={ListingDescriptionData.carrier}
            carrierData={ListingDescriptionData.carrierData}
            color={ListingDescriptionData.color}
            condition={condition}
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
      </Grid>
    </Container>
  );
}
