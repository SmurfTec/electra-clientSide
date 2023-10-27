import { BannerProps, ItemFilter, ProductCard, ProductCardProps, SectionTitle } from '@elektra/components';
import { baseURL, isAuthenticated } from '@elektra/customComponents';
import {
  RootState,
  fetchShowMoreProducts,
  initStore,
  loadListingProducts,
  login,
  useAppDispatch,
  useSelector,
} from '@elektra/store';
import { Product } from '@elektra/types';
import { Container, Divider, Text } from '@mantine/core';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const carouselData = [
  {
    imgSrc: '/images/carousel/leftLaptop.png',
    title: 'Razer Blade 13',
  },
  {
    imgSrc: '/images/carousel/centerLaptop.png',
    title: 'Razer Blade 14',
  },
  {
    imgSrc: '/images/carousel/rightLaptop.png',
    title: 'Razer Blade 15',
  },
  {
    imgSrc: '/images/carousel/leftLaptop.png',
    title: 'Razer Blade 16',
  },
  {
    imgSrc: '/images/carousel/leftLaptop.png',
    title: 'Razer Blade 16',
  },
];

const ProductCarouselData = [
  {
    imgSrc: '/images/carousel/mouse.png',
    // title: 'Razer Blade 13',
  },
  {
    imgSrc: '/images/carousel/headphone.png',
    // title: 'Razer Blade 14',
  },
  {
    imgSrc: '/images/carousel/ram.png',
    // title: 'Razer Blade 15',
  },
];

const bannerData: BannerProps[] = [
  {
    id: 0,
    image: '/images/banner/headphone.png',
    link: '/shop',
    title: 'Trending Beats',
    heading: 'Headphones',
    label: 'Shop Today',
  },
  {
    id: 1,
    image: '/images/banner/Iphone.png',
    link: '/shop',
    title: 'new APPLE',
    heading: 'Iphone 14 Pro',
    label: 'Shop Today',
  },
];

const productData: ProductCardProps[] = [
  {
    image: '/images/product.png',
    id: 0,
    title: 'Iphone X',
    description: '9/10 condition with charger and box',
    condition: 'new',
    wishlist: true,
    lowestPrice: null,
    highestPrice: 500,
    price: 187,
  },
  {
    condition: 'new',
    image: '/images/product.png',
    id: 0,
    title: 'Iphone 14 Pro max',
    description: '9/10 condition with charger and box',
    wishlist: false,
    lowestPrice: null,
    highestPrice: 500,
    price: 187,
  },
  {
    condition: 'new',
    image: '/images/product.png',
    id: 0,
    title: 'Iphone 14 Pro max',
    description: '9/10 condition with charger and box',
    wishlist: false,
    lowestPrice: null,
    highestPrice: 500,
    price: 187,
  },
  {
    condition: 'new',

    image: '/images/product.png',
    id: 0,
    title: 'Iphone 14 Pro max',
    description: '9/10 condition with charger and box',
    wishlist: false,
    lowestPrice: null,
    highestPrice: 500,
    price: 187,
  },
  {
    condition: 'new',
    image: '/images/product.png',
    id: 0,
    title: 'Iphone 14 Pro max',
    description: '9/10 condition with charger and box',
    wishlist: false,
    lowestPrice: null,
    highestPrice: 500,
    price: 187,
  },
];

export async function getServerSideProps(context: NextPageContext) {
  const store = initStore();
  const isAuth = await isAuthenticated(context.req);
  const showMore = context.query['show-more'];
  if (!showMore) {
    return { redirect: { permanent: false, destination: '/404' } };
  }
  const products = store.dispatch(fetchShowMoreProducts(String(showMore), isAuth));
  await Promise.all([products]);
  return {
    props: {
      products: store.getState().entities.specialProducts.list.showMore,
      isAuth,
    },
  };
}
type ShowingMore = {
  products: Product;
  isAuth: boolean;
};
export function ShowingMore({ products, isAuth }: ShowingMore) {
  useEffect(() => {
    if (!isAuth) {
      dispatch(login({ isAuthenticated: false, user: null, profile: null }));
    }
  }, []);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const trending = useSelector((state: RootState) => state.entities.specialProducts.list.trending);
  const mostSold = useSelector((state: RootState) => state.entities.specialProducts.list.mostSold);
  const recommended = useSelector((state: RootState) => state.entities.specialProducts.list.recommended);
  const latest = useSelector((state: RootState) => state.entities.specialProducts.list.latest);
  const [params, setParams] = useState<Array<{ id: number; label: string; value: string }>>([]);
  const productFilters = useSelector((state: RootState) => state.entities?.productVariants.list.variants);
  const search = router.query['show-more'];
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
  return (
    <div>
      <Container fluid>
        <section className="mt-5">
          <Text className="font-extrabold text-black" size={32}>
            Showing more results for
          </Text>
          <Text className="font-medium text-black" size={24}>
            “{search}”
          </Text>
          <Divider mt={15} />
        </section>
        <div className="mt-5">
          <ItemFilter setFilter={setParams} filter={params} data={productFilters} fetchListings={handleFilter} />
        </div>
        <section className="mt-5">
          <SectionTitle title={`${products?.products.length} Results for ${search}`} />
          <div className="grid grid-cols-2 gap-12 mt-5 lg:grid-cols-5 md:grid-cols-4 place-content-center">
            {products.products.slice(0, 5).map((product, index) => {
              return (
                <ProductCard
                  key={index + product?.title}
                  id={product.id}
                  image={baseURL + '/' + (product?.images?.[0]?.filename || '')}
                  description={'9/10 condition with charger and box'}
                  title={product.title}
                  condition={product.condition}
                  usedPrice={Number(product?.user_starting_price)}
                  wishlist={product.is_liked}
                  lowestPrice={Number(product.lowest_ask)}
                  highestPrice={Number(product.highest_offer)}
                  price={Number(product?.user_starting_price)}
                />
              );
            })}
          </div>
        </section>

        <section className="mt-20">
          <SectionTitle key={1} title="Trending Now" label="View All" />

          <div className="grid grid-cols-2 gap-12 mt-5 lg:grid-cols-5 md:grid-cols-4 place-content-center">
            {trending.products.slice(0, 5).map((product, index) => {
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
                    lowestPrice={Number(product.lowest_ask)}
                    highestPrice={Number(product.highest_offer)}
                    price={Number(product?.user_starting_price)}
                  />
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-20">
          <SectionTitle title="Most Sold Items" label="View All" />

          <div className="grid grid-cols-2 gap-12 mt-5 lg:grid-cols-5 md:grid-cols-4 place-content-center">
            {mostSold.products.slice(0, 5).map((product, index) => {
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
                    lowestPrice={Number(product.lowest_ask)}
                    highestPrice={Number(product.highest_offer)}
                    price={Number(product?.user_starting_price)}
                  />
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-20">
          <SectionTitle title="Latest Items" />

          <div className="grid grid-cols-2 gap-12 mt-5 lg:grid-cols-5 md:grid-cols-4 place-content-center">
            {latest.products.slice(0, 5).map((product, index) => {
              // console.log(product,"product")
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
                    lowestPrice={Number(product.lowest_ask)}
                    highestPrice={Number(product.highest_offer)}
                    price={Number(product?.user_starting_price)}
                  />
                </div>
              );
            })}
          </div>
        </section>
      </Container>
    </div>
  );
}

export default ShowingMore;
