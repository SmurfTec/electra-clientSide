import { FooterProductCarousel, ItemFilter, ProductCard, SectionTitle } from '@elektra/components';
import { Modal, Only, baseURL, isAuthenticated } from '@elektra/customComponents';
import { useFilterModal } from '@elektra/hooks';
import {
  RootState,
  fetchShopProducts,
  fetchSingleBrand,
  fetchSingleGenericCategory,
  loadFilterProducts,
  login,
  rehydrateShopProducts,
  store,
  useAppDispatch,
  useSelector,
} from '@elektra/store';
import { BrandAndCategory, Product } from '@elektra/types';
import { BackgroundImage, Button, Group, Image, Pagination, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { NextLink } from '@mantine/next';
import { NextPageContext } from 'next';
import { useEffect, useState } from 'react';
import { Filter } from 'tabler-icons-react';

export async function getServerSideProps(context: NextPageContext) {
  // id: 1 means homepage data
  const categoryId = context.query.category;
  const isAuth = await isAuthenticated(context.req);
  const brandId = context.query.brand;
  const data = context.query.data;
  const sort = context.query.sort;
  const params = categoryId
    ? `?category=${categoryId}`
    : brandId
    ? `?brand=${brandId}`
    : data
    ? `/${data}`
    : sort
    ? `/?sort=${sort}`
    : '';

  const shopProducts = store.dispatch(fetchShopProducts(isAuth, params));
  const genericData = categoryId
    ? await store.dispatch(fetchSingleGenericCategory(String(categoryId)))
    : brandId
    ? await store.dispatch(fetchSingleBrand(String(brandId)))
    : undefined;

  await Promise.all([shopProducts]);

  return {
    props: {
      products: store.getState().entities.specialProducts.list.shopProducts,
      genericData: genericData ? genericData.data : null,
      queryParams: params,
      isAuth,
    },
  };
}

type ShopPageProps = {
  products: Product;
  genericData: BrandAndCategory | undefined;
  queryParams?: string;
  isAuth: boolean;
};

export default function ShopPage({ products, genericData, queryParams, isAuth }: ShopPageProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let unsubscribe = false;
    if (!unsubscribe) {
      dispatch(rehydrateShopProducts(products));
      if (!isAuth) {
        dispatch(login({ isAuthenticated: false, user: null, profile: null }));
      }
    }
    return () => {
      unsubscribe = true;
    };
  }, []);

  const [activePage, setPage] = useState(1);
  const [params, setParams] = useState<Array<{ id: number; label: string; value: string }>>([]);
  const productFilters = useSelector((state: RootState) => state.entities.productVariants.list.variants);
  const handleFilter = async (label: string, value: string, id: number) => {
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
      dispatch(loadFilterProducts(isAuth));
      return;
    }
    const paramString = newParams.map((item) => `${item.label}=${item.value}`).join('&');
    dispatch(loadFilterProducts(isAuth, paramString));
  };
  const [FilterModal, filterOpened, filterHandler] = useFilterModal({
    data: productFilters,
    filter: params,
    setFilter: setParams,
    fetchListings: handleFilter, 
  });
  const matches = useMediaQuery('(max-width: 600px)');

  const shopProducts = useSelector((state: RootState) => state.entities.specialProducts.list.shopProducts);

  const handlePaginatedProducts = (pageNumber: number) => {
    setPage(pageNumber);

    dispatch(fetchShopProducts(isAuth, queryParams + `${queryParams ? '&' : '?'}page=${pageNumber}&limit=10`));
  };

  return (
    <>
      <Image
        className="mt-4"
        src={genericData?.image ? baseURL + '/' + genericData.image.filename : '/images/shop/heroBanner.jpg'}
        alt="banner"
        height={400}
      />
      <div className="my-4">
        <Group position="apart">
          <Only when={matches}>
            <Button onClick={filterHandler.open} leftIcon={<Filter />}>
              Filter
            </Button>
          </Only>
        </Group>
        <Only when={!matches}>
          <ItemFilter data={productFilters} fetchListings={handleFilter} filter={params} setFilter={setParams} />
        </Only>
      </div>
      <SectionTitle title="All Products" />
      <Modal title="Filters" children={FilterModal} onClose={filterHandler.close} open={filterOpened} />
      <div className="grid grid-cols-2 gap-12 mt-5 lg:grid-cols-5 md:grid-cols-4 place-content-center">
        {shopProducts?.products?.map((product, index) => {
        
          return (
            <div key={index} className="min-w-[15%]">
              <ProductCard
                id={product.id}
                image={baseURL + '/' + (product?.images?.[0]?.filename || '')}
                description={'9/10 condition with charger and box'}
                title={product.title}
                condition={product.condition}
                usedPrice={Number(product?.user_starting_price)}
                wishlist={product.is_liked}
                lowestPrice={Number(product?.user_starting_price || 0)}
                highestPrice={Number(product.highest_offer || 0)}
                price={Number(product?.user_starting_price)}
              />
            </div>
          );
        })}
      </div>
      <Group position="center">
        <Text size="sm" color="black" className="font-bold">
          Page
        </Text>
        <Pagination
          className="my-16"
          withControls={false}
          position="center"
          value={activePage}
          onChange={(page) => handlePaginatedProducts(page)}
          total={
            // !queryParams
            // ?
            Math.ceil(Number(shopProducts?.stats?.total_products ?? 0) / 10)
            // : Math.ceil(Number(shopProducts?.results ?? 0) / 10)
          }
        />
      </Group>

      <BackgroundImage
        className="text-center min-h-[350px]  sm:min-h-[550px] relative"
        src="/images/shop/mobileBanner.png"
      >
        <div className="absolute space-y-8 -translate-y-1/2 top-1/2 sm:left-1/2 sm:-translate-x-1/2">
          <Title color="white" size={!matches ? 96 : 48} className="font-[300]">
            NOKIA 1.3
          </Title>
          <Text size={!matches ? 36 : 20} color="white" className="font-[100]">
            Get the newly released Nokia 1.3 and have the best expereince
          </Text>
          <Button
            component={NextLink}
            href="/product-listing"
            uppercase
            size="lg"
            bg={'white'}
            styles={{
              label: {
                fontWeight: 'lighter',
                color: 'black',
              },
              root: {
                '&:hover': {
                  backgroundColor: 'white !important',
                },
              },
            }}
          >
            PLACE OFFER
          </Button>
        </div>
      </BackgroundImage>
      <div className="mt-10">
        <FooterProductCarousel />
      </div>
    </>
  );
}
