import { Banner, BannerCarousel, BannerProps, CategoryCard, FooterProductCarousel, HeroImage, ProductCard, ProductCardProps, SectionTitle } from '@elektra/components';
import { Container, Grid, Image, Stack, Text } from '@mantine/core';


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
  return (
    <div>
        <section className="mt-4">
          <HeroImage />
        </section>

        <section className="mt-20">
          <SectionTitle title="Recommended For You" label="View All" />

          <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-12 place-content-center mt-5">
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

          <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-12 place-content-center mt-5">
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
          <Grid gutter={40}>
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
          </Grid>
        </section>

        <section className="mt-20">
          <Grid>
            {bannerData.map((item, key) => (
              <Grid.Col span={6} key={key}>
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

          <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-12 place-content-center mt-5">
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

          <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-12 place-content-center mt-5">
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

          <BannerCarousel carouselData={carouselData} className="mt-[-200px]" slideSize="33.33%" />
        </section>
        <section className="">
          <SectionTitle title="Brands" />
          <Grid gutter={40}>
            {brandData.map((category, index) => {
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
          </Grid>
        </section>
        <div className="mt-10">
          <Stack justify="center" align="center">
            <Text size={24} className="font-bold text-black">
              Popular Products
            </Text>
            <Text size={48} className="font-extrabold text-black">
              Beats Headphones
            </Text>
            <FooterProductCarousel />
          </Stack>
        </div>
    </div>
  );
}

export default Index;
