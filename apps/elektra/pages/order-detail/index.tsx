import { Container, Grid, Text, useMantineTheme } from '@mantine/core';
import { PageTitle } from 'apps/elektra/app/components/AppTitle';
import { BiddingSummary, BiddingSummaryProps, ProductDetail } from 'apps/elektra/app/components/pages/buying-summary';

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
  saleDate: "23/10/2023"
};

const BiddingSummaryData: BiddingSummaryProps = {
  yourOffer: 437,
  marketPlaceFee: 5,
  salesTax: 3,
  shippingFee: 15,
  discount: 0,
  totalPrice: 460,
};

export default function OrderDetail() {
    const theme = useMantineTheme()
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
            />
          </div>
        </Grid.Col>
        <Grid.Col xs={12} sm={6}>
          <div className="overflow-y-auto h-full">
            <BiddingSummary
              yourOffer={BiddingSummaryData.yourOffer}
              discount={BiddingSummaryData.discount}
              itemPrice={BiddingSummaryData.itemPrice}
              marketPlaceFee={BiddingSummaryData.marketPlaceFee}
              salesTax={BiddingSummaryData.salesTax}
              shippingFee={BiddingSummaryData.shippingFee}
              totalPrice={BiddingSummaryData.totalPrice}
            />
          </div>
        </Grid.Col>

        <Grid.Col span={12}>
          <Text style={{borderRadius: "10px"}} py={10} bg={theme.other.color.primary} color={theme.other.color.tabTitle} align='center' size="xl">View Technical Specifaction For {productDetailData.title}</Text>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
