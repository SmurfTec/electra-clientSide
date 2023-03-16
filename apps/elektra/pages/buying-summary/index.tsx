import { Container, Grid } from '@mantine/core';
import { ProtectPlan } from 'apps/elektra/app/components/pages/buying-summary';
import { ProductDetail } from 'apps/elektra/app/components/pages/buying-summary/productDetail';
import { PageTitle } from 'apps/elektra/app/components/AppTitle';

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
};

const protectPlanData = {
  title: '13 Month Protect Plan',
  price: 50.0,
  content: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus venenatis velit at tellus varius porttitor.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus venenatis velit at tellus varius porttitor.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus venenatis velit at tellus varius porttitor.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus venenatis velit at tellus varius porttitor.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus venenatis velit at tellus varius porttitor.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus venenatis velit at tellus varius porttitor.',
  ],
};

const protectPlanData2 = {
  title: '24 Month Protect Plan',
  price: 100.0,
  content: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus venenatis velit at tellus varius porttitor.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus venenatis velit at tellus varius porttitor.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus venenatis velit at tellus varius porttitor.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus venenatis velit at tellus varius porttitor.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus venenatis velit at tellus varius porttitor.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus venenatis velit at tellus varius porttitor.',
  ],
};

export default function BuyingSummary() {
  return (
    <Container mt={50} fluid>
      <PageTitle title="Buying Summary" />

      <Grid>
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
            />
          </div>
        </Grid.Col>
        <Grid.Col xs={12} sm={6}>
          <div className="overflow-y-auto h-full">
            <ProtectPlan
              title={protectPlanData.title}
              content={protectPlanData.content}
              price={protectPlanData.price}
            />
          </div>
        </Grid.Col>
        <Grid.Col xs={12} sm={6}>
          {' '}
          <ProtectPlan
            title={protectPlanData2.title}
            content={protectPlanData2.content}
            price={protectPlanData2.price}
          />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
