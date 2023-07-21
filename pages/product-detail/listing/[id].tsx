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
import { Modal, Only, baseURL } from '@elektra/customComponents';
import { useFilterModal } from '@elektra/hooks';
import {
  RootState,
  loadProductListingById,
  loadProductVariants,
  rehydrateProductListingById,
  rehydrateProductVariants,
  store,
  useAppDispatch,
  useSelector,
} from '@elektra/store';

import { loadListingProducts, rehydrateListingProductData } from '@elektra/store/entities/slices/productListing';
import { ListingsResponse, ProductVariant, SingleProductListing } from '@elektra/types';
import {
  ActionIcon,
  Anchor,
  Breadcrumbs,
  Button,
  Center,
  Divider,
  Grid,
  Group,
  Pagination,
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

  console.log(context.query.id);
  const listingData = store.dispatch(loadListingProducts(Number(context.query.id)));
  const productVariants = store.dispatch(loadProductVariants());
  const productListingById = store.dispatch(loadProductListingById(Number(context.query.id)));

  await Promise.all([listingData, productVariants, productListingById]);
  return {
    props: {
      productListing: store.getState().entities.productListing.list,
      productVariants: store.getState().entities.productVariants.list,
      productListingById: store.getState().entities.productListingById.list,
    },
  };
}

type ProductPageProps = {
  productListing: ListingsResponse;
  productVariants: ProductVariant;
  productListingById: SingleProductListing;
};

export default function ProductPage({ productListing, productVariants, productListingById }: ProductPageProps) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    let unsubscribe = false;
    if (!unsubscribe) {
      dispatch(rehydrateListingProductData(productListing));
      dispatch(rehydrateProductVariants(productVariants));
      dispatch(rehydrateProductListingById(productListingById));
    }
    return () => {
      unsubscribe = true;
    };
  }, []);

  const listingProducts = useSelector((state: RootState) => state.entities?.productListing?.list);

  const router = useRouter();

  const [activePage, setPage] = useState(1);
  const [FilterModal, filterOpened, filterHandler] = useFilterModal();
  const [limit, setLimit] = useState(5);
  const matches = useMediaQuery('(max-width: 800px)', false);
  const filters = useMediaQuery('(max-width: 1100px)', false);
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    duration: 100,
  });

  const handlePaginatedListing = (pageNumber: number) => {
    setPage(pageNumber);
    const productId = Number(router.query['id']);
    dispatch(loadListingProducts(productId, `&limit=15&page=${pageNumber}`));
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
            technicalSpecification={productListingById.listing?.technical_specifications || []}
            title={productListingById?.listing?.product?.title || ''}
            productVariants={productListingById.listing?.listing_variants || []}
            condition={productListingById.listing?.condition}
            highestAsk={Number(productListingById?.listing?.highest_offer)}
            lowestAsk={Number(productListingById?.listing?.lowest_offer)}
            price={Number(productListingById?.listing?.user_starting_at)}
            scrollIntoView={scrollIntoView}
          />
        </Grid.Col>
      </Grid>
      <Divider className="my-4" />
      <Group position="apart" align="top">
        <SectionTitle title={`Used ${productListingById.listing.product.title}`} />
        <Only when={filters}>
          <Button onClick={filterHandler.open} leftIcon={<Filter />}>
            Filter
          </Button>
        </Only>
      </Group>
      <Modal title="Filters" children={FilterModal} onClose={filterHandler.close} open={filterOpened} />
      <Only when={!filters}>
        <ProductFilter />
      </Only>
      <div ref={targetRef} className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-4 gap-12 place-content-center mt-5">
        {listingProducts?.listings?.slice(0, limit).map((product, index) => {
          return (
            <ProductCard
              id={product.id}
              key={index}
              image={baseURL + '/' + (product?.images?.[0]?.filename || '')}
              description={product.condition_details}
              title={product.product_data.title}
              condition={product.condition}
              wishlist={false}
              lowestPrice={product.lowest_offer || 500}
              highestPrice={product.highest_offer || 500}
              price={product.saleprice || 500}
            />
          );
        })}
      </div>

      <Center className="mt-20 space-x-3">
        <Only when={limit === 5}>
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
      <div className="mt-4">
        <ProductStats condition="used" />
      </div>
      <div className="my-10">
        <SalesTable />
      </div>
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