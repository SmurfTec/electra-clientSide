import { Carousel } from '@mantine/carousel';
import { Button, Container, Grid, Group, Image, Text } from '@mantine/core';
import emblaCarouselAutoplay from 'embla-carousel-autoplay';
import { useRef, useState } from 'react';
import { ArrowNarrowRight } from 'tabler-icons-react';
import { SectionTitle } from '../app/components/AppTitle';
import { Banner, BannerProps } from '../app/components/banner';
import { CategoryCard, ProductCard, ProductCardProps } from '../app/components/card';
import { HeroImage } from '../app/components/hero';
import { Footer } from '../app/components/siteSection';
import { useStylesforGlobal } from '../app/components/theme';

export function Index() {
  const { classes } = useStylesforGlobal();
  const autoplay = useRef(emblaCarouselAutoplay({ delay: 4000 }));

  const [value, setValue] = useState(0);
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
  ];
  const bannerData: BannerProps[] = [
    {
      id: 0,
      image: '/images/banner/headphone.png',
      link: '#',
      title: 'Trending Beats',
      heading: 'Headphones',
      label: 'Shop Today',
    },
    {
      id: 1,
      image: '/images/banner/Iphone.png',
      link: '#',
      title: 'NEW APPLE',
      heading: 'Iphone 14 Pro',
      label: 'Shop Today',
    },
  ];

  const productData: ProductCardProps[] = [
    {
      id: 4,
      image: '/images/product.png',
      link: '#',
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
      link: '#',
      title: 'Iphone 14 Pro max',
      description: '9/10 condition with charger and box',
      rating: null,
      wishlist: false,
      lowestPrice: null,
      highestPrice: 500,
      price: 187,
    },
    {
      id: 5,
      image: '/images/product.png',
      link: '#',
      title: 'Iphone 14 Pro max',
      description: '9/10 condition with charger and box',
      rating: null,
      wishlist: false,
      lowestPrice: null,
      highestPrice: 500,
      price: 187,
    },
    {
      id: 5,
      image: '/images/product.png',
      link: '#',
      title: 'Iphone 14 Pro max',
      description: '9/10 condition with charger and box',
      rating: null,
      wishlist: false,
      lowestPrice: null,
      highestPrice: 500,
      price: 187,
    },
    {
      id: 5,
      image: '/images/product.png',
      link: '#',
      title: 'Iphone 14 Pro max',
      description: '9/10 condition with charger and box',
      rating: null,
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
      link: '#',
    },
    {
      id: 2,
      image: '/images/category.png',
      title: 'Phones',
      link: '#',
    },
    {
      id: 3,
      image: '/images/category.png',
      title: 'Phones',
      link: '#',
    },
    {
      id: 4,
      image: '/images/category.png',
      title: 'Phones',
      link: '#',
    },
    {
      id: 5,
      image: '/images/category.png',
      title: 'Phones',
      link: '#',
    },
    {
      id: 6,
      image: '/images/category.png',
      title: 'Phones',
      link: '#',
    },
  ];

  const brandData = [
    {
      id: 1,
      image: '/images/brands/brand.png',
      title: 'Apple',
      link: '#',
    },
    {
      id: 2,
      image: '/images/brands/brand.png',
      title: 'HP',
      link: '#',
    },
    {
      id: 3,
      image: '/images/brands/brand.png',
      title: 'Razor',
      link: '#',
    },
    {
      id: 4,
      image: '/images/brands/brand.png',
      title: 'Dell',
      link: '#',
    },
    {
      id: 5,
      image: '/images/brands/brand.png',
      title: 'Nvidia',
      link: '#',
    },
    {
      id: 6,
      image: '/images/brands/brand.png',
      title: 'AMD',
      link: '#',
    },
  ];
  return (
    <div>
      <Container fluid>
        <section className="mt-20">
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
          <SectionTitle title="Trending Now" label="View All" />

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
          <Grid>
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

        <section className='mt-20'>
        <div>
        <Carousel
          withIndicators
          height={600}
          slideSize="33.333333%"
          slideGap="md"
          loop={true}
          align="start"
          slidesToScroll={1}
          dragFree
          plugins={[autoplay.current]}
          withKeyboardEvents
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
          onSlideChange={(index) => {
            carouselData.length === index + 1 ? setValue(0) : setValue(index + 1);
          }}
        >
          {carouselData.map((item, index) => {
            
            console.log(carouselData.length, index, value);
            return(
            <Carousel.Slide key={index}>
              <Image height={index === value ? '500px' : '300px'} src={item.imgSrc} />
              <Group position="center">
                <Text size="xl">{item.title}</Text>
                <Button
                  leftIcon={<ArrowNarrowRight size={30} strokeWidth={1} />}
                  variant="outline"
                  classNames={{ leftIcon: classes.leftIcon, root: classes.root }}
                />
              </Group>
            </Carousel.Slide>
          )})}
        </Carousel>
      </div>
        </section>

        <section className="">
          <SectionTitle title="Categories" />
          <Grid>
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

      </Container>
      <section className='mt-48'>
      <Footer />
      </section>
      
    </div>
  );
}

export default Index;
