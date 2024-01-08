import { PageTitle, PlaceOfferComponent } from '@elektra/components';
import NoDataFallback from '@elektra/components/NoDataFallback';
import { baseURL, isAuthenticated } from '@elektra/customComponents';
import { useInfoModal } from '@elektra/hooks/modal/useInfoModal';
import { RootState, loadFee, useAppDispatch } from '@elektra/store';
import { Button, Container, Grid, Image, Modal } from '@mantine/core';
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

  const feeData = useSelector((state: RootState) => state.entities.fee.list.fees);

  const productDetail = useSelector((state: RootState) => state.entities.productDetail.list);
  const [productDescription, setProductDescription] = useState<string[]>(
    productDetail?.product?.product_properties?.description
      ? [productDetail.product.product_properties.description]
      : []
  );
  const router = useRouter();
  const isListing = router.query.isListing as boolean | undefined;

  useEffect(() => {
    if (productDetail?.product?.category?.id) {
      dispatch(loadFee(String(productDetail.product.category.id)));
    }
  }, [productDetail, dispatch]);

  const isDataLoaded = productDetail && productDetail.product;

  if (!isDataLoaded) {
    return <NoDataFallback message="Data not found. Please return to the main page." redirectPath="/" />;
  }

  return (
    <Container fluid>
      <div className="my-10">
        <PageTitle title="Placing Offer" />
      </div>
      <Grid className="my-10">
        {productDetail && (
          <>
            <Grid.Col md={6}>
              <Image alt="product image" src={baseURL + '/' + productDetail?.product?.images?.[0]?.filename || ''} />
            </Grid.Col>
            {productDetail.product && (
              <Grid.Col md={6}>
                <PlaceOfferComponent
                  isListing={isListing}
                  productVariants={productDetail?.product?.product_variants}
                  condition={productDetail?.product?.condition}
                  description={productDescription}
                  highestAsk={Number(productDetail?.product?.highest_offer)}
                  lowestAsk={Number(productDetail?.product?.lowest_ask)}
                  receiptFee={feeData?.map((item) => ({
                    id: item.id,
                    fees: Number(item.fees),
                    title: item.type,
                    value_type: item.value_type,
                  }))}
                />
              </Grid.Col>
            )}
          </>
        )}
      </Grid>
    </Container>
  );
}
