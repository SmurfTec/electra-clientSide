import { PageTitle, PlaceOfferComponent } from '@elektra/components';
import { baseURL, isAuthenticated } from '@elektra/customComponents';
import { useInfoModal } from '@elektra/hooks/modal/useInfoModal';
import { RootState, loadFee, useAppDispatch } from '@elektra/store';
import { Container, Grid, Image, Modal } from '@mantine/core';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export async function getServerSideProps({ req, query }: NextPageContext) {
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
    dispatch(loadFee(String(productDetail?.product?.category?.id)));
  }, []);

  const feeData = useSelector((state: RootState) => state.entities.fee.list.fees);

  const productDetail = useSelector((state: RootState) => state.entities.productDetail.list);
  const [productDescription, setproductDescription] = useState<string[]>([
    productDetail.product.product_properties.description,
  ]);
  const router = useRouter();
  const isListing = router.query.isListing as boolean | undefined;

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
