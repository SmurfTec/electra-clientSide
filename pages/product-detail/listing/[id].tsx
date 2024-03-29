import {
  ProductCard,
  ProductCarousel,
  // ProductCharts,
  ProductFilter,
  ProductSpecification,
  ProductStats,
  SalesTable,
  SectionTitle,
} from '@elektra/components';
import { FilterDisplay, Modal, Only, baseURL, isAuthenticated } from '@elektra/customComponents';
import { useFilterModal } from '@elektra/hooks';
import {
  loadProductListingById,
  loadProductVariants,
  loadRecommendedProducts,
  login,
  rehydrateProductListingById,
  rehydrateProductVariants,
  store,
  useAppDispatch,
} from '@elektra/store';

import { loadListingProducts, rehydrateListingProductData } from '@elektra/store/entities/slices/productListing';
import { ListingsResponse, Product, ProductVariant, SingleProductListing } from '@elektra/types';
import {
  ActionIcon,
  Anchor,
  Breadcrumbs,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  Pagination,
  ScrollArea,
  Stack,
  Text,
} from '@mantine/core';
import { useMediaQuery, useScrollIntoView } from '@mantine/hooks';
import { NextLink } from '@mantine/next';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ArrowDown, Filter, ShoppingCart } from 'tabler-icons-react';

export type condition = 'new' | 'used';

const items = [
  { title: 'Elektra', href: '/' },
  { title: 'Accessories', href: '/shop' },
  { title: 'Phones', href: '/shop' },
  { title: 'Apple', href: '/shop' },
  { title: 'Iphone 14 Pro Max', href: '/product-detail' },
].map((item, index) => (
  <Anchor
    className={`text-xs font-medium underline ${item.title === 'Iphone 14 Pro Max' ? 'font-[900]' : ''}`}
    component={NextLink}
    href={item.href}
    key={index}
  >
    {item.title}
  </Anchor>
));

export async function getServerSideProps(context: NextPageContext) {
  // id: 1 means homepage data
  const isAuth = await isAuthenticated(context.req);
  const listingData = store.dispatch(loadListingProducts(Number(context.query.id), isAuth));
  const productVariants = store.dispatch(loadProductVariants());
  const productListingById = store.dispatch(loadProductListingById(Number(context.query.id)));
  const recommended = store.dispatch(loadRecommendedProducts(isAuth));
  await Promise.all([listingData, productVariants, productListingById, recommended]);
  return {
    props: {
      productListing: store.getState().entities.productListing.list,
      productVariants: store.getState().entities.productVariants.list,
      productListingById: store.getState().entities.productListingById.list,
      recommended: store.getState().entities.specialProducts.list.recommended,
      isAuth,
    },
  };
}

type ProductPageProps = {
  productListing: ListingsResponse;
  productVariants: ProductVariant;
  recommended: Product;
  productListingById: SingleProductListing;
  isAuth: boolean;
};

export default function ProductPage({
  productListing,
  productVariants,
  productListingById,
  recommended,
  isAuth,
}: ProductPageProps) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    let unsubscribe = false;
    if (!unsubscribe) {
      if (!isAuth) {
        dispatch(login({ isAuthenticated: false, user: null, profile: null }));
      }
      dispatch(rehydrateListingProductData(productListing));
      dispatch(rehydrateProductVariants(productVariants));
      dispatch(rehydrateProductListingById(productListingById));
    }
    return () => {
      unsubscribe = true;
    };
  }, []);

  // const listingProducts = useSelector((state: RootState) => state.entities?.productListing?.list);

  const router = useRouter();

  const [activePage, setPage] = useState(1);
  // const [FilterModal, filterOpened, filterHandler] = useFilterModal();
  const [params, setParams] = useState<Array<{ id: number; label: string; value: string }>>([]);

  const handleFilter = async (label: string, value: string, id: number) => {
    const productId = Number(router.query['id']);
    let newParams = params;
    const existParam = newParams.find((item) => item.id === id);

    if (existParam) {
      newParams = params.filter((item) => item.id !== id);
      if (existParam.value !== value) newParams = [...newParams, { label, value, id }];

      setParams(newParams);
    } else {
      newParams = [...newParams, { label, value, id }];
      setParams(newParams);
    }
    if (newParams.length === 0) {
      dispatch(loadListingProducts(productId, isAuth));
      return;
    }
    const paramString = newParams.map((item) => `${item.label}=${item.value}`).join('&');
    dispatch(loadListingProducts(productId, isAuth, '&' + paramString));
  };

  const productFilters = productVariants.variants;
  const [FilterModal, filterOpened, filterHandler] = useFilterModal({
    data: productFilters,
    filter: params,
    setFilter: setParams,
    fetchListings: handleFilter,
  });

  const [limit, setLimit] = useState(5);
  const matches = useMediaQuery('(max-width: 800px)', false);
  const filters = useMediaQuery('(max-width: 1100px)', false);
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    duration: 100,
  });

  const handlePaginatedListing = (pageNumber: number) => {
    setPage(pageNumber);
    const productId = Number(router.query['id']);
    dispatch(loadListingProducts(productId, isAuth, `&limit=15&page=${pageNumber}`));
  };

  return (
    <>
      {!matches && (
        <Breadcrumbs separator=">" mt={30} mb={20}>
          {items}
        </Breadcrumbs>
      )}
      <Grid>
        <Grid.Col md={6} mt={matches ? 0 : 40}>
          <Stack align="center" justify="center" className="w-full">
            <div className=" md:w-auto w-screen ">
              <ProductCarousel images={productListingById?.listing?.images ?? []} />
            </div>

            <Text className="text-xs font-medium">Have this item?</Text>
            <Button component={NextLink} href="/product-listing" leftIcon={<ShoppingCart />}>
              Sell Now
            </Button>
          </Stack>
        </Grid.Col>
        <Grid.Col md={6}>
          <ProductSpecification
            more_info={productListingById.listing.more_info || ""}
            id={productListingById.listing.id}
            technicalSpecification={productListingById.listing?.technical_specifications || []}
            title={productListingById?.listing?.product?.title || ''}
            productVariants={productListingById.listing?.listing_variants || []}
            condition={productListingById.listing?.condition}
            highestAsk={Number(productListingById?.listing?.highest_offer) || 0}
            lowestAsk={Number(productListingById?.listing?.ask) || 0}
            price={Number(productListingById?.listing?.user_starting_at)}
            scrollIntoView={scrollIntoView}
            isListingVisible={productListing?.listings?.length !== 0}
          />
        </Grid.Col>
      </Grid>
      <Only when={productListing?.listings?.length !== 0}>
        <Divider className="my-4" />
        <Grid>
          <Grid.Col span={12}>
            <Flex wrap={'nowrap'} gap={20}>
              {params?.map((item) => (
                <FilterDisplay fetchListings={handleFilter} key={item.id} setState={setParams} filter={item} />
              ))}
            </Flex>
          </Grid.Col>
          <Grid.Col span={6}>
            <SectionTitle title={`Used ${productListingById?.listing?.product?.title}`} />
          </Grid.Col>
          <Only when={filters}>
            <Grid.Col span={6} className="text-right">
              <Button onClick={filterHandler.open} leftIcon={<Filter />}>
                Filter
              </Button>
            </Grid.Col>
          </Only>

          <Grid.Col span={6}>
            <Modal title="Filters" children={FilterModal} onClose={filterHandler.close} open={filterOpened} />
            <Only when={!filters}>
              <ProductFilter setFilter={setParams} filter={params} data={productFilters} fetchListings={handleFilter} />
            </Only>
          </Grid.Col>
        </Grid>
        {/* <Modal title="Filters" children={FilterModal} onClose={filterHandler.close} open={filterOpened} />
      <Only when={!filters}>
        <ProductFilter />
      </Only> */}
        <div
          ref={targetRef}
          className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-4 gap-12 place-content-center mt-5"
        >
          {productListing?.listings?.slice(0, limit).map((product, index) => {
            return (
              <ProductCard
                id={product.id}
                key={index}
                image={baseURL + '/' + (product?.images?.[0]?.filename || '')}
                description={product.condition_details}
                title={product.product_data.title}
                condition={product.condition}
                wishlist={false}
                lowestPrice={product.ask}
                highestPrice={product.highest_offer}
                price={product.saleprice}
              />
            );
          })}
        </div>

        <Center className="mt-20 space-x-3">
          <Only when={limit === 5 && productListing?.listings?.length > 5}>
            <Text size={16} className="font-[600]" color="black">
              View More
            </Text>

            <ActionIcon variant="outline" className="rounded-xl w-9 border-black">
              <ArrowDown size={20} onClick={() => setLimit((prev) => prev + 10)} color="black" />
            </ActionIcon>
          </Only>
          <Only when={limit > 10}>
            <Pagination
              className="mb-16"
              withControls={false}
              position="center"
              value={activePage}
              onChange={(value) => handlePaginatedListing(value)}
              total={10}
            />
          </Only>
        </Center>
      </Only>
      <div className="mt-4">
        <ProductStats condition="used" />
      </div>
      <div className="my-10">
        <SalesTable data={productListingById.sales_history} />
      </div>

      <Only when={recommended?.products?.length > 0}>
        <section className="mt-8 md:mt-20">
          <SectionTitle title="Recommended For You" label="View All" link="?data=recommended" />
          <ScrollArea h={380} type="scroll" scrollbarSize={5}>
            <Center className="space-x-8 md:space-x-16">
              {recommended?.products?.slice(0, 5).map((product, index) => {
                return (
                  <div key={index} className="min-w-[15%]">
                    <ProductCard
                      id={product.id}
                      image={baseURL + '/' + (product?.images?.[0]?.filename || '')}
                      description={'9/10 condition with charger and box'}
                      title={product.title}
                      condition={product.condition}
                      wishlist={false}
                      lowestPrice={Number(product.lowest_price)}
                      highestPrice={Number(product.highest_offer)}
                      price={Number(product?.user_starting_price)}
                    />
                  </div>
                );
              })}
            </Center>
          </ScrollArea>
        </section>
      </Only>
      {/* <div className="">
          <SectionTitle title="Recommended New Items" />
          <ScrollArea h={380} type="scroll" scrollbarSize={5}>
            <Center className="space-x-8 md:space-x-16">
              {productData.slice(0, 5).map((product, index) => {
                return (
                  <ProductCard
                    key={index}
                    image={product.image}
                    description={product.description}
                    link={product.link}
                    title={product.title}
                    condition={product.condition}
                    wishlist={product.wishlist}
                    lowestPrice={product.lowestPrice ?? null}
                    highestPrice={product.highestPrice ?? null}
                    price={product.price}
                  />
                );
              })}
            </Center>
          </ScrollArea>
        </div> */}
    </>
  );
}
