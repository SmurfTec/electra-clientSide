import { BannerProps, HeroImage, ItemFilter, ProductCard, ProductCardProps, ProductFilter, SectionTitle } from '@elektra/components';
import { Container, Divider, Grid, Image, Stack, Text } from '@mantine/core';


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

export function ShowingMore() {
  return (
    <div>
      <Container fluid>
        <section className="mt-5">
          <Text className='text-black font-extrabold' size={32}>Showing more results for</Text>
          <Text className='text-black font-medium' size={24}>“Iphone”</Text>
          <Divider mt={15} />
        </section>
        <div className='mt-5'>
        <ItemFilter />
        </div>
        <section className="mt-5">
          <SectionTitle title="1000+ Results for iphone" />
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

        
        
        
      </Container>
    </div>
  );
}

export default ShowingMore;
