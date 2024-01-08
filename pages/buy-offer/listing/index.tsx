import { BuyOfferComponent, PageTitle, ProductCarousel } from '@elektra/components';
import { isAuthenticated } from '@elektra/customComponents';
import { RootState, loadFee, useAppDispatch } from '@elektra/store';
import { Variant } from '@elektra/types';
import { Container, Grid } from '@mantine/core';
import { NextPageContext } from 'next';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export async function getServerSideProps({ req }: NextPageContext) {
  const isAuth = await isAuthenticated(req);
  if (!isAuth) {
    const sourceUrl = req?.headers?.referer || '/';
    return { redirect: { permanent: false, destination: `/auth/login?source=${encodeURIComponent(sourceUrl)}` } };
  }
  return { props: {} };
}

export default function PlaceOffer() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadFee(String(productListingById?.listing.category_id)));
  }, []);
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
  const feeData = useSelector((state: RootState) => state.entities.fee.list.fees);
  const productListingById = useSelector((state: RootState) => state.entities.productListingById.list);

  const getTotalPrice = () => {
    let originalTotalPrice = productListingById?.listing?.ask;
    let percentageIncrease = 0;
    let fixedValueIncrease = 0;

    // Calculate the total percentage and fixed value increases
    feeData?.forEach((fee) => {
      if (fee.value_type === 'percentage') {
        percentageIncrease += (originalTotalPrice * Number(fee.fees)) / 100;
      } else {
        fixedValueIncrease += Number(fee.fees);
      }
    });

    // Apply the increases to the original total price
    let totalPrice = originalTotalPrice + percentageIncrease + fixedValueIncrease;
    return Number(totalPrice.toFixed(2));
  };

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
            receiptFee={feeData?.map((item) => ({
              id: item.id,
              fees: Number(item.fees),
              title: item.type,
              value_type: item.value_type,
            }))}
            productVariants={productListingById?.listing.listing_variants as Variant[]}
            condition={'used'}
            description={ListingDescriptionData.description}
            highestAsk={productListingById?.listing?.highest_offer}
            lowestAsk={productListingById?.listing?.lowest_ask}
            price={Number(getTotalPrice())}
            averageSalePrice={Number(productListingById.listing.saleprice)}
            isRepairedBefore={productListingById?.listing.is_repaired_before}
            moreInfo={productListingById?.listing.more_info}
            conditionDetails={productListingById?.listing.condition_details}
            explainRepair={productListingById?.listing.explain_repair}
          />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
