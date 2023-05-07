import {
  ProductCard,
  ProductCardProps,
  ProductCarousel,
  // ProductCharts,
  ProductFilter,
  ProductSpecification,
  ProductStats,
  SalesTable,
  SectionTitle,
} from '@elektra/components';

import { ActionIcon, Anchor, Breadcrumbs, Button, Container, Divider, Grid, Paper, Stack, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { NextLink } from '@mantine/next';
import { useRouter } from 'next/router';
import { ArrowDown, ShoppingCart } from 'tabler-icons-react';

const productSpecification = [
  //NEW PRODUCT
  {
    title: 'Iphone 14 Pro Max',
    condition: 'New',
    colorData: ['Black', 'Blue', 'Purple', 'Matte Black', 'White'],
    color: 'Blue',
    capacityData: ['16GB', '64Gb', '128Gb', '256GB'],
    capacity: '128GB',
    carrierData: ['AT&T', 'T-Mobile', 'Verizon', 'Factory Unlocked'],
    carrier: 'Verizon',

    lowestAsk: 169,
    highestAsk: 179,
    price: 400,
  },
  //USED PRODUCT
  {
    title: 'Iphone 14 Pro Max',
    condition: 'Used',
    colorData: ['Black', 'Blue', 'Purple', 'Matte Black', 'White'],
    color: 'Blue',
    capacityData: ['16GB', '64Gb', '128Gb', '256GB'],
    capacity: '128GB',
    carrierData: ['AT&T', 'T-Mobile', 'Verizon', 'Factory Unlocked'],
    carrier: 'Verizon',

    sellerCondition: 'Used/Fair',
    sellerColor: 'Black',
    sellerCapacity: '128GB',
    sellerCarrier: 'Verizon',
    lowestAsk: 169,
    highestAsk: 179,
    price: 400,
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

export type condition = 'New' | 'Used';

const items = [
  { title: 'Elektra', href: '/' },
  { title: 'Product Detail', href: '/product-detail' },
].map((item, index) => (
  <Anchor className="text-xs font-medium underline" component={NextLink} href={item.href} key={index}>
    {item.title}
  </Anchor>
));

export default function ProductPage() {
  const router = useRouter();
  // console.log(router.query[]
  
  const matches = useMediaQuery('(max-width: 800px)');
  const productSpecificationData =
    router.query['condition'] === 'new' ? productSpecification[0] : productSpecification[1];
  return (
    <Container size="lg" mt={50} fluid>
      <Breadcrumbs separator=">" mt="xs">
        {items}
      </Breadcrumbs>
      <Grid>
        <Grid.Col sm={6} mt={140}>
          <Stack align="center" justify="center">
            <ProductCarousel />
            <Text className="text-xs font-medium mt-20">Have this item?</Text>
            <Button leftIcon={<ShoppingCart />}>Sell Now</Button>
          </Stack>
        </Grid.Col>
        <Grid.Col sm={6}>
          <ProductSpecification
            title={productSpecificationData.title}
            condition={productSpecificationData.condition as condition}
            capacity={productSpecificationData.capacity}
            capacityData={productSpecificationData.capacityData}
            carrier={productSpecificationData.carrier}
            carrierData={productSpecificationData.carrierData}
            color={productSpecificationData.color}
            colorData={productSpecificationData.colorData}
            highestAsk={productSpecificationData.highestAsk}
            lowestAsk={productSpecificationData.lowestAsk}
            price={productSpecificationData.price}
            sellerCondition={productSpecificationData.sellerCondition}
            sellerColor={productSpecificationData.sellerColor}
            sellerCapacity={productSpecificationData.sellerCapacity}
            sellerCarrier={productSpecificationData.sellerCarrier}
          />
        </Grid.Col>
      </Grid>

      <Divider className="my-10" />
      <SectionTitle title="Used iPhone 14 Pro Max" />
      <ProductFilter />
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

      <Anchor component={NextLink} href="/shop" className="my-20 flex justify-center space-x-4 cursor-pointer">
        <Text size={16} className="font-[600]" color="black">
          View More
        </Text>
        <ActionIcon variant="outline" className="rounded-xl w-9 border-black">
          <ArrowDown size={20} color="black" />
        </ActionIcon>
      </Anchor>
      <div>
        <ProductStats />
      </div>
      <div className="mt-10">
        <Paper withBorder radius={0}>
          <Text size={24} className="font-bold text-black p-5">
            Sales History
          </Text>
          <Divider />
          <div className="py-5 px-2">
            {/* <SalesTable /> */}
          </div>
        </Paper>
      </div>
      <div className="my-24">
        {/* <ProductCharts /> */}
      </div>
    </Container>
  );
}
