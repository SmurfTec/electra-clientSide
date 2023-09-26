import {
  Banner,
  BannerCarousel,
  BannerProps,
  CategoryCard,
  FooterProductCarousel,
  HeroImage,
  ProductCard,
  SectionTitle,
} from '@elektra/components';
import { Only, baseURL, isAuthenticated } from '@elektra/customComponents';
import {
  loadBrand,
  loadGenericCategory,
  loadNotifications,
  loadWebsiteSection,
  login,
  rehydrateWebsiteSection,
  store,
  useAppDispatch,
} from '@elektra/store';
import {
  loadLatestProducts,
  loadMostSoldProducts,
  loadRecommendedProducts,
  loadTrendingProducts,
  rehydrateSpecialProducts,
} from '@elektra/store/entities/slices/specialProducts';
import { BrandsResponse, GenericCategoryResponse, Product, WebsiteSection } from '@elektra/types';
import { Box, Flex, Grid, Image, ScrollArea } from '@mantine/core';
import { NextPageContext } from 'next';
import { useEffect } from 'react';

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
    imgSrc: '/images/carousel/leftLaptop.png',
    title: 'Razer Blade 15',
  },
  {
    imgSrc: '/images/carousel/centerLaptop.png',
    title: 'Razer Blade 16',
  },
  {
    imgSrc: '/images/carousel/leftLaptop.png',
    title: 'Razer Blade 16',
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
    title: 'NEW APPLE',
    heading: 'Iphone 14 Pro',
    label: 'Shop Today',
  },
];

export async function getServerSideProps(context: NextPageContext) {
  // id: 1 means homepage data
  const isAuth = await isAuthenticated(context.req);
  const websiteSection = store.dispatch(loadWebsiteSection(1));

  const trending = store.dispatch(loadTrendingProducts(isAuth));

  const latest = store.dispatch(loadLatestProducts(isAuth));

  const mostSold = store.dispatch(loadMostSoldProducts(isAuth));

  const recommended = store.dispatch(loadRecommendedProducts(isAuth));

  const genericCategories = store.dispatch(loadGenericCategory());
  const notification = store.dispatch(loadNotifications());

  const brands = store.dispatch(loadBrand());

  await Promise.all([websiteSection, trending, latest, mostSold, notification, recommended, genericCategories, brands]);

  return {
    props: {
      websiteSection: store.getState().entities.websiteSection.list,
      trending: store.getState().entities.specialProducts.list.trending,
      mostSold: store.getState().entities.specialProducts.list.mostSold,
      latest: store.getState().entities.specialProducts.list.latest,
      recommended: store.getState().entities.specialProducts.list.recommended,
      genericCategories: store.getState().entities.genericCategory.list,
      brand: store.getState().entities.brand.list,
      isAuth,
    },
  };
}

type homePageProps = {
  websiteSection: WebsiteSection;
  trending: Product;
  latest: Product;
  mostSold: Product;
  recommended: Product;
  genericCategories: GenericCategoryResponse;
  brand: BrandsResponse;
  isAuth: boolean;
};

export function Index({ ...rest }: homePageProps) {
  const { latest, mostSold, trending, websiteSection, recommended, genericCategories, brand, isAuth } = rest;
  const dispatch = useAppDispatch();

  useEffect(() => {
    let unsubscribe = false;
    if (!unsubscribe) {
      if (!isAuth) {
        dispatch(login({ isAuthenticated: false, user: null, profile: null }));
      }
      dispatch(rehydrateWebsiteSection(websiteSection));
      dispatch(rehydrateSpecialProducts({ mostSold, trending, latest }));
    }
    return () => {
      unsubscribe = true;
    };
  }, []);

  return (
    <div>
      <section className="mt-4">
        <HeroImage />
      </section>
      <Only when={recommended?.products?.length > 0}>
        <section className="mt-8 md:mt-20">
          <SectionTitle title="Recommended For You" label="View All" link="?data=recommended" />
          <ScrollArea type="scroll" scrollbarSize={5}>
            <Flex className="space-x-8">
              {recommended?.products?.map((product, index) => {
                return (
                  <Box key={index} w={250}>
                    <ProductCard
                      id={product.id}
                      image={baseURL + '/' + (product?.images?.[0]?.filename || '')}
                      description={'9/10 condition with charger and box'}
                      title={product.title}
                      condition={product.condition}
                      wishlist={product.is_liked}
                      lowestPrice={Number(product.lowest_price)}
                      highestPrice={Number(product.highest_offer)}
                      usedPrice={Number(product?.user_starting_price)}
                      price={Number(product?.user_starting_price)}
                    />
                  </Box>
                );
              })}
            </Flex>
          </ScrollArea>
        </section>
      </Only>

      <section className="mt-4 md:mt-16">
        <SectionTitle title="Trending Now" label="View All" link="?data=trending" />
        <ScrollArea type="scroll" scrollbarSize={5}>
          <Flex className="space-x-8">
            {trending?.products?.map((product, index) => {
              return (
                <Box key={index} w={250}>
                  <ProductCard
                    id={product.id}
                    image={baseURL + '/' + (product?.images?.[0]?.filename || '')}
                    description={'9/10 condition with charger and box'}
                    title={product.title}
                    condition={product.condition}
                    wishlist={product.is_liked}
                    lowestPrice={Number(product.lowest_price)}
                    highestPrice={Number(product.highest_offer)}
                    price={Number(product?.user_starting_price)}
                    usedPrice={Number(product?.user_starting_price)}
                  />
                </Box>
              );
            })}
          </Flex>
        </ScrollArea>
      </section>

      <section className="mt-4 md:mt-12">
        <SectionTitle title="Categories" />

        <ScrollArea type="scroll" scrollbarSize={5}>
          <Flex className="space-x-8">
            {genericCategories?.categories?.map((category, index) => {
              return (
                <Box key={index} w={250}>
                  <CategoryCard
                    key={index + category.id}
                    image={baseURL + '/' + category.image?.filename}
                    // image="/images/brands/brand.png"
                    id={category.id}
                    title={category.name}
                    link={'/shop?category=' + category.id}
                  />
                </Box>
              );
            })}
          </Flex>
        </ScrollArea>
      </section>

      <section className="mt-14">
        <Grid>
          {bannerData.map((item, key) => (
            <Grid.Col sm={6} key={key}>
              <Banner
                key={key}
                id={item.id}
                heading={item.heading}
                title={item.title}
                label={item.label}
                image={item.image}
                link={item.link}
              />
            </Grid.Col>
          ))}
        </Grid>
      </section>

      <section className="mt-8 md:mt-12">
        <SectionTitle title="Most Sold Items" label="View All" link="?data=sold" />
        <ScrollArea type="scroll" scrollbarSize={5}>
          <Flex className="space-x-8">
            {mostSold.products?.map((product, index) => {
              return (
                <Box key={index} w={250}>
                  <ProductCard
                    id={product.id}
                    image={baseURL + '/' + (product?.images?.[0]?.filename || '')}
                    description={'9/10 condition with charger and box'}
                    title={product.title}
                    usedPrice={Number(product?.user_starting_price)}
                    condition={product.condition}
                    wishlist={product.is_liked}
                    lowestPrice={Number(product.lowest_price)}
                    highestPrice={Number(product.highest_offer)}
                    price={Number(product?.user_starting_price)}
                  />
                </Box>
              );
            })}
          </Flex>
        </ScrollArea>
      </section>

      <section className="mt-4 md:mt-12">
        <SectionTitle title="Latest Items" label="View All" link="?sort=-created_on" />
        <ScrollArea type="scroll" scrollbarSize={5}>
          <Flex className="space-x-8">
            {latest?.products?.map((product, index) => {
              return (
                <Box key={index} w={250}>
                  <ProductCard
                    id={product.id}
                    image={baseURL + '/' + (product?.images?.[0]?.filename || '')}
                    description={'9/10 condition with charger and box'}
                    title={product.title}
                    condition={product.condition}
                    usedPrice={Number(product?.user_starting_price)}
                    wishlist={product.is_liked}
                    lowestPrice={Number(product.lowest_price)}
                    highestPrice={Number(product.highest_offer)}
                    price={Number(product?.user_starting_price)}
                  />
                </Box>
              );
            })}
          </Flex>
        </ScrollArea>
      </section>
      <section className="mt-20">
        <Image src="/images/banner/razorBanner.jpg" alt="razor banner" className="-z-20" />
        <div className="-mt-20 md:-mt-36 ml-5 md:ml-0">
          <BannerCarousel carouselData={carouselData} />
        </div>
      </section>
      <section className="mt-4 md:mt-12">
        <SectionTitle title="Brands" />
        <Grid gutter={30} columns={6}>
          <ScrollArea type="scroll" scrollbarSize={5}>
            {/* <Center> */}
            <Flex className="space-x-8">
              {brand?.brands?.map((category, index) => {
                return (
                  // <Grid.Col span={2} key={index}>
                  <Box key={index} w={250}>
                    <CategoryCard
                      key={index + category.id}
                      image={baseURL + '/' + category.image?.filename}
                      // image="/images/brands/brand.png"
                      id={category.id}
                      title={category.title}
                      link={'/shop?brand=' + category.id}
                    />
                  </Box>
                  // </Grid.Col>
                );
              })}
            </Flex>
            {/* </Center> */}
          </ScrollArea>
        </Grid>
      </section>

      <div className="my-10 pb-20">
        <FooterProductCarousel />
      </div>
    </div>
  );
}

export default Index;
