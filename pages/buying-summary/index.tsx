import {
  BiddingSummary,
  BiddingSummaryProps,
  PageTitle,
  ProductDetail,
  ProtectPlan,
  SummaryFooter,
} from '@elektra/components';
import { Grid, Radio } from '@mantine/core';
import { useRouter } from 'next/router';
import { useState } from 'react';

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

const BiddingSummaryData: BiddingSummaryProps = {
  yourOffer: 437,
  marketPlaceFee: 5,
  salesTax: 3,
  shippingFee: 15,
  discount: 0,
  totalPrice: 460,
};

export default function BuyingSummary() {
  const router = useRouter()
  const isOffer = router.query['type'] === 'offer'
  const [plan, setPlan] = useState<string>('')
  return (
    <Radio.Group mt={50} onChange={(value) => setPlan(value)}>
      <PageTitle title={isOffer ? "Offer Summary" :"Buying Summary"} />

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
          <div className="relative h-full">
            <BiddingSummary
              yourOffer={BiddingSummaryData.yourOffer}
              discount={BiddingSummaryData.discount}
              itemPrice={BiddingSummaryData.itemPrice}
              marketPlaceFee={BiddingSummaryData.marketPlaceFee}
              salesTax={BiddingSummaryData.salesTax}
              shippingFee={BiddingSummaryData.shippingFee}
              totalPrice={BiddingSummaryData.totalPrice}
              protectionPlan={plan}
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
          <ProtectPlan
            title={protectPlanData2.title}
            content={protectPlanData2.content}
            price={protectPlanData2.price}
          />
        </Grid.Col>
      </Grid>

      <SummaryFooter />
    </Radio.Group>
  );
}
