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
import { baseURL } from '@elektra/customComponents';
import { loadWebsiteSection, rehydrateWebsiteSection, store, useAppDispatch } from '@elektra/store';
import {
  loadLatestProducts,
  loadMostSoldProducts,
  loadTrendingProducts,
  rehydrateSpecialProducts,
} from '@elektra/store/entities/slices/specialProducts';
import { Product, WebsiteSection } from '@elektra/types';
import { Center, Grid, Image, ScrollArea } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
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

const categoryData = [
  {
    id: 1,
    image: '/images/category.png',
    title: 'Laptops',
    link: '/shop',
  },
  {
    id: 2,
    image: '/images/category.png',
    title: 'Phones',
    link: '/shop',
  },
  {
    id: 3,
    image: '/images/category.png',
    title: 'Phones',
    link: '/shop',
  },
  {
    id: 4,
    image: '/images/category.png',
    title: 'Phones',
    link: '/shop',
  },
  {
    id: 5,
    image: '/images/category.png',
    title: 'Phones',
    link: '/shop',
  },
  {
    id: 6,
    image: '/images/category.png',
    title: 'Phones',
    link: '/shop',
  },
  {
    id: 7,
    image: '/images/category.png',
    title: 'Phones',
    link: '/shop',
  },
  {
    id: 8,
    image: '/images/category.png',
    title: 'Phones',
    link: '/shop',
  },
  {
    id: 9,
    image: '/images/category.png',
    title: 'Phones',
    link: '/shop',
  },
  {
    id: 10,
    image: '/images/category.png',
    title: 'Phones',
    link: '/shop',
  },
  {
    id: 11,
    image: '/images/category.png',
    title: 'Phones',
    link: '/shop',
  },
  {
    id: 12,
    image: '/images/category.png',
    title: 'Phones',
    link: '/shop',
  },
  {
    id: 13,
    image: '/images/category.png',
    title: 'Phones',
    link: '/shop',
  },
  {
    id: 14,
    image: '/images/category.png',
    title: 'Phones',
    link: '/shop',
  },
  {
    id: 15,
    image: '/images/category.png',
    title: 'Phones',
    link: '/shop',
  },
];

export async function getServerSideProps(context: NextPageContext) {
  // id: 1 means homepage data
  const websiteSection = store.dispatch(loadWebsiteSection(1));

  const trending = store.dispatch(loadTrendingProducts());

  const latest = store.dispatch(loadLatestProducts());

  const mostSold = store.dispatch(loadMostSoldProducts());

  await Promise.all([websiteSection, trending, latest, mostSold]);

  return {
    props: {
      websiteSection: store.getState().entities.websiteSection.list,
      trending: store.getState().entities.specialProducts.list.trending,
      mostSold: store.getState().entities.specialProducts.list.mostSold,
      latest: store.getState().entities.specialProducts.list.latest,
    },
  };
}

type homePageProps = {
  websiteSection: WebsiteSection;
  trending: Product[];
  latest: Product[];
  mostSold: Product[];
};

export function Index({ ...rest }: homePageProps) {
  const { latest, mostSold, trending, websiteSection } = rest;

  console.log(latest);
  const dispatch = useAppDispatch();
  useEffect(() => {
    let unsubscribe = false;
    if (!unsubscribe) {
      dispatch(rehydrateWebsiteSection(websiteSection));
      dispatch(rehydrateSpecialProducts({ mostSold, trending, latest }));
    }
    return () => {
      unsubscribe = true;
    };
  }, []);

  // console.log(trendingData);

  const mediumdScreen = useMediaQuery('(min-width: 1150px)', true);
  const phone = useMediaQuery('(max-width: 600px)', false);

  return (
    <div>
      <section className="mt-4">
        <HeroImage />
      </section>

      <section className="mt-8 md:mt-20">
        <SectionTitle title="Recommended For You" label="View All" />
        <ScrollArea h={380} type="scroll" scrollbarSize={5}>
          <Center className="space-x-8 md:space-x-16">
            {latest.slice(10, 15).map((product, index) => {
              return (
                <div key={index} className="min-w-[15%]">
                  <ProductCard
                    id={product.id}
                    image={
                      baseURL + '/' + (product && product.images && product.images[0] && product.images[0].filename) ||
                      ''
                    }
                    description={'9/10 condition with charger and box'}
                    title={product.title}
                    rating={'New'}
                    wishlist={false}
                    lowestPrice={product.lowest_price || 500}
                    highestPrice={product.highest_offer || 500}
                    price={product.user_starting_price || 500}
                  />
                </div>
              );
            })}
          </Center>
        </ScrollArea>
      </section>

      <section className="mt-4 md:mt-16">
        <SectionTitle title="Trending Now" label="View All" />
        <ScrollArea type="scroll" scrollbarSize={5}>
          <Center className="space-x-8 md:space-x-16">
            {latest.slice(20, 25).map((product, index) => {
              return (
                <div key={index} className="min-w-[15%]">
                  <ProductCard
                    id={product.id}
                    image={
                      baseURL + '/' + (product && product.images && product.images[0] && product.images[0].filename) ||
                      ''
                    }
                    description={'9/10 condition with charger and box'}
                    title={product.title}
                    rating={'New'}
                    wishlist={false}
                    lowestPrice={product.lowest_price || 500}
                    highestPrice={product.highest_offer || 500}
                    price={product.user_starting_price || 500}
                  />
                </div>
              );
            })}
          </Center>
        </ScrollArea>
      </section>

      <section className="mt-4 md:mt-12">
        <SectionTitle title="Categories" />
        <Grid gutter={30} columns={mediumdScreen ? 14 : 18}>
          <ScrollArea type="scroll" scrollbarSize={5}>
            <Center>
              {categoryData.map((category, index) => {
                return (
                  <Grid.Col span={2} key={index}>
                    <CategoryCard
                      key={index}
                      image={category.image}
                      id={category.id}
                      title={category.title}
                      link={category.link}
                    />
                  </Grid.Col>
                );
              })}
            </Center>
          </ScrollArea>
        </Grid>
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
        <SectionTitle title="Most Sold Items" label="View All" />
        <ScrollArea h={380} type="scroll" scrollbarSize={5}>
          <Center className="space-x-8 md:space-x-16">
            {latest.slice(0, 5).map((product, index) => {
              return (
                <div key={index} className="min-w-[15%]">
                  <ProductCard
                    image={
                      baseURL + '/' + (product && product.images && product.images[0] && product.images[0].filename) ||
                      ''
                    }
                    description={'9/10 condition with charger and box'}
                    id={product.id}
                    title={product.title}
                    rating={'New'}
                    wishlist={false}
                    lowestPrice={product.lowest_price || 500}
                    highestPrice={product.highest_offer || 500}
                    price={product.user_starting_price || 500}
                  />
                </div>
              );
            })}
          </Center>
        </ScrollArea>
      </section>

      <section className="mt-4 md:mt-12">
        <SectionTitle title="Latest Items" />
        <ScrollArea h={380} type="scroll" scrollbarSize={5}>
          <Center className="space-x-8 md:space-x-16">
            {latest.slice(0, 5).map((product, index) => {
              return (
                <div key={index} className="min-w-[15%]">
                  <ProductCard
                    image={
                      baseURL + '/' + (product && product.images && product.images[0] && product.images[0].filename) ||
                      ''
                    }
                    description={'9/10 condition with charger and box'}
                    id={product.id}
                    title={product.title}
                    rating={'New'}
                    wishlist={false}
                    lowestPrice={product.lowest_price || 500}
                    highestPrice={product.highest_offer || 500}
                    price={product.user_starting_price || 500}
                  />
                </div>
              );
            })}
          </Center>
        </ScrollArea>
      </section>
      <section className="mt-20">
        <Image src="/images/banner/razorBanner.jpg" alt="razor banner" className="-z-20" />
        <div className="-mt-20 md:-mt-36 ml-5 md:ml-0">
          <BannerCarousel carouselData={carouselData} />
        </div>
      </section>
      <section>
        <SectionTitle title="Brands" />
        <Grid gutter={30} columns={mediumdScreen ? 14 : 18}>
          <ScrollArea type="hover" scrollbarSize={5}>
            <Center>
              {categoryData.map((category, index) => {
                return (
                  <Grid.Col span={2} key={index}>
                    <CategoryCard
                      key={index}
                      image={category.image}
                      id={category.id}
                      title={category.title}
                      link={category.link}
                    />
                  </Grid.Col>
                );
              })}
            </Center>
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
