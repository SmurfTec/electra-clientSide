import { PageTitle, PlaceOfferComponent } from '@elektra/components';
import { baseURL, isAuthenticated } from '@elektra/customComponents';
import { RootState, loadFee, useAppDispatch } from '@elektra/store';
import { Container, Grid, Image } from '@mantine/core';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export async function getServerSideProps({ req, query }: NextPageContext) {
  const isAuth = await isAuthenticated(req);
  if (!isAuth) {
    const sourceUrl = req?.headers?.referer || '/';
    return { redirect: { permanent: false, destination: `/auth/login?source=${encodeURIComponent(sourceUrl)}` } };
  }
  return { props: {} };
}

type PlaceOfferProps = {
  isAuth: boolean;
};

export default function PlaceOffer() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadFee(String(productListingById.category_id)));
  }, []);

  const feeData = useSelector((state: RootState) => state.entities.fee.list.fees);
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
console.log(productListingById);
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
            receiptFee={feeData?.map((item) => ({
              id: item.id,
              fees: Number(item.fees),
              title: item.type,
              value_type: item.value_type,
            }))}
            isListing={true}
            productVariants={productListingById.listing_variants}
            condition={productListingById.condition}
            description={ListingDescriptionData.description}
            highestAsk={Number(productListingById.highest_offer)}
            lowestAsk={Number(productListingById.lowest_offer)}
            averageSalePrice={0}
          />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
