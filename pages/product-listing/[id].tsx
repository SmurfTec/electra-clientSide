import { ListingDescription, PageTitle, ProductCarousel, UsedProductListing } from '@elektra/components';
import { ListItemPostContext, Only, baseURL, isAuthenticated } from '@elektra/customComponents';
import { RootState, initStore, loadFee, loadProductData, useAppDispatch, useSelector } from '@elektra/store';
import { ListItemPost, ProductData } from '@elektra/types';
import { Container, Divider, Grid, Image } from '@mantine/core';
import { NextPageContext } from 'next';
import { useEffect, useState } from 'react';
import { useCounter } from '@mantine/hooks';

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

export async function getServerSideProps(context: NextPageContext) {
  const store = initStore();
  const isAuth = await isAuthenticated(context.req);
  if (!isAuth) {
    const sourceUrl = context.req?.headers?.referer || '/';
    return { redirect: { permanent: false, destination: `/auth/login?source=${encodeURIComponent(sourceUrl)}` } };
  }

  const productData = store.dispatch(loadProductData(Number(context.query.id)));
  await Promise.all([productData]);
  return {
    props: {
      productDetail: store.getState().entities.productDetail.list,
    },
  };
}

type ProductListingPageProps = {
  productDetail: ProductData;
};

export default function ProductListingPage({ productDetail }: ProductListingPageProps) {
  const [days, setDays] = useState('30');
  const [listItemPost, setListItemPost] = useState<ListItemPost>({
    condition: productDetail?.product.condition,
    is_repaired_before: false,
    product: String(productDetail?.product.id),
    explain_repair: '',
    condition_details: null,
    more_info: '',
  } as ListItemPost);
  const [count, handlers] = useCounter(0, { min: 0 });
  const [productDescription, setproductDescription] = useState<string[]>([
    productDetail?.product?.product_properties?.description,
  ]);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadFee(String(productDetail?.product?.category?.id)));
  }, []);

  const feeData = useSelector((state: RootState) => state.entities.fee.list.fees);

  return (
    <ListItemPostContext.Provider value={{ listItemPost, setListItemPost }}>
      <Container fluid>
        <div className="my-10">
          <PageTitle title="Listing Item" />
        </div>
        <Grid className="my-10">
          <Grid.Col md={6}>
            {productDetail.product.condition === 'used' ? (
              <div className="w-screen mt-5 -ml-11 md:w-auto">
                <ProductCarousel images={productDetail.product.images} />
              </div>
            ) : (
              <div className="w-screen mt-5 -ml-12 md:w-auto">
                <Image alt="product image" src={baseURL + '/' + (productDetail?.product?.images[0]?.filename || '')} />
              </div>
            )}
          </Grid.Col>
          <Grid.Col md={6}>
            <ListingDescription
              count={count}
              handlers={handlers}
              productVariants={productDetail?.product?.product_variants}
              condition={productDetail?.product?.condition}
              description={productDescription}
              highestAsk={Number(productDetail?.product?.highest_offer || 0)}
              lowestAsk={Number(productDetail?.product?.lowest_ask || 0)}
              averageSalePrice={Number(productDetail?.stats?.stats?.avg_sale_price || 0)}
              receiptFee={feeData?.map((item) => ({
                id: item.id,
                fees: Number(item.fees),
                title: item.type,
              }))}
              days={days}
              setDays={setDays}
            />
          </Grid.Col>
          <Only when={listItemPost.condition === 'used'}>
            <Grid.Col span={12}>
              <Divider color={'rgba(0, 0, 0, 0.08)'} my={12} size="sm" />
              <UsedProductListing
                accessories={usedProductListingData.accessories}
                description={usedProductListingData.description}
                itemConditions={usedProductListingData.itemConditions}
                count={count}
                days={days}
              />
            </Grid.Col>
          </Only>
        </Grid>
      </Container>
    </ListItemPostContext.Provider>
  );
}
