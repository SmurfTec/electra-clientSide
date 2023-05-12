import { FooterProductCarousel, ItemFilter, ProductCard, ProductCardProps, SectionTitle } from '@elektra/components';
import { Modal, Only } from '@elektra/customComponents';
import { useFilterModal } from '@elektra/hooks';
import { BackgroundImage, Button, Container, Group, Image, Pagination, Text, Title } from '@mantine/core';
import { useMediaQuery, useToggle } from '@mantine/hooks';
import { NextLink } from '@mantine/next';
import { useState } from 'react';
import { Filter } from 'tabler-icons-react';

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

export default function ShopPage() {
  const [activePage, setPage] = useState(1);
  const [FilterModal, filterOpened, filterHandler] = useFilterModal();

  const matches = useMediaQuery('(max-width: 600px)');
  return (
    <>
      <Image src="/images/shop/heroBanner.jpg" alt="banner" height={300} />
      <div className="my-4">
        <Group position="apart">
          <SectionTitle title="All Phones" />
          <Only when={matches}>
            <Button onClick={filterHandler.open} leftIcon={<Filter />}>
              Filter
            </Button>
          </Only>
        </Group>
        <Only when={!matches}>
          <ItemFilter />
        </Only>
      </div>
      <Modal title="Filters" children={FilterModal} onClose={filterHandler.close} open={filterOpened} />
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
      <Group position="center">
        <Text size="sm" color="black" className="font-bold">
          Page
        </Text>
        <Pagination
          className="my-16"
          withControls={false}
          position="center"
          value={activePage}
          onChange={setPage}
          total={10}
        />
      </Group>

      <BackgroundImage className="text-center min-h-[350px]  xs:min-h-[500px] relative" src="/images/shop/mobileBanner.png">
        <div className="absolute top-1/2 xs:left-1/2 -translate-y-1/2 xs:-translate-x-1/2 space-y-8">
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
