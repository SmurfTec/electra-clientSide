import {
  ProductCard,
  ProductCardProps,
  ProductCarousel,
  ProductCharts,
  // ProductCharts,
  ProductFilter,
  ProductSpecification,
  ProductStats,
  SalesTable,
  SectionTitle,
} from '@elektra/components';
import { Modal, Only } from '@elektra/customComponents';
import { useFilterModal } from '@elektra/hooks';

import { ActionIcon, Anchor, Breadcrumbs, Button, Divider, Grid, Image, Paper, Stack, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { NextLink } from '@mantine/next';
import { useRouter } from 'next/router';
import { ArrowDown, Filter, ShoppingCart } from 'tabler-icons-react';

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
  { title: 'Accessories', href: '/shop' },
  { title: 'Phones', href: '/shop' },
  { title: 'Apple', href: '/shop' },
  { title: 'Iphone 14 Pro Max', href: '/product-detail' },
].map((item, index) => (
  <Anchor
    className={`text-xs font-medium underline ${item.title === 'Iphone 14 Pro Max' ? 'font-[900]' : ''}`}
    component={NextLink}
    href={item.href}
    key={index}
  >
    {item.title}
  </Anchor>
));

export default function ProductPage() {
  const router = useRouter();
  const [FilterModal, filterOpened, filterHandler] = useFilterModal();
  const matches = useMediaQuery('(max-width: 800px)');
  const isNew = router.query['condition'] === 'new';
  const productSpecificationData = isNew ? productSpecification[0] : productSpecification[1];
  return (
    <div>
      <Breadcrumbs separator=">" mt={30}>
        {items}
      </Breadcrumbs>
      <Grid>
        <Grid.Col sm={6} mt={140}>
          <Stack align="center" justify="center">
            <Only when={!isNew}>
              <div className="ml-10">
                <ProductCarousel />
              </div>
            </Only>
            <Only when={isNew}>
              <Image alt="product image" src="/images/productImage.png" />
            </Only>
            <Text className="text-xs font-medium mt-20">Have this item?</Text>
            <Button component={NextLink} href="/product-listing" leftIcon={<ShoppingCart />}>
              Sell Now
            </Button>
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
      <Only when={matches}>
        <Button onClick={filterHandler.open} leftIcon={<Filter />}>
          Filter
        </Button>
      </Only>
      <Modal title="Filters" children={FilterModal} onClose={filterHandler.close} open={filterOpened} />
      <Only when={!matches}>
        <ProductFilter />
      </Only>
      <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 gap-12 place-content-center mt-5">
        {productData.map((product, index) => {
          return (
            <ProductCard
              key={index}
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

      <Anchor component={NextLink} href="/shop" className="mt-20 flex justify-center space-x-4 cursor-pointer">
        <Text size={16} className="font-[600]" color="black">
          View More
        </Text>
        <ActionIcon variant="outline" className="rounded-xl w-9 border-black">
          <ArrowDown size={20} color="black" />
        </ActionIcon>
      </Anchor>
      <div className="mt-4">
        <ProductStats />
      </div>
      <Only when={!isNew}>
        <div className="mt-10">
          <Paper withBorder radius={0}>
            <Text size={24} className="font-bold text-black p-5">
              Sales History
            </Text>
            <Divider />
            <div className="py-5 px-2">
              <SalesTable />
            </div>
          </Paper>
        </div>
      </Only>
      <div className="my-24">
        <ProductCharts />
      </div>
      <div className="pb-6">
        <SectionTitle title="Recommended New Items" />
        <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 gap-12 place-content-center mt-5">
          {productData.map((product, index) => {
            return (
              <ProductCard
                key={index}
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
      </div>
    </div>
  );
}
