import { PageTitle, PlaceOfferComponent } from '@elektra/components';
import { baseURL, isAuthenticated } from '@elektra/customComponents';
import { RootState, loadFee, useAppDispatch } from '@elektra/store';
import { Container, Grid, Image } from '@mantine/core';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';

export async function getServerSideProps({ req, query }: NextPageContext) {
  const isAuth = await isAuthenticated(req);
  if (!isAuth) {
    return { redirect: { permanent: false, destination: '/auth/login' } };
  }
  return { props: {} };
}

export default function PlaceOffer() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadFee(String(productDetail?.product?.category?.id)));
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

  const productDetail = useSelector((state: RootState) => state.entities.productDetail.list);
  const[productDescription,setproductDescription]=useState<string[]>([productDetail.product.product_properties.description])
  const router = useRouter();
  const isListing = router.query.isListing as boolean | undefined;
 
  // const condition = "new";
  return (
    <Container fluid>
      <div className="my-10">
        <PageTitle title="Placing Offer" />
      </div>
      <Grid className="my-10">
        <Grid.Col md={6}>
          <Image alt="product image" src={baseURL + '/' + productDetail?.product?.images?.[0]?.filename || ''} />
        </Grid.Col>
        <Grid.Col md={6}>
          <PlaceOfferComponent
            isListing={isListing}
            productVariants={productDetail?.product?.product_variants}
            condition={productDetail?.product?.condition}
            description={productDescription}
            highestAsk={Number(productDetail?.product?.highest_offer)}
            lowestAsk={Number(productDetail?.product?.lowest_ask)}
            marketPlaceFee={0}
            receiptFee={feeData?.map((item) => ({
              id: item.id,
              fees: Number(item.fees), 
              title: item.type,
            }))}
            saleTax={0}
            shippingFee={0}
            averageSalePrice={0}
          />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
