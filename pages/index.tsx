import {
  Banner,
  BannerCarousel,
  BannerProps,
  CategoryCard,
  FooterProductCarousel,
  HeroImage,
  ProductCard,
  ProductCardProps,
  SectionTitle,
} from '@elektra/components';
import { Center, Container, Grid, Image, ScrollArea, Stack, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

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

// const ProductCarouselData = [
//   {
//     imgSrc: '/images/carousel/mouse.png',
//     // title: 'Razer Blade 13',
//   },
//   {
//     imgSrc: '/images/carousel/headphone.png',
//     // title: 'Razer Blade 14',
//   },
//   {
//     imgSrc: '/images/carousel/ram.png',
//     // title: 'Razer Blade 15',
//   },
// ];

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

const productData: ProductCardProps[] = [
  {
    id: 4,
    image: '/images/product.png',
    link: '/product-detail?condition=new',
    title: 'Iphone X',
    description: '9/10 condition with charger and box',
    rating: 'New',
    wishlist: true,
    lowestPrice: null,
    highestPrice: 500,
    price: 187,
  },
  {
    id: 5,
    image: '/images/product.png',
    link: '/product-detail',
    title: 'Iphone 14 Pro max',
    description: '9/10 condition with charger and box',
    wishlist: false,
    lowestPrice: null,
    highestPrice: 500,
    price: 187,
  },
  {
    id: 5,
    image: '/images/product.png',
    link: '/product-detail',
    title: 'Iphone 14 Pro max',
    description: '9/10 condition with charger and box',
    wishlist: false,
    lowestPrice: null,
    highestPrice: 500,
    price: 187,
  },
  {
    id: 5,
    image: '/images/product.png',
    link: '/product-detail',
    title: 'Iphone 14 Pro max',
    description: '9/10 condition with charger and box',
    wishlist: false,
    lowestPrice: null,
    highestPrice: 500,
    price: 187,
  },
  {
    id: 5,
    image: '/images/product.png',
    link: '/product-detail',
    title: 'Iphone 14 Pro max',
    description: '9/10 condition with charger and box',
    wishlist: false,
    lowestPrice: null,
    highestPrice: 500,
    price: 187,
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
    id:11,
    image: '/images/category.png',
    title: 'Phones',
    link: '/shop',
  },
  {
    id:12,
    image: '/images/category.png',
    title: 'Phones',
    link: '/shop',
  },
  {
    id:13,
    image: '/images/category.png',
    title: 'Phones',
    link: '/shop',
  },
  {
    id:14,
    image: '/images/category.png',
    title: 'Phones',
    link: '/shop',
  },
  {
    id:15,
    image: '/images/category.png',
    title: 'Phones',
    link: '/shop',
  },
];

const brandData = [
  {
    id: 1,
    image: '/images/brands/brand.png',
    title: 'Apple',
    link: '/shop',
  },
  {
    id: 2,
    image: '/images/brands/brand.png',
    title: 'HP',
    link: '/shop',
  },
  {
    id: 3,
    image: '/images/brands/brand.png',
    title: 'Razor',
    link: '/shop',
  },
  {
    id: 4,
    image: '/images/brands/brand.png',
    title: 'Dell',
    link: '/shop',
  },
  {
    id: 5,
    image: '/images/brands/brand.png',
    title: 'Nvidia',
    link: '/shop',
  },
  {
    id: 6,
    image: '/images/brands/brand.png',
    title: 'AMD',
    link: '/shop',
  },
];

export function Index() {
  const mediumdScreen = useMediaQuery('(min-width: 1150px)', true);
  return (
    <div>
      <section className="mt-4">
        <HeroImage />
      </section>

      <section className="mt-20">
        <SectionTitle title="Recommended For You" label="View All" />

        <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 gap-12 place-content-center mt-5">
          {productData.map((product, index) => {
            return (
              <ProductCard
                key={product.id + index}
                id={product.id}
                image={product.image}
                description={product.description}
                link={product.link}
                title={product.title}
                rating={product.rating}
                wishlist={product.wishlist}
                lowestPrice={product.lowestPrice ?? null}
                highestPrice={product.highestPrice ?? null}
                price={product.price}
              />
            );
          })}
        </div>
      </section>

      <section className="mt-20">
        <SectionTitle key={1} title="Trending Now" label="View All" />

        <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 gap-12 place-content-center mt-5">
          {productData.map((product, index) => {
            return (
              <ProductCard
                key={product.id + index}
                id={product.id}
                image={product.image}
                description={product.description}
                link={product.link}
                title={product.title}
                rating={product.rating}
                wishlist={product.wishlist}
                lowestPrice={product.lowestPrice ?? null}
                highestPrice={product.highestPrice ?? null}
                price={product.price}
              />
            );
          })}
        </div>
      </section>

      <section className="mt-20">
        <SectionTitle title="Categories" />
        
          <Grid gutter={12} columns={mediumdScreen?10:18}>
          <ScrollArea type="never" scrollbarSize={5}>
          <Center >
            {categoryData.map((category, index) => {
              return (
                <Grid.Col  span={2} key={index}>
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

      <section className="mt-20">
        <SectionTitle title="Most Sold Items" label="View All" />

        <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 gap-12 place-content-center mt-5">
          {productData.map((product, index) => {
            return (
              <ProductCard
                key={product.id + index}
                id={product.id}
                image={product.image}
                description={product.description}
                link={product.link}
                title={product.title}
                rating={product.rating}
                wishlist={product.wishlist}
                lowestPrice={product.lowestPrice ?? null}
                highestPrice={product.highestPrice ?? null}
                price={product.price}
              />
            );
          })}
        </div>
      </section>

      <section className="mt-20">
        <SectionTitle title="Latest Items" />

        <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 gap-12 place-content-center mt-5">
          {productData.map((product, index) => {
            return (
              <ProductCard
                key={product.id + index}
                id={product.id}
                image={product.image}
                description={product.description}
                link={product.link}
                title={product.title}
                rating={product.rating}
                wishlist={product.wishlist}
                lowestPrice={product.lowestPrice ?? null}
                highestPrice={product.highestPrice ?? null}
                price={product.price}
              />
            );
          })}
        </div>
      </section>

      <section className="mt-20">
        <Image src="/images/banner/razorBanner.jpg" alt="razor banner" />

        <BannerCarousel
          carouselData={carouselData}
          className="mt-[-150px] sm:mt-[-200px]"
          slideSize={mediumdScreen ? '100%' : '33.33%'}
        />
      </section>
      <section className="mt-[-150px] sm:mt-[-60px]">
        <SectionTitle title="Brands" />
        <Grid gutter={12} columns={mediumdScreen?12:18}>
          <ScrollArea type="never" scrollbarSize={5}>
          <Center >
            {brandData.map((category, index) => {
              return (
                <Grid.Col  span={2} key={index}>
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
      <div className="mt-24">
        <Stack justify="center" align="center">
          <Text size={24} className="font-bold text-black">
            Popular Products
          </Text>
          <Text size={48} className="font-extrabold text-black text-center">
            Beats Headphones
          </Text>
          <FooterProductCarousel />
        </Stack>
      </div>
    </div>
  );
}

export default Index;
